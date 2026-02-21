# SEO / GEO / GTM 日本全国股民精准 Targeting

> kouhaitou.jp 向け。ターゲット：日本全国の個人投資家・株主・NISA利用者

---

## 1. SEO 施策（日本全国）

### メタ・構造化データ

| 項目 | 設定 |
|------|------|
| **geo.region** | JP |
| **geo.placename** | 日本 |
| **targeting** | 日本全国,個人投資家,株式投資,NISA,高配当株 |
| **Schema** | WebPage + audienceType: 日本全国の個人投資家 |
| **潜在アクション** | SubscribeAction（LINE追加） |

### 狙うキーワード

- 高配当株 おすすめ 2026
- NISA おすすめ銘柄
- 日経平均高配当株50
- 株 推奨銘柄 無料
- 個人投資家 銘柄
- 配当株 ランキング
- 株式投資 初心者

### 都道府県別ブログ（ロングテール）

- 東京、大阪、愛知 の地域記事でロングテール獲得
- sitemap.xml に全ページ登録済み

---

## 2. GEO 施策（Edge Function）

- **netlify/edge-functions/geo-title.js** が IP から地域判定
- 東京・大阪・愛知・北海道・福岡・静岡・仙台・広島 でタイトル・CTA・ヒーロー画像を切り替え
- A/B テスト：50% 地域版 / 50% 全国版
- 日本国外は全国版を表示

---

## 3. GTM 設置（Netlify Snippet Injection）

### 手順

1. [Google Tag Manager](https://tagmanager.google.com/) でコンテナ作成
2. Netlify 管理画面 → **Site configuration** → **Build & deploy** → **Post processing** → **Snippet injection**
3. **Head** に以下を追加（`GTM-XXXXXXX` を実際のIDに置換）：

```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

4. **Body (start of body)** に以下を追加：

```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### dataLayer（日本股民ターゲット用）

ページ読み込み後に以下を push すると、GA4 / 広告のオーディエンス判定に利用可能：

```javascript
dataLayer = dataLayer || [];
dataLayer.push({
  'page_category': 'stock_investment',
  'audience': 'japan_individual_investors',
  'target_region': 'japan_nationwide',
  'content_type': 'high_dividend_stocks',
  'event': 'page_view_targeting'
});
```

### 推奨タグ

| タグ | 用途 |
|------|------|
| Google Analytics 4 | 行動分析 |
| Google Ads コンバージョン | LINE登録（クリック） |
| カスタムイベント | LINEボタンクリック、スクロール深度 |
| オーディエンス | 投資関心・35–64歳・日本 |

### コンバージョン設定

- **LINE登録ボタン クリック**：`id="geo-cta-hero"` または `id="line-add-btn"` のクリックをトリガー
- **GTM トリガー**：Click - All Elements、条件で `id` または `href` に `line.me` を含む

---

## 4. Google Ads オーディエンス

| 設定 | 推奨 |
|------|------|
| **地理** | 日本（全国） |
| **言語** | 日本語 |
| **カスタムインテント** | 高配当株, NISA, 日経平均, 配当, 投資, 銘柄 |
| **イン・マーケット** | 投資・金融サービス |
| **年齢** | 35–64 |
| **類似オーディエンス** | サイト訪問者・LINE登録者 |

---

## 5. 実装済み項目

| 項目 | 状態 |
|------|------|
| keywords meta | ✅ index, blog |
| geo.placename, targeting | ✅ 全ページ |
| WebSite + SearchAction Schema | ✅ サイト内検索対応 |
| dataLayer（page_category等） | ✅ index, blog |
| LINEクリック dataLayer イベント | ✅ line_register_click |
| GEO: title, og:title, og:description, meta description | ✅ 8地域対応 |

## 6. チェックリスト

- [ ] GTM コンテナIDを Snippet Injection に設定
- [ ] GA4 プロパティ作成・GTMでタグ設定
- [ ] Google Ads コンバージョン（LINEクリック）設定
- [ ] オーディエンス「日本・投資関心・35–64」作成
- [ ] Search Console で kouhaitou.jp 登録
- [ ] sitemap.xml 送信
- [ ] 構造化データテスト（Google検索コンソール）でエラーなし確認
