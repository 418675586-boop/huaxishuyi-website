"use client";

import { SectionLabel } from "@/components/blocks/section-label";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  DatabaseZap,
  BarChart3,
  FlaskConical,
  Settings2,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

type Pain = {
  title: string;
  items: string[];
};

const PAIN_ICONS = [
  DatabaseZap,
  BarChart3,
  FlaskConical,
  Settings2,
  ShieldCheck,
  BrainCircuit,
];

/**
 * Parallax Stack — 滚动驱动堆叠卡
 *
 * 进入视口后锁定滚动区间为 (n * 80vh)，每张卡片依次堆叠在视口顶部：
 *   - 第 0 张始终是"封面"，展示标题
 *   - 第 k (k>0) 张随着滚动叠加在第 k-1 上方，并轻微缩放/倾斜
 *   - 最后一张完整展开后，背景色和进度条达到 100%
 */
export function PainPointsSection({ pains }: { pains: Pain[] }) {
  const n = pains.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative z-[1] bg-[#F4F5F7]/50 px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* ── 标题区 ── */}
        <div className="mb-12 flex max-w-3xl flex-col gap-3 sm:mb-16">
          <SectionLabel>行业痛点</SectionLabel>
          <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
            患者就医的第一道门槛
            <br />
            六大传统导诊模式的核心痛点
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
            研究表明，超过 40% 的患者在首次就诊时面临科室选择困惑。传统关键词匹配式导诊、口头导医咨询与电话分诊台，都无法满足真实就医需求。
          </p>
        </div>

        {/* ── 视差堆叠容器 ── */}
        {/* 锁定滚动距离 = n * 80vh，确保每张卡有独立滚动区间 */}
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${n * 80}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            {/* 背景进度环 */}
            <ProgressRing progress={scrollYProgress} />

            {/* 卡片堆 */}
            <div className="relative mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8">
              {pains.map((pain, i) => (
                <StackCard
                  key={pain.title}
                  index={i}
                  total={n}
                  pain={pain}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 背景进度环 ──────────────────────────────────────────── */

function ProgressRing({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const percent = useTransform(progress, [0, 1], [0, 1]);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="pointer-events-none absolute right-8 top-24 z-10 hidden flex-col items-center gap-2 sm:flex">
      <svg width="64" height="64" className="-rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-200 dark:text-white/10"
        />
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: useTransform(percent, (p) => circumference * (1 - p)) }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#577FFF" />
            <stop offset="100%" stopColor="#52A5FF" />
          </linearGradient>
        </defs>
      </svg>
      <PercentLabel percent={percent} />
    </div>
  );
}

function PercentLabel({ percent }: { percent: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <motion.span className="font-['Barlow_Condensed'] text-[12px] font-medium tabular-nums tracking-wider text-neutral-500 dark:text-neutral-400">
      {Math.round(Number(percent.get()) * 100)}%
    </motion.span>
  );
}

/* ─── 单张堆叠卡 ──────────────────────────────────────────── */

function StackCard({
  index,
  total,
  pain,
  progress,
}: {
  index: number;
  total: number;
  pain: Pain;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const Icon = PAIN_ICONS[index] ?? DatabaseZap;

  // 每张卡在 [index/total, (index+1)/total] 之间完成"覆盖"动画
  const segmentStart = index / total;
  const segmentEnd = (index + 1) / total;
  const peak = (segmentStart + segmentEnd) / 2;

  // 透明度：第一张始终 1；其余从 0.6 渐入到 1
  const opacity = useTransform(progress, [segmentStart, peak], [index === 0 ? 1 : 0.55, 1]);

  // 缩放：第一张始终 1；其余随滚动微缩 0.92 → 1
  const scale = useTransform(progress, [segmentStart, peak], [0.92, 1]);

  // Y 偏移：第一张固定；其余从 +60px 上推到位
  const y = useTransform(progress, [segmentStart, peak], [60, 0]);

  // 轻微倾斜 → 复位
  const rotate = useTransform(progress, [segmentStart, peak], [[-1.5, 1.5][index % 2] ?? 0, 0]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotate,
        zIndex: index + 1,
        top: `${index * 28}px`,
      }}
      className="absolute inset-x-0 origin-bottom rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-shadow sm:p-8 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-start gap-5">
        {/* 图标 */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#577FFF]/15 to-[#52A5FF]/15 ring-1 ring-[#577FFF]/30 dark:from-[#577FFF]/25 dark:to-[#52A5FF]/25">
          <Icon className="h-6 w-6 text-[#577FFF]" strokeWidth={1.5} />
        </div>

        {/* 内容 */}
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-3">
            <span className="font-['Barlow_Condensed'] text-[13px] font-medium uppercase tracking-widest text-[#577FFF]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#577FFF]/30 to-transparent" />
          </div>
          <h3 className="mb-3 text-[22px] font-semibold leading-tight text-neutral-950 sm:text-[26px] dark:text-white">
            {pain.title}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-1">
            {pain.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#577FFF]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 序号角标 */}
        <span
          className="absolute right-6 top-6 hidden font-['Barlow_Condensed'] text-[64px] font-medium leading-none text-neutral-100 dark:text-white/5 sm:block"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}
