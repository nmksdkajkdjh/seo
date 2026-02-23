# Hero 图片设计需求（kouhaitou.jp）

> 首页 Hero 区背景图设计规范，供设计师或 AI 图像生成参考

---

## 1. 技术规格

| 项目 | 规格 |
|------|------|
| **尺寸** | 1920×1080 px |
| **比例** | 16:9 |
| **格式** | JPG（优化后建议 < 300KB） |
| **保存路径** | `site/images/hero-main-1.jpg`、`hero-main-2.jpg`（轮播 2 张） |
| **显示区域** | 视口全宽，高度约 460–480px（移动端/桌面端） |

---

## 2. 布局与安全区

Hero 区有文字叠加层，设计时需考虑以下区域：

```
┌─────────────────────────────────────────────────────────┐
│ [季節条幅 28px]                                          │
│ ┌──────────────────────┐                                │
│ │ 登録者バッジ          │     ← 左侧：主要文字区          │
│ │ H1: なぜあなたの株は  │       (约 50% 宽度)             │
│ │ 上がらないのか？      │                                │
│ │ 副文案 + LINE 強調    │     ┌─────────────┐            │
│ │ [LINE 登録 CTA]       │     │ 日経/TOPIX   │ ← 右下角   │
│ └──────────────────────┘     │ 行情框       │            │
│                              └─────────────┘            │
└─────────────────────────────────────────────────────────┘
```

- **左侧 0–50% 宽度**：有深色渐变遮罩 + 白色文字，图片此区域应偏暗、低对比，避免干扰可读性
- **右侧 50–100%**：可保留更多细节或亮度，但会有整体渐变叠加以统一色调
- **右下角**：有行情小框，不宜放置过于抢眼元素

---

## 3. 色彩与风格

### 站点主色（需协调）

| 色名 | HEX | 用途 |
|------|-----|------|
| 茶色 tea | #4A3C35 | 品牌主色、渐变之一 |
| 深蓝 navy | #002a52, #001F3F | Hero 渐变、金融感 |
| 炭灰 charcoal | #2F2F2F | 文字、边框 |
| LINE 绿 | #00B900 | CTA 按钮、强调 |
| 金色 gold | #BFA46F | 点缀 |
| 米色 rice | #FAF7F2 | 页面背景 |

### 叠加层说明

Hero 实际显示效果 = 图片 + 以下 CSS 叠加：

1. 左侧线性渐变：`rgba(0,31,63,0.88)` → `rgba(0,31,63,0.6)` → 透明
2. 整体 135° 渐变：`#4A3C35` → `#002a52` → `#4A3C35`

因此原图建议：
- 偏冷色（蓝、灰、深绿）或中性，便于与茶色/深蓝叠加融合
- 避免大面积纯红、纯黄等高饱和暖色，易与文字和 CTA 冲突

---

## 4. 内容与意境

### 推荐方向

- 日本股市 / 东京金融街意象（远景、剪影）
- 抽象 K 线或上升曲线，低对比度
- 和风元素： subtle 竹影、和纸质感、淡雅线条
- 专业、可信、不浮夸的金融氛围

### 避免

- 人脸特写、明显品牌 logo
- 高对比度或杂乱图案干扰文字
- 与「高配当株」「NISA」「LINE」无关的强商业感
- 过亮或纯白大块区域（影响文字可读性）

---

## 5. AI 生成 Prompt 示例

### 主推（Grok / Midjourney / Flux）

```
Professional Japanese stock investment website hero image, dark blue and warm brown gradient undertone (#4A3C35, #002a52), subtle rising chart lines or Tokyo skyline silhouette, low contrast left side for text overlay, soft bokeh, clean minimalist finance aesthetic, no people, no text in image, 1920x1080, 16:9, modern and trustworthy
```

### 简约金融风

```
Abstract stock chart lines in soft blue and green on dark navy background, subtle grid, professional investment header, left side darker for overlay text, 1920x1080, minimal
```

### 东京都市风

```
Tokyo financial district dusk, skyscrapers blue lighting, stock exchange vibe, wide cinematic, left side shadow for text overlay, 1920x1080, moody professional
```

---

## 6. 交付检查

- [ ] 尺寸 1920×1080
- [ ] 格式 JPG，体积 < 300KB
- [ ] 左侧区域偏暗、适合白色文字叠加
- [ ] 色彩与 #4A3C35、#002a52 可自然融合
- [ ] 文件名 `hero-main.jpg`，放入 `site/images/`

---

## 7. 使用说明

- 首页 Hero 使用 `hero-main-1.jpg` 与 `hero-main-2.jpg` 轮播（约 12 秒切换）
- 替换图片后自动生效，请保持两张图风格与色彩一致
- 若无图片或加载失败，将回退为纯渐变背景
