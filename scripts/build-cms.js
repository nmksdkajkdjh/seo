/**
 * CMS 内容构建脚本
 * 读取 content/posts/*.md，生成 site/blog/*.html
 * 运行：npm run build
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const CONTENT_DIR = path.join(__dirname, '../content/posts');
const OUTPUT_DIR = path.join(__dirname, '../site/blog');

// 博客页面 HTML 模板
function getBlogTemplate(data) {
  const { title, description, date, image, bodyHtml, slug } = data;
  const dateStr = date ? new Date(date).toISOString().split('T')[0] : '2026-02-21';
  const desc = description || title;

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}｜株情報無料配信</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="https://kouhaitou.jp/blog/${slug}.html">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article","headline":"${escapeHtml(title)}","datePublished":"${dateStr}","author":{"@type":"Person","name":"山田太郎"},"publisher":{"@type":"Organization","name":"株情報無料配信"},"mainEntityOfPage":{"@type":"WebPage","@id":"https://kouhaitou.jp/blog/${slug}.html"}}
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { font-family: "メイリオ", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif; }</style>
</head>
<body class="bg-white text-gray-800">
<div class="bg-[#1a3c6e] text-white text-xs py-2">
  <div class="max-w-6xl mx-auto px-6">投資はリスクを伴い、元本保証はありません。過去の実績は将来の結果を保証するものではありません。</div>
</div>
<header class="border-b">
  <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-4">
    <a href="/" class="flex items-center gap-4">
      <span class="text-2xl md:text-3xl font-bold tracking-tight text-[#1a3c6e]">株情報無料配信</span>
      <span class="text-sm text-gray-500 pt-1">プロの目線で</span>
    </a>
    <nav class="flex items-center gap-6 md:gap-8 text-sm font-medium">
      <a href="/" class="hover:text-[#1a3c6e]">ホーム</a>
      <a href="/blog/" class="text-[#1a3c6e] font-bold border-b-2 border-[#1a3c6e] pb-0.5">ブログ</a>
      <a href="/company.html" class="hover:text-[#1a3c6e]">会社概要</a>
      <a href="/law.html" class="hover:text-[#1a3c6e]">特定商取引法</a>
      <a href="/privacy.html" class="hover:text-[#1a3c6e]">プライバシー</a>
    </nav>
    <a href="https://line.me/R/ti/p/@981czbkb" class="bg-[#00B900] hover:bg-[#009900] text-white px-8 py-3 rounded text-sm font-medium transition">LINEで無料登録する</a>
  </div>
</header>
<article class="max-w-3xl mx-auto px-6 py-12">
  <h1 class="text-2xl md:text-3xl font-bold text-[#1a3c6e] mb-6">${escapeHtml(title)}</h1>
  <div class="prose prose-gray max-w-none text-gray-700">${bodyHtml}</div>
  <p class="mt-8 text-sm text-gray-500"><a href="/blog/" class="text-[#1a3c6e] hover:underline">← ブログ一覧へ戻る</a></p>
</article>
<footer class="bg-[#1a3c6e] text-white pt-16 pb-8 mt-12">
  <div class="max-w-6xl mx-auto px-6">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div><p class="font-bold mb-4">株情報無料配信</p><p class="text-sm opacity-80">元証券アナリストが厳選する実践的な株式投資情報</p></div>
      <div><p class="font-medium mb-3">メニュー</p><ul class="space-y-2 text-sm opacity-80"><li><a href="/blog/" class="hover:underline">ブログ一覧</a></li><li><a href="/company.html" class="hover:underline">会社概要</a></li><li><a href="/law.html" class="hover:underline">特定商取引法</a></li><li><a href="/privacy.html" class="hover:underline">プライバシーポリシー</a></li></ul></div>
      <div><p class="font-medium mb-3">お問い合わせ</p><p class="text-sm opacity-80">LINE公式アカウントより</p><p class="text-sm opacity-80 mt-1"><a href="mailto:support@kouhaitou.jp" class="hover:underline">support@kouhaitou.jp</a></p></div>
      <div class="md:text-right"><a href="https://line.me/R/ti/p/@981czbkb" class="inline-block bg-[#00B900] hover:bg-[#009900] text-white px-8 py-3 rounded text-sm font-medium">LINEで無料登録する</a></div>
    </div>
    <div class="border-t border-white/20 pt-8 text-xs opacity-70">
      <p class="mt-4">投資はリスクを伴い、元本保証はありません。過去の実績は将来の結果を保証するものではありません。</p>
      <p class="mt-6">© 2026  All Rights Reserved.</p>
    </div>
  </div>
</footer>
</body>
</html>`;
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 转换 Markdown 中的图片路径为绝对路径
function processImagePaths(html, basePath) {
  return html.replace(/src="([^"]+)"/g, (m, src) => {
    if (src.startsWith('/') || src.startsWith('http')) return m;
    const abs = path.join(path.dirname(basePath), src);
    const rel = path.relative(OUTPUT_DIR, path.resolve(OUTPUT_DIR, '..', 'images', path.basename(src)));
    return `src="/images/${path.basename(src)}"`;
  });
}

function build() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('content/posts 目录不存在，跳过构建');
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  console.log(`找到 ${files.length} 篇 Markdown 文章`);

  marked.setOptions({ gfm: true, breaks: true });

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    const slug = path.basename(file, '.md');
    const bodyHtml = marked.parse(body || '');
    const html = getBlogTemplate({
      title: data.title || slug,
      description: data.description,
      date: data.date,
      image: data.image,
      bodyHtml,
      slug,
    });

    const outPath = path.join(OUTPUT_DIR, `${slug}.html`);
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`  生成: ${slug}.html`);
  }
  console.log('CMS 内容构建完成');
}

build();
