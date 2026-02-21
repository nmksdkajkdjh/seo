/**
 * 访客计数：每次访问自增，用于 Hero 区「登録者○○人突破」
 * 使用 Netlify Blobs 持久化（需在 Netlify 启用 Blobs）
 */
const { connectLambda, getStore } = require('@netlify/blobs');

const BASE_COUNT = 32000;

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Max-Age': '86400' }, body: '' };
  }
  try {
    connectLambda(event);
    const store = getStore('visitors');
    const current = await store.get('line-count');
    const count = current ? parseInt(current, 10) + 1 : BASE_COUNT + 1;
    await store.set('line-count', String(count));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ count })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ count: BASE_COUNT, fallback: true })
    };
  }
};
