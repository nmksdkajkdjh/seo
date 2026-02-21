# 登録者数动态计数设置

## 功能

每次访问首页时，「登録者○○人突破」的数字会自动 +1，基础值 32,000。

## 依赖

- **Netlify Blobs**：用于持久化计数
- Netlify 控制台 → 对应站点 → 需启用 Storage (Blobs)

## 部署后

1. 首次访问会从 32,001 开始递增
2. 若 Blobs 未启用，会显示 32,000（fallback）
3. 接口：`GET /.netlify/functions/visitor-counter`

## 启用 Blobs

Netlify 控制台 → 站点 → Storage → 启用 Blobs（若尚未启用）。
