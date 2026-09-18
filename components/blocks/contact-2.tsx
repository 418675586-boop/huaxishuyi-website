"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function Contact2() {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#F8F8F8] dark:bg-transparent">
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 text-[44px] font-medium leading-[1.15] tracking-tight text-neutral-900 dark:text-white"
                >
                  准备好开启
                  <br />
                  数智医疗新可能？
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-24 space-y-8 lg:mt-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white">
                      华西
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <p>成都华西数字医疗科技有限公司</p>
                    <p>成都市武侯区三环路南段69号双华数字健康产业园A3栋8F</p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <a
                      href="#"
                      className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      微信
                    </a>
                    <a
                      href="#"
                      className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      官网
                    </a>
                    <a
                      href="mailto:contact@huaxishuyi.com"
                      className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      邮箱
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-12 text-[44px] font-medium leading-[1.15] tracking-tight text-neutral-900 dark:text-white lg:mb-16"
              >
                联系我们
              </motion.h1>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      placeholder="姓名"
                      className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="职位"
                      className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="邮箱"
                    className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="公司 / 医院"
                    className="w-full border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="请输入您的留言…"
                    rows={1}
                    className="w-full resize-none border-b border-neutral-300 bg-transparent pb-3 text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:border-white"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      agreed
                        ? "border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white"
                        : "border-neutral-400 bg-transparent dark:border-neutral-600"
                    }`}
                  >
                    {agreed && (
                      <svg
                        className="h-3 w-3 text-white dark:text-neutral-950"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <label className="text-sm text-neutral-600 dark:text-neutral-400">
                    我已阅读并理解
                    <a
                      href="#"
                      className="underline transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      隐私声明
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="rounded-full bg-neutral-900 px-7 py-3 text-[14px] font-medium text-white transition-all hover:scale-105 dark:bg-white dark:text-neutral-900"
                  >
                    提交
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
