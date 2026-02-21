/**
 * Netlify Function: Yahoo Finance API 代理
 * 数据源：Yahoo Finance REST API（与 yfinance 相同）
 * 绕过浏览器 CORS 限制，稳定获取实时行情
 * 行情栏：日経平均 ^N225, TOPIX ^TPX, 米ドル円 USDJPY=X, NYダウ ^DJI, 上海総合 000001.SS, 東証REIT ^JPXREIT
 */
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  const symbols = event.queryStringParameters?.symbols || '^N225,^TPX,USDJPY=X,^DJI,000001.SS,^JPXREIT';

  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    );
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=30'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Proxy failed' })
    };
  }
};
