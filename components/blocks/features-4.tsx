"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, House, Users, Bot } from "lucide-react";

export interface Features4Tab {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  features: {
    title: string;
    description: string;
  }[];
}

export interface Features4Props {
  autoPlay?: boolean;
  autoPlayDelay?: number;
  heading?: string;
  description?: string;
  tabs?: Features4Tab[];
}

const DEFAULT_TABS: Features4Tab[] = [
  {
    icon: Building2,
    title: "医院层面",
    description: "提升统一监管与运营决策能力",
    detail:
      "提升医共体统一监管、统一决策、统一运营能力，增强牵头医院区域统筹能力与品牌影响力。",
    features: [
      {
        title: "统一监管",
        description: "从分散管理逐步转向实时监管与专题分析",
      },
      {
        title: "运营决策",
        description: "通过数据统计、趋势分析辅助管理决策",
      },
      {
        title: "资源统筹",
        description: "强化牵头医院对区域医疗资源的统筹配置能力",
      },
      {
        title: "品牌提升",
        description: "提升医共体整体服务能力与区域品牌影响力",
      },
    ],
  },
  {
    icon: House,
    title: "基层层面",
    description: "促进资源下沉，提升基层诊疗能力",
    detail:
      "提升基层检查、诊断、转诊、慢病及重点人群健康管理能力，推动优质医疗资源下沉。",
    features: [
      {
        title: "能力补齐",
        description: "弥补基层医疗机构资源与专业能力短板",
      },
      {
        title: "上下协同",
        description: "形成“基层检查、上级诊断、结果共享”服务模式",
      },
      {
        title: "慢病管理",
        description: "强化慢病及重点人群连续健康管理",
      },
      {
        title: "同质服务",
        description: "推动基层医疗服务标准化与同质化",
      },
    ],
  },
  {
    icon: Users,
    title: "群众层面",
    description: "优化跨院就医体验与连续服务",
    detail:
      "减少重复检查，优化预约转诊与连续服务体验，让群众跨院区就医更加顺畅、高效。",
    features: [
      {
        title: "减少重复检查",
        description: "推进检查检验结果共享与互认",
      },
      {
        title: "便捷转诊",
        description: "改善预约、转诊和跨机构就医流程",
      },
      {
        title: "连续服务",
        description: "强化连续用药、慢病及老幼健康服务",
      },
      {
        title: "体验提升",
        description: "减少等待、重复和流程断点",
      },
    ],
  },
  {
    icon: Bot,
    title: "数智化层面",
    description: "强化数据治理与 AI 辅助服务",
    detail:
      "以数据治理、智能分析和 AI 能力支撑医共体精细化管理及连续健康服务。",
    features: [
      {
        title: "风险识别",
        description: "逐步形成风险识别与质量预警能力",
      },
      {
        title: "运营分析",
        description: "支撑医共体运营监测与管理分析",
      },
      {
        title: "AI 辅助",
        description: "强化影像、心电、病理、检验等场景辅助分析",
      },
      {
        title: "数字医生",
        description: "构建 AI 服务与数字医生能力，支撑连续健康管理",
      },
    ],
  },
];

export function Features4({
  autoPlay = true,
  autoPlayDelay = 5000,
  heading = "方案优势及价值",
  description = "覆盖医院、基层、群众与数智化四个维度，全面提升医共体运行效能",
  tabs = DEFAULT_TABS,
}: Features4Props) {
  const [activeTab, setActiveTab] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, autoPlayDelay);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayDelay]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);

    if (autoPlay && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, autoPlayDelay);
    }
  };

  const active = tabs[activeTab]!;

  return (
    <section className="w-full bg-white px-4 py-[100px] sm:px-6 lg:px-8 dark:bg-transparent">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex max-w-3xl flex-col gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[16px] text-neutral-600 dark:text-neutral-400"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-4 lg:col-span-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === index;

              return (
                <motion.button
                  key={tab.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => handleTabClick(index)}
                  className={`flex w-full flex-1 items-start rounded-3xl bg-white p-4 text-left shadow-[0_0_24px_rgba(0,0,0,0.06)] transition-[box-shadow,ring-color] duration-200 md:p-6 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none ${
                    isActive
                      ? "ring-1 ring-neutral-900/10 dark:ring-white/20"
                      : "hover:shadow-[0_0_28px_rgba(0,0,0,0.09)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                          : "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`truncate text-[16px] font-semibold ${
                          isActive
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {tab.title}
                      </h3>
                      <p
                        className={`mt-0.5 truncate text-[14px] ${
                          isActive
                            ? "text-neutral-600 dark:text-neutral-400"
                            : "text-neutral-500"
                        }`}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex lg:col-span-8">
            <div className="flex min-h-[520px] flex-1 flex-col rounded-3xl bg-white p-6 shadow-[0_0_24px_rgba(0,0,0,0.06)] md:min-h-[560px] md:p-8 lg:p-10 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex flex-1 flex-col"
                >
                  <div className="mb-8">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-white/10">
                      <active.icon className="h-8 w-8 text-neutral-900 dark:text-white" />
                    </div>

                    <h3 className="mb-3 text-[28px] font-bold tracking-tight text-neutral-900 dark:text-white">
                      {active.title}
                    </h3>

                    <p className="text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {active.detail}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {active.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-start gap-3 rounded-xl bg-[#F8F8F8] p-4 dark:bg-white/5"
                      >
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                          <svg
                            className="h-4 w-4 text-white dark:text-neutral-900"
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
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[16px] font-semibold text-neutral-900 dark:text-white">
                            {feature.title}
                          </p>
                          <p className="mt-0.5 text-[14px] text-neutral-600 dark:text-neutral-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features4;
