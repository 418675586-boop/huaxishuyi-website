"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Bed, Bot, BrainCircuit, Cpu, Landmark, Sparkles, Star, Stethoscope } from "lucide-react";
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
  { label: "总投资", value: "15", unit: "亿元", icon: Landmark },
  { label: "编制床位", value: "500", unit: "张", icon: Bed },
  { label: "占地面积", value: "47.15", unit: "亩", icon: Sparkles },
  { label: "智慧医院评级", value: "3", unit: "星", icon: Star },
];

const hospitalIntro = {
  description: (
    <>
      <p>
        成都高新区妇女儿童医院是成都高新区直属管理的首家妇女儿童专科医院，也是四川大学华西第二医院在成都首家实行同质化、全托管模式的医院。医院按照三级甲等标准建设，集医疗、科教、预防、保健功能于一体，项目总投资
        15 亿元，占地面积 47.15 亩，编制床位 500 张，2024 年正式建成落地。医院按照学科规划、业务布局、社会服务、运营管理「四个一体化」原则，致力于打造国内领先的人文型、智慧型、现代化、国际化医院。
      </p>
    </>
  ),
  capabilities: [
    {
      title: "建成落地",
      value: "2024",
      unit: "年",
      description: "2024 年",
    },
    {
      title: "编制床位",
      value: "500",
      unit: "张",
      description: "500 张",
    },
    {
      title: "占地面积",
      value: "47.15",
      unit: "亩",
      description: "47.15 亩",
    },
    {
      title: "总投资",
      value: "15",
      unit: "亿元",
      description: "15 亿元",
    },
  ],
};

const buildNeeds = [
  {
    title: "一套基础设施",
    description:
      "通过基础设施集约化建设与管理，夯实医院数智化底座，支撑业务系统稳定运行。",
    image: "/img/partner-hospitals/chengdu-gaoxin-infra.jpg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    title: "二套数据中心",
    description:
      "建设双数据中心能力，保障数据安全、业务连续与院内信息高效流转。",
    image: "/img/partner-hospitals/chengdu-gaoxin-datacenter.jpg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    title: "一个信息平台",
    description:
      "全面推进以电子病历为核心的医疗信息系统建设，打破层级、机构、系统壁垒。",
    image: "/img/partner-hospitals/chengdu-gaoxin-platform.jpg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    title: "四大智慧应用",
    description:
      "推进信息技术与医疗服务深度融合，落地智慧医疗、服务与管理等核心应用。",
    image: "/img/partner-hospitals/chengdu-gaoxin-apps.jpg",
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
    title: "全周期智能服务",
    description:
      "基于数字底座提供 AI 智能助手、医生智能助理等全周期服务。",
    icon: Bot,
  },
  {
    title: "临床与就医双端",
    description:
      "满足医务人员临床决策辅助需求与患者就医服务需求。",
    icon: Stethoscope,
  },
  {
    title: "创新驱动发展",
    description: "提升医院竞争力，支持创新驱动发展。",
    icon: BrainCircuit,
  },
  {
    title: "科学精细管理",
    description:
      "提升管理效率与决策科学性，推动医院高质量发展。",
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

export function ChengduHightechWomenChildrenHospital() {
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
          badge="合作医院 · 成都高新区妇女儿童医院"
          title={
            <>
              <span className="block sm:whitespace-nowrap">成都高新区妇女儿童医院</span>
            </>
          }
          description="成都高新区直属管理的首家妇女儿童专科医院，也是华西第二医院在成都首家实行同质化、全托管模式的医院。按三级甲等标准建设，2024 年正式建成落地。"
          primaryCta={{ label: "开启合作咨询", href: "#waitlist" }}
          secondaryCta={{ label: "了解合作医院", href: "#hospital" }}
          partnersLabel="项目定位"
          partners={["华西二院全托管｜三级甲等标准｜2024 年建成｜成都"]}
          backgroundImage="/img/partner-hospitals/chengdu-hightech-women-children-hospital-hero-hd.jpg"
          backgroundImageClassName="scale-105"
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
              label: "三级甲等标准",
              image: "/img/partner-hospitals/chengdu-gaoxin-intro.jpg",
            },
          ]}
          showCtas={false}
        />

        <Showcase6
          id="background"
          title="建设内容：医院数智化转型"
          description="通过基础设施集约化建设，构建「1+1+2+4」数智化架构。"
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
            title="华西数医核心服务"
            description="基于数字底座提供全周期服务，满足临床决策辅助与患者就医需求。"
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
          title="四个一体化"
          titleLine2="智慧医院"
          backgroundImage="/img/partner-hospitals/chengdu-gaoxin-extension-bg-full.jpg"
          backgroundMirrored
          backgroundAlt="成都高新区妇女儿童医院智慧医院建设场景"
          cta={{ label: "开启合作咨询", href: "#waitlist" }}
          cardImage="/img/partner-hospitals/chengdu-gaoxin-extension-card.jpg"
          cardImageAlt="妇女儿童医院门诊大厅实景"
          cardTitle="三星级智慧医院"
          cardDescription="2026 年 1 月顺利通过成都市卫生健康委智慧医院评审，获评三星级智慧医院，标志着信息化建设、智慧服务创新与精细化管理取得阶段性成效。"
          cardCta={null}
        />

        <Waitlist6
          title="开启合作咨询"
          description="如需了解成都高新区妇女儿童医院同类合作医院的建设路径与落地方式，欢迎联系我们"
          darkTransparent
        />
      </main>
    </>
  );
}

export default ChengduHightechWomenChildrenHospital;
