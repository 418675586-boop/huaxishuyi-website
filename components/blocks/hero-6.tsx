"use client";

import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SLIDE_DURATION_MS = 5000;

const slides = [
  {
    label: "合作案例",
    title: "华西妇幼盆底医学专科AI运营平台",
    subtitle:
      "以华西妇幼「盆小安」盆底专科智能体为核心，构建华西妇幼盆底医学专科AI运营平台。",
    description:
      "WEST CHINA WOMEN AND CHILDREN'S PELVIC FLOOR MEDICINE AI OPERATIONS PLATFORM",
    image: "/img/solutions/pelvic-floor-ai-operations-platform.png",
  },
  {
    label: "合作案例",
    title: "生殖医学中心AI数智服务一体化平台",
    subtitle: "覆盖青春期至更年期的患者全生命周期数字化健康管理体系",
    description:
      "REPRODUCTIVE MEDICINE CENTER AI DIGITAL INTELLIGENCE INTEGRATED SERVICE PLATFORM",
    image: "/img/solutions/reproductive-medicine-ai-platform.png",
  },
  {
    label: "合作案例",
    title: "川崎病患者健康服务平台",
    subtitle: "以 AI 健康管家和全病程管理平台为支撑，构建专病健康服务闭环",
    description: "KAWASAKI DISEASE PATIENT HEALTH SERVICE PLATFORM",
    image: "/img/solutions/healthcare-system-integration.png",
  },
] as const;

function SlideProgressBar({
  index,
  currentSlide,
  progress,
  onSelect,
}: {
  index: number;
  currentSlide: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  onSelect: (index: number) => void;
}) {
  const segmentStart = (index * 100) / slides.length;
  const segmentSize = 100 / slides.length;
  const heightMv = useMotionValue("0%");

  useEffect(() => {
    if (index !== currentSlide) {
      heightMv.set("0%");
      return;
    }

    const sync = (value: number) => {
      const pct = ((value - segmentStart) / segmentSize) * 100;
      heightMv.set(`${Math.max(0, Math.min(100, pct))}%`);
    };

    sync(progress.get());
    return progress.on("change", sync);
  }, [progress, heightMv, index, currentSlide, segmentStart, segmentSize]);

  return (
    <div
      className="group relative w-0.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
      onClick={() => onSelect(index)}
    >
      <div className="absolute inset-0 bg-neutral-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-neutral-700" />
      {index === currentSlide && (
        <motion.div
          className="absolute top-0 left-0 w-full origin-top bg-neutral-900 dark:bg-white"
          style={{ height: heightMv }}
        />
      )}
      {index < currentSlide && (
        <div className="absolute inset-0 bg-neutral-900 dark:bg-white" />
      )}
    </div>
  );
}

function MobileProgressBar({
  index,
  currentSlide,
  progress,
  onSelect,
}: {
  index: number;
  currentSlide: number;
  progress: ReturnType<typeof useMotionValue<number>>;
  onSelect: (index: number) => void;
}) {
  const segmentStart = (index * 100) / slides.length;
  const segmentSize = 100 / slides.length;
  const scaleX = useMotionValue(0);

  useEffect(() => {
    if (index !== currentSlide) {
      scaleX.set(0);
      return;
    }

    const sync = (value: number) => {
      const pct = (value - segmentStart) / segmentSize;
      scaleX.set(Math.max(0, Math.min(1, pct)));
    };

    sync(progress.get());
    return progress.on("change", sync);
  }, [progress, scaleX, index, currentSlide, segmentStart, segmentSize]);

  return (
    <div
      className="relative h-0.5 w-16 cursor-pointer overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"
      onClick={() => onSelect(index)}
    >
      {index === currentSlide && (
        <motion.div
          className="absolute inset-0 origin-left bg-neutral-900 dark:bg-white"
          style={{ scaleX }}
        />
      )}
      {index < currentSlide && (
        <div className="absolute inset-0 bg-neutral-900 dark:bg-white" />
      )}
    </div>
  );
}

export function Hero6() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inView, setInView] = useState(false);
  const overallProgress = useMotionValue(0);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const activeSlide = slides[currentSlide] ?? slides[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { rootMargin: "100px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let rafId = 0;
    let last = performance.now();
    const totalMs = SLIDE_DURATION_MS * slides.length;

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      progressRef.current = (progressRef.current + (dt / totalMs) * 100) % 100;
      overallProgress.set(progressRef.current);

      const nextSlide = Math.min(
        Math.floor((progressRef.current / 100) * slides.length),
        slides.length - 1
      );
      setCurrentSlide((prev) => (prev === nextSlide ? prev : nextSlide));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, overallProgress]);

  const handleSlideClick = (index: number) => {
    progressRef.current = (index / slides.length) * 100;
    overallProgress.set(progressRef.current);
    setCurrentSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] flex w-full items-start overflow-hidden bg-[#F8F8F8] px-4 py-[100px] sm:px-6 lg:items-center lg:px-8 dark:bg-transparent"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-16 xl:gap-20">
          <div className="flex flex-col justify-center space-y-8 lg:space-y-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 0.35,
                      staggerChildren: 0.06,
                      delayChildren: 0.04,
                    },
                  },
                  exit: {
                    opacity: 0,
                    transition: { duration: 0.22 },
                  },
                }}
                className="space-y-6"
              >
                <motion.span
                  variants={{
                    hidden: { y: 12, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="inline-flex h-[34px] w-fit items-center rounded-full border-[0.5px] border-neutral-900 bg-transparent px-4 text-[14px] font-normal text-neutral-900 dark:border-white dark:text-white"
                >
                  {activeSlide.label}
                </motion.span>

                <h1 className="text-[40px] leading-tight font-medium text-neutral-900 dark:text-white">
                  <motion.span
                    variants={{
                      hidden: { y: 14, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className="block whitespace-pre-line"
                  >
                    {activeSlide.title}
                  </motion.span>
                  <motion.span
                    variants={{
                      hidden: { y: 14, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                    className="mt-4 block text-[16px] font-normal leading-relaxed text-neutral-500 dark:text-neutral-500"
                  >
                    {activeSlide.subtitle}
                  </motion.span>
                </h1>

                <motion.p
                  variants={{
                    hidden: { y: 14, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                  className="max-w-xl text-[34px] leading-tight text-neutral-500 dark:text-neutral-400"
                >
                  {activeSlide.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden h-[500px] flex-col items-center justify-center gap-4 lg:flex">
            {slides.map((_, index) => (
              <SlideProgressBar
                key={index}
                index={index}
                currentSlide={currentSlide}
                progress={overallProgress}
                onSelect={handleSlideClick}
              />
            ))}
          </div>

          <div className="relative flex w-full items-center justify-center lg:justify-end">
            <div className="group relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[350px] lg:h-[500px] lg:w-full lg:max-w-md">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.06]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2 lg:hidden">
          {slides.map((_, index) => (
            <MobileProgressBar
              key={index}
              index={index}
              currentSlide={currentSlide}
              progress={overallProgress}
              onSelect={handleSlideClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
