/**
 * Netlify Function: 行情数据代理
 * 优先 Yahoo v7 quote，失败时回退到 v8 chart
 */
const SYMBOLS = ['^N225', '^TPX', 'USDJPY=X', '^DJI', '000001.SS', '^JPXREIT'];
const ID_MAP = { '^N225': 'nikkei', '^TPX': 'topix', 'USDJPY=X': 'usdjpy', '^DJI': 'nydow', '000001.SS': 'shanghai', '^JPXREIT': 'reit' };
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchV7() {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${SYMBOLS.join(',')}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept': 'application/json', 'Accept-Language': 'en-US,en;q=0.9' }
  });
  const data = await res.json();
  const list = data?.quoteResponse?.result || [];
  if (list.length > 0) return list;
  return null;
}

async function fetchV8Chart(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`;
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

async function fetchV8Fallback() {
  const results = [];
  for (const sym of SYMBOLS) {
    try {
      const q = await fetchV8Chart(sym);
      if (q) results.push(q);
    } catch (_) {}
  }
  return results.length > 0 ? results : null;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': '86400' }, body: '' };
  }
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' };
  try {
    let list = await fetchV7();
    if (!list || list.length === 0) list = await fetchV8Fallback();
    if (!list || list.length === 0) {
      return { statusCode: 200, headers, body: JSON.stringify({ quoteResponse: { result: [] }, fallback: true }) };
    }
    return { statusCode: 200, headers, body: JSON.stringify({ quoteResponse: { result: list } }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Proxy failed', quoteResponse: { result: [] } }) };
  }
};
