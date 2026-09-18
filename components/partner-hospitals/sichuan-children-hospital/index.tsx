"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  Bed,
  Cpu,
  Network,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
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
  { label: "规划床位", value: "2,000", unit: "张", icon: Bed },
  { label: "用地面积", value: "249", unit: "亩", icon: Sparkles },
  { label: "临床诊疗中心", value: "13", unit: "个", icon: Stethoscope },
  { label: "绩效监测最高评级", value: "7", unit: "年", icon: Award },
];

const hospitalIntro = {
  description: (
    <>
      <p>
        四川省儿童医院是四川省首个获批的国家区域医疗中心建设项目，也是全国唯一走出省会城市、布局地市级城市的省级儿童医院，位于眉山市东坡区。输出医院四川大学华西第二医院以全托管模式输出品牌、技术、管理、人才与平台，在全国三级公立医院绩效监测中连续七年获全国妇产医院专科系列最高评级。
      </p>
      <p>
        医院规划 2,000 张床位（一期 600 张已于 2022 年 12 月启用，二期 900 张在建），用地面积约 249 亩，创新打造 13 个临床系统疾病诊疗中心。
      </p>
    </>
  ),
  capabilities: [
    {
      title: "一期床位",
      value: "600",
      unit: "张",
      description: "600 张",
    },
    {
      title: "二期床位",
      value: "900",
      unit: "张",
      description: "900 张",
    },
    {
      title: "一期启用",
      value: "2022",
      unit: "年",
      description: "2022 年",
    },
    {
      title: "临床诊疗中心",
      value: "13",
      unit: "个",
      description: "13 个",
    },
  ],
};

const buildNeeds = [
  {
    title: "智慧医疗",
    description:
      "打通院内各信息系统壁垒，提升医疗数据治理能力，实现数据在各业务系统中高效运转，为临床诊疗提供数据驱动决策支持。",
    image: "/img/partner-hospitals/sichuan-smart-medical.jpg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    title: "智慧服务",
    description:
      "构建以患者为中心的全流程服务闭环，覆盖诊前预约、诊中导航、诊后随访，提升就医体验与满意度。",
    image: "/img/partner-hospitals/sichuan-smart-service.jpg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    title: "智慧管理",
    description:
      "通过全流程医疗数据闭环管理，保障医疗过程安全可控、规范高效、智能应用，支撑精细化运营与科学决策。",
    image: "/img/partner-hospitals/sichuan-smart-manage-medical.jpg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    title: "信息化传承",
    description:
      "全面继承华西第二医院电子病历六级、四星智慧医院、互联互通五级乙等及医疗大模型等能力，构建集团化、一体化、同质化数智体系。",
    image: "/img/partner-hospitals/sichuan-smart-it.jpg",
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
    title: "电子病历系统六级",
    description:
      "输出医院华西第二医院于 2022 年通过国家电子病历系统功能应用水平分级评价六级，为四川省首家。",
    icon: BadgeCheck,
  },
  {
    title: "四星智慧医院",
    description:
      "2020 年通过四川省四星智慧医院评审，为智慧医院建设提供可复制的评测与落地经验。",
    icon: Star,
  },
  {
    title: "互联互通五级乙等",
    description:
      "2019 年通过国家医疗健康信息互联互通标准化成熟度五级乙等测评，支撑集团化数据贯通。",
    icon: Network,
  },
  {
    title: "华西数医医疗大模型",
    description:
      "华西数医于 2024 年底发布医疗大模型，为儿童医院智能化诊疗与科研应用提供底座能力。",
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

export function SichuanChildrenHospital() {
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
          badge="合作医院 · 四川省儿童医院"
          title={
            <>
              <span className="block sm:whitespace-nowrap">华西二院天府医院</span>
              <span className="block sm:whitespace-nowrap">四川省儿童医院</span>
            </>
          }
          description="作为中国西南妇幼保健的新名片，四川省儿童医院高度重视数智化转型，以信息化为支撑打造高水平儿童诊疗中心、儿科人才培养基地和儿童医学创新转化平台。"
          primaryCta={{ label: "开启合作咨询", href: "#waitlist" }}
          secondaryCta={{ label: "了解合作医院", href: "#hospital" }}
          partnersLabel="项目定位"
          partners={["国家区域医疗中心｜四川省十四五重点民生工程｜眉山"]}
          backgroundImage="/img/partner-hospitals/sichuan-children-hospital-hero-hd.jpg"
          backgroundImageClassName="!object-[center_30%]"
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
          titleClassName="text-[36px]"
          description={hospitalIntro.description}
          capabilities={hospitalIntro.capabilities}
          capabilitiesLayout="stats"
          views={[
            {
              label: "国家区域医疗中心",
              image: "/img/partner-hospitals/sichuan-intro-pediatric.jpg",
            },
          ]}
          showCtas={false}
        />

        <Showcase6
          id="background"
          title="建设内容：三位一体智慧医院"
          description="助力打造「智慧医疗、智慧服务、智慧管理」三位一体智慧医院。"
          cta={null}
          captionClassName="text-[20px] font-bold tracking-normal text-neutral-950 dark:text-white"
          headerLayout="stack"
          titleClassName="text-[36px]"
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
            title="输出医院信息化标杆"
            description="全面继承华西第二医院信息化能力，建设一体化、同质化数智体系。"
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
          title="数智赋能"
          titleLine2="儿童诊疗"
          backgroundImage="/img/partner-hospitals/sichuan-extension-bg-pediatric.jpg"
          backgroundAlt="儿童诊疗过程中的数智化场景"
          cta={{ label: "开启合作咨询", href: "#waitlist" }}
          cardImage="/img/partner-hospitals/sichuan-extension-card-digital.jpg"
          cardImageAlt="集团化一体化同质化的医院数智化体系"
          cardTitle="华西数医科研管理平台"
          cardDescription="四川省儿童医院全面继承华西第二医院信息化能力与经验，构建集团化、一体化、同质化的数智化体系，加速儿童诊疗场景的智能应用落地。"
          cardCta={null}
        />

        <Waitlist6
          title="开启合作咨询"
          description="如需了解四川省儿童医院同类合作医院的建设路径与落地方式，欢迎联系我们"
          titleClassName="text-[36px]"
          darkTransparent
        />
      </main>
    </>
  );
}

export default SichuanChildrenHospital;
