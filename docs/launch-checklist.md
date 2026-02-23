# 上線チェックリスト（侘寂・渋い 2026）

## 即時実行

| 項目 | 操作 | 優先度 |
|------|------|--------|
| **GSC 送信** | 各地域LPを個別インデックス登録 + sitemap.xml 送信 | ★★★ |
| **地域 Schema** | 各ページに WebPage + areaServed 追加（済：Tokyo/Osaka/Aichi/Hokkaido） | ★★★ |
| **画像圧縮** | K線/テクスチャを TinyPNG で <80KB・WebP 化 | ★★★ |
| **Line OA** | 4地域（東京/大阪/愛知/北海道）公式アカウント・Rich Menu に地域紋理 | ★★★ |
| **速度最適化** | 画像 lazy-load + Cloudflare 日本エッジ | ★★ |
| **モバイル確認** | iPhone 13/14 + Android 実機で 5–6 屏内に中部LINE表示 | ★★ |

## 上線後

| タイミング | 項目 |
|------------|------|
| Day 3 | A/B テスト：Hero CTA A「今すぐ無料シグナルを受け取る」 vs B「[地域]株民限定　今すぐ登録」 |
| Day 7 | 7日モニタリングレポート記入（docs/monitoring-report-7days.md） |
| Day 15 | 「週間成績報告」モジュール追加検討 |
| Day 30 | 地域限定オンライン勉強会・Line グループ企画 |

## 参考

- 地域 LP 統一スニペット：`site/blog/_regional-unified-snippets.md`
- 47都道府県一括生成：`python scripts/generate_prefectures.py`
