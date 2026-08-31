"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  FileText,
  GitBranch,
  Layers,
  Network,
  Stethoscope,
  Tags,
  Workflow,
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
    icon: Workflow,
    statement: "双模式交互",
    description:
      "固定表单 + AI自主追问结合，兼顾操作便捷性与病史完整性。表单保障标准化采集，AI追问补齐个性化病情。",
    points: [
      "专科定制结构化表单",
      "AI动态递进式追问",
      "自然语言+点选双模式",
    ],
  },
  {
    icon: Stethoscope,
    statement: "临床循证驱动",
    description:
      "遵循真实医师问诊逻辑，复刻临床标准化问诊框架，不漏关键病史维度，采集逻辑符合临床诊疗规范。",
    points: [
      "主诉-现病史-既往史-用药史-过敏史",
      "覆盖100+科室标准化问诊路径",
      "递进式采集，模拟医生思维链",
    ],
  },
  {
    icon: FileText,
    statement: "结构化病历自动生成",
    description:
      "自动输出标准化结构化病历，遵循门诊电子病历书写规范，同步至HIS医生工作站，支持直接复用和编辑。",
    points: [
      "主诉、现病史、既往史自动提取",
      "病历书写时长缩短50%",
      "医生一键引用，支持编辑修改",
    ],
  },
  {
    icon: Tags,
    statement: "智能标签与重点标注",
    description:
      "为医生提供病情摘要、智能标签、重点标注，前置完成患者全维度病史收集，接诊时一目了然。",
    points: ["病情摘要自动凝练", "关键风险标签高亮", "疑似诊断方向提示"],
  },
  {
    icon: GitBranch,
    statement: "全链路院内打通",
    description:
      "预问诊病历直推HIS医生工作站和护士工作站，支持直接复用编辑，实现「患者未到，信息先到」。",
    points: ["HIS/EMR深度对接", "医生端同步查阅", "护士端入院信息同步"],
  },
  {
    icon: Network,
    statement: "多渠道全域覆盖",
    description:
      "线下门诊、线上问诊、基层医联体统一适配，全渠道一致体验，数据互通互联。",
    points: [
      "公众号/小程序/自助终端",
      "互联网医院/远程问诊",
      "基层社区/医联体终端",
    ],
  },
  {
    icon: Layers,
    statement: "专科个性化配置",
    description:
      "根据儿科、妇科、盆底等不同专科的业务需求，配置专科前置表单、问诊策略和结构化输出内容。",
    points: [
      "专科问诊策略模板",
      "专科量表嵌入（如盆底量表）",
      "专科病历结构定制",
    ],
  },
  {
    icon: AlertTriangle,
    statement: "风险预警与急危重症识别",
    description:
      "基于高危症状、体征及危急值进行急危重症智能识别与转诊提示，保障患者安全，前置风险防控。",
    points: ["高危症状实时识别", "急危重症转诊提示", "多维度病历质控"],
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

export function Features12AiPreConsultation() {
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
            七大核心能力 · 覆盖诊前采集全流程
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            双模式交互、临床循证驱动、全链路院内打通，打造真正的「诊前信息前置」
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
                className={`group relative z-0 flex min-h-[320px] origin-center cursor-pointer flex-col rounded-3xl p-6 transition-[background-color,color] duration-300 ease-out sm:min-h-[340px] sm:p-7 ${
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

export default Features12AiPreConsultation;
