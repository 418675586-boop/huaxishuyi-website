"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, Crosshair, Flag, Scale } from "lucide-react";

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
    icon: ClipboardList,
    title: "建设必要性",
    description: "不止建系统，更是治理与服务能力工程",
    detail:
      "以牵头医院为核心，贯通成员单位，整合医疗、公卫、医保、药事、养老等协同服务，形成“基层检查、上级诊断、结果共享、同质服务”格局。",
    features: [
      {
        title: "能力工程",
        description: "支撑牵头医院治理、服务与 AI 赋能能力建设",
      },
      {
        title: "上下贯通",
        description: "以统一平台连接牵头医院与基层成员单位",
      },
      {
        title: "业务整合",
        description: "覆盖医疗、公卫、医保、药事、养老等协同服务",
      },
      {
        title: "服务同质",
        description: "推动基层检查、上级诊断、结果共享与同质服务",
      },
    ],
  },
  {
    icon: Crosshair,
    title: "建设定位",
    description: "统一数智底座，而非分散子系统堆叠",
    detail:
      "面向医共体构建统一数智底座，覆盖管理、业务、协同与数智赋能四类平台，支撑区域统筹、资源共享与连续服务。",
    features: [
      {
        title: "管理平台",
        description: "支撑牵头医院对医共体整体运营的统筹管理",
      },
      {
        title: "业务平台",
        description: "支撑优质医疗资源下沉与区域业务共享",
      },
      {
        title: "协同平台",
        description: "支撑群众连续服务与基层能力提升",
      },
      {
        title: "数智赋能平台",
        description: "支撑数据治理、智能分析与 AI 能力落地",
      },
    ],
  },
  {
    icon: Flag,
    title: "总体目标",
    description: "实现“五个统一”，提升整体运行效能",
    detail:
      "通过统一平台、标准、数据、协同与安全，提升牵头医院统筹力、基层服务力、资源利用效率与群众满意度。",
    features: [
      {
        title: "统一平台与标准",
        description: "跨院区、跨机构支撑，统一身份、主数据、接口与规则",
      },
      {
        title: "统一数据",
        description: "贯通诊疗、公卫、管理与运营数据链路",
      },
      {
        title: "统一协同",
        description: "形成共享中心、公共服务与协同管理闭环",
      },
      {
        title: "统一安全",
        description: "构建覆盖网络、应用、数据与运维的安全体系",
      },
    ],
  },
  {
    icon: Scale,
    title: "建设原则",
    description: "先底座、再见效、后深化",
    detail:
      "在继承发展基础上坚持集约共享、业务协同、分步实施，并确保建设过程安全可控、合规可管。",
    features: [
      {
        title: "继承发展",
        description: "最大限度利用既有系统与基础设施",
      },
      {
        title: "集约共享",
        description: "避免重复建设与低水平堆叠",
      },
      {
        title: "业务协同",
        description: "以业务驱动、管理导向推进落地",
      },
      {
        title: "分步实施与安全可控",
        description: "优先底座与关键场景，满足网络安全与等保要求",
      },
    ],
  },
];

export function Features4({
  autoPlay = true,
  autoPlayDelay = 5000,
  heading = "方案概述",
  description = "以数字化手段推动医共体真正形成责任、服务、管理和发展共同体",
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
