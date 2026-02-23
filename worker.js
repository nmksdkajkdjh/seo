/**
 * Cloudflare Worker: 静态资源 + 行情 API 代理 + 访客计数
 * 行情代理兼容 /.netlify/functions/yahoo-proxy 路径
 * 访客计数：每次访问 +1，基础 32,000，存 KV
 */
const BASE_COUNT = 32000;
const TICKERS = [
  { id: 'nikkei', symbols: ['^N225'] },
  { id: 'topix', symbols: ['^TPX', '998405.T'] },
  { id: 'usdjpy', symbols: ['USDJPY=X'] },
  { id: 'nydow', symbols: ['^DJI'] },
  { id: 'shanghai', symbols: ['000001.SS'] },
  { id: 'reit', symbols: ['^JPXREIT'] }
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FINNHUB_FALLBACKS = {
  nikkei: ['^N225'],
  topix: ['^TPX', 'TPX', '.TPX', 'TPX:IND'],
  usdjpy: ['OANDA:USD_JPY'],
  nydow: ['^DJI'],
  shanghai: ['000001.SS'],
  reit: ['^JPXREIT', '1348.T']
};

function getPrice(q) {
  if (!q) return null;
  return q.regularMarketPrice ?? q.postMarketPrice ?? q.preMarketPrice ?? q.regularMarketPreviousClose ?? null;
}

async function fetchV7() {
  const allSyms = [...new Set(TICKERS.flatMap(t => t.symbols))];
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${allSyms.map(s => encodeURIComponent(s)).join(',')}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8' }
  });
  const data = await res.json();
  const list = data?.quoteResponse?.result || [];
  const bySym = {};
  list.forEach(q => { if (q?.symbol) bySym[q.symbol] = q; });
  return bySym;
}

async function fetchV8Chart(symbol, range = '5d') {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
  const data = await res.json();
  const chart = data?.chart?.result?.[0];
  if (!chart) return null;
  const quote = chart.indicators?.quote?.[0];
  const meta = chart.meta;
  if (!quote || !quote.close) return null;
  const closes = quote.close.filter(Boolean);
  const last = closes[closes.length - 1];
  const prev = closes.length > 1 ? closes[closes.length - 2] : last;
  const ch = last - prev;
  const pct = prev ? (ch / prev) * 100 : 0;
  return {
    symbol: meta?.symbol || symbol,
    regularMarketPrice: last,
    regularMarketChange: ch,
    regularMarketChangePercent: pct
  };
}

async function fetchExchangeRateUSDJPY(env) {
  const key = env.EXCHANGERATE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);
    const data = await res.json();
    const rate = data?.conversion_rates?.JPY;
    if (rate != null) {
      return { symbol: 'USDJPY=X', regularMarketPrice: rate, regularMarketChange: 0, regularMarketChangePercent: 0 };
    }
  } catch (_) {}
  return null;
}

async function fetchFinnhubQuote(symbol, env) {
  const key = env.FINNHUB_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}`);
    const data = await res.json();
    const p = data?.c ?? data?.pc;
    if (p != null && p > 0) {
      const prev = data?.pc ?? data?.o ?? p;
      const ch = p - prev;
      const pct = prev ? (ch / prev) * 100 : 0;
      return { symbol, regularMarketPrice: p, regularMarketChange: ch, regularMarketChangePercent: pct };
    }
  } catch (_) {}
  return null;
}

async function resolveTicker(ticker, bySym, env) {
  for (const sym of ticker.symbols) {
    const q = bySym[sym];
    const p = getPrice(q);
    if (p != null) {
      return { symbol: sym, regularMarketPrice: p, regularMarketChange: q.regularMarketChange ?? 0, regularMarketChangePercent: q.regularMarketChangePercent ?? 0 };
    }
  }
  for (const sym of ticker.symbols) {
    try {
      let q = await fetchV8Chart(sym);
      if (!q && ticker.id === 'topix') q = await fetchV8Chart(sym, '1mo');
      if (q && getPrice(q) != null) return { symbol: ticker.symbols[0], ...q };
    } catch (_) {}
  }
  if (ticker.id === 'usdjpy') {
    const q = await fetchExchangeRateUSDJPY(env);
    if (q) return q;
  }
  const fhSyms = FINNHUB_FALLBACKS[ticker.id];
  if (fhSyms) {
    for (const fhSym of fhSyms) {
      const q = await fetchFinnhubQuote(fhSym, env);
      if (q) return { symbol: ticker.symbols[0], ...q };
    }
  }
  return null;
}

async function handleVisitorCounter(env) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
  const kv = env.VISITOR_KV;
  if (!kv) {
    return new Response(JSON.stringify({ count: BASE_COUNT, fallback: true }), { status: 200, headers });
  }
  try {
    const key = 'line-count';
    const raw = await kv.get(key);
    const current = raw ? parseInt(raw, 10) : BASE_COUNT;
    const count = current + 1;
    await kv.put(key, String(count));
    return new Response(JSON.stringify({ count }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ count: BASE_COUNT, fallback: true }), { status: 200, headers });
  }
}

async function handleMarketProxy(env) {
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' };
  try {
    const bySym = await fetchV7();
    const results = [];
    for (const ticker of TICKERS) {
      const q = await resolveTicker(ticker, bySym, env);
      if (q) results.push(q);
    }
    return new Response(JSON.stringify({ quoteResponse: { result: results } }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Proxy failed', quoteResponse: { result: [] } }), { status: 500, headers });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 行情 API：兼容 Netlify 旧路径
    if (url.pathname === '/.netlify/functions/visitor-counter' || url.pathname === '/api/visitor-counter') {
      return handleVisitorCounter(env);
    }
    if (url.pathname === '/.netlify/functions/yahoo-proxy' || url.pathname === '/api/market') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': '86400' } });
      }
      return handleMarketProxy(env);
    }
    return env.ASSETS.fetch(request);
  },
};
