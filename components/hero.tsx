"use client";

import Grainient from "@/components/Grainient";
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

const RING_COLORS =
  "conic-gradient(from 210deg, #d6a5ff 0%, #ffd7a8 33%, #4b8eff 66%, #d6a5ff 100%)";

/** Light-mode ring: sized to match dark Eclipse (~0.33 × viewport height diameter). */
function LightEclipseRing({ animate }: { animate: boolean }): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center dark:hidden"
    >
      <div className="relative aspect-square h-[min(59.4vh,648px)] w-[min(59.4vh,648px)]">
        {/* Bottom outer glow / soft shadow — stays anchored under the circle */}
        <div
          className="absolute bottom-[-8%] left-1/2 h-[42%] w-[88%] -translate-x-1/2 rounded-[100%] blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(75,142,255,0.42) 0%, rgba(214,165,255,0.28) 42%, rgba(255,215,168,0.16) 68%, transparent 78%)",
          }}
        />
        <div
          className="absolute bottom-[-2%] left-1/2 h-[22%] w-[72%] -translate-x-1/2 rounded-[100%] blur-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(75,142,255,0.35) 0%, rgba(214,165,255,0.2) 55%, transparent 75%)",
          }}
        />

        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={
            animate
              ? { opacity: 1, scale: [1, 1.028, 1] }
              : { opacity: 1, scale: 1 }
          }
          transition={
            animate
              ? {
                  opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  scale: {
                    duration: 4.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  },
                }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <motion.div
            className="absolute inset-[-10%] rounded-full blur-3xl"
            style={{ background: RING_COLORS }}
            animate={
              animate ? { opacity: [0.28, 0.48, 0.28] } : { opacity: 0.36 }
            }
            transition={
              animate
                ? { duration: 4.6, ease: "easeInOut", repeat: Infinity }
                : undefined
            }
          />
          <div className="absolute inset-[2.5px] rounded-full bg-white/20" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: RING_COLORS,
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
              boxShadow:
                "0 0 22px rgba(75,142,255,0.32), 0 0 48px rgba(214,165,255,0.24), 0 0 36px rgba(255,215,168,0.18), 0 18px 40px rgba(75,142,255,0.22), 0 28px 64px rgba(214,165,255,0.18)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Hero(): ReactNode {
  const isDark = useIsDark();
  const reduceMotion = useReducedMotion();
  const animateFx = reduceMotion !== true;
  return (
    <section className="relative z-[1] min-h-dvh w-full overflow-hidden bg-[#dff5f4] dark:bg-transparent">
      {isDark ? (
        <div className="absolute inset-0 z-0 h-full w-full bg-[#0a0a0a]">
          <Eclipse
            className="h-full w-full"
            speed={1}
            radius={0.33}
            edgeSoftness={0.55}
            reach={1}
            turbulence={1}
            streaks={1}
            brightness={1}
            colorCycle={1}
            backgroundColor="#0a0a0a"
            coreColor="#0a0a0a"
            opacity={1}
            cursorInteraction
            cursorStrength={1}
            cursorRadius={0.3}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 h-full w-full">
          <Grainient
            timeSpeed={animateFx ? 0.55 : 0}
            colorBalance={0.05}
            warpStrength={1.2}
            warpFrequency={5.2}
            warpSpeed={2.4}
            warpAmplitude={42}
            blendAngle={12}
            blendSoftness={0.12}
            rotationAmount={420}
            noiseScale={1.8}
            grainAmount={0.08}
            grainScale={2.2}
            grainAnimated={animateFx}
            contrast={1.15}
            gamma={1.05}
            saturation={0.95}
            zoom={0.95}
            color1="#d6a5ff"
            color2="#ffd7a8"
            color3="#4b8eff"
            className="h-full w-full"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_65%_52%_at_42%_22%,rgba(255,255,255,0.55),rgba(255,255,255,0.08)_76%),linear-gradient(to_bottom,rgba(237,242,245,0.45)_4%,rgba(247,248,250,0.12)_62%,rgba(255,255,255,0)_100%)] dark:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[46%] bg-[radial-gradient(ellipse_38%_85%_at_52%_92%,rgba(169,176,242,0.4),rgba(169,176,242,0)_72%),radial-gradient(ellipse_32%_72%_at_88%_88%,rgba(116,177,239,0.35),rgba(116,177,239,0)_74%),linear-gradient(to_bottom,rgba(245,248,249,0),rgba(244,246,248,0.72))] dark:hidden"
      />
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-4 py-20 text-center lg:px-8">
        {!isDark ? <LightEclipseRing animate={animateFx} /> : null}

        <div className="relative z-[1] flex w-fit max-w-[min(92vw,52rem)] flex-col items-center gap-5 sm:gap-6">
          <div className="flex w-full flex-col items-center gap-2.5 sm:gap-3">
          <motion.div
            className="flex w-fit items-center rounded-full border border-neutral-300 bg-white/80 p-1 backdrop-blur-sm dark:border-white/25 dark:bg-white/10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white sm:px-4 sm:py-1.5 sm:text-sm dark:bg-white dark:text-black">
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
