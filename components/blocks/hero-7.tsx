"use client";

import SoftAurora from "@/components/SoftAurora";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const HOSPITAL_HERO_TAGS = [
  "451亿 | 市场规模持续增长",
  "80-150套 | 系统高度复杂",
  "85% | 数据互联受阻",
] as const;

const CAROUSEL_IMAGES: string[] = [];

function useIsDark() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const read = () => {
      const classes = document.documentElement.classList;
      if (classes.contains("dark")) return true;
      if (classes.contains("light")) return false;
      return query.matches;
    };
    const update = () => setIsDark(read());
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

type Hero7Props = {
  badgeLabel?: string;
  badgePrefix?: string;
  title?: string;
  description?: string;
  tags?: string[];
  /** 保留兼容；SoftAurora 背景下不再渲染轮播图 */
  images?: string[];
  badgePrefixClassName?: string;
  badgeLabelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function Hero7({
  badgeLabel = "医院数智化转型解决方案",
  badgePrefix = "解决方案",
  title = "数智驱动医疗·智慧引领未来",
  description = "以AI赋能为核心引擎，构建以患者为中心的智慧医疗服务体系，推动医院高质量发展",
  tags = [...HOSPITAL_HERO_TAGS],
  images: _images = CAROUSEL_IMAGES,
  badgePrefixClassName,
  badgeLabelClassName,
  titleClassName,
  descriptionClassName,
}: Hero7Props) {
  const isDark = useIsDark();

  return (
    <section
      className={cn(
        "relative z-[1] flex h-[678px] w-full items-center overflow-hidden",
        isDark ? "bg-[#07001f]" : "bg-white",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {isDark ? (
          <SoftAurora key="dark" enableMouseInteraction={false} />
        ) : (
          <SoftAurora
            key="light"
            lightMode
            color1="#A8C8EC"
            color2="#C4C0F2"
            brightness={0.55}
            enableMouseInteraction={false}
          />
        )}
      </div>
      {isDark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/45"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2] select-none"
          >
            <div className="absolute -top-[12%] left-[0%] h-[55%] w-[55%] rounded-full bg-[#A8C8EC]/55 blur-[110px]" />
            <div className="absolute top-[8%] right-[-5%] h-[50%] w-[50%] rounded-full bg-[#B8B8F0]/50 blur-[120px]" />
            <div className="absolute top-[18%] left-[32%] h-[40%] w-[40%] rounded-full bg-[#B0D4F5]/40 blur-[100px]" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.82))]"
          />
        </>
      )}

      <div
        className={cn(
          "relative z-20 flex w-full flex-col items-start px-4 pt-[66px] text-left sm:items-center sm:text-center",
          isDark ? "text-white" : "text-neutral-950",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={cn(
            "flex w-fit items-center gap-2 rounded-full p-1 backdrop-blur-sm sm:gap-3",
            isDark
              ? "border border-white/20 bg-white/10"
              : "border border-neutral-200/80 bg-white/70 backdrop-blur-md",
          )}
        >
          {badgePrefix ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 font-medium",
                isDark
                  ? "bg-white text-black"
                  : "bg-neutral-950 text-white",
                badgePrefixClassName ?? "text-xs sm:text-sm",
              )}
            >
              {badgePrefix}
            </span>
          ) : null}
          <span
            className={cn(
              "mr-2",
              isDark ? "text-white" : "text-neutral-700",
              badgeLabelClassName ?? "text-sm sm:text-base",
            )}
          >
            {badgeLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "mt-6 max-w-4xl font-medium leading-[1.1] tracking-tight",
            isDark ? "text-white" : "text-neutral-950",
            titleClassName ?? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "mt-4 leading-relaxed sm:mt-6",
            isDark ? "text-white/75" : "text-neutral-600",
            descriptionClassName ?? "max-w-xl text-sm sm:text-base md:text-lg",
          )}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-start gap-2 sm:mt-8 sm:justify-center sm:gap-3"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12px] font-normal backdrop-blur-sm",
                isDark
                  ? "border border-white/15 bg-white/10 text-white/90"
                  : "border border-neutral-200/80 bg-white/70 text-neutral-700",
              )}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero7;
