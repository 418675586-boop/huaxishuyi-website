"use client";

import LenticularCarousel from "@/components/react-bits/lenticular-carousel";

/** 卡片基准宽 375px（500×3/4），在此基础上放大 10% → 413px */
const CARD_WIDTH = Math.round(500 * (3 / 4) * 1.1);
const CARD_HEIGHT = Math.round(CARD_WIDTH / (3 / 4));
/** WebGL 舞台需明确高度；预留底部控件与卡片抬升空间 */
const STAGE_HEIGHT = CARD_HEIGHT + 72;

export type ValueCarouselItem = {
  src: string;
  meta: string;
  title: string;
  description: string;
  alt: string;
};

const DEFAULT_ITEMS: ValueCarouselItem[] = [
  {
    src: "/img/lenticular/value-hospital.png",
    meta: "医院层面",
    title: "提升统筹运营能力",
    description:
      "强化统一监管、运营分析与辅助决策，提升牵头医院区域统筹能力和品牌影响力。",
    alt: "医院层面",
  },
  {
    src: "/img/lenticular/value-primary.png",
    meta: "基层层面",
    title: "推动优质资源下沉",
    description:
      "提升基层检查、诊断、转诊及慢病管理能力，促进资源共享与服务同质化。",
    alt: "基层层面",
  },
  {
    src: "/img/lenticular/value-patient.png",
    meta: "群众层面",
    title: "优化就医服务体验",
    description:
      "减少重复检查，优化预约转诊与连续服务，让跨院区就医更顺畅、更便捷。",
    alt: "群众层面",
  },
  {
    src: "/img/lenticular/value-digital.png",
    meta: "数智化层面",
    title: "强化数智赋能支撑",
    description:
      "以数据与 AI 支撑风险预警、运营分析和智能辅助，提升医共体精细化管理能力。",
    alt: "数智化层面",
  },
];

export const HOSPITAL_VALUE_ITEMS: ValueCarouselItem[] = [
  {
    src: "/img/lenticular/hospital-value-ops.png",
    meta: "医院层面",
    title: "提升运营管理效能",
    description:
      "降低运营成本、提升管理效率，从子系统分散管理、人工统计，升级为实时监管、专题分析、趋势预警与决策支持。",
    alt: "医院层面",
  },
  {
    src: "/img/lenticular/hospital-value-clinical.png",
    meta: "诊疗层面",
    title: "提升医疗服务能力",
    description:
      "以 AI 辅助诊断、病历质控与临床决策支持赋能诊疗全流程，提升医疗质量与效率，助力精准医疗落地。",
    alt: "诊疗层面",
  },
  {
    src: "/img/lenticular/hospital-value-patient.png",
    meta: "患者层面",
    title: "优化就医服务体验",
    description:
      "诊前智能分诊、诊中智慧导诊、诊后健康管理，AI 全程陪伴，提供便捷、高效、个性化的连续就医服务。",
    alt: "患者层面",
  },
  {
    src: "/img/lenticular/hospital-value-research.png",
    meta: "科研层面",
    title: "加速临床科研创新",
    description:
      "以数据驱动科研创新，AI 辅助科研分析，为临床研究、课题管理与成果转化提供智能化支撑。",
    alt: "科研层面",
  },
];

/** 智慧医院/系统集成：四大核心能力卡片 */
export const SMART_HOSPITAL_VALUE_ITEMS: ValueCarouselItem[] = [
  {
    src: "/img/lenticular/smart-hospital-value-app.png",
    meta: "应用层面",
    title: "让系统集成更高效",
    description:
      "通过低代码可视化编排，快速打通医院业务系统，简化复杂对接，降低开发门槛，提升集成效率。",
    alt: "应用层面",
  },
  {
    src: "/img/lenticular/smart-hospital-value-data.png",
    meta: "数据层面",
    title: "让数据流转更顺畅",
    description:
      "依托 ELT / ETL 数据管道，实现多源数据自动采集、清洗与同步，构建统一数据底座。",
    alt: "数据层面",
  },
  {
    src: "/img/lenticular/smart-hospital-value-message.png",
    meta: "消息层面",
    title: "让核心链路更稳定",
    description:
      "统一管理 MQ 消息，支持订阅、发布与桥接，保障医嘱、事务等核心业务稳定可靠运行。",
    alt: "消息层面",
  },
  {
    src: "/img/lenticular/smart-hospital-value-api.png",
    meta: "管理层面",
    title: "让 API 治理更规范",
    description:
      "构建 API 全生命周期管理体系，统一发布、监控与权限管理，提升接口复用与资产价值。",
    alt: "管理层面",
  },
];

export function LenticularCarouselSection({
  title = "方案优势及价值",
  description = "覆盖医院、基层、群众与数智化四个维度，全面提升医共体运行效能",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  description?: string;
  items?: ValueCarouselItem[];
}) {
  return (
    <section className="flex w-full items-start bg-[#F8F8F8] px-4 py-[100px] dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white">
            {title}
          </h2>
          <p className="text-[16px] leading-tight text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>

        <div className="w-full" style={{ height: STAGE_HEIGHT }}>
          <LenticularCarousel
            items={items}
            initialIndex={0}
            cardWidth={CARD_WIDTH}
            aspectRatio="3 / 4"
            gap={16}
            borderRadius={14}
            loop
            autoplay
            autoplayDelay={3200}
            showControls
            showDots
            showLabels
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
