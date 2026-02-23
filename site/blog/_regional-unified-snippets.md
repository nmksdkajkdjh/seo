# 地域別 LP 統一スニペット（侘寂・渋い 2026）

4つの Tier 1 地域ページ（東京・大阪・愛知・北海道）で使用する統一 Header / 免責条 / タイトル・本文の Tailwind コード。

---

## 1. 免責条（合规栏）

```html
<!-- 合规栏：炭灰 #2F2F2F（侘寂・渋い 2026） -->
<div class="bg-[#2F2F2F] text-white text-xs py-2">
  <div class="max-w-6xl mx-auto px-6 flex justify-between items-center flex-wrap gap-2">
    <div>投資はリスクを伴い、元本保証はありません。過去の実績は将来の結果を保証するものではありません。本記事は情報提供を目的とし、投資勧誘ではありません。</div>
    <div class="text-right"><a href="/company.html" class="hover:underline opacity-90">FSA投資助言業登録済</a></div>
  </div>
</div>
```

---

## 2. Header

```html
<header class="sticky top-0 z-50 bg-[#FAF7F2] border-b border-[#E8E4DB]">
  <div class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-4">
    <a href="/" class="flex items-center gap-4">
      <span class="text-2xl md:text-3xl font-bold tracking-tight text-[#2F2F2F]">株情報無料配信</span>
      <span class="text-sm text-[#666] pt-1">プロの目線で</span>
    </a>
    <nav class="flex items-center gap-6 md:gap-8 text-sm font-medium">
      <a href="/" class="text-[#666] hover:text-[#2F2F2F]">ホーム</a>
      <a href="/blog/" class="text-[#2F2F2F] font-bold border-b-2 border-[#2F2F2F] pb-0.5">ブログ</a>
      <a href="/company.html" class="text-[#666] hover:text-[#2F2F2F]">会社概要</a>
      <a href="/law.html" class="text-[#666] hover:text-[#2F2F2F]">特定商取引法</a>
      <a href="/privacy.html" class="text-[#666] hover:text-[#2F2F2F]">プライバシー</a>
    </nav>
    <a href="https://line.me/R/ti/p/@981czbkb" class="bg-[#00B900] hover:bg-[#009900] text-white px-8 py-3 rounded text-sm font-medium transition">LINEで無料登録する</a>
  </div>
</header>
```

---

## 3. Article 開始タグ（地域テクスチャ対応）

| 地域 | クラス |
|------|--------|
| 東京 | `<article class="tex-tokyo max-w-3xl mx-auto px-6 py-12">` |
| 大阪 | `<article class="tex-osaka max-w-3xl mx-auto px-6 py-12">` |
| 愛知 | `<article class="tex-aichi max-w-3xl mx-auto px-6 py-12">` |
| 北海道 | `<article class="tex-hokkaido max-w-3xl mx-auto px-6 py-12">` |

※ `regional-textures.css` を `<link rel="stylesheet" href="/css/regional-textures.css">` で読み込むこと。

---

## 4. H1 / H2

```html
<h1 class="text-2xl md:text-3xl font-bold text-[#2F2F2F] mb-6">（ページタイトル）</h1>
<h2 class="text-xl font-bold text-[#2F2F2F] mt-10 mb-4">（セクション見出し）</h2>
```

---

## 5. 本文・FAQ

- 本文: `class="text-[#666] mb-4"` または `mb-6`
- FAQ 見出し: `class="font-medium text-[#2F2F2F]"`
- FAQ 回答: `class="text-[#666]"`

---

## 6. テーブル（Tokyo / Osaka などで使用）

```css
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #E8E4DB; padding: 8px 12px; text-align: left; }
th { background: #FFFFFF; font-weight: 600; color: #2F2F2F; }
```

---

## 7. LINE CTA ボックス

```html
<div class="bg-[#f0f9f0] p-6 rounded-lg mb-10 text-center">
  <p class="font-medium mb-3">（地域名）の皆様へ｜毎週プロが1銘柄厳選してLINE無料配信。</p>
  <a href="https://line.me/R/ti/p/@981czbkb" class="inline-block bg-[#00B900] hover:bg-[#009900] text-white px-8 py-3 rounded font-medium transition">LINEで無料登録する</a>
  <p class="text-xs text-[#999] mt-3">投資はリスクを伴い元本保証はありません。</p>
</div>
```

---

## 8. Footer

```html
<footer class="bg-[#2F2F2F] text-white pt-16 pb-8 mt-12">
  <!-- 既存の footer 内容 -->
</footer>
```

---

## 色彩一覧（侘寂・渋い 2026）

| 用途 | 色コード |
|------|----------|
| 主色・見出し | `#2F2F2F` |
| 背景 | `#FAF7F2` |
| ボーダー | `#E8E4DB` |
| 本文 | `#666` |
| 補助テキスト | `#999` |
| 免責条・Footer 背景 | `#2F2F2F` |
