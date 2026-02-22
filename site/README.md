# 部署用网站文件夹

## 结构

```
site/
├── index.html       ← 首页（LP）
├── company.html     ← 会社概要
├── privacy.html     ← プライバシーポリシー
├── sitemap.xml
├── data/            ← 运营配置（SERP模型・路线图・转化漏斗）
├── js/
│   └── conversion-tracking.js  ← LINE登録クリック計測
├── blog/
│   ├── index.html
│   ├── 2026-kouhaitou-kabuka-ranking.html
│   ├── nikkei-kouhaitou50-2026.html
│   ├── nisa-osusume-meigara-2026.html
│   ├── kabusui-osusume-2026.html
│   └── kabushiki-suishou-meigara-muryou.html
```

## 部署前

1. 若 blog 下缺文件：从 `content/blog/` 复制对应 .html 到 `site/blog/`
2. 替换 `kouhaitou.jp` 为实际域名（各页 canonical、sitemap.xml）
3. 填写 company.html、privacy.html 中 株式会社〇〇、地址、登録番号

## Netlify 部署

拖拽整个 `site` 文件夹到 [app.netlify.com](https://app.netlify.com) 的拖放区。
