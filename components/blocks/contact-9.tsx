"use client";

import { useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Layers, Navigation } from "lucide-react";

const views = [
  {
    label: "应用集成",
    image: "/img/solutions/contact9-app-integration.png",
  },
  {
    label: "数据集成",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "API 管理",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80",
  },
  {
    label: "生态连接",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80",
  },
];

const capabilities = [
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

export default function Contact9() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const mediaRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18 });
  const springScale = useSpring(1, { stiffness: 220, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 28%, transparent 58%)`;

  const handleMediaMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduce || !mediaRef.current) return;
    const rect = mediaRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    // 与 lenticular 类似：悬停时朝鼠标方向立体翻转（约 ±14°）
    rotateX.set((0.5 - py) * 28);
    rotateY.set((px - 0.5) * 28);
    glareX.set(px * 100);
    glareY.set(py * 100);
    springScale.set(1.04);
  };

  const handleMediaLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    springScale.set(1);
  };

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
    <section className="w-full bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1200px] items-stretch gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col justify-between gap-12 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8 lg:p-10"
        >
          <div className="space-y-10">
            <motion.div variants={item} className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium tracking-wide text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                <Layers className="h-3.5 w-3.5" />
                应用场景
              </span>
              <h2 className="text-[44px] font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-white">
                一体化集成能力
              </h2>
              <p className="max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                覆盖应用、数据、API与生态连接，构建灵活、高效、稳定的医疗集成体系。
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col gap-5">
              {capabilities.map((capability) => (
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

          <motion.div
            variants={item}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
            >
              <Navigation className="h-4 w-4" />
              了解能力详情
            </motion.a>
            <motion.a
              href="#"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-900 sm:w-auto"
            >
              <Clock className="h-4 w-4" />
              咨询解决方案
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="[perspective:1200px]">
          <motion.div
            ref={mediaRef}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMediaMove}
            onMouseLeave={handleMediaLeave}
            style={
              reduce
                ? undefined
                : {
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    scale: springScale,
                    transformStyle: "preserve-3d",
                  }
            }
            className="relative min-h-[460px] overflow-hidden rounded-3xl bg-neutral-100 will-change-transform dark:bg-neutral-900 lg:min-h-[680px]"
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
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/0 to-neutral-950/30" />
              </motion.div>
            </AnimatePresence>

            {!reduce ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: glareBackground }}
              />
            ) : null}

            <div
              aria-live="polite"
              className="absolute left-4 top-4 z-[1] sm:left-6 sm:top-6"
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

            <div className="absolute inset-x-4 bottom-4 z-[1] flex items-center justify-between rounded-full border border-white/50 bg-white/85 px-4 py-2.5 backdrop-blur dark:border-neutral-700/70 dark:bg-neutral-950/85 sm:inset-x-6 sm:bottom-6">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
