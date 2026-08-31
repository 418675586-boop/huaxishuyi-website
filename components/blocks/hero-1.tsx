"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

export function Hero1() {
  return (
    <section className="flex w-full items-start bg-white px-4 py-12 sm:px-6 lg:items-center lg:px-8 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-neutral-300 p-1 transition-colors hover:border-neutral-600 sm:gap-3 dark:border-neutral-800 dark:hover:border-neutral-500"
            >
              <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white sm:text-sm dark:bg-white dark:text-black">
                新品
              </span>
              <span className="mr-2 text-sm text-neutral-900 sm:text-base dark:text-neutral-100">
                AI驱动的医联体协同平台
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl leading-[1.15] font-medium tracking-tight text-neutral-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white"
            >
              让优质医疗资源
              <br />
              真正下沉到基层
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-lg text-base leading-relaxed tracking-tight text-neutral-600 sm:text-lg dark:text-neutral-400"
            >
              以患者360全景与跨机构数据中台为底座，打通远程会诊、双向转诊与集团调度，构建连续医疗服务新生态。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full cursor-pointer rounded-full bg-black px-6 py-2.5 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 sm:w-auto sm:text-base dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                预约产品演示
              </motion.a>
              <motion.a
                href="#capabilities"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-300 py-2.5 pr-3 pl-5 text-sm font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-50 sm:w-auto sm:text-base dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900"
              >
                查看核心能力
                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-black dark:bg-white"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play className="h-3 w-3 fill-white dark:fill-black" />
                </motion.span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex select-none items-center gap-3 pt-2 sm:gap-4 sm:pt-4"
            >
              <div className="flex -space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-black text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-white dark:text-black">
                  基
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-black text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-white dark:text-black">
                  专
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-black text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm dark:border-neutral-950 dark:bg-white dark:text-black">
                  管
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">
                  7.7万+
                </span>
                <span className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
                  基层医疗机构覆盖（讯飞标杆）
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-auto w-full"
          >
            <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-4xl bg-neutral-100 transition-colors hover:bg-neutral-200 sm:min-h-[500px] dark:bg-neutral-900 dark:hover:bg-neutral-800">
              <img
                src="/img/products/ai-medical-alliance.jpeg"
                alt="AI医联体平台"
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
                      href="#capabilities"
                      className="flex h-full w-full cursor-pointer items-center justify-center rounded-[1.2em] border-none bg-black transition-opacity hover:opacity-90 dark:bg-white"
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
