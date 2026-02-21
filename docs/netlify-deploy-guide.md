# Netlify 一键部署指南

> 3 分钟上线，免费 HTTPS + 全球 CDN

---

## 方式 1：拖拽部署（最简单）

### 步骤

1. **登录** [netlify.com](https://netlify.com) → 注册/登录
2. **准备文件夹**：确保 `site/` 文件夹包含：
   - index.html
   - company.html
   - privacy.html
   - sitemap.xml
   - blog/（含 index.html + 5 篇文章）
3. **拖拽**：将整个 `site` 文件夹拖入 Netlify 页面中央的虚线框
4. **等待**：约 30 秒，获得 `https://xxx.netlify.app` 预览 URL
5. **绑定域名**（可选）：Site settings → Domain management → Add custom domain

---

## 方式 2：Git 连接（推荐长期用，支持 CMS）

1. 把项目推到 GitHub
2. Netlify → Add new site → Import an existing project → GitHub
3. 选择仓库
4. **Build settings**：
   - Build command：`npm run build`（生成 CMS 内容；若无 package.json 可留空）
   - Publish directory：`site`
5. 启用 **Identity** 与 **Git Gateway**（Site settings → Identity / Identity → Services）以使用管理端
6. Deploy

---

## 部署前检查

- [ ] 替换 `kouhaitou.jp` → 实际域名（sitemap.xml、各页 canonical）
- [ ] 替换 company.html / privacy.html 中 株式会社〇〇、地址、登録番号
- [ ] 确认 LINE 链接 `981czbkb` 正确

---

## 部署后

1. **Search Console**：提交 `https://你的域名/sitemap.xml`
2. **robots.txt**（可选，在 site 根目录新建）：
   ```
   User-agent: *
   Allow: /
   Sitemap: https://你的域名/sitemap.xml
   ```
