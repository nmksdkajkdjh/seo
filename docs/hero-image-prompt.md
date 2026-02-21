# Hero 背景图 AI 生成 Prompt（kouhaitou.jp）

> 用于 Grok Imagine / Midjourney / Flux / DALL·E 等 AI 图像生成

---

## 1. 最佳 Prompt（Grok / Midjourney / Flux 通用）

```
A professional, clean, modern Japanese stock market website hero banner, dark blue gradient background (#1a3c6e to #2d5a9e), subtle rising stock chart lines in green and white, Tokyo skyline silhouette at the bottom, soft bokeh light effects, high-end financial atmosphere, Japanese text "なぜあなたの株は上がらないのか？" in elegant white font at center, professional investment vibe, ultra clean composition, cinematic lighting, 16:9 aspect ratio, 1920x1080 resolution, realistic but modern style, no people, no clutter --ar 16:9 --v 6 --q 2
```

**注意**：`--ar 16:9 --v 6 --q 2` 为 Midjourney 参数，其他工具可删除。

---

## 2. 备用简版 Prompt（更快出图）

```
Japanese financial website hero image, dark blue professional background, rising green stock chart overlay, subtle Tokyo night skyline, clean modern design, white Japanese text "高配当株・NISAおすすめ銘柄" in center, high-end investment feel, 1920x1080
```

---

## 3. 风格变体

### A. 简约金融风
```
Stock market hero image, abstract candlestick chart in blue and green on dark navy background, subtle grid lines, professional finance website header, 1920x1080, clean minimalist design, no text
```

### B. 东京都市风
```
Tokyo financial district at dusk, skyscrapers with blue light, stock exchange building, professional investor aesthetic, wide cinematic shot, 1920x1080, dark moody atmosphere
```

### C. 数据可视化风
```
Abstract financial data visualization, rising bar chart and line graph, dark blue #1a3c6e background, green accent highlights, professional investment platform aesthetic, 1920x1080
```

---

## 4. 图片规格

| 项目 | 建议值 |
|------|--------|
| 尺寸 | 1920×1080 |
| 比例 | 16:9 |
| 格式 | JPG（优化后 < 300KB） |
| 保存路径 | `site/images/hero-main.jpg` |

---

## 5. 使用说明

1. 复制上述 Prompt 到 AI 工具生成
2. 将生成图片命名为 `hero-main.jpg`
3. 放入 `site/images/` 目录
4. 首页 Hero 会自动使用（CSS 已配置）
5. 无图时自动回退到蓝色渐变背景
