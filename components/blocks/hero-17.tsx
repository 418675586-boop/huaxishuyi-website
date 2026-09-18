"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function Hero17() {
  return (
    <section className="relative flex h-auto w-full items-start overflow-hidden bg-white px-4 pt-[calc(66px+3rem)] pb-12 sm:px-6 sm:pb-16 lg:h-[678px] lg:items-center lg:px-8 dark:bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none"
      >
        {/* Bottom diffuse glows — light */}
        <div className="absolute -bottom-[18%] left-[-8%] h-[58%] w-[52%] rounded-full bg-[#A8C8EC]/55 blur-[120px] dark:hidden" />
        <div className="absolute -bottom-[12%] right-[-6%] h-[52%] w-[48%] rounded-full bg-[#C4B5F0]/48 blur-[130px] dark:hidden" />
        <div className="absolute bottom-[-6%] left-[28%] h-[42%] w-[42%] rounded-full bg-[#9ED9D0]/42 blur-[110px] dark:hidden" />
        <div className="absolute bottom-[4%] right-[22%] h-[32%] w-[28%] rounded-full bg-[#F0C4D8]/35 blur-[100px] dark:hidden" />

        {/* Bottom diffuse glows — dark */}
        <div className="absolute -bottom-[20%] left-[-4%] hidden h-[56%] w-[50%] rounded-full bg-[rgba(43,79,212,0.26)] blur-[140px] dark:block" />
        <div className="absolute -bottom-[14%] right-[2%] hidden h-[50%] w-[46%] rounded-full bg-[rgba(107,91,149,0.22)] blur-[130px] dark:block" />
        <div className="absolute bottom-[-4%] left-[32%] hidden h-[38%] w-[36%] rounded-full bg-[rgba(45,140,130,0.16)] blur-[120px] dark:block" />
        <div className="absolute bottom-[6%] right-[24%] hidden h-[30%] w-[26%] rounded-full bg-[rgba(122,31,110,0.14)] blur-[110px] dark:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="flex flex-col gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex w-fit cursor-default items-center gap-2 rounded-full border border-neutral-300 p-1 transition-colors sm:gap-3 dark:border-neutral-800"
            >
              <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white sm:text-xs dark:bg-white dark:text-black">
                关于我们
              </span>
              <span className="mr-2 text-xs text-neutral-900 sm:text-sm dark:text-neutral-100">
                华西数医 · 企业介绍
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[44px] leading-[1.15] font-medium tracking-tight text-neutral-900 dark:text-white"
            >
              智启健康新章
              <br />
              重塑医疗未来
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="w-full text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
            >
              以 AI 全栈能力贯通诊疗、数据与服务全链路，赋能医院数智转型，
              开启健康管理新篇章，重塑更高效、更精准的医疗未来。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/#solutions">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-neutral-800 sm:w-auto sm:px-7 sm:py-3 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  探索解决方案
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          <div className="flex h-[460px] flex-col gap-2.5 max-lg:h-auto max-lg:max-h-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="min-h-0 w-full flex-1 overflow-hidden rounded-2xl max-lg:aspect-[16/10] max-lg:flex-none"
            >
              <img
                src="/img/about/hero-main.png"
                alt="以 AI 全栈能力赋能医院数智转型"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="grid h-[118px] shrink-0 grid-cols-3 gap-2.5">
              {[
                {
                  src: "/img/about/hero-thumb-1.png",
                  alt: "智启健康新章",
                },
                {
                  src: "/img/about/hero-thumb-2.png",
                  alt: "AI 驱动医疗数据与科研",
                },
                {
                  src: "/img/about/hero-thumb-3.png",
                  alt: "重塑医疗未来",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full cursor-pointer overflow-hidden rounded-xl"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero17;
