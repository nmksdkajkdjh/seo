# Yahoo Finance 行情 API 说明

## 当前实现

- **后端**：`netlify/functions/yahoo-proxy.js`（Node.js）
- **数据源**：Yahoo Finance REST API `https://query1.finance.yahoo.com/v7/finance/quote`
- **与 yfinance 关系**：使用同一套 Yahoo 数据源，功能等效

## 为何不用 Python yfinance

Netlify Functions 仅支持 Node.js、TypeScript、Go，**不支持 Python**。若需 Python，可考虑：

- Vercel Serverless（支持 Python）
- AWS Lambda + API Gateway
- 自建后端

## 行情栏符号映射

| 显示名 | Yahoo Symbol |
|--------|--------------|
| 日経平均 | ^N225 |
| TOPIX | ^TPX |
| 米ドル円 | USDJPY=X |
| NYダウ | ^DJI |
| 上海総合 | 000001.SS |
| 東証REIT | ^JPXREIT |

## 前端调用

```js
fetch('/.netlify/functions/yahoo-proxy?symbols=^N225,^TPX,...')
```

响应结构：`quoteResponse.result[]` 含 `regularMarketPrice`、`regularMarketChange`、`regularMarketChangePercent`。
