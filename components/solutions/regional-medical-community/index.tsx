"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  HeartHandshake,
  LayoutDashboard,
  Network,
  Share2,
  Sparkles,
  Waypoints,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { Features4 } from "@/components/blocks/features-4";
import { Features2 } from "@/components/blocks/features-2";
import { HowItWorks3, REGIONAL_HOW_IT_WORKS_ITEMS } from "@/components/blocks/how-it-works-3";
import { Features1 } from "@/components/blocks/features-1";
import Stats12 from "@/components/blocks/stats-12";
import Stats3 from "@/components/blocks/stats-3";
import Waitlist6 from "@/components/blocks/waitlist-6";
import { Hero7 } from "@/components/blocks/hero-7";
import { LenticularCarouselSection } from "@/components/lenticular-carousel-section";

/** 区域医共体页专属首屏图（仅本页使用，保持 9 张轮播密度）
 *  01 底座 与 02 统筹 构图偏近，故意隔开不相邻
 */
const REGIONAL_HERO_IMAGES = [
  "/img/solutions/hero7-regional/hero-regional-01-base.png",
  "/img/solutions/hero7-regional/hero-regional-03-primary.png",
  "/img/solutions/hero7-regional/hero-regional-04-referral.png",
  "/img/solutions/hero7-regional/hero-regional-05-patient.png",
  "/img/solutions/hero7-regional/hero-regional-02-governance.png",
  "/img/solutions/hero7-regional/hero-regional-06-sharing.png",
  "/img/solutions/hero7-regional/hero-regional-07-operations.png",
  "/img/solutions/hero7-regional/hero-regional-08-digital.png",
  "/img/solutions/hero7-regional/hero-regional-09-community.png",
];

const painHoverStyles = [
  {
    background:
      "linear-gradient(145deg, #3b82f6 0%, #6b8cff 45%, #b8a4f8 100%)",
    shadow: "0 18px 40px rgba(59, 130, 246, 0.28)",
  },
  {
    background: "linear-gradient(180deg, #5ba8ff 0%, #3b82f6 55%, #2563eb 100%)",
    shadow: "0 18px 40px rgba(37, 99, 235, 0.28)",
  },
] as const;

/** 默认弥散色：与 hover 蓝紫渐变同色系，集中在卡片右上角 */
const painDiffuseBackground =
  "radial-gradient(ellipse 72% 68% at 96% 6%, rgba(107, 140, 255, 0.16) 0%, rgba(184, 164, 248, 0.08) 38%, transparent 72%)";

function pickPainHoverStyle() {
  return (
    painHoverStyles[Math.floor(Math.random() * painHoverStyles.length)] ??
    painHoverStyles[0]
  );
}

const pains: {
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
}[] = [
  {
    title: "统一监管决策",
    description:
      "整合医共体运营、质量与资源数据，支撑实时监管与管理决策。",
    tags: ["全景监管", "资源监管", "运行评价", "绩效考核"],
    icon: Network,
  },
  {
    title: "区域共享服务",
    description:
      "建设统一共享服务中心，推动检查检验资源跨机构协同共享。",
    tags: ["医学影像", "医学检验", "心电诊断", "病理诊断"],
    icon: Share2,
  },
  {
    title: "便民惠民服务",
    description:
      "贯通诊前、诊中、诊后服务流程，提升居民就医便捷性与连续性。",
    tags: ["预约诊疗", "结果调阅", "双向转诊", "数字医生"],
    icon: HeartHandshake,
  },
  {
    title: "重点业务协同",
    description:
      "打通医疗、公卫、医保、药事等重点业务，形成跨机构协同闭环。",
    tags: ["药事协同", "医保协同", "康养协同", "公卫协同"],
    icon: Waypoints,
  },
  {
    title: "统一运营管理",
    description:
      "统一财务、物资、人事与绩效管理，提升医共体精细化运营能力。",
    tags: ["财务协同", "物资协同", "人事协同", "运营分析"],
    icon: LayoutDashboard,
  },
  {
    title: "数智赋能应用",
    description:
      "融合数据治理与 AI 能力，为诊疗、管理和健康服务提供智能支撑。",
    tags: ["智能预警", "辅助分析", "风险识别", "智能服务"],
    icon: Sparkles,
  },
];

function PainCard({
  item,
  index,
}: {
  item: (typeof pains)[number];
  index: number;
}) {
  const Icon = item.icon;
  const [hoverStyle, setHoverStyle] = useState<(typeof painHoverStyles)[number]>(
    painHoverStyles[0],
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => {
        setHoverStyle(pickPainHoverStyle());
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-[300px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/80 bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06),inset_0_0_0_1px_rgba(255,255,255,0.95)] transition-[box-shadow,color,border-color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
      style={isHovered ? { boxShadow: hoverStyle.shadow, color: "#fff" } : {}}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: hoverStyle.background }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 ease-out ${
          isHovered ? "opacity-[0.18]" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[24px] transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: painDiffuseBackground }}
      />

      <div className="relative z-[1] flex flex-col gap-5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
            isHovered
              ? "bg-black/25 text-white"
              : "bg-neutral-950 text-white dark:bg-white/15"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-[22px] font-semibold tracking-tight sm:text-[24px]">
          {item.title}
        </h3>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-[12px] transition-colors duration-300 ${
                  isHovered
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <p
        className={`relative z-[1] line-clamp-3 text-[14px] leading-relaxed transition-colors duration-300 sm:text-[15px] ${
          isHovered ? "text-white/90" : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

export function RegionalMedicalCommunity() {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />

      <main id="main-content" className="relative flex-1 dark:bg-neutral-950">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[55vh] dark:block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_90%,rgba(122,31,110,0.21)_0%,transparent_55%),radial-gradient(ellipse_at_50%_85%,rgba(107,91,149,0.17)_0%,transparent_50%),radial-gradient(ellipse_at_82%_90%,rgba(43,79,212,0.23)_0%,transparent_55%)]" />
        </div>

        <Hero7
          badgeLabel="区域型医共体数智化解决方案"
          title="数智医共体 · 健康共同体"
          description="以统一数智底座，赋能区域医共体高质量发展"
          tags={["一个底座", "五类应用", "三大保障", "五个统一"]}
          images={REGIONAL_HERO_IMAGES}
          badgePrefixClassName="text-[12px]"
          badgeLabelClassName="text-[14px]"
          titleClassName="text-[48px]"
          descriptionClassName="max-w-[1200px] text-[16px] max-sm:whitespace-normal sm:whitespace-nowrap"
        />

        <Features4 />

        <LenticularCarouselSection />

        <Features2 />

        {/* Main features */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                主要功能
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                五大核心功能模块，覆盖医共体全业务场景
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {pains.map((item, index) => (
                <PainCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8"
          aria-label="落地场景与实施路径"
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[50px]">
            <HowItWorks3 embedded items={REGIONAL_HOW_IT_WORKS_ITEMS} />

            <div
              aria-hidden
              className="h-px w-full bg-[#F8F8F8] dark:bg-[#F8F8F8]/50"
            />

            <Features1 embedded />
          </div>
        </section>

        {/* Alliance values + stats */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[50px]">
            <div>
              <div className="mb-10 flex max-w-3xl flex-col gap-3">
                <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                  预期成效
                </h2>
                <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                  四个层面成效显著，同步设定量化指标体系跟踪评估
                </p>
              </div>

              <Stats3 embedded />
            </div>

            <Stats12 embedded />
          </div>
        </section>

        <Waitlist6 />
      </main>
    </>
  );
}

export default RegionalMedicalCommunity;
