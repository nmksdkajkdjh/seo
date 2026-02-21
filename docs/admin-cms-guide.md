# 内容管理端使用指南

## 访问管理端

- **URL**：`https://你的域名/admin/`（例如 `https://kouhaitou.jp/admin/`）
- **界面语言**：中文

## 前置条件（Git 连接部署）

1. 使用 **Git 连接** 将项目部署到 Netlify（非拖拽部署）
2. 在 Netlify 中启用 **Identity** 与 **Git Gateway**
3. 在 Netlify 中设置 **Build command**：`npm run build`
4. 在 Netlify 中设置 **Publish directory**：`site`
5. 在 Netlify 中设置 **Base directory**：留空（或项目根目录）

## 本地开发

1. 安装依赖：`npm install`
2. 构建 CMS 内容：`npm run build`
3. 本地预览管理端：用 Live Server 打开 `site/admin/index.html`
4. 本地测试时，在 `admin/config.yml` 中可将 `backend` 改为 `name: test-repo`

## 管理端功能

### 博客文章

- **新建**：博客文章 → 新規作成
- **编辑**：标题、发布日期、描述、封面图、正文（Markdown）
- **正文**：支持 Markdown，可插入图片（上传到 `/images`）

### 图片上传

- 在编辑文章时，通过「封面图」或正文中的图片控件上传
- 图片保存到 `site/images/` 目录
- 暴落銘柄文章需要的图表：`nintendo-chart.png`、`softbank-chart.png`、`inpex-chart.png` 可在此上传

## Build 脚本说明

- **命令**：`npm run build`
- **作用**：读取 `content/posts/*.md`，生成 `site/blog/*.html`
- **流程**：解析 Frontmatter → 转换 Markdown → 套用模板 → 输出 HTML

## 新增文章后的操作

1. 在管理端创建/编辑文章并发布
2. 若使用 Git：提交后 Netlify 会自动执行 `npm run build` 并部署
3. 若拖拽部署：本地运行 `npm run build` 后再上传 `site/` 文件夹
