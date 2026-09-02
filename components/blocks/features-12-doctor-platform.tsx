"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BedDouble,
  CalendarDays,
  FilePenLine,
  FolderCheck,
  Gem,
  Mic,
  ShieldCheck,
} from "lucide-react";
import { FeatureCardGlow } from "@/components/blocks/feature-card-glow";

type FeatureCard = {
  icon: LucideIcon;
  statement: string;
  description: string;
  points: [string, string, string];
  glow: string;
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
    icon: Mic,
    statement: "智能语音录入",
    description:
      "医生口述实时转写，自动匹配标准病历模板，支持医学术语精准识别，单份病历录入时间缩减84%。",
    points: [
      "实时语音转写，准确率98%+",
      "医学术语自动识别纠错",
      "录入时间14.7→2.3分钟",
    ],
    glow: "#d7c8f4",
  },
  {
    icon: FilePenLine,
    statement: "AI病历生成",
    description:
      "基于多模态智能体，自动生成结构化SOAP病历、入院记录、病程记录，临床采纳率与回写率达87.9%。",
    points: [
      "SOAP病历自动生成",
      "入院/病程/出院记录一键生成",
      "书写效率提升60%，日省2小时",
    ],
    glow: "#f3cbb8",
  },
  {
    icon: ShieldCheck,
    statement: "病历质控反馈",
    description:
      "病历书写规范实时质控，自动检测缺陷与错别字，一键纠错，病历甲级率从85%提升至98%。",
    points: [
      "事前、事中、事后全流程质控",
      "缺陷自动检测与一键纠错",
      "当日完成率68%→99.2%",
    ],
    glow: "#c5d8f6",
  },
  {
    icon: AlertTriangle,
    statement: "风险智能预警",
    description:
      "自动识别危急值、药物相互作用、病情恶化趋势，主动推送风险预警，医疗差错率下降40%。",
    points: [
      "危急值实时识别推送",
      "药物相互作用智能拦截",
      "病情恶化趋势预测预警",
    ],
    glow: "#f0cfd6",
  },
  {
    icon: CalendarDays,
    statement: "日程待办管理",
    description:
      "工作日程、门诊排班、会诊通知、随访任务、行政事务统一管理，智能提醒确保任务不遗漏。",
    points: ["多来源任务统一汇聚", "智能优先级排序提醒", "全流程任务闭环跟踪"],
    glow: "#c9e6dc",
  },
  {
    icon: Gem,
    statement: "门诊接诊增强",
    description:
      "接诊前自动调阅患者历史数据生成360患者画像，接诊中辅助诊断决策，接诊后自动生成病历。",
    points: [
      "患者画像前置呈现",
      "循证辅助诊断决策建议",
      "接诊-病历-质控全流程闭环",
    ],
    glow: "#d0d6f6",
  },
  {
    icon: BedDouble,
    statement: "住院查房协同",
    description:
      "查房前自动生成患者病情摘要与重点关注项，查房中语音记录查房意见，查房后自动生成查房记录。",
    points: ["病情摘要自动生成", "查房语音实时转写", "查房记录自动成文"],
    glow: "#c6e3ee",
  },
  {
    icon: FolderCheck,
    statement: "专科报告辅助",
    description:
      "支持历史报告自动调取与病情变化对比，报告错别字自动检测一键纠错，解读报告临床意义。",
    points: [
      "历史报告自动调取对比",
      "病情变化趋势自动分析",
      "报告解读与辅助建议",
    ],
    glow: "#e6d4f0",
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

export function Features12DoctorPlatform() {
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
            八大核心能力 · 覆盖医务工作全场景
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            从语音录入到病历生成，从质控反馈到风险预警，构建全场景智能工作台
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

            return (
              <motion.article
                key={card.statement}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group relative z-0 flex min-h-[320px] origin-center flex-col overflow-hidden rounded-3xl bg-white p-6 text-neutral-950 shadow-[0_0_24px_rgba(0,0,0,0.06)] sm:min-h-[340px] sm:p-7 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
              >
                <FeatureCardGlow color={card.glow} delayMs={index * 700} />

                <Icon
                  className="icon-flip-once relative z-[1] h-8 w-8 shrink-0 text-neutral-900 dark:text-white"
                  strokeWidth={1.5}
                />

                <div className="relative z-[1] mt-auto flex flex-col gap-4">
                  <div>
                    <h3 className="text-[20px] font-medium leading-snug tracking-tight text-neutral-900 sm:text-[22px] dark:text-white">
                      {card.statement}
                    </h3>
                    <p className="mt-3 line-clamp-3 min-h-[calc(1.625em*3)] text-[13px] leading-relaxed text-neutral-600 sm:text-[14px] dark:text-neutral-400">
                      {card.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-[12px] leading-snug text-neutral-600 sm:text-[13px] dark:text-neutral-300"
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

export default Features12DoctorPlatform;
