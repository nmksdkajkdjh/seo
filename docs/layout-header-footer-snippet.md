# 共通レイアウト（Header / Footer スニペット）

ブログ記事に統一ヘッダー・フッターを追加する際のコピペ用。

## Header

```html
<header class="sticky top-0 bg-white border-b shadow-sm z-50">
  <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/" class="text-2xl font-bold text-[#1a3c6e]">株情報無料配信</a>
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
      <a href="/blog/" class="hover:text-[#00B900]">ブログ</a>
      <a href="/company.html" class="hover:text-[#00B900]">会社概要</a>
      <a href="/law.html" class="hover:text-[#00B900]">特定商取引法</a>
      <a href="/privacy.html" class="hover:text-[#00B900]">プライバシー</a>
    </nav>
    <a href="https://line.me/R/ti/p/@981czbkb" class="bg-[#00B900] hover:bg-[#00A000] text-white px-6 py-2.5 rounded-full text-sm font-medium">LINEで無料登録</a>
  </div>
</header>
```

## Footer

```html
<footer class="bg-[#1a3c6e] text-white py-8 mt-12">
  <div class="max-w-6xl mx-auto px-6 text-center text-sm opacity-80">
    <p>株式会社〇〇　関東財務局長（金商）第〇〇〇〇号</p>
    <p class="mt-2">投資はリスクを伴い、元本保証はありません。</p>
    <p class="mt-4">© 2026 株式会社〇〇</p>
  </div>
</footer>
```

## ブログ記事用

`<head>` に追加：`<script src="https://cdn.tailwindcss.com"></script>`  
`<body>` に `class="font-sans text-gray-800"` を付与。  
記事本文を `<main class="max-w-3xl mx-auto px-6 py-12">` で囲む。
