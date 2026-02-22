/**
 * Netlify Function: 行情数据代理
 * 1. 优先 Yahoo v7 quote
 * 2. v7 部分返回时，对缺失/空价的 symbol 单独请求 v8 chart
 * 3. ExchangeRate-API 备用：USD/JPY（需 EXCHANGERATE_API_KEY）
 * 4. Finnhub 备用：股票/指数（需 FINNHUB_API_KEY）
 */
const TICKERS = [
  { id: 'nikkei', symbols: ['^N225'] },
  { id: 'topix', symbols: ['^TPX', '998405.T'] },
  { id: 'usdjpy', symbols: ['USDJPY=X'] },
  { id: 'nydow', symbols: ['^DJI'] },
  { id: 'shanghai', symbols: ['000001.SS'] },
  { id: 'reit', symbols: ['^JPXREIT'] }
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Finnhub symbol 映射（Yahoo 失败时使用，可多试几个）
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
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${allSyms.map(s=>encodeURIComponent(s)).join(',')}`;
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
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'application/json' }
  });
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

/** ExchangeRate-API: 获取 USD/JPY */
async function fetchExchangeRateUSDJPY() {
  const key = process.env.EXCHANGERATE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`);
    const data = await res.json();
    const rate = data?.conversion_rates?.JPY;
    if (rate != null) {
      return {
        symbol: 'USDJPY=X',
        regularMarketPrice: rate,
        regularMarketChange: 0,
        regularMarketChangePercent: 0
      };
    }
  } catch (_) {}
  return null;
}

/** Finnhub Quote API */
async function fetchFinnhubQuote(symbol) {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}`);
    const data = await res.json();
    const p = data?.c ?? data?.pc;  // current or previous close
    if (p != null && p > 0) {
      const prev = data?.pc ?? data?.o ?? p;
      const ch = p - prev;
      const pct = prev ? (ch / prev) * 100 : 0;
      return {
        symbol,
        regularMarketPrice: p,
        regularMarketChange: ch,
        regularMarketChangePercent: pct
      };
    }
  } catch (_) {}
  return null;
}

async function resolveTicker(ticker, bySym) {
  // 1. Yahoo v7
  for (const sym of ticker.symbols) {
    const q = bySym[sym];
    const p = getPrice(q);
    if (p != null) {
      return {
        symbol: sym,
        regularMarketPrice: p,
        regularMarketChange: q.regularMarketChange ?? 0,
        regularMarketChangePercent: q.regularMarketChangePercent ?? 0
      };
    }
  }
  // 2. Yahoo v8 chart（TOPIX 等有时 5d 无数据，试 1mo）
  for (const sym of ticker.symbols) {
    try {
      let q = await fetchV8Chart(sym);
      if (!q && ticker.id === 'topix') q = await fetchV8Chart(sym, '1mo');
      if (q && getPrice(q) != null) {
        return { symbol: ticker.symbols[0], ...q };
      }
    } catch (_) {}
  }
  // 3. USD/JPY: ExchangeRate-API 备用
  if (ticker.id === 'usdjpy') {
    const q = await fetchExchangeRateUSDJPY();
    if (q) return q;
  }
  // 4. Finnhub 备用（依次尝试多个 symbol）
  const fhSyms = FINNHUB_FALLBACKS[ticker.id];
  if (fhSyms) {
    for (const fhSym of fhSyms) {
      const q = await fetchFinnhubQuote(fhSym);
      if (q) return { symbol: ticker.symbols[0], ...q };
    }
  }
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': '86400' }, body: '' };
  }
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' };
  try {
    let bySym = await fetchV7();
    const results = [];
    for (const ticker of TICKERS) {
      const q = await resolveTicker(ticker, bySym);
      if (q) results.push(q);
    }
    return { statusCode: 200, headers, body: JSON.stringify({ quoteResponse: { result: results } }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Proxy failed', quoteResponse: { result: [] } }) };
  }
};
