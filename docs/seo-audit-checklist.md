# kouhaitou.jp SEO 审计清单（基于 Google SEO 入门指南）

---

## 1. 帮助 Google 发现与抓取内容

| 项目 | 状态 | 说明 |
|------|------|------|
| site: 索引检查 | ✅ | 使用 `site:kouhaitou.jp` 可检查索引状态 |
| Sitemap | ✅ | `site/sitemap.xml` 含 24 个 URL |
| robots.txt | ✅ | `site/robots.txt` 正确指向 sitemap |
| 抓取与用户一致 | ✅ | 未隐藏 CSS/JS |
| 搜索页 noindex | ✅ | `site/search/index.html` 已设置 `noindex, follow` |
| Canonical 一致性 | ✅ 已修复 | 4 个页面已补 `.html`，与 sitemap 一致 |

### 需修复：Canonical URL ✅ 已修复

| 文件 | 状态 |
|------|------|
| `site/blog/kabushiki-suishou-meigara-muryou.html` | ✅ 已补 `.html` |
| `site/blog/kabusui-osusume-2026.html` | ✅ 已补 `.html` |
| `site/blog/nikkei-kouhaitou50-2026.html` | ✅ 已补 `.html` |
| `site/blog/nisa-osusume-meigara-2026.html` | ✅ 已补 `.html` |

---

## 2. 标题与元描述

| 项目 | 状态 | 说明 |
|------|------|------|
| 每页唯一 title | ✅ | 全站 title 各不相同 |
| title 描述性 | ✅ | 如「東京で高配当株をお探しの方へ｜2026…」 |
| meta description 覆盖 | ✅ 已修复 | 搜索页已添加 meta description |
| description 长度 | ✅ | 多为 120–160 字 |
| **H1 与 title 不一致** | ⚠️ | 1 处需统一 |

### 需修复：H1 与 title 统一 ✅ 已修复

**`site/blog/2026-bouraku-meigara-buy-opportunity.html`**
- h1 已改为 `暴落した銘柄は買い増しチャンス？ソフトバンク・任天堂・INPEXを分析`

---

## 3. 网站结构与 URL

| 项目 | 状态 | 说明 |
|------|------|------|
| URL 语义化 | ✅ | `/blog/tokyo-kouhaitou-2026.html` 等 |
| 目录结构 | ✅ | blog、search 分类清晰 |
| 重复内容 | ✅ | Netlify 部署 `site/`，无重复 |

---

## 4. 链接

| 项目 | 状态 | 说明 |
|------|------|------|
| 内部链接结构 | ✅ | 首页→博客→单篇、地域文章互链 |
| 锚文字描述性 | ✅ | 「福岡・九州」「東京」等清晰 |
| 相关文章互链 | ✅ | 地域页互相链接 |
| **LINE 链接错误** | ✅ 已修复 | 4 个页面已补 `@` |

### 需修复：LINE URL 缺少 @ ✅ 已修复

| 文件 | 状态 |
|------|------|
| `site/blog/kabushiki-suishou-meigara-muryou.html` | ✅ 已改 |
| `site/blog/kabusui-osusume-2026.html` | ✅ 已改 |
| `site/blog/nisa-osusume-meigara-2026.html` | ✅ 已改 |
| `site/blog/nikkei-kouhaitou50-2026.html` | ✅ 已改 |

---

## 5. 图片

| 项目 | 状态 | 说明 |
|------|------|------|
| 大部分图片有 alt | ✅ | 内容图均有 alt |
| 装饰性图片 | ✅ | `alt=""` + `aria-hidden` 恰当 |
| 福岡缩略图 | ✅ 已修复 | 已创建 `fukuoka-kouhaitou-2026-thumb.svg` 并应用到博客与地域页 |
| 神奈川缩略图 | ✅ 已修复 | 已创建 `kanagawa-kouhaitou-2026-thumb.svg` 并应用到博客与地域页 |

---

## 6. 内容

| 项目 | 状态 | 说明 |
|------|------|------|
| H1 唯一性 | ✅ | 每页一个 H1 |
| 标题层级 | ✅ | H1→H2→H3 结构清晰 |
| 内容结构 | ✅ | 段落、列表划分合理 |

---

## 7. Schema / 结构化数据

| 项目 | 状态 | 说明 |
|------|------|------|
| 首页 WebSite + WebPage | ✅ | 含 SearchAction |
| 博客 ItemList + BreadcrumbList | ✅ | 正确 |
| 文章 Article | ✅ | headline, datePublished, author |
| 文章 BreadcrumbList | ✅ | 地域文章已添加 |
| FAQPage | ✅ | kabushiki-suishou-meigara-muryou 已实现 |
| **publisher 占位符** | ✅ 已修复 | 全站改为 `株情報無料配信`，logo 改为 `blog-og.jpg` |
| **logo URL** | ✅ 已修复 | 使用 `images/blog-og.jpg`（请确保该文件存在） |
| 地域文章 Article image | ✅ 已修复 | 5 个地域页已添加 og:image + Article image + dateModified |
| dateModified | ⚠️ | 部分文章有，建议全部添加 |

---

## 8. Google 明确不必纠结的方面

| 项目 | 状态 |
|------|------|
| meta keywords | ✅ 可忽略（Google 不使用） |
| Keyword stuffing | ✅ 未发现 |
| Domain keywords | ✅ 无刻意堆砌 |
| 内容长度 | ✅ 结构合理 |

---

## 修复优先级汇总

### 高优先级（影响索引/功能）

1. **修正 4 处 canonical**：补上 `.html`
2. **修正 4 个页面的 LINE 链接**：补上 `@`
3. **修正 Schema publisher**：`株式会社〇〇` → 真实公司名
4. **统一暴落页 H1 与 title**

### 中优先级（体验/呈现）

5. 确认 `logo.png` 存在，或修正 Schema 中 logo URL
6. 为地域文章添加 og:image / Article image
7. 制作福岡・神奈川专用缩略图（或保持现状）

### 低优先级

8. 搜索页添加 meta description（noindex 页非必须）
9. Article Schema 增加 dateModified
10. 推广链接加 `rel="nofollow"`（视策略而定）
