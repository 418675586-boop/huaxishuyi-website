"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Layers, Navigation } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const AUTO_SWITCH_MS = 4000;

export type Contact9View = {
  label: string;
  image: string;
};

export type Contact9Capability = {
  title: string;
  description: string;
  value?: string;
  unit?: string;
};

export type Contact9Cta = {
  label: string;
  href: string;
};

type Contact9Props = {
  id?: string;
  className?: string;
  badge?: string;
  title?: string;
  description?: ReactNode;
  capabilities?: Contact9Capability[];
  capabilitiesLayout?: "list" | "stats";
  views?: Contact9View[];
  primaryCta?: Contact9Cta;
  secondaryCta?: Contact9Cta;
  showCtas?: boolean;
};

const DEFAULT_VIEWS: Contact9View[] = [
  {
    label: "应用集成",
    image: "/img/solutions/contact9-app-integration.png",
  },
  {
    label: "数据集成",
    image: "/img/solutions/contact9-data-integration.png",
  },
  {
    label: "API 管理",
    image: "/img/solutions/contact9-api-management.png",
  },
  {
    label: "生态连接",
    image: "/img/solutions/contact9-eco-connection.png",
  },
];

const DEFAULT_CAPABILITIES: Contact9Capability[] = [
  {
    title: "应用集成",
    description: "连接核心系统，让业务协同更高效",
  },
  {
    title: "数据集成",
    description: "汇聚多源数据，让数据流转更顺畅",
  },
  {
    title: "API 管理",
    description: "统一接口治理，让 API 运营更规范",
  },
  {
    title: "生态连接",
    description: "连接多端生态，让服务边界更广",
  },
];

export default function Contact9({
  id,
  className,
  badge = "应用场景",
  title = "一体化集成能力",
  description = "覆盖应用、数据、API与生态连接，构建灵活、高效、稳定的医疗集成体系。",
  capabilities = DEFAULT_CAPABILITIES,
  capabilitiesLayout = "list",
  views = DEFAULT_VIEWS,
  primaryCta = { label: "了解能力详情", href: "#" },
  secondaryCta = { label: "咨询解决方案", href: "#" },
  showCtas = true,
}: Contact9Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const canPaginate = views.length > 1;
  const currentView = views[index] ?? views[0];

  const paginate = (dir: number) => {
    if (!canPaginate) return;
    setDirection(dir);
    setIndex((prev) => (prev + dir + views.length) % views.length);
  };

  useEffect(() => {
    if (paused || !canPaginate) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % views.length);
    }, AUTO_SWITCH_MS);
    return () => window.clearInterval(timer);
  }, [canPaginate, index, paused, views.length]);

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
    <section
      id={id}
      className={cn(
        "w-full bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-stretch gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(
            "flex flex-col rounded-3xl border border-neutral-200 bg-neutral-50 p-6 dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-xl sm:p-8 lg:p-10",
            showCtas ? "h-full justify-between gap-12" : "h-fit lg:self-start",
          )}
        >
          <div className="space-y-10">
            <motion.div variants={item} className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium tracking-wide text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                <Layers className="h-3.5 w-3.5" />
                {badge}
              </span>
              <h2 className="text-[44px] font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-white">
                {title}
              </h2>
              <div className="max-w-md space-y-3 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                {typeof description === "string" ? <p>{description}</p> : description}
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className={
                capabilitiesLayout === "stats"
                  ? "grid grid-cols-2 gap-3"
                  : "flex flex-col gap-5"
              }
            >
              {capabilitiesLayout === "stats"
                ? capabilities.map((capability) => (
                    <article
                      key={capability.title}
                      className="rounded-[20px] border border-white/70 bg-white/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/10 dark:bg-white/10"
                    >
                      <h3 className="flex items-baseline gap-1 font-semibold tracking-tight text-neutral-950 dark:text-white">
                        <span className="text-[48px] leading-none">
                          {capability.value}
                        </span>
                        <span className="text-[22px]">{capability.unit}</span>
                      </h3>
                      <p className="mt-2 text-[13px] leading-snug text-neutral-500 dark:text-neutral-400">
                        {capability.title}
                      </p>
                    </article>
                  ))
                : capabilities.map((capability) => (
                    <div key={capability.title} className="min-w-0 space-y-1">
                      <p className="text-[16px] font-semibold text-neutral-950 dark:text-white">
                        {capability.title}
                      </p>
                      <p className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {capability.description}
                      </p>
                    </div>
                  ))}
            </motion.div>
          </div>

          {showCtas ? (
          <motion.div
            variants={item}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href={primaryCta.href}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
            >
              <Navigation className="h-4 w-4" />
              {primaryCta.label}
            </motion.a>
            <motion.a
              href={secondaryCta.href}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
            >
              <Clock className="h-4 w-4" />
              {secondaryCta.label}
            </motion.a>
          </motion.div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => {
            if (canPaginate) setPaused(true);
          }}
          onMouseLeave={() => {
            if (canPaginate) setPaused(false);
          }}
          onFocusCapture={() => {
            if (canPaginate) setPaused(true);
          }}
          onBlurCapture={() => {
            if (canPaginate) setPaused(false);
          }}
          className={cn(
            "group relative min-h-[460px] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900",
            showCtas ? "lg:min-h-[680px]" : "lg:min-h-0 lg:h-full",
          )}
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
                src={currentView?.image}
                alt={currentView?.label ?? ""}
                draggable={false}
                className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
                  reduce ? "" : "group-hover:scale-110"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/0 to-neutral-950/30" />
            </motion.div>
          </AnimatePresence>

          <div
            aria-live="polite"
            className="absolute left-4 top-4 z-[1] sm:left-6 sm:top-6"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentView?.label}
                initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -6 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center rounded-full border border-white/40 bg-black/30 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur"
              >
                {currentView?.label}
              </motion.span>
            </AnimatePresence>
          </div>

          {canPaginate ? (
          <div className="absolute inset-x-4 bottom-4 z-[1] flex items-center justify-between rounded-full border border-white/50 bg-white/80 px-4 py-2.5 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-950/80 sm:inset-x-6 sm:bottom-6">
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
                aria-label="Previous view"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus-visible:ring-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => paginate(1)}
                whileTap={{ scale: 0.94 }}
                aria-label="Next view"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
