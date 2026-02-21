# 行情 API 备用源配置

行情 Function (`yahoo-proxy`) 支持多数据源，Yahoo 失败时自动回退到备用 API。

## 数据源优先级

1. **Yahoo Finance v7**（无需配置）
2. **Yahoo Finance v8 chart**（无需配置）
3. **ExchangeRate-API**：USD/JPY 专用（需配置）
4. **Finnhub**：股票/指数（需配置）

---

## Netlify 环境变量

在 Netlify 控制台配置以下变量，**不要**提交到代码库：

| 变量名 | 用途 | 获取地址 |
|--------|------|----------|
| `EXCHANGERATE_API_KEY` | USD/JPY 备用 | [exchangerate-api.com](https://www.exchangerate-api.com/) |
| `FINNHUB_API_KEY` | 股票/指数备用 | [finnhub.io](https://finnhub.io/) |

### 配置步骤

1. 打开 Netlify Dashboard → 站点 → **Site configuration** → **Environment variables**
2. 点击 **Add a variable** → **Add a single variable**
3. 添加：
   - Key: `EXCHANGERATE_API_KEY`  
     Value: 你的 ExchangeRate-API Key
   - Key: `FINNHUB_API_KEY`  
     Value: 你的 Finnhub API Key
4. 保存后重新部署站点

---

## API 限制

- **ExchangeRate-API**：约 30,000 次/月（免费档），每小时更新
- **Finnhub**：免费档约 60 次/分钟

行情 Function 设置了 `Cache-Control: max-age=60`，同一分钟内的重复请求会走 CDN 缓存，不会重复调用 API。

---

## Finnhub Webhook（可选）

若需 Finnhub 推送事件到 `https://kouhaitou.jp/`，需在 Netlify 配置 Webhook 验证。当前行情栏为轮询模式，暂不需要 Webhook。
