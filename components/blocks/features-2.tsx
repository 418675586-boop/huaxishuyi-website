"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Layers, Network, Boxes, RefreshCw, Bot } from "lucide-react";

export interface FeatureCardItem {
  label: string;
  description: string;
}

export interface FeatureEntry {
  title: string;
  icon: LucideIcon;
  image: string;
  card: {
    title: string;
    items: FeatureCardItem[];
  };
}

const DEFAULT_FEATURES: FeatureEntry[] = [
  {
    title: "总体架构",
    icon: Layers,
    image: "/img/solutions/architecture-overall.png",
    card: {
      title: "一个底座 · 五类应用 · 三大保障",
      items: [
        {
          label: "三大保障",
          description: "标准规范体系、安全保障体系、运维保障体系",
        },
        {
          label: "五类应用",
          description:
            "统一监管与决策管理、区域共享医疗服务、统一便民惠民服务、重点业务协同、统一运营管理",
        },
        {
          label: "一个底座",
          description:
            "（技术底座 + 数据底座 + 数智底座）统一身份认证、接口集成、数据交换、主数据管理、数据治理、分析建模、智能预警、AI辅助应用",
        },
      ],
    },
  },
  {
    title: "技术架构",
    icon: Network,
    image: "/img/solutions/architecture-tech.png",
    card: {
      title: "技术架构",
      items: [
        {
          label: "统一标准",
          description: "统一数据标准、接口规范与服务目录，保障互联互通",
        },
        {
          label: "集成互联",
          description: "打通 HIS、EMR、LIS、PACS 等系统，实现业务与数据协同",
        },
        {
          label: "开放能力",
          description: "以 API 与能力组件支撑医共体快速扩展与持续迭代",
        },
      ],
    },
  },
  {
    title: "三大底座",
    icon: Boxes,
    image: "/img/solutions/architecture-base.png",
    card: {
      title: "三大底座",
      items: [
        {
          label: "数据底座",
          description: "汇聚、治理与共享区域健康数据，支撑业务与分析应用",
        },
        {
          label: "平台底座",
          description: "提供统一身份、权限、应用支撑与运行管理能力",
        },
        {
          label: "智能底座",
          description: "构建 AI 模型、知识库与智能体运行环境，赋能业务场景",
        },
      ],
    },
  },
];

export const HOSPITAL_ARCHITECTURE_FEATURES: FeatureEntry[] = [
  {
    title: "总体架构",
    icon: Layers,
    image: "/img/solutions/architecture-overall.png",
    card: {
      title: "四层技术栈",
      items: [
        {
          label: "第四层 · 智能应用层",
          description: "临床应用、管理决策、患者服务、科研创新",
        },
        {
          label: "第三层 · AI 能力层",
          description: "算法服务、模型管理、算力调度、开放能力、智能体开发",
        },
        {
          label: "第二层 · 数据中台",
          description: "数据采集、数据治理、数据服务、数据资产、数据交换",
        },
        {
          label: "第一层 · 基础平台",
          description: "云基础设施、网络与安全、医院信息系统、智能硬件、集成平台",
        },
      ],
    },
  },
  {
    title: "数据飞轮",
    icon: RefreshCw,
    image: "/img/solutions/architecture-tech.png",
    card: {
      title: "持续进化闭环",
      items: [
        {
          label: "院内数据与清洗标注",
          description: "汇聚院内数据，完成清洗标注，形成高质量训练样本",
        },
        {
          label: "模型训练",
          description: "基于标注数据持续训练与优化模型能力",
        },
        {
          label: "应用反馈与强化学习",
          description: "应用产生反馈数据，通过强化学习反哺模型",
        },
        {
          label: "模型迭代闭环",
          description: "模型更强 → 应用更智能 → 产生更多优质反馈，形成良性循环",
        },
      ],
    },
  },
  {
    title: "AIOS 智能体平台",
    icon: Bot,
    image: "/img/solutions/architecture-base.png",
    card: {
      title: "医院级智能体开发与运行基座",
      items: [
        {
          label: "智能应用发布",
          description: "应用发布与运行管理，支撑业务系统深度对接",
        },
        {
          label: "大模型接入",
          description: "华西数医模型底层接入，连接大模型与上层智能应用",
        },
        {
          label: "智能体构建运行",
          description: "构建、运行、评估与监测一体化",
        },
        {
          label: "Harness 工程",
          description: "自然语言开发与低代码技能构建，能力复用",
        },
      ],
    },
  },
];

export function Features2({
  features = DEFAULT_FEATURES,
  description = "从总体、技术与核心底座三个维度，构建统一协同、数据贯通、智能赋能的数智化体系。",
}: {
  features?: FeatureEntry[];
  description?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [features.length]);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    }
  };

  const active = features[activeIndex]!;

  return (
    <section className="w-full bg-white px-4 py-[100px] sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col lg:pr-12 xl:pr-16">
            <div className="mb-8 md:mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-4 text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
              >
                方案架构
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-xl text-[16px] text-neutral-600 dark:text-neutral-400"
              >
                {description}
              </motion.p>
            </div>

            <div className="mb-8 h-px w-full bg-neutral-200 dark:bg-neutral-800 lg:w-[calc(100%+3rem)] xl:w-[calc(100%+4rem)]" />

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => handleFeatureClick(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-[background-color] duration-200 ${
                      isActive
                        ? "bg-neutral-100 dark:bg-neutral-900"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-400 dark:text-neutral-600"
                      }`}
                    />
                    <span
                      className={`text-base font-medium transition-colors duration-200 sm:text-lg ${
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] max-h-[650px] w-full overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-800"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-[100px] flex items-center justify-center">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeIndex}
                      initial={{ y: "250%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-250%" }}
                      transition={{
                        duration: 1.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute mx-auto h-full w-full"
                    >
                      <div className="relative h-full w-full">
                        <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/[0.07] p-[50px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_-8px_32px_rgba(255,255,255,0.04),0_0_20px_rgba(167,139,250,0.1),0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.28),inset_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-3xl backdrop-saturate-150">
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-white/20 via-white/8 to-transparent"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -left-6 top-0 h-1/2 w-1/2 bg-gradient-to-br from-violet-300/10 via-transparent to-transparent"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -right-4 top-0 h-1/3 w-1/3 bg-gradient-to-bl from-orange-200/8 via-transparent to-transparent"
                          />

                          <h3 className="relative mb-5 text-xl font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                            {active.card.title}
                          </h3>

                          <div className="relative space-y-4">
                            {active.card.items.map((item) => (
                              <div key={item.label} className="py-1">
                                <p className="mb-1.5 text-base font-medium text-white">
                                  {item.label}
                                </p>
                                <p className="text-sm leading-relaxed text-white/75">
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features2;
