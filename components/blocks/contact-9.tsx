"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Database,
  Gauge,
  MapPin,
  Navigation,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const views = [
  {
    label: "基础打底",
    image: "/img/solutions/how-it-works/phase-1-foundation.png",
  },
  {
    label: "重点突破",
    image: "/img/solutions/how-it-works/phase-2-scenarios.png",
  },
  {
    label: "深化提升",
    image: "/img/solutions/how-it-works/phase-3-synergy.png",
  },
];

const phases = [
  {
    label: "第一阶段 · 基础打底",
    title: "夯实底座，构建基础",
    description:
      "完成顶层设计、标准规范、统一身份认证、接口集成、数据交换、主数据管理和核心系统接入，形成技术底座和数据底座，为后续建设奠定坚实基础。",
  },
  {
    label: "第二阶段 · 重点突破",
    title: "重点场景，快速见效",
    description:
      "优先推进监管平台、五大共享中心、统一预约诊疗、结果共享调阅、双向转诊等重点场景，同步开展重点科室 AI 辅助应用和数字医生等数智服务试点，形成阶段性可见成效。",
  },
  {
    label: "第三阶段 · 深化提升",
    title: "全面协同，数智深化",
    description:
      "逐步完善重点业务协同、统一运营管理和数智化应用能力，形成医共体数字治理体系，实现全域协同与智能赋能的深度融合。",
  },
];

const values: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "数字底座建设",
    description:
      "统一身份认证、接口集成与数据交换，建设基础数据中心，打通核心数据链，形成技术与数据底座。",
    icon: Database,
  },
  {
    title: "医共体监管平台",
    description: "全景监管与决策分析支撑，提升医共体统一运营与管理决策能力。",
    icon: Gauge,
  },
  {
    title: "三大共享服务中心",
    description: "建设影像、检验、心电共享中心，推动优质医疗资源区域协同共享。",
    icon: Share2,
  },
  {
    title: "预约诊疗与双向转诊",
    description: "统一预约诊疗与双向转诊协同，提升群众就医便捷度与转诊顺畅度。",
    icon: CalendarCheck,
  },
  {
    title: "检查检验结果共享调阅",
    description: "推进结果共享调阅与互认应用，减少重复检查，提升就医效率。",
    icon: ClipboardCheck,
  },
  {
    title: "数智化试点应用",
    description:
      "落地影像/心电辅助分析、重点人群风险识别与数字医生服务，同步启动 AI 赋能能力建设。",
    icon: Sparkles,
  },
];

export default function Contact9() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + views.length) % views.length);
  };

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const slide: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 48 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * -48,
      transition: { duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="w-full bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[50px]">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-between gap-12 rounded-3xl bg-white p-6 shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none sm:p-8 lg:p-10"
          >
            <div className="space-y-8">
              <motion.div variants={item} className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium tracking-wide text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                  <MapPin className="h-3.5 w-3.5" />
                  实施路径
                </span>
                <h2 className="text-[32px] font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-white sm:text-[36px]">
                  落地场景与实施路径
                </h2>
                <p className="max-w-md text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  “先底座，后重点，再深化”三步走，确保项目有序推进
                </p>
              </motion.div>

              <motion.div
                variants={item}
                className="space-y-5 border-t border-neutral-200 pt-6 dark:border-neutral-800"
              >
                {phases.map((phase) => (
                  <div key={phase.label} className="space-y-1.5">
                    <p className="text-[12px] font-medium tracking-wide text-neutral-500">
                      {phase.label}
                    </p>
                    <p className="text-[16px] font-semibold text-neutral-900 dark:text-white">
                      {phase.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={item}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <motion.a
                href="#waitlist"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
              >
                <Navigation className="h-4 w-4" />
                预约方案沟通
              </motion.a>
              <motion.a
                href="#waitlist"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
              >
                <Clock className="h-4 w-4" />
                了解实施节奏
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[460px] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 lg:min-h-[680px]"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <img
                  src={views[index].image}
                  alt={views[index].label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/0 to-neutral-950/30" />
              </motion.div>
            </AnimatePresence>

            <div
              aria-live="polite"
              className="absolute left-4 top-4 sm:left-6 sm:top-6"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={views[index].label}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center rounded-full border border-white/40 bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur"
                >
                  {views[index].label}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-white/50 bg-white/85 px-4 py-2.5 backdrop-blur dark:border-neutral-700/70 dark:bg-neutral-950/85 sm:inset-x-6 sm:bottom-6">
              <div className="flex items-center gap-3 text-sm font-medium tabular-nums text-neutral-900 dark:text-white">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-neutral-500">
                  {String(views.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => paginate(-1)}
                  whileTap={{ scale: 0.94 }}
                  aria-label="上一张"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus-visible:ring-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => paginate(1)}
                  whileTap={{ scale: 0.94 }}
                  aria-label="下一张"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <div className="mb-10 flex max-w-3xl flex-col gap-3">
            <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
              一期建设：优先做出政策成效与群众感知
            </h2>
            <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
              与国家及四川省政策要求高度一致，快速形成可感知、可使用、可体验的成果
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 [&>*]:relative">
            {values.map((value, valueIndex) => {
              const Icon = value.icon;
              return (
                <motion.article
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      delay: (valueIndex % 4) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  viewport={{ once: true }}
                  className="group relative z-0 flex origin-center items-start gap-5 rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl sm:gap-6"
                >
                  <Icon
                    className="h-10 w-10 shrink-0 text-neutral-900 dark:text-white"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="mb-2 text-[18px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[20px]">
                      {value.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                      {value.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
