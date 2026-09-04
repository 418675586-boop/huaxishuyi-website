"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const AUTO_PLAY_MS = 10_000;

export type HowItWorks3Item = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const defaultItems: HowItWorks3Item[] = [
  {
    id: 1,
    title: "第一阶段·筑牢底座，统一基础能力",
    description:
      "完成顶层设计、标准规范、统一认证、接口集成、数据交换及主数据管理，构建稳定统一的技术与数据底座。",
    image: "/img/solutions/how-it-works/phase-1-foundation.png",
  },
  {
    id: 2,
    title: "第二阶段·聚焦场景，快速形成成效",
    description:
      "优先建设监管、共享、预约、转诊及结果互认等重点场景，同步推进 AI 辅助分析与数字医生试点，快速形成可感知成果。",
    image: "/img/solutions/how-it-works/phase-2-scenarios.png",
  },
  {
    id: 3,
    title: "第三阶段·全面协同，持续数智升级",
    description:
      "逐步完善重点业务协同与统一运营管理，推动数据、业务与智能能力深度融合，形成持续演进的医共体数智化体系。",
    image: "/img/solutions/how-it-works/phase-3-synergy.png",
  },
];

/** 医院数智化转型：演进路径四阶段 */
export const HOSPITAL_HOW_IT_WORKS_ITEMS: HowItWorks3Item[] = [
  {
    id: 1,
    title: "第一阶段·夯实基座，信息化基础建设",
    description:
      "完成电子病历（达六级）、集成平台与数据中心建设，打通医院信息系统，实现临床数据标准化、结构化。",
    image: "/img/solutions/how-it-works/phase-1-foundation.png",
  },
  {
    id: 2,
    title: "第二阶段·模型驱动，大模型训练与部署",
    description:
      "基于院内高质量数据训练医疗大模型，引入 RSI 递归自进化与强化学习，实现模型持续进化。",
    image: "/img/solutions/how-it-works/phase-2-scenarios.png",
  },
  {
    id: 3,
    title: "第三阶段·智能应用，三大产品全面落地",
    description:
      "部署数字医生、AI 患者服务助手与医生智能工作台，三线并进推动患者服务与临床辅助智能化。",
    image: "/img/solutions/how-it-works/phase-3-synergy.png",
  },
  {
    id: 4,
    title: "第四阶段·智慧生态，智慧医疗新生态",
    description:
      "拓展更多场景 AI 智能体，向医联体/区域输出能力，推动人机协同从辅助走向协作，持续共赢。",
    image: "/img/solutions/how-it-works/phase-3-synergy.png",
  },
];

type HowItWorks3Props = {
  embedded?: boolean;
  items?: HowItWorks3Item[];
  title?: string;
  description?: string;
};

export function HowItWorks3({
  embedded = false,
  items = defaultItems,
  title = "落地场景与实施路径",
  description = "“先底座，后重点，再深化”三步走，确保项目有序推进",
}: HowItWorks3Props) {
  const [activeItem, setActiveItem] = useState(items[0]?.id ?? 1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentItem =
    items.find((item) => item.id === activeItem) ?? items[0]!;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveItem((prev) => {
        const currentIndex = items.findIndex((item) => item.id === prev);
        const nextIndex = (currentIndex + 1) % items.length;
        return items[nextIndex]!.id;
      });
    }, AUTO_PLAY_MS);
  }, [items]);

  useEffect(() => {
    setActiveItem(items[0]?.id ?? 1);
  }, [items]);

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoPlay]);

  useEffect(() => {
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, [items]);

  const handleItemClick = (id: number) => {
    setActiveItem(id);
    startAutoPlay();
  };

  const content = (
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
              {title}
            </h2>
            <p className="mb-6 max-w-xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {description}
            </p>

            <div className="relative border-l-2 border-dashed border-neutral-200 dark:border-neutral-800">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative cursor-pointer group"
                  onClick={() => handleItemClick(item.id)}
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 -ml-px bg-neutral-900 dark:bg-white"
                    initial={false}
                    animate={{
                      opacity: activeItem === item.id ? 1 : 0,
                      scaleY: activeItem === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ originY: 0.5 }}
                  />
                  <motion.div
                    className="pl-6"
                    initial={false}
                    animate={{ paddingTop: 12, paddingBottom: 12 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h3
                      className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
                        activeItem === item.id
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-400 dark:text-neutral-600"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{
                        height: activeItem === item.id ? "auto" : 0,
                        opacity: activeItem === item.id ? 1 : 0,
                        marginTop: activeItem === item.id ? 8 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-md text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: "600px" }}
          >
            <div
              className="relative h-auto w-[384px] max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#05070A] p-3 sm:p-4 dark:border-white/10"
              style={{
                transform: "rotateY(-20deg) rotateX(8deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* 参考流体光晕：纯 CSS，避免背景图加载卡顿 */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(ellipse 70% 55% at 78% 12%, rgba(80, 120, 149, 0.55) 0%, transparent 58%),
                    radial-gradient(ellipse 65% 50% at 82% 38%, rgba(232, 144, 140, 0.42) 0%, transparent 55%),
                    radial-gradient(ellipse 80% 70% at 18% 88%, rgba(232, 144, 140, 0.5) 0%, transparent 60%),
                    radial-gradient(ellipse 75% 65% at 48% 92%, rgba(62, 42, 93, 0.65) 0%, transparent 62%),
                    radial-gradient(ellipse 40% 30% at 42% 48%, rgba(255, 236, 210, 0.28) 0%, transparent 50%),
                    linear-gradient(165deg, #05070A 0%, #0a0c14 45%, #05070A 100%)
                  `,
                }}
              />

              <div className="relative z-10 aspect-square w-full overflow-hidden rounded-xl bg-white shadow-lg">
                <AnimatePresence initial={false} mode="sync">
                  <motion.img
                    key={activeItem}
                    src={currentItem.image}
                    alt={currentItem.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section
      className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 dark:bg-neutral-950"
      aria-label={title}
    >
      <div className="mx-auto w-full max-w-[1200px]">{content}</div>
    </section>
  );
}

export default HowItWorks3;
