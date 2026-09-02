"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const footerGroups = [
  {
    title: "产品方案",
    links: [
      { text: "AI医疗应用开发平台", href: "#" },
      { text: "AI患者应用平台", href: "#" },
      { text: "AI医生应用平台", href: "#" },
    ],
  },
  {
    title: "解决方案",
    links: [
      {
        text: "医院数智化转型解决方案",
        href: "/solutions/hospital-digital-transformation",
      },
      {
        text: "区域医疗数智化转型解决方案",
        href: "#",
      },
      {
        text: "医疗系统集成行业解决方案",
        href: "#",
        external: true,
      },
    ],
  },
  {
    title: "联系支持",
    links: [
      {
        text: "双华数字健康产业园A3栋8F",
        href: "#",
      },
      {
        text: "成都市武侯区三环路南段69号",
        href: "#",
      },
      { text: "028-60198639", href: "tel:02860198639" },
    ],
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Footer1() {
  return (
    <footer className="relative w-full overflow-hidden bg-white text-neutral-950 dark:bg-[#090909] dark:text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto w-full max-w-[1200px] px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28"
      >
        <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
          <motion.div
            variants={itemVariants}
            className="flex min-h-[360px] flex-col lg:min-h-[390px]"
          >
            <Image
              src="/img/huaxi-footer-logo.png"
              alt="华西数医"
              width={651}
              height={166}
              className="h-10 w-auto self-start object-contain dark:hidden"
            />
            <Image
              src="/img/huaxi-footer-logo-dark.png"
              alt="华西数医"
              width={651}
              height={166}
              className="hidden h-10 w-auto self-start object-contain dark:block"
            />

            <h2 className="mt-14 max-w-[300px] text-[20px] font-normal leading-[1.55] tracking-tight text-neutral-950 dark:text-white">
              华西数医以医疗大模型与智能体为核心，赋能医疗机构数智化转型。
            </h2>

            <p className="mt-auto text-[12px] text-neutral-500 dark:text-white/35 sm:text-[13px]">
              Copyright © 2026 成都华西数字医疗科技有限公司
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid overflow-hidden border border-neutral-300 dark:border-white/20 sm:grid-cols-3"
          >
            {footerGroups.map((group, index) => (
              <div
                key={group.title}
                className={`min-h-[300px] p-7 sm:min-h-[390px] sm:p-8 lg:p-10 ${
                  index > 0
                    ? "border-t border-neutral-300 dark:border-white/20 sm:border-t-0 sm:border-l"
                    : ""
                }`}
              >
                <h3 className="text-[18px] font-medium tracking-tight text-neutral-950 dark:text-white sm:text-[20px]">
                  {group.title}
                </h3>
                <ul className="mt-10 space-y-5">
                  {group.links.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.href}
                        className="group/link inline-flex items-start gap-1 text-[15px] leading-relaxed text-neutral-500 transition-colors duration-200 hover:text-neutral-950 dark:text-white/50 dark:hover:text-white sm:text-[16px]"
                      >
                        <span>{link.text}</span>
                        {"external" in link && link.external ? (
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-20 pb-10 sm:mt-24 sm:pb-12"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 280"
            className="block h-auto w-full overflow-visible text-neutral-950/[0.05] dark:text-white/[0.055]"
            preserveAspectRatio="none"
          >
            <text
              x="0"
              y="238"
              fill="currentColor"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="260"
              fontWeight="700"
              textLength="1200"
              lengthAdjust="spacingAndGlyphs"
            >
              MEDICAL
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </footer>
  );
}
