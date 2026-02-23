#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
47都道府県の地域LP一括生成
母版：site/blog/tokyo-kouhaitou-2026.html
出力：site/blog/{slug}-kouhaitou-2026.html
※ 東京・大阪・愛知・北海道は既存のためスキップ
※ regional-textures.css に tex-{slug} がない地域は tex-tokyo でフォールバック
"""
import os
import re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE = os.path.join(BASE, "site", "blog", "tokyo-kouhaitou-2026.html")
OUTPUT_DIR = os.path.join(BASE, "site", "blog")

# 47都道府県（日文名, slug, Schema用英文名, geo.region）
# 東京・大阪・愛知・北海道はスキップ
PREFECTURES = [
    ("北海道", "hokkaido", "Hokkaido", "JP-01"),
    ("青森県", "aomori", "Aomori", "JP-02"),
    ("岩手県", "iwate", "Iwate", "JP-03"),
    ("宮城県", "miyagi", "Miyagi", "JP-04"),
    ("秋田県", "akita", "Akita", "JP-05"),
    ("山形県", "yamagata", "Yamagata", "JP-06"),
    ("福島県", "fukushima", "Fukushima", "JP-07"),
    ("茨城県", "ibaraki", "Ibaraki", "JP-08"),
    ("栃木県", "tochigi", "Tochigi", "JP-09"),
    ("群馬県", "gunma", "Gunma", "JP-10"),
    ("埼玉県", "saitama", "Saitama", "JP-11"),
    ("千葉県", "chiba", "Chiba", "JP-12"),
    ("東京都", "tokyo", "Tokyo", "JP-13"),
    ("神奈川県", "kanagawa", "Kanagawa", "JP-14"),
    ("新潟県", "niigata", "Niigata", "JP-15"),
    ("富山県", "toyama", "Toyama", "JP-16"),
    ("石川県", "ishikawa", "Ishikawa", "JP-17"),
    ("福井県", "fukui", "Fukui", "JP-18"),
    ("山梨県", "yamanashi", "Yamanashi", "JP-19"),
    ("長野県", "nagano", "Nagano", "JP-20"),
    ("岐阜県", "gifu", "Gifu", "JP-21"),
    ("静岡県", "shizuoka", "Shizuoka", "JP-22"),
    ("愛知県", "aichi", "Aichi", "JP-23"),
    ("三重県", "mie", "Mie", "JP-24"),
    ("滋賀県", "shiga", "Shiga", "JP-25"),
    ("京都府", "kyoto", "Kyoto", "JP-26"),
    ("大阪府", "osaka", "Osaka", "JP-27"),
    ("兵庫県", "hyogo", "Hyogo", "JP-28"),
    ("奈良県", "nara", "Nara", "JP-29"),
    ("和歌山県", "wakayama", "Wakayama", "JP-30"),
    ("鳥取県", "tottori", "Tottori", "JP-31"),
    ("島根県", "shimane", "Shimane", "JP-32"),
    ("岡山県", "okayama", "Okayama", "JP-33"),
    ("広島県", "hiroshima", "Hiroshima", "JP-34"),
    ("山口県", "yamaguchi", "Yamaguchi", "JP-35"),
    ("徳島県", "tokushima", "Tokushima", "JP-36"),
    ("香川県", "kagawa", "Kagawa", "JP-37"),
    ("愛媛県", "ehime", "Ehime", "JP-38"),
    ("高知県", "kochi", "Kochi", "JP-39"),
    ("福岡県", "fukuoka", "Fukuoka", "JP-40"),
    ("佐賀県", "saga", "Saga", "JP-41"),
    ("長崎県", "nagasaki", "Nagasaki", "JP-42"),
    ("熊本県", "kumamoto", "Kumamoto", "JP-43"),
    ("大分県", "oita", "Oita", "JP-44"),
    ("宮崎県", "miyazaki", "Miyazaki", "JP-45"),
    ("鹿児島県", "kagoshima", "Kagoshima", "JP-46"),
    ("沖縄県", "okinawa", "Okinawa", "JP-47"),
]

SKIP = {"tokyo", "osaka", "aichi", "hokkaido"}
HAS_TEXTURE = {"tokyo", "osaka", "aichi", "hokkaido"}


def main():
    if not os.path.exists(TEMPLATE):
        print(f"❌ 母版不存在: {TEMPLATE}")
        return

    with open(TEMPLATE, "r", encoding="utf-8") as f:
        template = f.read()

    count = 0
    for name_ja, slug, name_en, region in PREFECTURES:
        if slug in SKIP:
            continue

        content = template

        # 短縮形（タイトル用：東京都→東京、大阪府→大阪）
        short = re.sub(r"[都道府県]$", "", name_ja)

        # 替换地域变量
        content = content.replace("tokyo-kouhaitou-2026.html", f"{slug}-kouhaitou-2026.html")
        content = content.replace("tokyo-kouhaitou-2026-thumb", f"{slug}-kouhaitou-2026-thumb")
        content = content.replace('"name":"東京都"', f'"name":"{name_ja}"')
        content = content.replace("JP-13", region)
        content = content.replace("東京で今買うべき", f"{short}で今買うべき")
        content = content.replace("東京の投資家向け", f"{name_ja}の投資家向け")
        content = content.replace("東京・首都圏", short)
        content = content.replace("東京都", name_ja)
        content = content.replace('">東京<', f'">{short}<')  # Breadcrumb

        # 纹理：Tier1のみ専用、他は tex-tokyo でフォールバック
        tex_class = f"tex-{slug}" if slug in HAS_TEXTURE else "tex-tokyo"
        content = content.replace('class="tex-tokyo ', f'class="{tex_class} ')

        # canonical / og:url 等
        content = re.sub(
            r'https://kouhaitou\.jp/blog/tokyo-kouhaitou-2026\.html',
            f'https://kouhaitou.jp/blog/{slug}-kouhaitou-2026.html',
            content
        )

        out_path = os.path.join(OUTPUT_DIR, f"{slug}-kouhaitou-2026.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(content)

        count += 1
        print(f"✅ {out_path}")

    print(f"\n生成完成：{count} 個新地域頁面（東京・大阪・愛知・北海道はスキップ）")


if __name__ == "__main__":
    main()
