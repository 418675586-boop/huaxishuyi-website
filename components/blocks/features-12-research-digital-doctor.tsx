"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  CalendarDays,
  CircleCheck,
  Link2,
  RefreshCw,
  Save,
  Target,
} from "lucide-react";

type FeatureCard = {
  icon: LucideIcon;
  statement: string;
  description: string;
  points: [string, string, string];
};

function DoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M486.4 630.4c-19.2 19.2-48 19.2-67.2 3.2l-137.6-131.2-32 35.2 137.6 131.2c38.4 35.2 96 35.2 134.4-3.2l281.6-297.6-35.2-32L486.4 630.4z"
      />
      <path
        fill="currentColor"
        d="M512 51.2c-252.8 0-460.8 204.8-460.8 460.8s204.8 460.8 460.8 460.8 460.8-204.8 460.8-460.8S764.8 51.2 512 51.2zM512 924.8c-227.2 0-412.8-185.6-412.8-412.8s185.6-412.8 412.8-412.8 412.8 185.6 412.8 412.8S739.2 924.8 512 924.8z"
      />
    </svg>
  );
}

const cards: FeatureCard[] = [
  {
    icon: BookOpen,
    statement: "知识库智能生成",
    description:
      "上传课题方案或管理协议，AI 自动结构化为纳入排除标准、必采内容、随访模板，秒级完成知识库构建。",
    points: [
      "协议文档 AI 自动解析",
      "纳入排除标准自动提取",
      "随访模板智能生成",
    ],
  },
  {
    icon: Target,
    statement: "患者精准入组匹配",
    description:
      "数字医生多轮问诊生成 SOAP 病历，自动匹配 Top3 适合的研究项目/管理组，入组效率提升 3-5 倍。",
    points: [
      "多轮问诊生成 SOAP 病历",
      "Top3 项目智能推荐",
      "入排标准逐条匹配（92.1% 准确率）",
    ],
  },
  {
    icon: CircleCheck,
    statement: "入组智能审核",
    description:
      "患者画像与入组标准自动逐条对比（通过/不通过/待确认），AI 给出初审、终审决策建议，审核效率倍增。",
    points: ["逐条标准自动比对", "初审/终审决策建议", "审核依据可回溯"],
  },
  {
    icon: CalendarDays,
    statement: "全流程随访管控",
    description:
      "入组后任务日历驱动每日待办，病历库与对话历史可回溯，建立长期健康管理与随访照护。",
    points: ["随访计划自动生成", "任务日历驱动执行", "随访数据实时采集"],
  },
  {
    icon: Link2,
    statement: "科研数据全链路溯源",
    description:
      "病历可定位到对话原文，审核可回溯到推理依据，签署可重放签名轨迹，满足 GCP 合规要求。",
    points: [
      "病历 → 对话原文可定位",
      "审核 → 推理依据可回溯",
      "签署 → 签名轨迹可重放",
    ],
  },
  {
    icon: Bot,
    statement: "多智能体分工协同",
    description:
      "搭载问诊、匹配、随访、结构化抽取、审核等多类专属智能体，精准适配科研全场景细分业务需求。",
    points: ["专属智能体各司其职", "智能体间协同编排", "场景化精细分工"],
  },
  {
    icon: Save,
    statement: "知识资产沉淀复用",
    description:
      "沉淀医生专属审核策略、随访方案、补采策略，形成标准化科研资产，实现能力持续迭代复用。",
    points: [
      "审核策略数字化沉淀",
      "随访方案标准化复用",
      "科研能力持续迭代",
    ],
  },
  {
    icon: RefreshCw,
    statement: "跨端数据高度统一",
    description:
      "依托标准化研究知识库，保障医患两端字段、标准、流程一致性，规避业务偏差，确保科研数据质量。",
    points: ["医患两端字段统一", "标准与流程一致性", "业务偏差自动检测"],
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Features12ResearchDigitalDoctor() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      className="relative z-[1] w-full bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex w-fit rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
          >
            核心功能
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-3xl text-[36px] font-semibold leading-[1.15] tracking-tight text-neutral-950 dark:text-white"
          >
            八大核心能力 · 覆盖科研全链路
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            从知识库一键生成到科研数据全链路溯源，构建端到端的智能化科研闭环
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 [&>*]:relative"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            const active = activeIndex === index;

            return (
              <motion.article
                key={card.statement}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                onClick={() =>
                  setActiveIndex((current) =>
                    current === index ? null : index,
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex((current) =>
                      current === index ? null : index,
                    );
                  }
                }}
                className={`group relative z-0 flex origin-center min-h-[320px] cursor-pointer flex-col rounded-3xl p-6 transition-[background-color,color] duration-300 ease-out sm:min-h-[340px] sm:p-7 ${
                  active
                    ? "bg-neutral-950 text-white shadow-[0_0_28px_rgba(0,0,0,0.14)] dark:bg-white dark:text-neutral-950 dark:shadow-[0_0_28px_rgba(0,0,0,0.28)]"
                    : "bg-white text-neutral-950 shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
                }`}
              >
                <Icon
                  className={`icon-flip-once h-8 w-8 shrink-0 ${
                    active
                      ? "text-white dark:text-neutral-950"
                      : "text-neutral-900 dark:text-white"
                  }`}
                  strokeWidth={1.5}
                />

                <div className="mt-auto flex flex-col gap-4">
                  <div>
                    <h3
                      className={`text-[20px] font-medium leading-snug tracking-tight sm:text-[22px] ${
                        active
                          ? "text-white dark:text-neutral-950"
                          : "text-neutral-900 dark:text-white"
                      }`}
                    >
                      {card.statement}
                    </h3>
                    <p
                      className={`mt-3 line-clamp-3 min-h-[calc(1.625em*3)] text-[13px] leading-relaxed sm:text-[14px] ${
                        active
                          ? "text-neutral-400 dark:text-neutral-600"
                          : "text-neutral-600 dark:text-neutral-400"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className={`flex items-center gap-2 text-[12px] leading-snug sm:text-[13px] ${
                          active
                            ? "text-neutral-300 dark:text-neutral-700"
                            : "text-neutral-600 dark:text-neutral-300"
                        }`}
                      >
                        <DoneIcon className="h-4 w-4 shrink-0 text-[#cdcdcd]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Features12ResearchDigitalDoctor;
