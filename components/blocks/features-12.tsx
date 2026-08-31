"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  CalendarCheck2,
  FlaskConical,
  Layers,
  Network,
  Share2,
  ShieldCheck,
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
    icon: Network,
    statement: "跨机构诊疗协同",
    description:
      "支持远程会诊、数字MDT、跨院诊疗对接、联合信息查询，实现上下级医院联动诊疗，打破信息壁垒。",
    points: ["远程会诊与远程查房", "数字MDT多学科协作", "跨院诊疗信息联合查询"],
  },
  {
    icon: ArrowDownToLine,
    statement: "优质资源下沉赋能",
    description:
      "上级专家知识库、数字分身赋能基层，辅助基层查房、病情评估、出院研判与专业咨询，提升基层诊疗能力。",
    points: ["专家知识库基层共享", "专家数字分身远程指导", "基层AI辅助诊断决策"],
  },
  {
    icon: CalendarCheck2,
    statement: "集团化资源调度",
    description:
      "实现多院区、医联体统筹排班、统一排床、号源与诊疗资源智能调配，集团化运营效率显著提升。",
    points: ["跨院区统筹排班排床", "号源智能调配", "诊疗资源全域调度"],
  },
  {
    icon: Layers,
    statement: "专科联盟精细化运营",
    description:
      "统一管理专科联盟资源，沉淀专科诊疗数据，支撑专科标准化建设与能力输出，推动专科同质化发展。",
    points: ["专科资源统一管理", "专科诊疗数据沉淀", "专科标准化建设输出"],
  },
  {
    icon: ArrowLeftRight,
    statement: "双向转诊闭环",
    description:
      "实现患者双向转诊、诊疗信息同步流转，上转患者享受优先诊疗、检查、住院，转诊响应率达100%。",
    points: ["线上智能转诊模块", "转诊信息同步流转", "绿色通道优先服务"],
  },
  {
    icon: Share2,
    statement: "检验检查结果互认",
    description:
      "打造检验、影像、心电、病理等资源共享中心，全面落实检验检查结果互认，互认项目达888项，减轻就医负担。",
    points: ["检验检查结果互认", "影像/心电/病理共享中心", "一次检查、全域互认"],
  },
  {
    icon: FlaskConical,
    statement: "科研与随访管理",
    description:
      "依托患者360全景数据，开展规范化院后随访、临床科研数据沉淀与分析，支撑连续医疗与科研协同。",
    points: ["患者360全景数据驱动", "规范化院后随访管理", "临床科研数据沉淀"],
  },
  {
    icon: ShieldCheck,
    statement: "平台全域管控运营",
    description:
      "实现机构人员、AI模型、知识库、内容安全的统一管理与全流程运营监控，保障跨机构业务合规高效运行。",
    points: ["统一权限与内容审计", "AI模型与知识库统一管理", "运营监控与风险稽核"],
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

export function Features12() {
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
            八大核心能力 · 全维度跨机构协同
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            从远程会诊到资源调度，从专科联盟到科研随访，一站式解决医联体核心运营需求
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
                  setActiveIndex((current) => (current === index ? null : index))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex((current) =>
                      current === index ? null : index
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
                        <DoneIcon
                          className="h-4 w-4 shrink-0 text-[#cdcdcd]"
                        />
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

export default Features12;
