"use client";

import SoftAurora from "@/components/SoftAurora";
import Grainient from "@/components/Grainient";
import ThreeDLetterSwap from "@/components/react-bits/3d-letter-swap";
import { motion, useReducedMotion } from "motion/react";
import {
  Paperclip,
  Lightbulb,
  Mic,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
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
    <section className="relative min-h-dvh w-full overflow-hidden bg-[#dff5f4] dark:bg-neutral-950">
      {isDark ? (
        <div className="absolute inset-0 z-0 h-full w-full bg-[#07001f]">
          <SoftAurora
            speed={0.55}
            scale={1.4}
            brightness={1.05}
            color1="#4b8eff"
            color2="#e32cff"
            noiseFrequency={2.2}
            noiseAmplitude={1.05}
            bandHeight={0.45}
            bandSpread={1.1}
            colorSpeed={0.85}
            enableMouseInteraction={false}
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_52%_at_42%_22%,rgba(255,255,255,0.8),rgba(255,255,255,0.12)_76%),linear-gradient(to_bottom,rgba(237,242,245,0.72)_4%,rgba(247,248,250,0.18)_62%,rgba(255,255,255,0)_100%)] dark:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-[radial-gradient(ellipse_38%_85%_at_52%_92%,rgba(169,176,242,0.58),rgba(169,176,242,0)_72%),radial-gradient(ellipse_32%_72%_at_88%_88%,rgba(116,177,239,0.5),rgba(116,177,239,0)_74%),linear-gradient(to_bottom,rgba(245,248,249,0),rgba(244,246,248,0.88))] dark:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_bottom,rgba(7,0,31,0.08)_5%,rgba(7,0,31,0.12)_55%,rgba(7,0,31,0.55)_100%)] dark:block"
      />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col items-start justify-center gap-6 px-4 py-20 sm:gap-0 lg:px-8">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 className="flex w-full flex-wrap items-center justify-center gap-x-[0.35em] text-center text-[40px] font-medium tracking-tight text-[#082f49] dark:text-white">
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
              构建新一代
            </ThreeDLetterSwap>
            <span className="inline-flex items-center gap-[0.12em]">
              <Image
                src="/svg/sparkling-2-fill.svg"
                alt=""
                width={100}
                height={100}
                className="h-[0.85em] w-[0.85em] shrink-0 object-contain dark:brightness-0 dark:invert"
                aria-hidden="true"
              />
              <ThreeDLetterSwap
                as="span"
                className="cursor-default text-[#2C2162] dark:text-white"
                flipDirection="bottom"
                staggerOrigin="center"
                staggerInterval={0.035}
                blur
                blurAmount={3}
                duration={0.7}
              >
                AI
              </ThreeDLetterSwap>
            </span>
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
              医疗应用
            </ThreeDLetterSwap>
          </h1>
        </motion.div>

        <motion.div
          className="w-full sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className="relative rounded-4xl rounded-b-[2.3rem] border border-black/5 bg-[#f8f8fa] p-3"
            style={{
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(47, 144, 58, 0.1)",
            }}
          >
            <div className="flex items-start gap-3">
              <textarea
                placeholder="有什么可以帮你"
                className="no-focus-ring mx-4 my-2 min-h-15 w-full resize-none bg-transparent text-gray-800 placeholder:text-gray-400"
                rows={2}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="focus-ring isolate flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="focus-ring isolate flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
                >
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  <span className="xs:inline hidden">Reasoning</span>
                </button>

                <button
                  type="button"
                  className="focus-ring isolate hidden h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 sm:flex"
                >
                  <Image
                    src="/svg/instance-line.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                  <span>智能体</span>
                </button>

                <button
                  type="button"
                  className="focus-ring isolate hidden h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-5 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 md:flex"
                >
                  <Image
                    src="/svg/cloud-line.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="shrink-0"
                  />
                  <span>Nemo云</span>
                </button>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="focus-ring isolate hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700 sm:flex"
                  aria-label="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="focus-ring bg-foreground dark:bg-background hover:bg-foreground/90 dark:hover:bg-background/90 isolate flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
                  aria-label="Send message"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
