"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Blocks,
  Brain,
  Building2,
  Database,
  FlaskConical,
  Sparkles,
  Users,
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
  { label: "开放床位", value: "1,159", unit: "张", icon: Building2 },
  { label: "年门急诊量", value: "290", unit: "万+", icon: Sparkles },
  { label: "国家临床重点专科", value: "11", unit: "个", icon: Users },
  { label: "日均门诊量", value: "1", unit: "万/日", icon: Activity },
];

const hospitalIntro = {
  description: (
    <>
      <p>
        首都医科大学宣武医院始建于1958年，是以神经科学和老年医学为重点的三级甲等综合医院，是我国神经科学重要的人才培养与临床研究基地之一。
      </p>
      <p>
        医院拥有多个国家级重点学科、国家重点培育学科及国家临床重点专科，持续推动医学科研与临床创新发展。
      </p>
    </>
  ),
  capabilities: [
    {
      title: "国家级重点学科",
      value: "2",
      unit: "个",
      description: "2 个",
    },
    {
      title: "国家重点培育学科",
      value: "1",
      unit: "个",
      description: "1 个",
    },
    {
      title: "国家临床重点专科（项目）",
      value: "11",
      unit: "个",
      description: "11 个",
    },
    {
      title: "北京市临床重点专科",
      value: "9",
      unit: "个",
      description: "9 个",
    },
  ],
};

const buildNeeds = [
  {
    title: "数据统一管理",
    description: "汇聚多源临床与科研数据，建立统一治理、质控与安全共享机制。",
    image: "/img/partner-hospitals/xuanwu-need-data.jpg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    title: "模型训练优化",
    description: "面向专科场景持续优化模型训练、评估与迭代，提升智能分析效能。",
    image: "/img/partner-hospitals/xuanwu-need-model.jpg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    title: "智能应用开发",
    description: "将模型能力沉淀为可复用的科研工具与智能应用，缩短落地周期。",
    image: "/img/partner-hospitals/xuanwu-need-app.jpg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    title: "科研高效协同",
    description: "打通课题、数据、模型与人员协作链路，提升科研组织与执行效率。",
    image: "/img/partner-hospitals/xuanwu-need-collab.jpg",
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
    title: "多源数据整合",
    description:
      "接入多源异构临床数据，通过数据清洗、标注、转换工具保障数据质量与可用性，采用加密、脱敏、访问控制等手段保障安全合规。",
    icon: Database,
  },
  {
    title: "模型训练优化",
    description:
      "以预训练模型为基础，通过多模态数据综合分析，针对不同医学领域和任务进行训练微调，支持复杂科研任务的模型有效性验证。",
    icon: Brain,
  },
  {
    title: "应用开发集成",
    description:
      "基于训练好的大模型与私有数据，开发多领域智能应用，提供标准 API 接口与插件机制，与 HIS、EMR 等现有系统及硬件设备集成。",
    icon: Blocks,
  },
  {
    title: "科研任务协同",
    description:
      "支持多人在线协作，科研团队在平台上共同完成数据标注、模型训练与应用开发，保障科研项目高效管理和协同推进。",
    icon: FlaskConical,
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

export function XuanwuHospital() {
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
          badge="合作医院 · 首都医科大学宣武医院"
          title={
            <>
              <span className="block sm:whitespace-nowrap">首都医科大学宣武医院</span>
              <span className="block sm:whitespace-nowrap">
                国家级医学中心
              </span>
            </>
          }
          description="以临床数据为基础，以人工智能为驱动，构建科研数据、模型训练与应用开发一体化平台，加速医疗科研成果转化。"
          primaryCta={{ label: "开启合作咨询", href: "#waitlist" }}
          secondaryCta={{ label: "了解合作医院", href: "#hospital" }}
          partnersLabel="合作建设方向"
          partners={["医疗大数据｜医疗大模型｜智能科研｜临床转化"]}
          backgroundImage="/img/partner-hospitals/xuanwu-hospital-hero-hd.jpg"
          backgroundImageClassName="scale-110"
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
          title="深耕神经科学与老年医学"
          description={hospitalIntro.description}
          capabilities={hospitalIntro.capabilities}
          capabilitiesLayout="stats"
          views={[
            {
              label: "国家级医学中心",
              image: "/img/partner-hospitals/xuanwu-neuroscience.jpg",
            },
          ]}
          showCtas={false}
        />

        <Showcase6
          id="background"
          title="AI驱动医疗科研进入智能化发展新阶段"
          description="面对数据分散与落地周期长等挑战，以人工智能构建一体化科研平台。"
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
            title="基于大数据与大模型的数智化应用科研管理平台"
            description="依托宣武医院临床数据与专科知识，打造数据、模型、应用一体的智能化科研平台。"
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
          title="应用延伸"
          titleLine2="从数据到验证"
          backgroundImage="/img/partner-hospitals/xuanwu-extension-bg-lab-v3.jpg"
          backgroundMirrored
          backgroundAlt="从数据到验证的科研与临床转化场景"
          cta={{ label: "开启合作咨询", href: "#waitlist" }}
          cardImage="/img/partner-hospitals/xuanwu-extension-card-bci-v2.jpg"
          cardImageAlt="脑机接口信号采集与解码"
          cardTitle="华西数医科研管理平台"
          cardDescription="宣武医院已在认知障碍、帕金森与脑机接口等方向形成从数据到验证的研发链条。华西数医科研管理平台将加速模型训练与临床转化。"
          cardCta={null}
        />

        <Waitlist6
          title="开启合作咨询"
          description="如需了解与宣武医院同类合作医院的建设路径与落地方式，欢迎联系我们"
          darkTransparent
        />
      </main>
    </>
  );
}

export default XuanwuHospital;
