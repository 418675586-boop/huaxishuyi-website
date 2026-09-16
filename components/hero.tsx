"use client";

import Eclipse from "@/components/react-bits/eclipse";
import ThreeDLetterSwap from "@/components/react-bits/3d-letter-swap";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const read = (): boolean => {
      const classes = document.documentElement.classList;
      if (classes.contains("dark")) return true;
      if (classes.contains("light")) return false;
      return query.matches;
    };
    const update = (): void => setIsDark(read());

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    query.addEventListener("change", update);

    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);

  return isDark;
}

export function Hero(): ReactNode {
  const isDark = useIsDark();
  const reduceMotion = useReducedMotion();
  const animateFx = reduceMotion !== true;
  return (
    <section className="relative z-[1] min-h-dvh w-full overflow-hidden bg-white dark:bg-transparent">
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{ background: isDark ? "#0a0a0a" : "#ffffff" }}
      >
        <Eclipse
          className="h-full w-full"
          speed={1}
          radius={0.33}
          edgeSoftness={0.55}
          reach={1}
          turbulence={1}
          streaks={1}
          brightness={isDark ? 1 : 1.18}
          colorCycle={isDark ? 1 : 1}
          colors={
            isDark
              ? undefined
              : ["#A8C8EC", "#B8B8F0", "#B0D4F5", "#C4C0F2"]
          }
          backgroundColor={isDark ? "#0a0a0a" : "#ffffff"}
          coreColor={isDark ? "#0a0a0a" : "#ffffff"}
          opacity={1}
          cursorInteraction
          cursorStrength={1}
          cursorRadius={0.3}
          paused={!animateFx}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none dark:hidden"
      >
        <div className="absolute -top-[12%] left-[0%] h-[55%] w-[55%] rounded-full bg-[#A8C8EC]/55 blur-[110px]" />
        <div className="absolute top-[8%] right-[-5%] h-[50%] w-[50%] rounded-full bg-[#B8B8F0]/50 blur-[120px]" />
        <div className="absolute top-[18%] left-[32%] h-[40%] w-[40%] rounded-full bg-[#B0D4F5]/40 blur-[100px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.82))] dark:hidden"
      />
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-4 py-20 text-center lg:px-8">

        <div className="relative z-[1] flex w-fit max-w-[min(92vw,52rem)] flex-col items-center gap-5 sm:gap-6">
          <div className="flex w-full flex-col items-center gap-2.5 sm:gap-3">
          <motion.div
            className="flex w-fit items-center rounded-full border border-black/25 bg-black/10 p-1 dark:border-white/25 dark:bg-white/10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-black sm:px-4 sm:py-1.5 sm:text-sm dark:bg-white dark:text-black">
              MADM-V2
            </span>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="flex w-full justify-center text-[36px] font-semibold tracking-tight text-black sm:text-[48px] lg:text-[56px] dark:text-white">
              <ThreeDLetterSwap
                as="span"
                className="cursor-default"
                flipDirection="bottom"
                staggerOrigin="center"
                staggerInterval={0.035}
                blur
                blurAmount={3}
                duration={0.7}
              >
                华数智医大模型
              </ThreeDLetterSwap>
            </h1>
          </motion.div>
          </div>

          <motion.p
            className="max-w-3xl text-[22px] font-normal leading-snug tracking-[0.04em] text-black sm:text-[28px] lg:text-[32px] dark:text-white/90"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              delay: 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            循证医学AI内核 · 懂医疗更懂编程
          </motion.p>

          <motion.p
            className="max-w-[min(92vw,40rem)] text-[14px] font-normal leading-relaxed tracking-[0.02em] text-black/70 sm:text-[16px] dark:text-white/55"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.28,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            2025年1月完成核心算法备案 | 2026年8月完成大模型备案
          </motion.p>
        </div>
      </div>
    </section>
  );
}
