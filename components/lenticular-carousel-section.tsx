"use client";

import LenticularCarousel from "@/components/react-bits/lenticular-carousel";

/** 卡片高度 500px，按 3/4 等比放大：宽 = 500 × 3/4 = 375 */
const CARD_HEIGHT = 500;
const CARD_WIDTH = Math.round(CARD_HEIGHT * (3 / 4));
/** WebGL 舞台需明确高度；预留底部控件与卡片抬升空间 */
const STAGE_HEIGHT = CARD_HEIGHT + 72;

const items = [
  {
    src: "/img/lenticular/molecular.jpg",
    flipSrc: "/img/lenticular/doctor.jpg",
    title: "分子医学新突破",
    meta: "最新动态",
    alt: "分子医学新突破",
  },
  {
    src: "/img/lenticular/gene.jpg",
    flipSrc: "/img/lenticular/portal.jpg",
    title: "基因治疗新突破",
    meta: "最新动态",
    alt: "基因治疗新突破",
  },
  {
    src: "/img/lenticular/agent.jpg",
    flipSrc: "/img/lenticular/research.jpg",
    title: "AI 分子医学智能体",
    meta: "最新动态",
    alt: "AI 分子医学智能体",
  },
  {
    src: "/img/lenticular/pelvic.jpg",
    flipSrc: "/img/lenticular/reproductive.jpg",
    title: "盆底医学专科平台",
    meta: "合作案例",
    alt: "华西妇幼盆底医学专科AI运营平台",
  },
  {
    src: "/img/lenticular/hospital.jpg",
    flipSrc: "/img/lenticular/pelvic.jpg",
    title: "智慧医院集成",
    meta: "解决方案",
    alt: "智慧医院系统集成",
  },
];

export function LenticularCarouselSection() {
  return (
    <section className="flex w-full items-start bg-[#F8F8F8] px-4 py-[100px] dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full min-w-0 max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white">
            场景透镜
          </h2>
          <p className="text-[16px] leading-tight text-neutral-600 dark:text-neutral-400">
            悬停卡片翻看正反面，浏览医疗 AI 产品与案例精选。
          </p>
        </div>

        <div className="w-full" style={{ height: STAGE_HEIGHT }}>
          <LenticularCarousel
            items={items}
            initialIndex={2}
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
