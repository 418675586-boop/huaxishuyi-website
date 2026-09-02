"use client";

import LenticularCarousel from "@/components/react-bits/lenticular-carousel";

/** 卡片基准宽 375px（500×3/4），在此基础上放大 10% → 413px */
const CARD_WIDTH = Math.round(500 * (3 / 4) * 1.1);
const CARD_HEIGHT = Math.round(CARD_WIDTH / (3 / 4));
/** WebGL 舞台需明确高度；预留底部控件与卡片抬升空间 */
const STAGE_HEIGHT = CARD_HEIGHT + 72;

const items = [
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

export function LenticularCarouselSection() {
  return (
    <section className="flex w-full items-start bg-[#F8F8F8] px-4 py-[100px] dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white">
            方案优势及价值
          </h2>
          <p className="text-[16px] leading-tight text-neutral-600 dark:text-neutral-400">
            覆盖医院、基层、群众与数智化四个维度，全面提升医共体运行效能
          </p>
        </div>

        <div className="w-full" style={{ height: STAGE_HEIGHT }}>
          <LenticularCarousel
            items={items}
            initialIndex={0}
            cardWidth={CARD_WIDTH}
            aspectRatio="3 / 4"
            gap={26}
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
