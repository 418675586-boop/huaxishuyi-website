"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Building2,
  CalendarCheck2,
  FlaskConical,
  Layers,
  Network,
  Share2,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { FeatureCardGlow } from "@/components/blocks/feature-card-glow";

export type Features12Card = {
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

const defaultCards: Features12Card[] = [
  {
    icon: Network,
    statement: "跨机构诊疗协同",
    description:
      "支持远程会诊、数字MDT、跨院诊疗对接、联合信息查询，实现上下级医院联动诊疗，打破信息壁垒。",
    points: ["远程会诊与远程查房", "数字MDT多学科协作", "跨院诊疗信息联合查询"],
    glow: "#d7c8f4",
  },
  {
    icon: ArrowDownToLine,
    statement: "优质资源下沉赋能",
    description:
      "上级专家知识库、数字分身赋能基层，辅助基层查房、病情评估、出院研判与专业咨询，提升基层诊疗能力。",
    points: ["专家知识库基层共享", "专家数字分身远程指导", "基层AI辅助诊断决策"],
    glow: "#f3cbb8",
  },
  {
    icon: CalendarCheck2,
    statement: "集团化资源调度",
    description:
      "实现多院区、医联体统筹排班、统一排床、号源与诊疗资源智能调配，集团化运营效率显著提升。",
    points: ["跨院区统筹排班排床", "号源智能调配", "诊疗资源全域调度"],
    glow: "#c5d8f6",
  },
  {
    icon: Layers,
    statement: "专科联盟精细化运营",
    description:
      "统一管理专科联盟资源，沉淀专科诊疗数据，支撑专科标准化建设与能力输出，推动专科同质化发展。",
    points: ["专科资源统一管理", "专科诊疗数据沉淀", "专科标准化建设输出"],
    glow: "#f0cfd6",
  },
  {
    icon: ArrowLeftRight,
    statement: "双向转诊闭环",
    description:
      "实现患者双向转诊、诊疗信息同步流转，上转患者享受优先诊疗、检查、住院，转诊响应率达100%。",
    points: ["线上智能转诊模块", "转诊信息同步流转", "绿色通道优先服务"],
    glow: "#c9e6dc",
  },
  {
    icon: Share2,
    statement: "检验检查结果互认",
    description:
      "打造检验、影像、心电、病理等资源共享中心，全面落实检验检查结果互认，互认项目达888项，减轻就医负担。",
    points: ["检验检查结果互认", "影像/心电/病理共享中心", "一次检查、全域互认"],
    glow: "#d0d6f6",
  },
  {
    icon: FlaskConical,
    statement: "科研与随访管理",
    description:
      "依托患者360全景数据，开展规范化院后随访、临床科研数据沉淀与分析，支撑连续医疗与科研协同。",
    points: ["患者360全景数据驱动", "规范化院后随访管理", "临床科研数据沉淀"],
    glow: "#c6e3ee",
  },
  {
    icon: ShieldCheck,
    statement: "平台全域管控运营",
    description:
      "实现机构人员、AI模型、知识库、内容安全的统一管理与全流程运营监控，保障跨机构业务合规高效运行。",
    points: ["统一权限与内容审计", "AI模型与知识库统一管理", "运营监控与风险稽核"],
    glow: "#e6d4f0",
  },
];

/** 医院数智化转型：落地场景四卡 */
export const HOSPITAL_FEATURES12_CARDS: Features12Card[] = [
  {
    icon: Building2,
    statement: "院内数智化建设",
    description:
      "面向医院核心业务场景，打造覆盖门诊、住院、检查检验与药事管理的智慧医疗体系。",
    points: ["核心业务全面覆盖", "院内服务协同联动", "医疗流程提质增效"],
    glow: "#d7c8f4",
  },
  {
    icon: Share2,
    statement: "区域协同服务",
    description:
      "面向医联体与区域医疗协同体系，推动资源共享、服务下沉与分级诊疗联动。",
    points: ["跨机构协同诊疗", "优质资源持续下沉", "区域服务同质提升"],
    glow: "#f3cbb8",
  },
  {
    icon: Stethoscope,
    statement: "专科能力建设",
    description:
      "面向妇幼、儿科及特色专科领域，提供更精准的 AI 支撑与专业化服务能力。",
    points: ["专科模型深度赋能", "精准诊疗能力提升", "专病专科场景适配"],
    glow: "#c5d8f6",
  },
  {
    icon: ShieldCheck,
    statement: "公卫治理支撑",
    description:
      "面向公共卫生管理场景，强化监测预警、健康管理与应急响应能力。",
    points: ["数据驱动治理决策", "疾病监测预警支撑", "公卫服务能力提升"],
    glow: "#f0cfd6",
  },
];

/** 智慧医院/系统集成：六大核心功能 */
export const SMART_HOSPITAL_FEATURES12_CARDS: Features12Card[] = [
  {
    icon: Layers,
    statement: "应用集成可视化",
    description:
      "统一接入 HIS、EMR、LIS、PACS 及互联网医院等业务系统，通过低代码可视化编排，打破烟囱式对接，提升集成效率与实施灵活性。",
    points: ["多系统一站式接入", "集成流程可视化编排", "医疗标准协议快速适配"],
    glow: "#d7c8f4",
  },
  {
    icon: Network,
    statement: "集成总线中枢",
    description:
      "以 API、ESB 与 MQ 为核心构建统一集成中枢，支撑协议转换、流程路由与服务编排，形成稳定高效的企业级集成总线能力。",
    points: ["API 网关统一入口", "企业服务总线 ESB", "流程编排与协议转换"],
    glow: "#c5d8f6",
  },
  {
    icon: Share2,
    statement: "数据集成自动化",
    description:
      "基于 ELT / ETL 数据管道能力，实现数据采集、清洗、转换与分发自动化，支撑多源异构数据汇聚，构建湖仓一体的数据底座。",
    points: ["自动化数据采集清洗", "跨系统数据同步汇聚", "湖仓一体数据底座"],
    glow: "#f3cbb8",
  },
  {
    icon: ArrowLeftRight,
    statement: "MQ 消息统一化",
    description:
      "统一消息中间件与事件管控体系，保障跨系统业务事件可靠流转，满足医嘱、事务、通知等核心场景的高并发与可追溯需求。",
    points: ["统一消息总线", "业务事件可靠投递", "消息监控与追溯"],
    glow: "#c9e6dc",
  },
  {
    icon: CalendarCheck2,
    statement: "API 管理标准化",
    description:
      "围绕 API 全生命周期建立统一治理体系，实现设计、发布、监控、复用与权限管理标准化，提升接口资产化运营能力。",
    points: ["标准化 API 发布治理", "接口资产统一运营", "复用率与成本优化"],
    glow: "#f0cfd6",
  },
  {
    icon: ShieldCheck,
    statement: "安全与运维底座",
    description:
      "覆盖信创适配、等级保护、安全审计与运维监控，保障平台稳定运行，支撑容器化部署、弹性扩展与高可用运维体系建设。",
    points: ["信创与等保合规", "全链路监控审计", "容器化高可用部署"],
    glow: "#d0d6f6",
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

type Features12Props = {
  badgeLabel?: string | null;
  title?: string;
  description?: string;
  cards?: Features12Card[];
  className?: string;
  /** 大屏列数，默认 4；六卡场景传 3 */
  columns?: 3 | 4;
};

const GRID_COLS_CLASS: Record<3 | 4, string> = {
  3: "mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 [&>*]:relative",
  4: "mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 [&>*]:relative",
};

export function Features12({
  badgeLabel = "核心功能",
  title = "八大核心能力 · 全维度跨机构协同",
  description = "从远程会诊到资源调度，从专科联盟到科研随访，一站式解决医联体核心运营需求",
  cards = defaultCards,
  className,
  columns = 4,
}: Features12Props = {}) {
  return (
    <section
      id="capabilities"
      className={
        className
          ? `relative z-[1] w-full px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8 ${className}`
          : "relative z-[1] w-full bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {badgeLabel ? (
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
            >
              {badgeLabel}
            </motion.span>
          ) : null}
          <motion.h2
            variants={fadeUp}
            className={`${badgeLabel ? "mt-4" : ""} max-w-3xl text-[36px] font-semibold leading-[1.15] tracking-tight text-neutral-950 dark:text-white`}
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={GRID_COLS_CLASS[columns]}
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
                    <p className="mt-3 line-clamp-4 min-h-[calc(1.625em*4)] text-[13px] leading-relaxed text-neutral-600 sm:text-[14px] dark:text-neutral-400">
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

export default Features12;
