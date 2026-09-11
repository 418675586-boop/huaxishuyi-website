"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Bed, BrainCircuit, Cloud, Cpu, HeartPulse, ScanSearch, ShieldCheck } from "lucide-react";
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
  { label: "编制床位", value: "650", unit: "张", icon: Bed },
  { label: "AI 诊断场景", value: "9", unit: "大", icon: BrainCircuit },
  { label: "AI 结节检出率", value: "≥95", unit: "%", icon: HeartPulse },
  { label: "云上妇幼项目", value: "3", unit: "期", icon: Cloud },
];

const hospitalIntro = {
  description: (
    <>
      <p>
        西藏自治区妇产儿童医院（西藏自治区妇幼保健院）是一所集妇产医疗、儿童医疗、妇幼保健三位一体的专科医院，设置床位
        650 张（儿童病床 350 张、妇幼保健病床 300 张）。医院承担全区妇女儿童全生命周期医疗、保健、预防、科研、教学、康复和优生优育、健康教育等任务，打造服务西藏、辐射周边的现代化妇女儿童医疗保健中心。2022
        年获批国家区域医疗中心建设项目（第四批），由华西第二医院牵头帮扶建设。
      </p>
    </>
  ),
  capabilities: [
    {
      title: "儿童病床",
      value: "350",
      unit: "张",
      description: "350 张",
    },
    {
      title: "妇幼保健病床",
      value: "300",
      unit: "张",
      description: "300 张",
    },
    {
      title: "获批年份",
      value: "2022",
      unit: "年",
      description: "2022 年",
    },
    {
      title: "建设批次",
      value: "4",
      unit: "批",
      description: "第四批",
    },
  ],
};

const buildNeeds = [
  {
    title: "诊前在线化",
    description:
      "线上挂号、微信小程序预约、缴费、报告查询等服务前置到就诊前，减少患者院内等待时间。",
    image: "/img/partner-hospitals/tibet-pre-diagnosis.jpg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    title: "诊中智能化",
    description:
      "AI 辅助诊断覆盖 9 大疾病诊断场景，具备自动检出、定位、测量、报告生成全流程功能，结节检出率不低于 95%、良恶性分类准确度不低于 95%。",
    image: "/img/partner-hospitals/tibet-ai-diagnosis.jpg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    title: "诊后连续化",
    description:
      "通过区域医疗信息平台对接，实现检查检验结果互认、患者全周期健康档案管理，保障患者安全、提升医疗质量。",
    image: "/img/partner-hospitals/tibet-post-diagnosis.jpg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    title: "云上妇幼",
    description:
      "分三期推进「云上妇幼」远程医疗平台建设，一期已通过终验，二、三期有序推进，持续优化患者就医体验。",
    image: "/img/partner-hospitals/tibet-cloud-maternal.jpg",
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
    title: "保障患者安全",
    description:
      "以数字驱动贯穿诊疗全流程，通过风险预警与结果互认，持续守护妇女儿童就医安全。",
    icon: ShieldCheck,
  },
  {
    title: "提升医疗质量",
    description:
      "AI 辅助诊断覆盖 9 大场景，结节检出率与良恶性分类准确度均不低于 95%，提升诊断质量。",
    icon: HeartPulse,
  },
  {
    title: "提高临床效率",
    description:
      "智能报告与自动检出、定位、测量能力，缩短诊断路径，提高临床响应与周转效率。",
    icon: ScanSearch,
  },
  {
    title: "强化精细管理",
    description:
      "国家区域医疗中心信息化项目投入约 8,369 万元，构建覆盖影像 AI 诊断、智能报告、风险预警的全场景医疗系统。",
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

export function TibetMaternityChildrenHospital() {
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
          badge="合作医院 · 西藏自治区妇产儿童医院"
          title={
            <>
              <span className="block sm:whitespace-nowrap">西藏自治区</span>
              <span className="block sm:whitespace-nowrap">妇产儿童医院</span>
            </>
          }
          description="西藏自治区妇产儿童医院（西藏自治区妇幼保健院）是集妇产医疗、儿童医疗、妇幼保健三位一体的专科医院，2022 年获批国家区域医疗中心建设项目，由华西第二医院牵头帮扶建设。"
          primaryCta={{ label: "开启合作咨询", href: "#waitlist" }}
          secondaryCta={{ label: "了解合作医院", href: "#hospital" }}
          partnersLabel="项目定位"
          partners={["国家区域医疗中心｜妇产 + 儿童 + 妇幼保健三位一体｜拉萨"]}
          backgroundImage="/img/partner-hospitals/tibet-maternity-children-hospital-hero-hd.jpg"
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
              label: "国家区域医疗中心",
              image: "/img/partner-hospitals/tibet-intro-tibetan-dress.jpg",
            },
          ]}
          showCtas={false}
        />

        <Showcase6
          id="background"
          title="建设内容：医院数智化转型"
          description="基于集成平台，按诊前在线化、诊中智能化、诊后连续化构建全周期医疗服务。"
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
            description="以数字驱动保障患者安全、提升医疗质量、提高临床效率、强化精细管理。"
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
          title="数字驱动"
          titleLine2="医疗质量"
          backgroundImage="/img/partner-hospitals/tibet-extension-bg.jpg"
          backgroundAlt="妇产与儿童诊疗中的数智化场景"
          cta={{ label: "开启合作咨询", href: "#waitlist" }}
          cardImage="/img/partner-hospitals/tibet-extension-card-real.jpg"
          cardImageAlt="妇产儿童医院门诊与影像科室实景"
          cardTitle="全场景医疗系统"
          cardDescription="国家区域医疗中心信息化项目投入约 8,369 万元，构建覆盖影像 AI 诊断、智能报告、风险预警等核心场景的全场景医疗系统，为医院高质量发展注入数字动能。"
          cardCta={null}
        />

        <Waitlist6
          title="开启合作咨询"
          description="如需了解西藏自治区妇产儿童医院同类合作医院的建设路径与落地方式，欢迎联系我们"
          darkTransparent
        />
      </main>
    </>
  );
}

export default TibetMaternityChildrenHospital;
