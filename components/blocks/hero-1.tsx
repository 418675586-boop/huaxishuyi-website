"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const HERO_TAGS = ["一个底座", "五类应用", "三大保障", "五个统一"];

export function Hero1() {
  return (
    <section className="relative flex w-full items-start overflow-hidden bg-white px-4 py-[80px] sm:px-6 lg:items-center lg:px-8 dark:bg-neutral-950">
      {/* 底部淡色弥散光晕 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] select-none"
      >
        <div className="absolute -bottom-24 left-[8%] h-[320px] w-[420px] rounded-full bg-[#B8D4F0]/35 blur-[90px] dark:bg-[#7BA3C9]/20" />
        <div className="absolute -bottom-16 left-[38%] h-[280px] w-[360px] rounded-full bg-[#C5C8F0]/30 blur-[100px] dark:bg-[#8B8FC8]/15" />
        <div className="absolute right-[6%] -bottom-20 h-[300px] w-[400px] rounded-full bg-[#A8C8E8]/28 blur-[95px] dark:bg-[#6A90B8]/18" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-fit items-center gap-2 rounded-full border border-neutral-300 p-1 sm:gap-3 dark:border-neutral-800"
            >
              <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white sm:text-sm dark:bg-white dark:text-black">
                解决方案
              </span>
              <span className="mr-2 text-sm text-neutral-900 sm:text-base dark:text-neutral-100">
                区域型医共体数智化解决方案
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl leading-[1.15] font-medium tracking-tight text-neutral-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white"
            >
              数智医共体 · 健康共同体
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-lg text-base leading-relaxed tracking-tight text-neutral-600 sm:text-lg dark:text-neutral-400"
            >
              以统一数智底座，赋能区域医共体高质量发展
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 sm:text-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-auto w-full"
          >
            <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-4xl bg-neutral-100 transition-colors hover:bg-neutral-200 sm:min-h-[500px] dark:bg-neutral-900 dark:hover:bg-neutral-800">
              <img
                src="/img/solutions/regional-healthcare-transform.png"
                alt="区域型医共体数智化解决方案"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute right-0 bottom-0 flex flex-col items-end">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                    className="fill-white dark:fill-neutral-950"
                  />
                </svg>

                <div className="relative">
                  <div className="h-24 w-24 rounded-tl-4xl bg-white pt-4 pl-4 dark:bg-neutral-950">
                    <a
                      href="#pillars"
                      className="flex h-full w-full cursor-pointer items-center justify-center rounded-[1.2em] border-none bg-black transition-opacity hover:opacity-90 dark:bg-white"
                      aria-label="查看方案能力"
                    >
                      <ArrowRight className="h-6 w-6 -rotate-45 text-white dark:text-neutral-950" />
                    </a>
                  </div>

                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 -left-10"
                  >
                    <path
                      d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
                      className="fill-white dark:fill-neutral-950"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero1;
