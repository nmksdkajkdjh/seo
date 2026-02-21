# kouhaitou.jp SSL 错误排查（ERR_SSL_PROTOCOL_ERROR）

> 「此站点的连接不安全」「发送了无效的响应」ERR_SSL_PROTOCOL_ERROR

---

## 1. 常见原因概览

| 原因 | 说明 |
|------|------|
| DNS 未正确指向 Netlify | A/CNAME 记录错误或仍指向旧服务器 |
| Cloudflare SSL 模式不当 | 若用 Cloudflare 代理，需选 Full 或 Full (strict) |
| 证书尚未签发 | 新域名通常需 5 分钟～24 小时 |
| 遗留 AAAA (IPv6) 记录 | Netlify 负载均衡暂不支持 IPv6，会干扰证书 |
| 多条 A 记录冲突 | 仅保留一条指向 Netlify 的 A 记录 |

---

## 2. Netlify 侧检查

1. 登录 [Netlify](https://app.netlify.com/) → 选中站点
2. **Domain management** → **Domains** → 确认 `kouhaitou.jp` 和 `www.kouhaitou.jp` 已添加
3. **HTTPS** → 查看证书状态：
   - `Certificate provisioning`：等待签发（通常几分钟～几小时）
   - ` provisioning failed`：多为 DNS 配置问题
   - `Active`：证书正常，可能是缓存或 DNS 传播延迟

---

## 3. DNS 配置（以 Cloudflare 为例）

若使用 **Cloudflare**：

| 类型 | 名称 | 内容 | 代理 |
|------|------|------|------|
| A | @ | 75.2.60.5 | 橙色云（或灰色云） |
| CNAME | www | [你的站点名].netlify.app | 橙色云（或灰色云） |

**重要**：
- 删除根域 (@) 的 **AAAA** 记录
- 若使用代理（橙色云），SSL 模式选 **Full** 或 **Full (strict)**
- 不要选 **Flexible**（否则会报 SSL 错误）

---

## 4. DNS 配置（使用域名注册商 DNS）

| 类型 | 主机 | 值 |
|------|------|-----|
| A | @ | 75.2.60.5 |
| CNAME | www | [sitename].netlify.app |

同样删除所有 AAAA 记录。

---

## 5. Cloudflare SSL 模式

Cloudflare → **SSL/TLS** → **Overview**：

- **Flexible**：❌ 会导致 ERR_SSL_PROTOCOL_ERROR
- **Full**：✅ 推荐
- **Full (strict)**：✅ 更严格，需源站证书有效

---

## 6. 验证 DNS 传播

- [dnschecker.org](https://dnschecker.org/) 输入 `kouhaitou.jp`，查看 A 记录是否指向 `75.2.60.5`
- 命令行：`nslookup kouhaitou.jp`

---

## 7. 等待时间

- Netlify 每 10 分钟尝试签发证书，最长约 24 小时
- 若超过 24 小时仍失败，基本可判断为 DNS 配置问题
- 修改 DNS 后，全球传播可能需要数小时

---

## 8. 临时方案

在 SSL 修复前，可先通过 Netlify 默认域名访问：

- `https://[sitename].netlify.app`

用于确认站点本身已正确部署。
