# AI 智能导诊 · 设计规范 (Design System)

> 基于 `app/products/ai-triage/page.tsx` 整理，定义 AI 导诊产品页面的视觉语言、交互模式与背景体系。
> 与全局 `DESIGN_SYSTEM.md` 互补：本文件聚焦"紫色调、高密度动效、滚动驱动"的页面专属规范。

---

## 0. 页面结构总览

页面由 **9 个垂直区块** + 顶部 Header + 底部 CTA + Footer 组成：

| # | 区块 | 类型 | 关键交互 | 背景色 |
|---|------|------|----------|--------|
| 0 | Header | 透明导航 | 滚动时变白/变黑 | 透明 |
| 1 | **Hero** | 主视觉 + 数据栏 | 渐入入场 | `#F4F5F7/50` 浅；视频+遮罩 深 |
| 2 | **PainPointsSection** | 滚动驱动分镜 | 滚动 step 推进；点击/键盘切换 | `#F4F5F7/50` + 三层径向光晕 |
| 3 | **HowItWorksSection** | 8 步 sticky stack | 滚动 8 屏进度驱动 | `#fafafa` 浅；`#03040a` 深 |
| 4 | **FeaturesSection** | 9 项手风琴 | 单项展开/折叠 | 白色 浅；透明 深 |
| 5 | **ScenariosSection** | 卡片堆叠 + 自动轮播 | 滚动锁定 + RAF 轮播 | `#F8F8F8` 浅；透明 深 |
| 6 | **ValueSection** | 数据对比表 | 交错入场 | 白色 浅；透明 深 |
| 7 | **ComparisonSection** | 9 行手风琴 | 单项展开 | `#F8F8F8` 浅；透明 深 |
| 8 | **FaqSection** | 5 项手风琴 | 单项展开 | 白色 浅；透明 深 |
| 9 | **CTA** | 行动号召 | 静态 + GradientBlinds 背景 | `#0a0a0a`（黑）+ 紫色 blinds |

---

## 1. 色彩体系（页面专属）

本页面采用 **紫色品牌色 + 蓝色点缀** 的双轴体系，与全局"蓝色单一品牌色"形成差异化。

### 1.1 品牌主色：紫色（Indigo）

| 名称 | 色值 | 用途 |
|------|------|------|
| 紫色主色 | `#6366f1` | 关键数字、对比表 AI 列标题、列表项强调 |
| 紫色深 | `#4f46e5` | 暗色模式下的光晕 |
| 紫色中 | `#8b5cf6` | Hero 暗色光晕中间色 |
| 紫色浅 | `#a78bfa` | Hero 暗色光晕边缘色 |
| 紫色文字 | `#6366f1` | 数据对比值、勾选标签 |

### 1.2 蓝色点缀（继承全局）

| 名称 | 色值 | 用途 |
|------|------|------|
| 蓝主 | `#577FFF` | Section Label 描边、Hero 按钮渐变 |
| 蓝浅 | `#52A5FF` | 文字强调、暗色光晕 |
| 蓝深 | `#3b6ef0` | "HOW IT WORKS" 标签文字 |
| 蓝背景 | `#EDF3FF` / `#577FFF/10` | 标签背景 |

### 1.3 背景色板

| 名称 | 色值 | 用途 |
|------|------|------|
| 页面浅底 | `#F4F5F7/50` | Hero、PainPoints（带光晕） |
| 区域浅底 | `#fafafa` | HowItWorks 区块 |
| 卡片浅底 | `#F8F8F8` | Scenarios、Comparison |
| 纯白卡片 | `bg-white` | Features、Value、FAQ |
| 深色底 | `#03040a` | 深色模式主背景 |
| 深色卡片 | `#0a0a0a` | HowItWorks 图卡 |

### 1.4 光晕色（紫蓝双轨）

```tsx
// Hero 深色光晕（左下、中、右下三色径向 + 模糊圆）
"radial-gradient(ellipse_at_18%_90%,rgba(99,102,241,0.21)_0%,transparent_55%),
 radial-gradient(ellipse_at_50%_85%,rgba(139,92,246,0.17)_0%,transparent_50%),
 radial-gradient(ellipse_at_82%_90%,rgba(79,70,229,0.23)_0%,transparent_55%)"

// Hero 浅色光晕（左上、中上、左中三色径向 + 模糊圆）
"absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#c4d9ff]/40 blur-[100px]"
"absolute right-[-5%] top-[20%] h-[480px] w-[480px] rounded-full bg-[#a5c4ff]/45 blur-[110px]"
"absolute bottom-[-10%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#d6e4ff]/35 blur-[90px]"
```

---

## 2. 字体与排版

继承全局字号梯度；本页面 **新增数字专用字体**：

### 2.1 数字字体（来自 Google Fonts：`Barlow Condensed`）

```tsx
className="font-['Barlow_Condensed'] text-[28px] font-medium"
```

使用场景：
- Features 序号 `01-09`（`text-[28px]` → `sm:text-[32px]`，`font-medium`，`text-neutral-300` 浅 / `text-white/20` 深）
- Features 能力名（`text-[22px]` → `sm:text-[26px]`，`font-medium`，深色）
- Value 关键数字（`text-[40px]`，`font-medium`，`tracking-[-0.04em]`，`text-[#6366f1]`）
- FAQ 序号 `01-05`（`text-[14px]`，`font-medium`，`text-neutral-400`）
- HowItWorks 大数字（`text-stroke-themed`：`clamp(96px, 12vw, 190px)`，`line-height: 0.85`）

### 2.2 描边数字（HowItWorks 步骤编号）

```css
.text-stroke-themed {
  -webkit-text-stroke: 1.5px #0a0a0a !important;
  color: transparent;
}
:where(.dark) .text-stroke-themed {
  -webkit-text-stroke: 1.5px #fafafa !important;
}
```

### 2.3 排版规范

| 场景 | 类名 |
|------|------|
| 章节大标题 | `text-[36px] font-semibold tracking-tight sm:text-[40px]` |
| Hero 主标题 | `text-3xl font-semibold leading-tight tracking-tight sm:text-4xl` |
| 章节小标签 | `text-xs font-medium uppercase tracking-[0.1em] text-[#3b6ef0]` |
| 步骤副标签 | `text-xs font-medium uppercase tracking-[0.16em] text-neutral-500` |
| 正文 | `text-sm leading-[1.95] sm:text-base` |
| FAQ 序号 | `text-[14px] font-medium text-neutral-400` |
| 引言/总述 | `text-[16px] text-neutral-600 dark:text-neutral-400` |

---

## 3. 间距与布局

### 3.1 区块间距

| 类型 | 间距 | Tailwind |
|------|------|----------|
| 大区块纵向 | `100px` | `py-[100px]` |
| 标题区上下 | `100px / 60px` | `pt-[100px] pb-[60px]` |
| 容器内 padding | `16 / 24 / 32 px` | `px-4 sm:px-6 lg:px-8` |
| 卡片横向 padding | `24 / 32 px` | `px-6 sm:px-8` |

### 3.2 容器宽度

- 主容器：`max-w-[1200px]`
- Hero 内容：`max-w-[900px]`
- Value 数字列：`max-w-3xl`

### 3.3 卡片尺寸

| 元素 | 尺寸 |
|------|------|
| Scenarios 卡片 | `280×380 px`（`CARD_W=280, CARD_H=380`） |
| Scenarios 容器高度 | `380 px` |
| Scenarios 间距 | `14 px`（`GAP=14`） |
| PainPoints 图卡 | `600×700 px`（桌面）/ `360px` 宽（移动） |

### 3.4 Section Label 高度

```tsx
className="rounded-full px-3 py-1 text-xs tracking-wide"
// 或
className="rounded-full border px-3 py-1 text-[12px] tracking-wide"
```

---

## 4. 圆角与边框

继承全局圆角梯度，本页面 **高频使用** `rounded-3xl` 与 `rounded-full`。

| 元素 | 圆角 | Tailwind |
|------|------|----------|
| 区块大容器 | `24px` | `rounded-3xl` |
| Section Label | `9999px` | `rounded-full` |
| 数据栏 | `16px` | `rounded-2xl` |
| 步骤图片卡 | `20px` | `rounded-[20px]` |
| Scenarios 卡片 | `18px` | `rounded-[18px]` |
| PainPoints 图卡 | `20px` | `border-radius: 20px` |
| Hero 胶囊标签 | `9999px` | `rounded-full` |

边框色：

```tsx
"border border-neutral-200"          // 浅色卡片
"dark:border-white/10"               // 深色卡片
"border border-[#577FFF]/40"         // 深底标签
"border border-white/60"             // Hero 数据栏
```

---

## 5. 阴影体系

本页面阴影分三档，对应不同的视觉层级。

### 5.1 浅色模式阴影

| 用途 | 阴影值 |
|------|--------|
| 数据栏 | `shadow-[0_4px_20px_rgba(87,127,255,0.08)]` |
| 步骤图片 | `shadow-[0_8px_30px_rgba(15,23,42,0.06)]` |
| 区块容器 | `shadow-[0_10px_40px_rgba(15,23,42,0.06)]` |
| Scenarios 卡片 | `shadow-[0_18px_40px_rgba(15,23,42,0.18)]` |
| PainPoints 图卡 | `box-shadow: 0 0 24px rgba(0,0,0,0.06)` |

### 5.2 深色模式阴影

| 用途 | 阴影值 |
|------|--------|
| 数据栏 | `shadow-[0_0_24px_rgba(0,0,0,0.28)]` |
| Scenarios 卡片 | `shadow-[0_18px_50px_rgba(0,0,0,0.6)]` |
| PainPoints 图卡 | `box-shadow: 0 0 28px rgba(0,0,0,0.28)` |

---

## 6. 动效与交互系统 ⭐

本页面是项目里动效最复杂的一页，定义 **5 类核心交互模式**。

### 6.1 Hero 入场动画（级联渐入）

```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: <index> * 0.05 }}
/>
```

四元素级联：
- `delay: 0` — 顶部胶囊标签
- `delay: 0.05` — 主标题
- `delay: 0.1` — 副标题
- `delay: 0.15` — 双 CTA 按钮
- `delay: 0.2` — 数据栏（`y: 20`，`duration: 0.55`）

### 6.2 数字滚动动画（CountUp）

继承自 `components/blocks/stats-10.tsx`：

```tsx
<CountUp to={item.value} format={item.format} />
```

实现要点：
- `useInView` 触发，`once: true`，`margin: "-40px"`
- `animate(0, to, { duration: 2.4, ease: [0.33, 1, 0.68, 1] })`
- **关键**：传入的 `format` 函数必须用 `useMemo` 稳定，否则触发无限渲染

### 6.3 滚动驱动 · Sticky Stack（HowItWorks）

**机制**：8 张卡片，每张 `position: sticky; top: 0; height: 100svh`，通过 z-index 堆叠。

```tsx
const update = () => {
  const vh = window.innerHeight;
  const top = stack.getBoundingClientRect().top;
  const n = 8;

  for (let k = 0; k < n; k++) {
    const inner = stack.querySelector(`[data-card="${k}"] .card-inner`);
    const p = Math.max(0, Math.min(1, (-top - k * vh) / vh));

    if (k < n - 1) {
      // 上层卡片：轻微下移并缩小
      inner.style.transform = `translateY(${-p * 4}%) scale(${1 - p * 0.05})`;
    } else {
      // 顶层卡片：从下方 4% 进入
      inner.style.transform = `translateY(${(1 - p) * 4}%)`;
    }
  }
};

window.addEventListener("scroll", onScroll, { passive: true });
```

参数：
- `rAF` 节流（`ticking` 标志位）
- 监听 `prefers-reduced-motion` 自动跳过
- 总高度：`calc(100svh * 8)` = 8 屏

### 6.4 滚动驱动 · 痛点分镜（PainPoints）

**机制**：画布 `position: sticky; top: 0; height: 100vh`，外层 `.pps-stage` 总高 `150vh`，滚动 50vh 内 step 推进。

```ts
function computeStep() {
  const r = stage.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const LOCK_VH = vh * 0.5;

  if (r.top > 0) return -1;  // 标题区
  const offset = -r.top;
  const p = Math.min(1, offset / LOCK_VH);
  return Math.min(TOTAL, Math.floor(p * (TOTAL + 1)));
}
```

每 step 行为：
- **激活态** (`active`)：图片 bottom `-32% → 0`，scale `0.85 → 1`
- **推出态** (`pushed`)：图片 bottom `46%`，scale `0.82`
- **未激活**：opacity `0.45`
- 列表展开用 `grid-template-rows: 0fr → 1fr`，时长 `0.45s`

键盘可达：
- `↓` / `PageDown` → 下一步
- `↑` / `PageUp` → 上一步
- Tab → 进入列表项，`focus` 同步 step
- Click → 直接跳转

### 6.5 滚动锁定 · 卡片堆叠（Scenarios）

**机制**：容器 `height: 400vh`，内部 `sticky top: 0` 画布。`wheel` 事件拦截，手动 `scrollTo`。

```ts
const onWheel = (e: WheelEvent) => {
  if (!lockedRef.current) return;
  e.preventDefault();
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const triggerLine = vh * 0.5;
  const total = el.offsetHeight - vh;
  const current = triggerLine - rect.top;
  const next = Math.min(total, Math.max(0, current + e.deltaY));
  const targetY = window.scrollY + (next - current);
  window.scrollTo({ top: targetY, behavior: "instant" });
};
window.addEventListener("wheel", onWheel, { passive: false });
```

卡片状态由 `progress (0~1)` 计算：
- `progress = 0`：`x = 0, scale = 0.55`（堆叠）
- `progress = 1`：`x = finalX[i] * scale, scale = 0.55 + 0.45 = 1`（展开）
- 公式：`x0 = (finalX[i] - panOffset) * t`

**自动轮播**（progress ≥ 0.95 触发）：
```ts
const speed = 0.04; // px/ms
const cycle = (6 * 280 + 5 * 14 + 14) * scale;
const step = (ts: number) => {
  panOffsetRef.current = (panOffsetRef.current + speed * dt) % cycle;
  setPanKey((k) => k + 1);  // 触发 re-render
  raf = requestAnimationFrame(step);
};
```

两组卡片（`0-${i}` 与 `1-${i}`）形成无缝循环，第二组复制位移 `copyShift = (totalWidth + GAP) * scale`。

### 6.6 手风琴展开（Features / Comparison / FAQ）

统一模式，单项展开：

```tsx
const [open, setOpen] = useState<number | null>(null);

// 容器
<AnimatePresence>
  {open === i && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    />
  )}
</AnimatePresence>

// 图标翻转
<AnimatePresence mode="wait">
  {open === i ? (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 45 }}  // + 变成 ×
      exit={{ rotate: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Plus />
    </motion.div>
  ) : (
    <Plus />
  )}
</AnimatePresence>
```

行内状态色：
- 激活：`bg-neutral-50 dark:bg-white/5`
- 悬停：`hover:bg-neutral-50 dark:hover:bg-white/5`

### 6.7 Value 表格交错入场

```tsx
{rows.map((row, i) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: i * 0.06 }}  // 60ms 错峰
  />
))}
```

---

## 7. 背景系统 ⭐

页面有 **5 类背景**，按区块分布：

### 7.1 Hero · 双层光晕 + 视频

```tsx
<section className="bg-[#F4F5F7]/50 pt-[120px] pb-[90px] dark:bg-transparent">
  {/* 深色模式视频背景（only dark mode） */}
  <video autoPlay muted loop playsInline className="hero-video">
    <source src="/img/products/ai-triage/hero-bg.mov" type="video/mp4" />
  </video>
  <div className="hero-video-overlay" />

  {/* 浅色三色径向 + 模糊圆 */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#c4d9ff]/40 blur-[100px] dark:bg-[#577FFF]/20" />
    <div className="absolute right-[-5%] top-[20%] h-[480px] w-[480px] rounded-full bg-[#a5c4ff]/45 blur-[110px] dark:bg-[#52A5FF]/15" />
    <div className="absolute bottom-[-10%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#d6e4ff]/35 blur-[90px] dark:bg-[#3B82F6]/10" />
  </div>
</section>
```

视频遮罩（仅深色显示，定义在 `globals.css`）：

```css
.hero-video {
  position: absolute; inset: 0; width: 100%;
  display: none;
}
.hero-video-overlay {
  position: absolute; inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
}
.dark .hero-video,
.dark .hero-video-overlay { display: block; }
```

### 7.2 全局 · 紫色 ambient glow（fixed）

固定在视口底部，深色模式专属：

```tsx
<div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[55vh] dark:block">
  {/* 三层径向渐变 */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_90%,rgba(99,102,241,0.21)_0%,transparent_55%),radial-gradient(ellipse_at_50%_85%,rgba(139,92,246,0.17)_0%,transparent_50%),radial-gradient(ellipse_at_82%_90%,rgba(79,70,229,0.23)_0%,transparent_55%)]" />
  {/* 三个高斯模糊圆 */}
  <div className="absolute -left-[10%] bottom-[-10%] h-[280px] w-[380px] rounded-full bg-[#6366f1]/18 blur-[110px]" />
  <div className="absolute left-[35%] bottom-[-15%] h-[240px] w-[420px] rounded-full bg-[#8b5cf6]/15 blur-[120px]" />
  <div className="absolute -right-[8%] bottom-[-8%] h-[300px] w-[400px] rounded-full bg-[#4f46e5]/19 blur-[110px]" />
</div>
```

### 7.3 PainPoints · 三色径向光晕

```css
.pps-glow-a { background: rgba(196, 217, 255, 0.40); }  /* 蓝 */
.pps-glow-b { background: rgba(165, 196, 255, 0.45); }  /* 中 */
.pps-glow-c { background: rgba(214, 228, 255, 0.35); }  /* 浅 */
:where(.dark) .pps-glow-a { background: rgba(87, 127, 255, 0.20); }
:where(.dark) .pps-glow-b { background: rgba(82, 165, 255, 0.15); }
:where(.dark) .pps-glow-c { background: rgba(59, 130, 246, 0.10); }
```

三个圆 `420×420 / 480×480 / 360×360`，模糊 `100px`。

### 7.4 HowItWorks · 极简纯色 + 描边数字

```tsx
<section className="bg-[#fafafa] dark:bg-[#03040a]">
  {/* 卡片背景靠 sticky 堆叠体现 */}
</section>
```

数字用 `text-stroke-themed`（透明填充 + 1.5px 描边）。

### 7.5 CTA · GradientBlinds（WebGL）

WebGL 渲染的渐变百叶窗，深色背景专用。

```tsx
const CTA_GRADIENT_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa"];

<section className="bg-neutral-950 py-[120px]">
  <div className="absolute inset-0">
    <GradientBlinds
      dpr={1}
      gradientColors={CTA_GRADIENT_COLORS}
      angle={18}
      noise={0.22}
      blindCount={18}
      blindMinWidth={56}
      spotlightRadius={0.55}
      spotlightSoftness={1.1}
      spotlightOpacity={0.85}
      distortAmount={0.35}
      shineDirection="left"
      mixBlendMode="normal"
    />
    <div className="pointer-events-none absolute inset-0 bg-neutral-950/45" />
  </div>
  <div className="relative z-10">
    {/* 文案 */}
  </div>
</section>
```

参数说明：
- `angle: 18` — 百叶窗倾斜角
- `noise: 0.22` — 颗粒噪声
- `blindCount: 18` — 叶片数量
- `distortAmount: 0.35` — 扭曲强度
- `shineDirection: "left"` — 高光方向
- 上方叠加 `bg-neutral-950/45` 蒙版保证文字可读

---

## 8. 组件使用清单

| 组件 | 路径 | 在本页面使用次数 | 说明 |
|------|------|------------------|------|
| `Header` | `components/header.tsx` | 1 | 透明导航 |
| `BackToTop` | `components/back-to-top.tsx` | 1 | 右下回到顶部 |
| `ThemeSwitch` | `components/theme-switch.tsx` | 1 | 明暗切换 |
| `OutlineCtaLink` | `components/outline-cta.tsx` | 1 | Hero 次按钮 |
| `CountUp` | `components/blocks/stats-10.tsx` | 4 | 数字滚动 |
| `GradientBlinds` | `components/GradientBlinds/GradientBlinds.jsx` | 1 | CTA 背景 |
| `PainPointsSection` | `components/blocks/pain-points-section.tsx` | 1 | 痛点分镜 |
| `SectionLabel` | `components/blocks/section-label.tsx` | 6 | 章节小标签 |

---

## 9. 数据结构

### 9.1 步骤（Steps · 8 项）

```ts
type Step = {
  num: string;       // "01" - "08"
  tag: string;       // 章节短标签，用于图片文件名
  title: string;     // 步骤标题
  desc: string;      // 步骤描述（1-2 句）
  meta: string;      // 底部 meta 标签，用 " / " 分隔
};
```

### 9.2 能力（Features · 9 项）

```ts
type Feature = {
  num: string;       // "01" - "09"
  name: string;      // 能力名（Barlow Condensed）
  hint: string;      // 一句话说明
  points: Array<{
    title: string;
    desc: string;
  }>;  // 3 个展开点
};
```

### 9.3 场景（Scenarios · 6 项）

```ts
type Scenario = {
  num: string;       // "1 / 6"
  title: string;
  desc: string;
  img: string;       // /img/products/ai-triage/0X.png
};
```

### 9.4 痛点（Pains · 6 项）

```ts
type Pain = {
  title: string;
  items: string[];   // 3 个描述点
};
```

### 9.5 痛点图卡（FRAMES · 6 张 · 硬编码在 PainPointsSection）

```ts
const FRAMES = [
  { label: "01 · 关键词匹配局限", image: "/img/products/ai-triage/01.jpg" },
  // ...
];
```

注意：`pains` 与 `FRAMES` 通过索引顺序对应，不能错乱。

### 9.6 对比（Comparison · 3 组 × 3 行 = 9 行）

```ts
type ComparisonGroup = {
  title: string;     // "交互与理解" / "推荐与衔接" / "闭环与数据"
  rows: Array<{
    dim: string;     // 维度，如 "01 交互方式"
    ai: string;      // AI 列内容
    trad: string;    // 传统列内容
  }>;
};
```

渲染时 `flatMap` 合并为 9 行手风琴。

### 9.7 价值（Value · 4 行）

```ts
type ValueRow = {
  label: string;     // 患者主观感受（带引号）
  ai: string;        // AI 数据（如 "98%+"）
  trad: string;      // 传统数据
  dim: string;       // 维度补充文字
};
```

### 9.8 FAQ（5 项）

```ts
type FAQ = {
  q: string;
  a: string;
};
```

---

## 10. 无障碍与响应式

### 10.1 键盘交互

| 区块 | 支持的键 |
|------|----------|
| PainPoints 列表 | Tab → 聚焦，Enter → 激活，↑↓ → 切换 |
| PainPoints 画布内 | ArrowDown/PageDown → 下一步，ArrowUp/PageUp → 上一步 |
| 手风琴（Features / Comparison / FAQ） | Enter/Space → 展开/折叠 |
| Scenarios 画布锁定 | wheel 自动拦截（无需键） |

### 10.2 减弱动画

```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return;  // HowItWorks 不启动
```

### 10.3 焦点环

```css
.pps-row:focus-visible {
  outline: 2px solid rgba(99,102,241,0.6);
  outline-offset: 4px;
  border-radius: 4px;
}
```

### 10.4 响应式断点

| 断点 | 行为 |
|------|------|
| `< 768px` | PainPoints 转为静态卡片列表；Steps 9 卡保持堆叠；Scenarios 自动滚播关闭 |
| `< 850px` | PainPoints 图卡 600×700 → 460×600 |
| `< 1024px` | HowItWorks 文字宽度自适应 |
| `≥ 1024px` | Hero 全功能、PainPoints 双栏布局 |

### 10.5 移动端 PainPoints 简化

```css
@media (max-width: 767.98px) {
  .pps-stage { height: auto; }
  .pps-canvas { position: static; height: auto; }
  .pps-content { flex-direction: column; gap: 24px; }
  .pps-frames { width: 100%; max-width: 360px; aspect-ratio: 570/800; }
  .pps-row { grid-template-columns: 1fr; opacity: 1; }
  .pps-row .pps-num { display: none; }
}
```

---

## 11. 性能要点

### 11.1 滚动监听

```ts
let ticking = false;
const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
```

所有滚动驱动都使用 `passive: true` 与 `rAF` 节流。

### 11.2 防无限渲染

```tsx
// ❌ 错误：format 每次渲染都新建
const stats = [
  { value: 98, format: (n) => `${Math.round(n)}`, ... },
];

// ✅ 正确：用 useMemo 稳定引用
const stats = useMemo(() => [
  { value: 98, format: (n) => `${Math.round(n)}`, ... },
], []);
```

### 11.3 RAF 动画清理

```ts
useEffect(() => {
  let raf: number;
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}, [progress]);
```

### 11.4 图片加载策略

```tsx
<img
  src={frame.image}
  alt={frame.label}
  loading={i === 0 ? "eager" : "lazy"}
/>
```

第一帧立即加载，其余懒加载。

---

## 12. 快速复用模板

### 12.1 Hero 区块

```tsx
<section className="relative z-[1] flex min-h-screen items-center overflow-hidden bg-[#F4F5F7]/50 pt-[120px] pb-[90px] dark:bg-transparent">
  {/* 三色径向光晕 */}
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    <div className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#c4d9ff]/40 blur-[100px] dark:bg-[#577FFF]/20" />
    <div className="absolute right-[-5%] top-[20%] h-[480px] w-[480px] rounded-full bg-[#a5c4ff]/45 blur-[110px] dark:bg-[#52A5FF]/15" />
    <div className="absolute bottom-[-10%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#d6e4ff]/35 blur-[90px] dark:bg-[#3B82F6]/10" />
  </div>

  <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
    <SectionLabel variant="dark">大模型</SectionLabel>
    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
      AI 智能导诊<br />让患者挂对科、找对人
    </h1>
    <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
      一句话价值主张...
    </p>
    {/* 双 CTA */}
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a className="inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#577FFF] to-[#52A5FF] px-4 text-sm text-white shadow-[0_4px_20px_rgba(87,127,255,0.35)]">
        主 CTA <ArrowRight className="h-3.5 w-3.5" />
      </a>
      <OutlineCtaLink href="#">次 CTA</OutlineCtaLink>
    </div>
  </div>
</section>
```

### 12.2 数据栏

```tsx
<div className="mt-8 w-full rounded-2xl border border-white/60 bg-white/50 p-8 backdrop-blur-sm shadow-[0_4px_20px_rgba(87,127,255,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_24px_rgba(0,0,0,0.28)]">
  <div className="grid gap-6 sm:grid-cols-4">
    {stats.map((item) => (
      <div key={item.label} className="flex flex-col items-center gap-1 text-center">
        <span className="text-5xl tabular-nums leading-none font-semibold text-neutral-950 dark:text-white">
          <CountUp to={item.value} format={item.format} />
        </span>
        <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.label}</span>
      </div>
    ))}
  </div>
</div>
```

### 12.3 手风琴列表

```tsx
<div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10">
  {items.map((item, i) => (
    <div key={i} className="border-b border-neutral-200 last:border-b-0 dark:border-white/10">
      <button
        onClick={() => setOpen(open === i ? null : i)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-white/5 sm:px-8"
      >
        <span className="w-12 shrink-0 font-['Barlow_Condensed'] text-[28px] font-medium text-neutral-300 dark:text-white/20 sm:w-16 sm:text-[32px]">
          {item.num}
        </span>
        <span className="flex-1 font-['Barlow_Condensed'] text-[22px] font-medium text-neutral-950 dark:text-white sm:text-[26px]">
          {item.name}
        </span>
        <Plus className="h-5 w-5 shrink-0 text-neutral-400" />
      </button>
      <AnimatePresence>
        {open === i && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 border-t border-neutral-200 bg-neutral-50 px-6 py-6 sm:grid-cols-3 sm:px-8 dark:border-white/10 dark:bg-white/5">
              {/* 展开内容 */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>
```

### 12.4 CTA（深色 + GradientBlinds）

```tsx
<section className="relative z-[1] isolate overflow-hidden bg-neutral-950 px-4 py-[120px] sm:px-6 lg:px-8">
  <div className="absolute inset-0 z-0">
    <GradientBlinds
      gradientColors={["#6366f1", "#8b5cf6", "#a78bfa"]}
      angle={18}
      noise={0.22}
      blindCount={18}
      blindMinWidth={56}
      spotlightRadius={0.55}
      spotlightSoftness={1.1}
      spotlightOpacity={0.85}
      distortAmount={0.35}
      shineDirection="left"
    />
    <div className="pointer-events-none absolute inset-0 bg-neutral-950/45" />
  </div>
  <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 text-center">
    <h2 className="text-[36px] font-semibold tracking-tight text-white sm:text-[44px]">
      CTA 标题
    </h2>
    <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
      CTA 描述
    </p>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-neutral-950 hover:opacity-90">
        主 CTA
      </a>
      <a className="inline-flex h-10 items-center rounded-full border border-white/40 px-5 text-[14px] font-medium text-white hover:bg-white/10">
        次 CTA
      </a>
    </div>
  </div>
</section>
```

---

## 13. 与全局规范的差异

| 维度 | 全局规范 | 本页面 |
|------|----------|--------|
| 品牌主色 | 蓝色 `#577FFF / #52A5FF` | **紫色 `#6366f1 / #8b5cf6`** 作为对比色 |
| Hero 背景 | 单一蓝色光晕 | 三色径向 + 视频背景 |
| 字体 | PingFang / system | **新增 Barlow Condensed（数字专用）** |
| 描边数字 | 无 | `.text-stroke-themed` 1.5px 描边 |
| 数据栏 | 无专门容器 | `rounded-2xl` + `bg-white/50` + `backdrop-blur-sm` |
| 滚动驱动 | 主要用 whileInView | **5 类**：sticky stack / 滚动分镜 / 滚动锁轮播 / 计数 / 交错入场 |
| 渐变背景 | GradientBlinds 极少用 | **作为 CTA 主背景** |

---

## 14. 文件清单

| 文件 | 角色 |
|------|------|
| `app/products/ai-triage/page.tsx` | 主页面（9 区块） |
| `app/products/ai-triage/layout.tsx` | 子布局（可选） |
| `components/blocks/pain-points-section.tsx` | 痛点分镜组件 |
| `components/blocks/section-label.tsx` | 章节标签（variant: light / dark） |
| `components/blocks/stats-10.tsx` | CountUp 组件导出 |
| `components/GradientBlinds/GradientBlinds.jsx` | WebGL 渐变百叶窗 |
| `app/globals.css` | `.hero-video` / `.hero-video-overlay` |
| `public/img/products/ai-triage/*.png` | 步骤配图 01-08 |
| `public/img/products/ai-triage/*.jpg` | 痛点配图 01-06 |
| `public/img/products/ai-triage/hero-bg.mov` | Hero 视频背景 |

---

> 📌 **复用建议**：本页面 5 类滚动驱动交互适用于任何"长内容叙事"的产品页（不是简单的网格堆叠）。PainPoints 滚动分镜是本项目的亮点，建议复用到其他产品页的"行业痛点"模块。
