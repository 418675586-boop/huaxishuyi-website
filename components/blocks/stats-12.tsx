"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion, type Variants } from "motion/react";
import { BarChart3, LineChart, Sparkles, Target } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rates = [
  { label: "共享中心覆盖率", value: 92.4, width: 100, featured: true },
  { label: "双向转诊协同效率", value: 87.6, width: 95, featured: false },
  { label: "风险预警准确率", value: 91.2, width: 99, featured: false },
];

const coverage = [
  {
    label: "平台接入成员单位数",
    value: 126,
    decimals: 0,
    suffix: "家",
    barClass: "h-52 sm:h-60",
    featured: true,
  },
  {
    label: "检查检验互认项目",
    value: 888,
    decimals: 0,
    suffix: "项",
    barClass: "h-40 sm:h-44",
    featured: false,
  },
  {
    label: "数字医生服务量",
    value: 32.6,
    decimals: 1,
    suffix: "万人次",
    barClass: "h-28 sm:h-32",
    featured: false,
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const growX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

const growY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

function CountUp({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion) {
      el.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [value, decimals, shouldReduceMotion]);

  return <span ref={ref}>{(0).toFixed(decimals)}</span>;
}

export default function Stats12({ embedded = false }: { embedded?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const growXVariants = shouldReduceMotion ? undefined : growX;
  const growYVariants = shouldReduceMotion ? undefined : growY;

  const grid = (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
    >
      {/* 左上：总述卡 */}
      <motion.div
        variants={cellVariants}
        className="flex min-h-[340px] flex-col rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
      >
        <div className="flex items-center gap-2.5">
          <Target
            className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            量化指标体系
          </span>
        </div>
        <h2 className="mt-8 max-w-md text-3xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          用关键指标看见医共体建设成效
        </h2>
        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          围绕平台覆盖、协同成效、服务能力、数智能力四个维度，全面评估医共体建设成果。
        </p>
      </motion.div>

      {/* 右上：横向对比卡 */}
      <motion.div
        variants={cellVariants}
        className="flex min-h-[340px] flex-col rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
      >
        <div className="mb-8 flex items-center gap-2.5">
          <LineChart
            className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            关键协同指标表现
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-8 sm:gap-9">
          {rates.map((rate) => (
            <div key={rate.label}>
              <div className="flex items-baseline justify-between gap-6">
                <span
                  className={
                    rate.featured
                      ? "text-sm font-semibold text-neutral-900 sm:text-base dark:text-white"
                      : "text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400"
                  }
                >
                  {rate.label}
                </span>
                <span
                  className={`shrink-0 tracking-tight tabular-nums ${
                    rate.featured
                      ? "text-4xl font-semibold text-neutral-900 sm:text-5xl dark:text-white"
                      : "text-2xl font-medium text-neutral-400 sm:text-3xl dark:text-neutral-500"
                  }`}
                >
                  <CountUp value={rate.value} decimals={1} />
                  <span
                    className={
                      rate.featured
                        ? "ml-1 text-xl font-medium text-neutral-400 sm:text-2xl dark:text-neutral-500"
                        : "ml-1 text-base text-neutral-400 sm:text-lg dark:text-neutral-600"
                    }
                  >
                    %
                  </span>
                </span>
              </div>
              <div className="mt-3">
                <motion.div
                  variants={growXVariants}
                  style={{
                    transformOrigin: "left",
                    width: `${rate.width}%`,
                  }}
                  className={`h-2.5 rounded-full ${
                    rate.featured
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 左下：柱图卡 */}
      <motion.div
        variants={cellVariants}
        className="flex min-h-[340px] flex-col rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
      >
        <div className="mb-8 flex items-center gap-2.5">
          <BarChart3
            className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            核心服务能力提升
          </span>
        </div>
        <div className="flex flex-1 items-end justify-center gap-5 sm:gap-8">
          {coverage.map((col) => (
            <div
              key={col.label}
              className="flex w-full max-w-[7.5rem] flex-col items-center sm:max-w-[8.5rem]"
            >
              <motion.span
                variants={fade}
                className={`mb-4 text-center text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl ${
                  col.featured
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                <CountUp value={col.value} decimals={col.decimals} />
                <span className="ml-0.5 text-base font-medium sm:text-lg">
                  {col.suffix}
                </span>
              </motion.span>
              <div className={`w-full ${col.barClass}`}>
                <motion.div
                  variants={growYVariants}
                  style={{ transformOrigin: "bottom" }}
                  className={`h-full w-full rounded-2xl ${
                    col.featured
                      ? "bg-neutral-900 dark:bg-white"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              </div>
              <span className="mt-4 text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {col.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 右下：说明卡 */}
      <motion.div
        variants={cellVariants}
        className="flex min-h-[340px] flex-col rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
      >
        <div className="flex items-center gap-2.5">
          <Sparkles
            className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
          />
          <span className="text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
            数智赋能成效
          </span>
        </div>
        <h3 className="mt-8 max-w-md text-3xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          从覆盖建设走向持续运营
        </h3>
        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          通过统一平台、协同服务与智能应用建设，逐步形成可量化、可跟踪、可优化的医共体成效评估体系。
        </p>
        <div className="relative mt-auto overflow-hidden rounded-2xl pt-8">
          <img
            src="/img/solutions/stats-empowerment-visual.png"
            alt=""
            className="h-[170px] w-full rounded-2xl object-cover object-[center_35%]"
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  );

  if (embedded) {
    return grid;
  }

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-[1200px]">{grid}</div>
    </section>
  );
}
