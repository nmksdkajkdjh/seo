# GEO・SEO・SEM 最適化ガイド

> kouhaitou.jp 向け地域・検索・広告の統合最適化

---

## 1. GEO（地域最適化）

### 実施内容

| 項目 | 設定 | 目的 |
|------|------|------|
| **hreflang** | `ja`（日本） | 検索エンジンに日本語向けと明示 |
| **geo.region** | `JP` | 日本国内ターゲット |
| **lang 属性** | `lang="ja"` | 全ページで日本語指定 |
| **Google Search Console** | 国: 日本 | 地理ターゲット設定 |

### Google Ads 地理ターゲット

- **所在地**: 日本（都道府県・市区町村で細分化可能）
- **除外**: 海外 IP（重複排除）
- **言語**: 日本語

---

## 2. SEO（検索エンジン最適化）

### 2.1 技術 SEO

| 項目 | 状態 | 備考 |
|------|------|------|
| canonical | ✓ | 全ページ設定済み |
| sitemap.xml | ✓ | /sitemap.xml |
| robots.txt | ✓ | Allow all, Sitemap 指定 |
| meta description | ✓ | 各ページ 120〜160 文字 |
| Open Graph | △ | ブログ一部・HP 要強化 |
| Twitter Card | △ | 追加推奨 |
| Schema.org | ✓ | WebPage, Article, FAQPage |

### 2.2 キーワードマッピング（Top 12）

| キーワード | 優先ランディングページ | priority |
|------------|------------------------|----------|
| 高配当株 おすすめ 2026 | /blog/2026-kouhaitou-kabuka-ranking.html | 0.9 |
| NISA おすすめ銘柄 2026 | /blog/nisa-osusume-meigara-2026.html | 0.9 |
| 日経平均高配当株50 | /blog/nikkei-kouhaitou50-2026.html | 0.9 |
| 配当株 おすすめ 2026 | /blog/kabusui-osusume-2026.html | 0.9 |
| 株 推奨銘柄 無料 | /, /blog/kabushiki-suishou-meigara-muryou.html | 0.9 |
| 暴落銘柄・買い増し | /blog/2026-bouraku-meigara-buy-opportunity.html | 0.9 |

### 2.3 コンテンツ SEO

- **H1 にメインキーワード** を含める
- **内部リンク** で関連記事を強化
- **画像 alt** を適切に設定
- **ページ速度** 維持（SVG 軽量、CDN 利用）

---

## 3. SEM（検索連動型広告）

### 3.1 キャンペーン構成

| 種類 | 用途 | 予算目安 |
|------|------|----------|
| Search | 高意図キーワード | 日 3,000〜5,000 円 |
| Performance Max | オールチャネル・AI 最適化 | 日 5,000〜10,000 円 |
| Display（リターゲティング） | 離脱者への再接触 | 日 1,000〜2,000 円 |

### 3.2 コンバージョン設定

| コンバージョン | トリガー | 価値 |
|----------------|----------|------|
| LINE登録クリック | LINE ボタンクリック | 1 |
| 会話開始 | LINE 友だち追加完了（計測困難の場合はクリックで代替） | 1 |

### 3.3 ランディングページ最適化

- **ファーストビュー** に LINE CTA を配置
- **ファットヘッドキーワード** をタイトル・H1 に含める
- **信頼要素**: 32,000 人突破、元証券アナリスト、リスク開示
- **モバイルファースト**: スマホ比率高のため優先

### 3.4 トラッキングコード配置

- **Google Tag Manager** を全ページに配置
- **Google Ads コンバージョン** を GTM で発火
- **GA4** で流入元・行動分析

---

## 4. 実施チェックリスト

### 即時実施

- [x] hreflang / geo meta 追加（HP・ブログ）
- [x] Open Graph / Twitter Card 追加
- [x] sitemap lastmod 追加
- [ ] GTM 設定：site/gtm-head.html・gtm-body.html の GTM-XXXXXXX を実IDに置換し各ページに埋め込み
- [ ] Search Console：https://search.google.com/search-console で kouhaitou.jp を登録し sitemap 送信

### 継続実施

- [ ] 月 1〜2 本の新規 SEO 記事
- [ ] 週次 Search Console モニタリング
- [ ] 広告 CPA・CTR の週次レビュー
