"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import AccordionGallery from "@/components/react-bits/accordion-gallery";
import StaggeredText from "@/components/react-bits/staggered-text";

const galleryItems = [
  {
    image: "/img/products/ai-doctor-platform.jpeg",
    label: "AI医生应用平台",
    link: "/products/ai-doctor-platform",
  },
  {
    image: "/img/products/ai-pre-consultation.jpeg",
    label: "AI预问诊系统",
    link: "/products/ai-pre-consultation",
  },
  { image: "/img/products/ai-health-portal.jpeg", label: "AI健康门户" },
  {
    image: "/img/products/research-digital-doctor.jpeg",
    label: "研究型数字医生平台",
    link: "/products/research-digital-doctor",
  },
  {
    image: "/img/products/ai-medical-alliance.jpeg",
    label: "AI医联体平台",
    link: "/products/ai-medical-alliance",
  },
];

export function AiProductsSection() {
  const [activeIndex, setActiveIndex] = useState(4);

  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) =>
        (current + direction + galleryItems.length) % galleryItems.length,
    );
  };

  return (
    <section
      id="products"
      className="relative z-[1] flex w-full items-start bg-[#F8F8F8] px-4 py-[100px] sm:px-6 lg:px-8 dark:bg-transparent"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1200px] overflow-hidden">
        <div className="mb-8 flex flex-col gap-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            <StaggeredText
              as="h2"
              text="AI 医疗智能产品"
              segmentBy="chars"
              direction="bottom"
              delay={70}
              blur={false}
              className="justify-start text-[44px] font-semibold tracking-tight text-neutral-950 dark:text-white"
            />
            <StaggeredText
              as="p"
              text="AI 医疗智能产品通过数据分析提供精准诊断、个性化治疗和实时健康监测，提升医疗效率和患者体验。"
              segmentBy="words"
              direction="bottom"
              delay={35}
              blur={false}
              className="justify-start text-[16px] leading-tight text-neutral-600 dark:text-neutral-400"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => move(-1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
              aria-label="查看上一个产品"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
              aria-label="查看下一个产品"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <AccordionGallery
          items={galleryItems}
          defaultImage="/img/products/ai-products-default.jpg"
          defaultIndex={4}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          expandRatio={0.58}
          height={420}
          gap={20}
          trigger="hover"
          grayscale={false}
          tilt={0}
          parallax={0}
          className="max-w-full overflow-hidden"
        />
      </div>
    </section>
  );
}
