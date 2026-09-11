"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineEntry {
  id: number;
  title: string;
  date: string;
  month: string;
  year: string;
  description: string;
  image: string;
}

interface About2Props {
  displayNavigation?: boolean;
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: 1,
    title: "公司成立",
    date: "2023年3月",
    month: "3月",
    year: "2023",
    description:
      "由四川大学华西第二医院与武侯发展集团等联合发起，华西数医正式成立，专注人工智能与医疗数智化转型。",
    image: "/img/about/timeline-founding.png",
  },
  {
    id: 2,
    title: "定址成都",
    date: "2023年6月",
    month: "6月",
    year: "2023",
    description:
      "总部落地成都，立足成都市建圈强链产业规划，服务区域医疗健康产业数智升级。",
    image: "/img/about/timeline-chengdu.png",
  },
  {
    id: 3,
    title: "AI 全栈能力",
    date: "2024年3月",
    month: "3月",
    year: "2024",
    description:
      "构建 AI 全栈能力体系，赋能医院数智转型，提升医疗服务效率与精准度。",
    image: "/img/about/timeline-ai-stack.png",
  },
  {
    id: 4,
    title: "多模态融合",
    date: "2024年9月",
    month: "9月",
    year: "2024",
    description:
      "以数智化与 AI 助力医院实现多模态融合，打通影像、数据与临床协同链路。",
    image: "/img/about/timeline-multimodal.png",
  },
  {
    id: 5,
    title: "可信数据空间",
    date: "2025年4月",
    month: "4月",
    year: "2025",
    description:
      "建设高质量数据集与可信数据空间，为医疗行业提供安全、高效的数据基础设施。",
    image: "/img/about/timeline-data.png",
  },
  {
    id: 6,
    title: "AI 医院建设",
    date: "2025年11月",
    month: "11月",
    year: "2025",
    description:
      "创新助力医疗机构实现「AI 医院」建设，推动我国医疗健康产业数智化转型升级。",
    image: "/img/about/timeline-ai-hospital.png",
  },
];

export default function About2({ displayNavigation = true }: About2Props = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % TIMELINE_DATA.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [resetKey]);

  const scrollToIndex = (index: number) => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const itemWidth = container.scrollWidth / TIMELINE_DATA.length;
      const scrollPosition = itemWidth * index;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
    setResetKey((prev) => prev + 1);
  };

  const handleNext = () => {
    const newIndex = Math.min(TIMELINE_DATA.length - 1, activeIndex + 1);
    setActiveIndex(newIndex);
    scrollToIndex(newIndex);
    setResetKey((prev) => prev + 1);
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
    setResetKey((prev) => prev + 1);
  };

  const activeEntry = TIMELINE_DATA[activeIndex];

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 dark:bg-transparent">
      <div className="mx-auto w-full max-w-[1200px]">
        <ContentCard entry={activeEntry} />

        <div className="mt-12 sm:mt-16">
          <Timeline
            activeIndex={activeIndex}
            onIndexChange={handleIndexChange}
            displayNavigation={displayNavigation}
            onPrevious={handlePrevious}
            onNext={handleNext}
            timelineRef={timelineRef}
          />
        </div>
      </div>
    </section>
  );
}

function ContentCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] dark:border-white/15 dark:bg-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_50px_-20px_rgba(0,0,0,0.45)] dark:backdrop-blur-2xl">
      {/* Soft diffuse fills — left text area only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[58%] overflow-hidden"
      >
        <div className="absolute -left-[15%] top-[-10%] h-[75%] w-[80%] rounded-full bg-[#C9DBF5]/55 blur-[90px] dark:bg-[rgba(90,130,220,0.16)]" />
        <div className="absolute left-[5%] bottom-[-20%] h-[60%] w-[70%] rounded-full bg-[#DCE8F8]/50 blur-[80px] dark:bg-[rgba(70,110,200,0.12)]" />
      </div>

      <div className="relative z-[1] grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-between h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`year-${entry.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
                {entry.year}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${entry.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-white">
                {entry.title}
              </h2>

              <p className="text-base tracking-tight text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                {entry.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full lg:max-w-xs aspect-square max-h-[300px] mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-neutral-200 dark:bg-white/10">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Timeline({
  activeIndex,
  onIndexChange,
  displayNavigation,
  onPrevious,
  onNext,
  timelineRef,
}: {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  displayNavigation: boolean;
  onPrevious: () => void;
  onNext: () => void;
  timelineRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="space-y-8">
      <div
        ref={timelineRef}
        className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="min-w-[900px] space-y-8">
          <div className="grid grid-cols-6 gap-8">
            {TIMELINE_DATA.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => onIndexChange(index)}
                className="text-left whitespace-nowrap"
              >
                <div
                  className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                    index === activeIndex
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  {entry.title}
                </div>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-neutral-200 dark:bg-white/15" />

            <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2"
              initial={false}
              animate={{
                width:
                  activeIndex === 0
                    ? 0
                    : `calc(((100% - (5 * 2rem)) / 6) * ${activeIndex} + (2rem * ${activeIndex}))`,
              }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />

            <div className="relative grid grid-cols-6 gap-8">
              {TIMELINE_DATA.map((entry, index) => {
                const isActive = index === activeIndex;
                const isPassed = index <= activeIndex;

                return (
                  <button
                    key={entry.id}
                    onClick={() => onIndexChange(index)}
                    className="flex flex-col items-start"
                  >
                    <div className="relative w-full flex justify-start">
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 ${
                          isPassed
                            ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
                            : "bg-white dark:bg-white/10 border-neutral-200 dark:border-white/20"
                        }`}
                        animate={{
                          scale: isActive ? 1.4 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-8">
            {TIMELINE_DATA.map((entry, index) => (
              <button
                key={entry.id}
                onClick={() => onIndexChange(index)}
                className="text-left whitespace-nowrap"
              >
                <div
                  className={`text-xs sm:text-sm transition-colors duration-200 ${
                    index === activeIndex
                      ? "text-neutral-900 dark:text-white font-medium"
                      : "text-neutral-400 dark:text-neutral-600"
                  }`}
                >
                  {entry.date}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {displayNavigation && (
        <div className="flex justify-center gap-2 md:hidden">
          <button
            onClick={onPrevious}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-900 dark:text-white" />
          </button>
          <button
            onClick={onNext}
            disabled={activeIndex === TIMELINE_DATA.length - 1}
            className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-neutral-900 dark:text-white" />
          </button>
        </div>
      )}

      <div className="hidden md:block space-y-8">
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {TIMELINE_DATA.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onIndexChange(index)}
              className="text-left"
            >
              <div
                className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  index === activeIndex
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-400 dark:text-neutral-600"
                }`}
              >
                {entry.title}
              </div>
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-neutral-200 dark:bg-white/15" />

          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2 sm:hidden"
            initial={false}
            animate={{
              width:
                activeIndex === 0
                  ? 0
                  : `calc(((100% - (5 * 0.5rem)) / 6) * ${activeIndex} + (0.5rem * ${activeIndex}))`,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          />

          <motion.div
            className="hidden sm:block absolute top-1/2 left-0 h-0.5 bg-neutral-900 dark:bg-white -translate-y-1/2"
            initial={false}
            animate={{
              width:
                activeIndex === 0
                  ? 0
                  : `calc(((100% - (5 * 1rem)) / 6) * ${activeIndex} + (1rem * ${activeIndex}))`,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          />

          <div className="relative grid grid-cols-6 gap-2 sm:gap-4">
            {TIMELINE_DATA.map((entry, index) => {
              const isActive = index === activeIndex;
              const isPassed = index <= activeIndex;

              return (
                <button
                  key={entry.id}
                  onClick={() => onIndexChange(index)}
                  className="flex flex-col items-start"
                >
                  <div className="relative w-full flex justify-start">
                    <motion.div
                      className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 ${
                        isPassed
                          ? "bg-neutral-900 dark:bg-white border-neutral-900 dark:border-white"
                          : "border-neutral-200 bg-white dark:border-white/20 dark:bg-white/10"
                      }`}
                      animate={{
                        scale: isActive ? 1.4 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {TIMELINE_DATA.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onIndexChange(index)}
              className="text-left"
            >
              <div
                className={`text-xs border transition-colors w-fit px-2 py-1 rounded-full duration-200 ${
                  index === activeIndex
                    ? "text-white bg-neutral-900 border-neutral-500/20"
                    : "text-neutral-400 dark:text-neutral-600 border-transparent"
                }`}
              >
                {entry.date}
              </div>
            </button>
          ))}
        </div>

        {displayNavigation && (
          <div className="hidden md:flex justify-end gap-2">
            <button
              onClick={onPrevious}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-900 dark:text-white" />
            </button>
            <button
              onClick={onNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className="w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-neutral-900 dark:text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
