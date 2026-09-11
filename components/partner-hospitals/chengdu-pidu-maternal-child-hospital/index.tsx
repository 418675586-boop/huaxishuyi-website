"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Award, Calendar, Cpu, HeartPulse, Layers, Network } from "lucide-react";
import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { Hero24 } from "@/components/blocks/hero-24";
import { Hero12 } from "@/components/blocks/hero-12";
import { Showcase6 } from "@/components/blocks/showcase-6";
import Contact9 from "@/components/blocks/contact-9";
import Waitlist6 from "@/components/blocks/waitlist-6";

const facts: {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
}[] = [
  { label: "建院年份", value: "1952", unit: "年", icon: Calendar },
  { label: "信息化系统", value: "28", unit: "+", icon: Layers },
  { label: "建设板块", value: "4", unit: "大", icon: Network },
  { label: "医院等级", value: "三甲", unit: "", icon: Award },
];

const hospitalIntro = {
  description: (
    <>
      <p>
        成都市郫都区妇幼保健院始建于 1952
        年，是集医疗、教学、科研、急救于一体的三级甲等妇幼保健院，挂牌四川大学华西第二医院合作，承担区域孕产妇与新生儿急救中心职能，为妇女儿童提供全生命周期医疗保健服务。
      </p>
    </>
  ),
  capabilities: [
    {
      title: "建院年份",
      value: "1952",
      unit: "年",
      description: "1952 年",
    },
    {
      title: "医院等级",
      value: "三甲",
      unit: "",
      description: "三级甲等",
    },
    {
      title: "信息化系统",
      value: "28",
      unit: "+",
      description: "28+",
    },
    {
      title: "建设板块",
      value: "4",
      unit: "大",
      description: "四大板块",
    },
  ],
};

const buildNeeds = [
  {
    title: "智慧医疗",
    description:
      "以临床安全、便捷、智能为导向，集成 HIS、LIS、PACS、电子病历与临床决策支持，服务诊疗全过程。",
    image: "/img/partner-hospitals/pidu-smart-medical.jpg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    title: "智慧服务",
    description:
      "围绕医患互动建设院内导航、智能分诊与随访系统，改善就医体验、提升满意度。",
    image: "/img/partner-hospitals/pidu-smart-service.jpg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    title: "智慧管理",
    description:
      "推进病案、护理、统一排班与 IT 服务等流程数字化，支撑精细化运营。",
    image: "/img/partner-hospitals/pidu-smart-manage.jpg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    title: "区域业务协同",
    description:
      "打通跨机构医嘱、协同平台与电子签章，实现区域医疗机构系统对接。",
    image: "/img/partner-hospitals/pidu-regional.jpg",
    tilt: 3.5,
    lift: "lg:mt-6",
  },
];

const capabilities: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "28 个核心模块",
    description:
      "信息化覆盖智慧医疗、智慧服务、智慧管理与区域协同四大板块 28 个以上核心业务模块。",
    icon: Layers,
  },
  {
    title: "四位一体覆盖",
    description:
      "以患者为中心，用云计算、大数据、物联网、移动互联网与人工智能推进数字医院建设。",
    icon: HeartPulse,
  },
  {
    title: "数据互联互通",
    description:
      "通过统一信息平台实现区域医疗机构数据互通，支撑连续医疗服务。",
    icon: Network,
  },
  {
    title: "区域业务协同",
    description:
      "跨机构业务协同落地，助力医院现代化与妇女儿童全生命周期健康服务。",
    icon: Cpu,
  },
];

function SectionShell({
  id,
  tone = "white",
  children,
}: {
  id: string;
  tone?: "white" | "muted";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative z-[1] scroll-mt-[90px] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8 ${
        tone === "muted" ? "bg-[#F8F8F8]" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-10 flex max-w-3xl flex-col gap-3">
      {label ? (
        <p className="text-[13px] font-medium tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      ) : null}
      <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function ChengduPiduMaternalChildHospital() {
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

        <Hero24
          badge="合作医院 · 成都市郫都区妇幼保健院"
          title={
            <>
              <span className="block sm:whitespace-nowrap">成都市郫都区妇幼保健院</span>
            </>
          }
          description="始建于 1952 年的三级甲等妇幼保健院，集医疗、教学、科研、急救于一体，挂牌四川大学华西第二医院，承担区域孕产妇与新生儿急救中心职能。"
          primaryCta={{ label: "开启合作咨询", href: "#waitlist" }}
          secondaryCta={{ label: "了解合作医院", href: "#hospital" }}
          partnersLabel="项目定位"
          partners={["三级甲等妇幼保健院｜始建于 1952 年｜成都"]}
          backgroundImage="/img/partner-hospitals/chengdu-pidu-maternal-child-hospital-hero-hd.jpg"
          bottomContent={
            <div
              aria-label="合作概览"
              className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            >
              {facts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-[20px] border border-white/50 bg-white/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/15 dark:bg-white/10"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="flex items-baseline gap-1.5 font-semibold tracking-tight text-neutral-950 dark:text-white">
                      <span className="text-[48px] leading-none">
                        {item.value}
                      </span>
                      <span className="text-[22px]">{item.unit}</span>
                    </h3>
                    <p className="mt-2 text-[13px] text-neutral-500 dark:text-white/80">
                      {item.label}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          }
        />

        <Contact9
          id="hospital"
          className="relative z-[1] scroll-mt-[90px] py-[100px] dark:bg-transparent"
          badge="医院介绍"
          title="医院概况"
          description={hospitalIntro.description}
          capabilities={hospitalIntro.capabilities}
          capabilitiesLayout="stats"
          views={[
            {
              label: "三级甲等妇幼保健院",
              image: "/img/partner-hospitals/pidu-intro.jpg",
            },
          ]}
          showCtas={false}
        />

        <Showcase6
          id="background"
          title="建设内容：四位一体智慧医院"
          description="以患者为中心，用云计算、大数据、物联网与人工智能推进数字医院建设。"
          cta={null}
          captionClassName="text-[20px] font-bold tracking-normal text-neutral-950 dark:text-white"
          headerLayout="stack"
          moments={buildNeeds.map((item) => ({
            caption: item.title,
            detail: item.description,
            image: item.image,
            tilt: item.tilt,
            lift: item.lift,
          }))}
        />

        <SectionShell id="capabilities">
          <SectionHeader
            title="建设成效"
            description="信息化覆盖四大板块 28 个以上核心模块，统一信息平台实现区域数据互通与业务协同。"
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 [&>*]:relative">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      delay: (index % 4) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  viewport={{ once: true }}
                  className="group relative z-0 flex origin-center flex-col items-start rounded-3xl bg-white p-6 text-left shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl sm:p-8"
                >
                  <Icon
                    className="icon-flip-once mb-4 h-10 w-10 shrink-0 text-neutral-900 dark:text-white"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mb-2 text-[18px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        <Hero12
          id="extension"
          tone="muted"
          title="四位一体"
          titleLine2="智慧医院"
          backgroundImage="/img/partner-hospitals/pidu-extension-bg.jpg"
          backgroundAlt="郫都区妇幼保健院智慧医院建设场景"
          cta={{ label: "开启合作咨询", href: "#waitlist" }}
          cardImage="/img/partner-hospitals/pidu-extension-card-data.jpg"
          cardImageAlt="医疗机构影像数据与信息平台"
          cardTitle="统一信息平台"
          cardDescription="信息化系统覆盖四位一体 28 个以上核心业务模块，通过统一信息平台实现区域医疗机构数据互通与业务协同，支撑医院现代化发展。"
          cardCta={null}
        />

        <Waitlist6
          title="开启合作咨询"
          description="如需了解成都市郫都区妇幼保健院同类合作医院的建设路径与落地方式，欢迎联系我们"
          darkTransparent
        />
      </main>
    </>
  );
}

export default ChengduPiduMaternalChildHospital;
