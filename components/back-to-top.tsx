"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const SIZE = 48;
const STROKE = 2;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop(): ReactNode {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window === "undefined" ? 800 : window.innerHeight;
    setVisible(latest > threshold);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.min(1, Math.max(0, latest)));
  });

  useEffect(() => {
    const threshold = window.innerHeight;
    setVisible(window.scrollY > threshold);
    const onResize = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="回到顶部"
          className="fixed right-[50px] bottom-[110px] z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent text-neutral-950 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:text-white dark:hover:text-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950"
        >
          <svg
            className="pointer-events-none absolute inset-0"
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              className="opacity-15"
            />
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>
          <ArrowUp className="relative h-5 w-5" strokeWidth={2.25} />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
