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

const hospitalRatings = [
  { value: "六级", label: "电子病历功能应用水平", featured: true },
  { value: "六星", label: "智慧医院评价等级", featured: false },
  { value: "3+", label: "核心智能应用产品", featured: false },
  { value: "全场景", label: "医教研管AI覆盖", featured: false },
];

const integrationCapabilities = [
  { value: "万级 TPS", label: "高并发处理能力", featured: true },
  { value: "99%", label: "系统稳定性", featured: false },
  { value: "90%", label: "数据互通率", featured: false },
  { value: "4甲", label: "互联互通达标", featured: false },
];

const integrationComparisonGroups = [
  {
    group: "对接效率",
    items: [
      { label: "API复用率", before: "15%", after: "85%", featured: true },
      { label: "接口开发效率", before: "30%", after: "80%", featured: false },
    ],
  },
  {
    group: "数据与稳定",
    items: [
      { label: "数据互通率", before: "20%", after: "90%", featured: false },
      { label: "系统稳定性", before: "75%", after: "99%", featured: false },
    ],
  },
  {
    group: "业务上线",
    items: [
      {
        label: "新业务上线速度",
        before: "25%",
        after: "75%",
        featured: false,
      },
    ],
  },
];

const integrationValues = [
  {
    label: "降本增效",
    description: "降低开发与运维成本，缩短系统上线周期",
    featured: true,
  },
  {
    label: "合规达标",
    description: "适配标准规范，支撑互联互通测评",
    featured: false,
  },
  {
    label: "创新赋能",
    description: "沉淀 API 与数据能力，支撑业务持续创新",
    featured: false,
  },
];

const hospitalBusinessLines = [
  {
    label: "患者服务线",
    description: "智能咨询、导诊分诊、随访提醒、健康管理",
    featured: true,
  },
  {
    label: "临床辅助线",
    description: "病历质控、辅助决策、知识检索、科研支持",
    featured: false,
  },
  {
    label: "平台基建线",
    description: "模型开发、工具调用、流程编排、安全治理",
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

type Stats12Props = {
  embedded?: boolean;
  /** default 医共体；hospital 医院数智化；integration 系统集成 */
  variant?: "default" | "hospital" | "integration";
};

export default function Stats12({
  embedded = false,
  variant = "default",
}: Stats12Props) {
  const isHospital = variant === "hospital";
  const isIntegration = variant === "integration";
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
              {isIntegration
                ? "量化成效"
                : isHospital
                  ? "量化运营表现"
                  : "量化指标体系"}
            </span>
          </div>
          <h2 className="mt-8 max-w-md text-3xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {isIntegration
              ? "核心指标验证集成价值"
              : isHospital
                ? "用核心指标看见应用成效"
                : "用关键指标看见医共体建设成效"}
          </h2>
          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
            {isIntegration
              ? "统一集成方案落地后，接口开发、API复用、系统稳定性与业务上线效率持续提升，进一步降低系统建设与运维成本。"
              : isHospital
                ? "日均AI会话发起数达 2,045 次，患者助手累计会话 42万+，AI服务累计用户 21万+，智能导诊累计次数 11万+，持续验证AI应用的活跃度与服务价值。"
                : "围绕平台覆盖、协同成效、服务能力、数智能力四个维度，全面评估医共体建设成果。"}
          </p>
          {isIntegration ? (
            <div className="mt-auto grid grid-cols-3 gap-3 border-t border-neutral-100 pt-8 dark:border-white/10">
              {[
                { value: "60%+", label: "对接成本降低" },
                { value: "80%+", label: "API复用率提升" },
                { value: "99%", label: "系统稳定性" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums text-neutral-900 sm:text-3xl dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs leading-snug text-neutral-500 dark:text-neutral-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
      </motion.div>

      {/* 右上 */}
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
            {isIntegration
              ? "能力与达标"
              : isHospital
                ? "建设目标与评级"
                : "关键协同指标表现"}
          </span>
        </div>
        {isIntegration ? (
          <div className="flex flex-1 flex-col justify-center gap-6 sm:gap-7">
            <p className="text-[20px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              关键能力持续提升
            </p>
            {integrationCapabilities.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4"
              >
                <span
                  className={`shrink-0 tracking-tight tabular-nums ${
                    item.featured
                      ? "text-3xl font-semibold text-neutral-900 sm:text-4xl dark:text-white"
                      : "text-xl font-medium text-neutral-400 sm:text-2xl dark:text-neutral-500"
                  }`}
                >
                  {item.value}
                </span>
                <span
                  className={
                    item.featured
                      ? "text-right text-sm font-semibold text-neutral-900 sm:text-base dark:text-white"
                      : "text-right text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ) : isHospital ? (
          <div className="flex flex-1 flex-col justify-center gap-6 sm:gap-7">
            <p className="text-[20px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              建设等级与应用覆盖持续提升
            </p>
            {hospitalRatings.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4"
              >
                <span
                  className={`shrink-0 tracking-tight tabular-nums ${
                    item.featured
                      ? "text-3xl font-semibold text-neutral-900 sm:text-4xl dark:text-white"
                      : "text-xl font-medium text-neutral-400 sm:text-2xl dark:text-neutral-500"
                  }`}
                >
                  {item.value}
                </span>
                <span
                  className={
                    item.featured
                      ? "text-right text-sm font-semibold text-neutral-900 sm:text-base dark:text-white"
                      : "text-right text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </motion.div>

      {/* 左下 */}
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
            {isIntegration
              ? "指标对比"
              : isHospital
                ? "三线业务成效"
                : "核心服务能力提升"}
          </span>
        </div>
        {isIntegration ? (
          <div className="flex flex-1 flex-col justify-center gap-5">
            <p className="text-[20px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              部署前后关键指标显著提升
            </p>
            <div className="flex flex-col gap-4">
              {integrationComparisonGroups.map((group) => (
                <div key={group.group} className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900 dark:bg-white"
                    />
                    <span className="text-xs font-semibold tracking-wide text-neutral-900 dark:text-white">
                      {group.group}
                    </span>
                  </div>
                  <div className="ml-1.5 flex flex-col gap-2.5 border-l border-neutral-200 pl-4 dark:border-neutral-700">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3"
                      >
                        <span
                          className={
                            item.featured
                              ? "text-sm font-semibold text-neutral-900 sm:text-base dark:text-white"
                              : "text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400"
                          }
                        >
                          {item.label}
                        </span>
                        <span
                          className={`shrink-0 tabular-nums ${
                            item.featured
                              ? "text-sm font-semibold text-neutral-900 sm:text-base dark:text-white"
                              : "text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400"
                          }`}
                        >
                          <span className="text-neutral-400 dark:text-neutral-500">
                            {item.before}
                          </span>
                          <span className="mx-1.5 text-neutral-300 dark:text-neutral-600">
                            →
                          </span>
                          <span>{item.after}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isHospital ? (
          <div className="flex flex-1 flex-col justify-center gap-6">
            <p className="text-[20px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              患者、临床、平台三线协同推进
            </p>
            {hospitalBusinessLines.map((line) => (
              <div key={line.label} className="flex flex-col gap-1.5">
                <span
                  className={
                    line.featured
                      ? "text-base font-semibold text-neutral-900 dark:text-white"
                      : "text-base font-medium text-neutral-700 dark:text-neutral-300"
                  }
                >
                  {line.label}
                </span>
                <span className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {line.description}
                </span>
              </div>
            ))}
          </div>
        ) : (
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
        )}
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
            {isIntegration ? "综合价值" : "数智赋能成效"}
          </span>
        </div>
        <h3 className="mt-8 max-w-md text-3xl font-medium leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          {isIntegration
            ? "从集成建设走向持续运营"
            : isHospital
              ? "从建设覆盖走向持续运营"
              : "从覆盖建设走向持续运营"}
        </h3>
        <p className="mt-8 max-w-md text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {isIntegration
            ? "以统一接口、数据与治理能力为底座，推动医院从系统连接走向标准化、平台化与智能化运营。"
            : isHospital
              ? "以统一平台为底座，推动患者服务、临床辅助与平台能力协同发展，逐步形成可量化、可追踪、可持续优化的数智化运营体系。"
              : "通过统一平台、协同服务与智能应用建设，逐步形成可量化、可跟踪、可优化的医共体成效评估体系。"}
        </p>
        {isIntegration ? (
          <div className="mt-auto flex flex-col gap-4 pt-8">
            {integrationValues.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span
                  className={
                    item.featured
                      ? "text-base font-semibold text-neutral-900 dark:text-white"
                      : "text-base font-medium text-neutral-700 dark:text-neutral-300"
                  }
                >
                  {item.label}
                </span>
                <span className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mt-auto overflow-hidden rounded-2xl pt-8">
            <img
              src="/img/solutions/stats-empowerment-visual.png"
              alt=""
              className="h-[170px] w-full rounded-2xl object-cover object-[center_35%]"
              loading="lazy"
            />
          </div>
        )}
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
