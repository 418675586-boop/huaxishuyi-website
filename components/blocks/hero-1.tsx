"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function Hero1() {
  return (
    <section className="relative flex w-full items-start overflow-hidden bg-white px-4 pt-[calc(66px+3rem)] pb-12 sm:px-6 sm:pt-[calc(66px+3rem)] sm:pb-16 lg:items-center lg:px-8 dark:bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none"
      >
        <div className="absolute -top-[12%] left-[0%] h-[55%] w-[55%] rounded-full bg-[#A8C8EC]/55 blur-[110px] dark:hidden" />
        <div className="absolute top-[8%] right-[-5%] h-[50%] w-[50%] rounded-full bg-[#B8B8F0]/50 blur-[120px] dark:hidden" />
        <div className="absolute top-[18%] left-[32%] h-[40%] w-[40%] rounded-full bg-[#B0D4F5]/40 blur-[100px] dark:hidden" />
        <div className="absolute -top-[14%] left-[6%] hidden h-[52%] w-[52%] rounded-full bg-[rgba(43,79,212,0.22)] blur-[130px] dark:block" />
        <div className="absolute top-[6%] right-[4%] hidden h-[48%] w-[48%] rounded-full bg-[rgba(107,91,149,0.18)] blur-[120px] dark:block" />
        <div className="absolute top-[16%] left-[36%] hidden h-[36%] w-[36%] rounded-full bg-[rgba(122,31,110,0.14)] blur-[110px] dark:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-fit cursor-default items-center gap-2 rounded-full border border-neutral-300 p-1 transition-colors sm:gap-3 dark:border-neutral-800"
            >
              <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white sm:text-xs dark:bg-white dark:text-black">
                新闻动态
              </span>
              <span className="mr-2 text-xs text-neutral-900 sm:text-sm dark:text-neutral-100">
                华西数医 · 最新资讯
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[44px] leading-[1.15] font-medium tracking-tight text-neutral-900 dark:text-white"
            >
              洞察医疗数智前沿
              <br />
              见证华西数医每一步
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-lg text-[16px] leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400"
            >
              汇集公司公告、行业活动与创新实践，持续呈现华西数医在 AI
              医疗领域的最新动态与落地成果。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <a
                href="#news-list"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-7 sm:py-3"
              >
                浏览最新动态
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <Link
                href="/about"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white/60 px-5 py-2.5 text-[14px] font-medium text-neutral-900 backdrop-blur transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-7 sm:py-3"
              >
                了解华西数医
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex select-none items-center gap-3 pt-2 sm:gap-4 sm:pt-4"
            >
              <div className="flex -space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-neutral-900 text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-white dark:text-black">
                  讯
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-neutral-700 text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-neutral-200 dark:text-black">
                  研
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-neutral-500 text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-neutral-400 dark:text-black">
                  告
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">
                  7+
                </span>
                <span className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
                  近期发布的公司新闻与公告
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-auto w-full"
          >
            <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-4xl bg-neutral-100 transition-colors sm:min-h-[500px] dark:bg-neutral-900">
              <img
                src="/img/news-hero-medical-insight.jpg?v=3"
                alt="洞察医疗数智前沿"
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
                  <div className="rounded-tl-4xl bg-white pt-4 pl-4 dark:bg-neutral-950">
                    <a
                      href="#news-list"
                      className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-[1.2em] border-none bg-black transition-opacity hover:opacity-90 sm:h-24 sm:w-24 dark:bg-white"
                      aria-label="浏览最新动态"
                    >
                      <ArrowRight className="-rotate-45 h-6 w-6 text-white dark:text-neutral-950" />
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
