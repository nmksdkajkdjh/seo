/**
 * Netlify Edge Function: 落地页地域化（最终升级版）
 * 多元素动态修改：标题 + Meta Description + CTA + Hero图片
 * 支持地区：东京/大阪/爱知/北海道/福冈/静冈/仙台/广岛
 * A/B测试 50% 显示地域化版本 | 智能缓存 | 优雅降级
 */
export default async (request, context) => {
  const url = new URL(request.url);

  if (!url.pathname.match(/^\/(index\.html)?$/)) {
    return context.next();
  }

  const geo = context.geo || {};
  const city = (geo.city || "").toLowerCase();
  const region = (geo.subdivision?.name || geo.subdivision?.code || "").toLowerCase();
  const subCode = (geo.subdivision?.code || "").toLowerCase();
  const country = geo.country?.code || "";

  if (country !== "JP") {
    return context.next();
  }

  // A/B测试：50% 概率显示地域化版本（便于转化率对比）
  const showLocalized = Math.random() < 0.5;

  let title = "なぜあなたの株は<br>上がらないのか？";
  let pageTitle = "日経平均高配当株50 2026｜おすすめ銘柄＆利回り公開無料LINE";
  let metaDesc =
    "2026年最新高配当株ランキングをプロが厳選。NISA対応・毎週無料レポートをLINE配信中。";
  let ogTitle = "日経平均高配当株50 2026｜おすすめ銘柄＆利回り公開無料LINE";
  let ctaText = "LINEで今すぐ無料登録する";
  let heroImage = "/images/2026-kouhaitou-kabuka-ranking-thumb.jpg"; // 全国版

  if (showLocalized) {
    if (
      city.includes("tokyo") ||
      city.includes("chiba") ||
      city.includes("saitama") ||
      city.includes("yokohama") ||
      city.includes("kanagawa") ||
      region.includes("tokyo") ||
      subCode.includes("13")
    ) {
      title = "東京の皆様へ｜2026年本当に強い高配当株をプロが厳選";
      pageTitle = "東京の皆様へ｜2026 高配当株 おすすめランキング｜プロ厳選無料";
      ogTitle = "東京の皆様へ｜2026 高配当株 おすすめランキング｜プロ厳選無料";
      metaDesc =
        "東京・首都圏在住の方へ。新NISA成長投資枠で狙うべき高配当株を無料でお届けします。";
      ctaText = "東京の皆様　今すぐLINE登録";
      heroImage = "/images/tokyo-kouhaitou-2026-thumb.jpg";
    } else if (
      city.includes("osaka") ||
      city.includes("kyoto") ||
      city.includes("kobe") ||
      city.includes("hyogo") ||
      region.includes("osaka") ||
      subCode.includes("27")
    ) {
      title = "大阪・関西の皆様へ｜2026年安定高配当株ランキング";
      pageTitle = "大阪・関西の皆様へ｜2026 利回り4.5%以上高配当株ランキング";
      ogTitle = "大阪・関西の皆様へ｜2026 利回り4.5%以上高配当株ランキング";
      metaDesc =
        "大阪・関西在住の方へ。利回り4.5%以上で長期保有に強い銘柄を厳選無料配信。";
      ctaText = "関西の皆様　今すぐ無料登録";
      heroImage = "/images/osaka-kouhaitou-2026-thumb.jpg";
    } else if (
      city.includes("nagoya") ||
      city.includes("aichi") ||
      region.includes("aichi") ||
      subCode.includes("23")
    ) {
      title = "愛知・名古屋の皆様へ｜2026年製造業投資家向け高配当株おすすめ";
      pageTitle = "愛知の皆様へ｜2026 製造業投資家向け高配当株おすすめ";
      ogTitle = "愛知の皆様へ｜2026 製造業投資家向け高配当株おすすめ";
      metaDesc =
        "愛知県民・製造業投資家の方へ。地元優良高配当株を中心に2026年おすすめを無料でお届け。";
      ctaText = "愛知の皆様　今すぐLINE登録";
      heroImage = "/images/aichi-kouhaitou-2026-thumb.jpg";
    } else if (
      city.includes("sapporo") ||
      city.includes("hokkaido") ||
      region.includes("hokkaido") ||
      subCode.includes("01")
    ) {
      title = "北海道の皆様へ｜2026年高配当株 おすすめランキング";
      pageTitle = "北海道の皆様へ｜2026 高配当株 おすすめランキング";
      ogTitle = pageTitle;
      metaDesc = "北海道在住の方へ。寒冷地でも強い安定高配当株をプロが厳選無料配信。";
      ctaText = "北海道の皆様　今すぐLINE登録";
      heroImage = "/images/hokkaido-kouhaitou-2026-thumb.svg";
    } else if (
      city.includes("fukuoka") ||
      region.includes("fukuoka") ||
      subCode.includes("40")
    ) {
      title = "福岡・九州の皆様へ｜2026年高配当株 おすすめランキング";
      pageTitle = "福岡・九州の皆様へ｜2026 高配当株 おすすめランキング";
      ogTitle = pageTitle;
      metaDesc = "福岡・九州在住の方へ。2026年本当に強い高配当株を無料でお届けします。";
      ctaText = "九州の皆様　今すぐ無料登録";
      heroImage = "/images/fukuoka-kouhaitou-2026-thumb.svg";
    } else if (
      city.includes("shizuoka") ||
      region.includes("shizuoka") ||
      subCode.includes("22")
    ) {
      title = "静岡の皆様へ｜2026年高配当株 おすすめランキング";
      pageTitle = "静岡の皆様へ｜2026 高配当株 おすすめランキング";
      ogTitle = pageTitle;
      metaDesc = "静岡在住の方へ。東海地方で狙うべき高配当株をプロ厳選無料配信。";
      ctaText = "静岡の皆様　今すぐLINE登録";
      heroImage = "/images/shizuoka-kouhaitou-2026-thumb.svg";
    } else if (
      city.includes("sendai") ||
      city.includes("miyagi") ||
      region.includes("miyagi") ||
      subCode.includes("04")
    ) {
      title = "仙台・東北の皆様へ｜2026年高配当株 おすすめランキング";
      pageTitle = "仙台・東北の皆様へ｜2026 高配当株 おすすめランキング";
      ogTitle = pageTitle;
      metaDesc = "仙台・東北在住の方へ。2026年安定配当の銘柄を無料でお届けします。";
      ctaText = "東北の皆様　今すぐLINE登録";
      heroImage = "/images/tokyo-kouhaitou-2026-thumb.jpg";
    } else if (
      city.includes("hiroshima") ||
      region.includes("hiroshima") ||
      subCode.includes("34")
    ) {
      title = "広島の皆様へ｜2026年高配当株 おすすめランキング";
      pageTitle = "広島の皆様へ｜2026 高配当株 おすすめランキング";
      ogTitle = pageTitle;
      metaDesc = "広島在住の方へ。2026年本当に強い高配当株をプロが厳選無料配信。";
      ctaText = "広島の皆様　今すぐLINE登録";
      heroImage = "/images/hiroshima-kouhaitou-2026-thumb.svg";
    }
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();
  const safeDesc = metaDesc.replace(/"/g, "&quot;");
  const safeOgTitle = (ogTitle || pageTitle).replace(/"/g, "&quot;");

  // 替换 <title>
  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${pageTitle.replace(/</g, "&lt;")}</title>`
  );

  // 替换 og:title, og:description
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${safeOgTitle}"`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${safeDesc}"`
  );

  // 替换 H1 标题
  html = html.replace(
    /<h1\s+id="geo-hero-title"[^>]*>[\s\S]*?<\/h1>/i,
    `<h1 id="geo-hero-title" class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">${title}</h1>`
  );

  // 替换 Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${safeDesc}"`
  );

  // 替换 Hero CTA 按钮
  html = html.replace(
    /<a\s+id="geo-cta-hero"[^>]*>[\s\S]*?<\/a>/i,
    (m) => m.replace(/>[^<]+</, `>${ctaText}<`)
  );

  // 替换主内容区 CTA 按钮
  html = html.replace(
    /<a\s+[^>]*id="line-add-btn"[^>]*>[\s\S]*?<\/a>/i,
    (m) => m.replace(/>[^<]+</, `>${ctaText}<`)
  );

  // 替换 Hero 背景图（overlay 效果）
  html = html.replace(
    /<img\s+id="geo-hero-image"[^>]*>/i,
    `<img id="geo-hero-image" src="${heroImage}" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" alt="" aria-hidden="true">`
  );

  const headers = new Headers(response.headers);
  headers.set(
    "Cache-Control",
    "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
  );

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
