# 登録者数动态计数设置

## 功能

每次访问首页时，「登録者○○人突破」的数字会自动 +1，基础值 32,000。

## 架构（Cloudflare Workers）

- **API**：`GET /api/visitor-counter`（兼容 `/.netlify/functions/visitor-counter`）
- **存储**：Cloudflare KV
- **回退**：若 KV 未配置，始终显示 32,000

## 启用持久化计数（KV）

1. 创建 KV 命名空间：
   ```bash
   npx wrangler kv namespace create "VISITOR_COUNTER"
   ```
2. 将返回的 `id` 填入 `wrangler.toml`：
   ```toml
   [[kv_namespaces]]
   binding = "VISITOR_KV"
   id = "返回的 id"
   ```
3. 重新部署：`npx wrangler deploy`

## 部署后

1. 首次访问会从 32,001 开始递增（需启用 KV）
2. 若 KV 未启用，会显示 32,000（fallback）
3. 接口：`GET /api/visitor-counter`
