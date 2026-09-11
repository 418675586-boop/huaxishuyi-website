"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import StaggeredText from "@/components/react-bits/staggered-text";

const stories = [
  {
    name: "华数智医大模型",
    quote: "循证医学AI内核，赋能医院高质、数智发展",
    image: "/img/ai-agent-foundation.png",
    video: "/video/medical-platform-demo.mp4",
  },
  {
    name: "NEMO云",
    quote: "全栈信创适配体系\n支撑医疗大模型全生命周期",
    image: "/img/ai-agent-ecosystem.png",
    video: "/video/medical-platform-demo.mp4",
  },
  {
    name: "NEMO AIOS",
    quote: '全院智能体矩阵\n实现"千院千面"的智能化转型',
    image: "/img/medical-large-model-card.png",
    video: "/video/medical-platform-demo.mp4",
  },
];

export default function SocialProof12() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const moveCards = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const step = rail.clientWidth * 0.46;
    const atStart = rail.scrollLeft <= 2;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;

    if (direction === 1 && atEnd) {
      rail.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === -1 && atStart) {
      rail.scrollTo({ left: rail.scrollWidth, behavior: "smooth" });
      return;
    }

    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVideoOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <section className="relative z-[1] flex w-full items-start bg-white px-4 py-[150px] sm:px-6 lg:px-8 dark:bg-transparent">
      <div className="mx-auto w-full min-w-0 max-w-[1200px] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-col gap-2">
            <StaggeredText
              as="h2"
              text="AI智能体底座·驱动医疗新生态"
              segmentBy="chars"
              direction="bottom"
              delay={70}
              blur={false}
              className="justify-start text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
            />
            <StaggeredText
              as="p"
              text="智能体深度协同，重塑医疗服务模式，构建全生命周期健康新生态。"
              segmentBy="words"
              direction="bottom"
              delay={35}
              blur={false}
              className="justify-start text-[16px] leading-tight text-neutral-600 dark:text-neutral-400"
            />
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => moveCards(-1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
              aria-label="查看上一个视频"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveCards(1)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
              aria-label="查看下一个视频"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <div
          ref={railRef}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:mt-10 sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative isolate aspect-3/4 w-full shrink-0 basis-[88%] snap-start cursor-pointer overflow-hidden rounded-2xl bg-white [clip-path:inset(0_round_1rem)] [transform:translateZ(0)] sm:aspect-4/3 sm:basis-[64%] lg:basis-[44%]"
            >
              <SpotlightCard
                className="h-full w-full"
                spotlightColor="rgba(255, 255, 255, 0.48)"
              >
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 [backface-visibility:hidden] group-hover:scale-105"
                />
                <div className="media-image-overlay" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-end p-5 sm:p-7">
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-[10px]">
                      <span className="text-lg font-semibold text-white sm:text-2xl">
                        {s.name}
                      </span>
                      <p className="whitespace-nowrap text-[14px] leading-none font-normal text-white/75">
                        {s.quote}
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (s.video) setIsVideoOpen(true);
                      }}
                      whileHover={s.video ? { scale: 1.08 } : {}}
                      whileTap={s.video ? { scale: 0.94 } : {}}
                      className={`group/play flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white bg-white shadow-lg transition-colors sm:h-12 sm:w-12 ${
                        s.video
                          ? "cursor-pointer hover:bg-white/90"
                          : "cursor-not-allowed"
                      }`}
                      aria-label={
                        s.video ? `播放${s.name}视频` : `${s.name}视频即将上线`
                      }
                      disabled={!s.video}
                    >
                      <Play className="h-3 w-3 fill-black text-black sm:h-4 sm:w-4" />
                    </motion.button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setIsVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="视频播放器"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                aria-label="关闭视频"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <video
                src="/video/medical-platform-demo.mp4"
                className="max-h-[82vh] w-full bg-black object-contain"
                controls
                autoPlay
                playsInline
              >
                您的浏览器暂不支持视频播放。
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
