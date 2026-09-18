"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Scanner from "@/components/Scanner";

const footerLinks = [
  { text: "AI医生应用平台", href: "/products/ai-doctor-platform" },
  { text: "医院数智化转型解决方案", href: "/solutions/hospital-digital-transformation" },
  { text: "新闻动态", href: "/news" },
  { text: "关于我们", href: "/about" },
] as const;

export default function Footer2() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative w-full overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 4%, #000 10%, #000 20%, rgba(0,0,0,0.4) 26%, transparent 34%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 6%, #000 14%, #000 86%, rgba(0,0,0,0.25) 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 4%, #000 10%, #000 20%, rgba(0,0,0,0.4) 26%, transparent 34%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 6%, #000 14%, #000 86%, rgba(0,0,0,0.25) 94%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <Scanner
          className="h-full w-full"
          color1="#4b8eff"
          color2="#7420e8"
          color3="#A6C8FF"
          speed={0.55}
          sweepSpeed={0.3}
          glow={0.28}
          brightness={0.9}
          vignette={0.5}
          grain
          grainIntensity={0.04}
          mouseInteraction={false}
          scanDirection="vertical"
        />
      </div>

      <div className="relative z-10">
        <div className="h-36 sm:h-44 md:h-52" />

        <div className="relative mx-[20px] mb-[20px] rounded-b-[10px] bg-white dark:bg-[rgba(12,8,22,0.72)]">
          <div className="absolute top-0 left-0 z-10 -translate-y-[calc(100%-2px)] overflow-hidden rounded-tl-[10px]">
            <svg
              width="614"
              height="153"
              viewBox="0 0 614 153"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block h-auto w-[250px]"
            >
              <path
                d="M0 0H451.601C467.78 0 483.071 7.75893 491.954 21.2815C558.518 122.612 538.359 153.074 614 153H0V0Z"
                className="fill-white dark:fill-[#0c0816]"
              />
            </svg>
          </div>

          <div className="absolute top-0 right-0 z-10 -translate-y-[calc(100%-2px)] overflow-hidden rounded-tr-[10px]">
            <svg
              width="614"
              height="153"
              viewBox="0 0 614 153"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block h-auto w-[250px] scale-x-[-1]"
            >
              <path
                d="M0 0H451.601C467.78 0 483.071 7.75893 491.954 21.2815C558.518 122.612 538.359 153.074 614 153H0V0Z"
                className="fill-white dark:fill-[#0c0816]"
              />
            </svg>
          </div>

          <div className="mx-auto w-full max-w-[1200px] px-4 py-12 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12"
            >
              <motion.div variants={itemVariants} className="text-center">
                <Image
                  src="/img/logo-light-mode.png"
                  alt="华西数医"
                  width={344}
                  height={125}
                  className="mx-auto h-[60px] w-auto object-contain dark:hidden"
                />
                <Image
                  src="/img/logo-dark-mode.png"
                  alt="华西数医"
                  width={344}
                  height={125}
                  className="mx-auto hidden h-[60px] w-auto object-contain dark:block"
                />
                <p className="mx-auto mt-4 max-w-md text-[15px] font-normal leading-relaxed text-neutral-900 dark:text-white">
                  华西数医以医疗大模型与智能体为核心·赋能医疗机构数智化转型
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[14px] text-neutral-900 dark:text-white sm:gap-x-4"
              >
                {footerLinks.map((link, index) => (
                  <span
                    key={link.text}
                    className="inline-flex items-center gap-3 sm:gap-4"
                  >
                    {index > 0 ? (
                      <span className="text-neutral-400 dark:text-neutral-500">
                        -
                      </span>
                    ) : null}
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-neutral-600 dark:hover:text-neutral-300"
                    >
                      <span>{link.text}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex w-full flex-col items-center justify-between gap-6 border-t border-neutral-200 pt-8 text-center sm:flex-row sm:text-left md:pt-10 dark:border-neutral-800"
              >
                <div className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
                  <p>Copyright © 2026 成都华西数字医疗科技有限公司</p>
                </div>

                <div className="text-xs text-neutral-600 sm:text-right sm:text-sm dark:text-neutral-400">
                  <p>成都市武侯区三环路南段69号双华数字健康产业园A3栋8F</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
