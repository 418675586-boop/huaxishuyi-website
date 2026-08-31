"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  ClipboardList,
  Eye,
  Heart,
  Link2,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Shuffle,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { OutlineCtaLink } from "@/components/outline-cta";
import { CountUp } from "@/components/blocks/stats-10";
import Features12ResearchDigitalDoctor from "@/components/blocks/features-12-research-digital-doctor";
import Comparison8ResearchDigitalDoctor from "@/components/blocks/comparison-8-research-digital-doctor";
import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";

const CTA_GRADIENT_COLORS = ["#1496d9", "#3b82f6", "#9ec9ff"];

const stats: {
  label: string;
  suffix: string;
  staticValue?: string;
  value?: number;
  format?: (n: number) => string;
}[] = [
  {
    staticValue: "3–5",
    suffix: "倍",
    label: "入组效率提升",
  },
  {
    value: 92.1,
    format: (n: number) => n.toFixed(1),
    suffix: "%",
    label: "入排标准匹配准确率",
  },
  {
    value: 0.44,
    format: (n: number) => n.toFixed(2),
    suffix: "s",
    label: "单条标准匹配耗时",
  },
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

const pains: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "患者招募困难",
    description:
      "人工逐条比对入排标准，效率极低。临床试验受试者招募周期占研究总时长的30%—40%，约80%试验因招募不及预期而延期。",
    icon: Search,
  },
  {
    title: "入组审核繁琐",
    description:
      "患者画像与入排标准逐条对比依赖人工判断，漏判率高、一致性差，审核周期长，影响项目进度。",
    icon: ClipboardList,
  },
  {
    title: "随访数据采集难",
    description:
      "长周期随访依赖人工电话和纸质表单，数据采集不完整、不及时，失访率高，影响研究结论可靠性。",
    icon: BarChart3,
  },
  {
    title: "数据可追溯性弱",
    description:
      "审核决策依据难以回溯，签署过程缺乏电子化轨迹，病历与原始对话数据割裂，难以满足GCP合规要求。",
    icon: Link2,
  },
  {
    title: "知识资产难沉淀",
    description:
      "医生审核偏好、随访方案等经验散落在个人手中，缺乏标准化沉淀和复用机制，研究能力难以持续迭代。",
    icon: BookOpen,
  },
  {
    title: "医患两端脱节",
    description:
      "医生科研管理与患者参与随访各自为政，数据标准不统一、流程不衔接，科研全链路信息断层。",
    icon: Shuffle,
  },
];

const architectureLayers = [
  {
    name: "场景层",
    items: [
      "患者入组匹配",
      "智能审核决策",
      "全流程随访",
      "科研数据溯源",
      "知识库管理",
      "知情同意签署",
    ],
  },
  {
    name: "双端层",
    items: [
      "患者数字医生",
      "医生工作台",
      "多轮问诊",
      "SOAP病历生成",
      "审核决策建议",
      "随访任务日历",
      "双端协同",
    ],
  },
  {
    name: "智能体层",
    items: [
      "问诊智能体",
      "匹配智能体",
      "随访智能体",
      "结构化抽取智能体",
      "审核智能体",
      "知识生成智能体",
    ],
  },
  {
    name: "底座层",
    items: [
      "研究型知识库",
      "华西数医大模型",
      "纳入排除标准库",
      "随访模板库",
      "审核策略库",
      "科研资产库",
    ],
  },
  {
    name: "数据源",
    items: [
      "HIS/EMR院内数据",
      "课题方案/管理协议",
      "患者问诊数据",
      "随访采集数据",
      "可穿戴设备数据",
    ],
  },
];

const roles: {
  audience: string;
  items: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
}[] = [
  {
    audience: "面向医生：科研与诊疗增强",
    items: [
      {
        title: "知识库一键生成",
        description:
          "上传课题方案/管理协议，AI自动结构化为纳入排除标准、必采内容、随访模板，秒级完成。",
        icon: BookOpen,
      },
      {
        title: "审核效率倍增",
        description:
          "患者画像与入组标准自动逐条对比（通过/不通过/待确认），AI给出初审、终审决策建议。",
        icon: Zap,
      },
      {
        title: "经验数字化沉淀",
        description:
          "医生个人审核偏好、随访方案、补采策略沉淀至专属知识库，形成可复用的标准化科研资产。",
        icon: Save,
      },
    ],
  },
  {
    audience: "面向患者：研究参与体验升级",
    items: [
      {
        title: "智能问诊匹配",
        description:
          "数字医生多轮问诊生成SOAP病历，自动匹配Top3适合的研究项目/管理组，推荐结果可解释。",
        icon: Bot,
      },
      {
        title: "入组流程透明",
        description:
          "从初审、补采、终审到同意书签署，全流程节点可视、状态实时同步，患者全程知情。",
        icon: Eye,
      },
      {
        title: "全病程随访照护",
        description:
          "入组后任务日历驱动每日待办，病历库与对话历史可回溯，建立长期健康管理与服务。",
        icon: Heart,
      },
    ],
  },
  {
    audience: "面向研究机构：科研运营智能化",
    items: [
      {
        title: "入组质量提升",
        description:
          "标准化审核对比与多轮信息采集，降低人为漏判、提升入组准确率，入组效率提升3-5倍。",
        icon: TrendingUp,
      },
      {
        title: "流程效率优化",
        description:
          "从问诊到入组的全链路自动化，减少医患往返沟通成本，研究周期显著缩短。",
        icon: Settings,
      },
      {
        title: "数据可追溯",
        description:
          "病历可定位到对话原文、审核可回溯到推理依据、签署可重放签名轨迹，满足GCP合规。",
        icon: Search,
      },
    ],
  },
];

const values: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "双端协同、全链路闭环",
    description:
      "打通医生科研治理与患者参与随访全流程，实现从项目匹配、入组审核到长期随访的完整业务闭环。",
    icon: Link2,
  },
  {
    title: "AI赋能科研效率飞跃",
    description:
      "自动结构化科研知识库、智能比对入组标准、生成SOAP病历、输出审核决策建议，入组效率提升3-5倍。",
    icon: Zap,
  },
  {
    title: "多智能体精细化分工",
    description:
      "搭载问诊、匹配、随访、结构化抽取等多类专属智能体，精准适配科研全场景细分业务需求。",
    icon: Bot,
  },
  {
    title: "科研数据可追溯可控",
    description:
      "病历、审核、签署全流程可溯源、可复盘，满足临床研究GCP合规性与真实性要求。",
    icon: ShieldCheck,
  },
  {
    title: "知识资产可沉淀复用",
    description:
      "沉淀医生专属审核策略、随访方案，形成标准化科研资产，实现研究能力持续迭代与跨项目复用。",
    icon: BookOpen,
  },
  {
    title: "跨端数据高度统一",
    description:
      "依托标准化研究知识库，保障医患两端字段、标准、流程一致性，规避业务偏差，确保数据质量。",
    icon: BarChart3,
  },
];

const valueStats: {
  label: string;
  suffix: string;
  staticValue?: string;
  value?: number;
  format?: (n: number) => string;
}[] = [
  {
    staticValue: "3–5",
    suffix: "倍",
    label: "入组效率提升",
  },
  {
    value: 92.1,
    format: (n: number) => n.toFixed(1),
    suffix: "%",
    label: "入排标准匹配准确率",
  },
  {
    value: 0.44,
    format: (n: number) => n.toFixed(2),
    suffix: "s",
    label: "单条标准匹配耗时",
  },
  {
    value: 100,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%",
    label: "全链路数据可溯源",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
      {children}
    </span>
  );
}

function PainCard({
  item,
  index,
}: {
  item: (typeof pains)[number];
  index: number;
}) {
  const Icon = item.icon;
  const [hoverStyle, setHoverStyle] = useState(painHoverStyles[0]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => {
        setHoverStyle(
          painHoverStyles[Math.floor(Math.random() * painHoverStyles.length)],
        );
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-[box-shadow,color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
      style={
        isHovered
          ? { boxShadow: hoverStyle.shadow, color: "#fff" }
          : undefined
      }
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
      </div>

      <div className="relative z-[1] mt-10">
        <p
          className={`text-[14px] leading-relaxed transition-colors duration-300 sm:text-[15px] ${
            isHovered
              ? "text-white/90"
              : "text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function ResearchDigitalDoctorPage() {
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
          <div className="absolute -left-[10%] bottom-[-10%] h-[280px] w-[380px] rounded-full bg-[#8b2a7a]/18 blur-[110px]" />
          <div className="absolute left-[35%] bottom-[-15%] h-[240px] w-[420px] rounded-full bg-[#6b5b95]/15 blur-[120px]" />
          <div className="absolute -right-[8%] bottom-[-8%] h-[300px] w-[400px] rounded-full bg-[#2b4fd4]/19 blur-[110px]" />
        </div>

        {/* Hero */}
        <section className="relative z-[1] overflow-hidden bg-[#F4F5F7]/50 pt-[120px] pb-[90px] dark:bg-transparent">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#ffb8d9]/35 blur-[100px] dark:bg-[#7420e8]/20" />
            <div className="absolute right-[-5%] top-[20%] h-[480px] w-[480px] rounded-full bg-[#9ec9ff]/45 blur-[110px] dark:bg-[#4b8eff]/15" />
            <div className="absolute bottom-[-10%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#b8f0ea]/30 blur-[90px] dark:bg-[#20c8b8]/10" />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-0">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="flex flex-col gap-5"
              >
                <div className="flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white/60 p-1 backdrop-blur-sm sm:gap-3 dark:border-neutral-800 dark:bg-neutral-900/60">
                  <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white dark:bg-white dark:text-black">
                    大模型
                  </span>
                  <span className="mr-2 text-[12px] text-neutral-900 dark:text-neutral-100">
                    华西数医大模型 · 多智能体协同 · 医患双端数字科研
                  </span>
                </div>

                <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-[44px]">
                  研究型数字医生平台
                  <br />
                  智慧医疗科研新范式
                </h1>
                <p className="max-w-2xl text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  聚焦临床研究与慢病管理，通过「患者数字医生+医生工作台」双端协同，依托研究型知识库核心底座，构建患者、医生、研究机构三位一体的智慧医疗科研生态，为研究项目入组管理与慢病长期随访提供端到端智能化解决方案。
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#demo"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-950 px-4 text-[14px] text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
                  >
                    预约产品演示
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <OutlineCtaLink href="#capabilities">查看核心能力</OutlineCtaLink>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="relative overflow-hidden rounded-[20px] bg-neutral-200 dark:bg-neutral-900"
              >
                <Image
                  src="/img/products/research-digital-doctor.jpeg"
                  alt="研究型数字医生平台"
                  width={1200}
                  height={900}
                  className="h-auto w-full object-cover"
                  priority
                />
              </motion.div>
            </div>

            <div className="mt-12 rounded-2xl border border-white/60 bg-white/50 p-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="grid gap-6 sm:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <span className="flex items-baseline justify-center font-semibold text-neutral-950 dark:text-white">
                      <span className="text-[48px] tabular-nums leading-none">
                        {item.staticValue ?? (
                          <CountUp
                            to={item.value!}
                            format={item.format!}
                          />
                        )}
                      </span>
                      <span className="ml-0.5 text-[16px] leading-none">
                        {item.suffix}
                      </span>
                    </span>
                    <span className="text-[13px] text-neutral-600 dark:text-neutral-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>行业痛点</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                临床科研的六大瓶颈
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                传统临床研究高度依赖人工，从患者招募到数据采集全流程面临效率与质量双重挑战
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {pains.map((item, index) => (
                <PainCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>产品架构</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                五层架构 · 医患双端协同的数字科研底座
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                以研究型知识库为核心底座，多智能体分工协同，构建患者、医生、研究机构三位一体的科研生态
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="grid gap-4 rounded-[16px] bg-white p-5 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-xl sm:grid-cols-[140px_1fr] sm:items-center sm:p-6"
                >
                  <div className="text-[18px] font-semibold text-neutral-950 dark:text-white">
                    {layer.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#F8F8F8] px-3 py-1.5 text-[13px] text-neutral-700 dark:bg-white/10 dark:text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Features12ResearchDigitalDoctor />

        {/* Roles */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>三位一体</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                患者 · 医生 · 研究机构 三端协同
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                以组内知识库为核心数据底座，构建三位一体的研究型医疗科研生态
              </p>
            </div>

            <div className="flex flex-col gap-8">
              {roles.map((role) => (
                <div key={role.audience} className="flex flex-col gap-4">
                  <h3 className="text-[18px] font-semibold text-neutral-950 dark:text-white">
                    {role.audience}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {role.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="flex flex-col gap-4 rounded-[16px] bg-white p-6 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-xl"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white/15">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <h4 className="text-[17px] font-semibold text-neutral-950 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>核心价值</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                六大价值 · 科研提效 · 合规保障
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从人工密集型到AI智能驱动型，让临床研究更快、更准、更合规
              </p>
            </div>

            <div className="mb-12 grid gap-4 sm:grid-cols-2 sm:gap-5 [&>*]:relative">
              {values.map((item, index) => {
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
                    className="group relative z-0 flex origin-center items-start gap-5 rounded-3xl bg-white p-8 shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl sm:gap-6"
                  >
                    <Icon
                      className="icon-flip-once h-10 w-10 shrink-0 text-neutral-900 dark:text-white"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="mb-2 text-[18px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[20px]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#F5F5F5] p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {valueStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1 text-center"
                  >
                    <span className="flex items-baseline justify-center font-semibold text-neutral-950 dark:text-white">
                      <span className="text-[48px] tabular-nums leading-none">
                        {item.staticValue ?? (
                          <CountUp to={item.value!} format={item.format!} />
                        )}
                      </span>
                      <span className="ml-0.5 text-[16px] leading-none">
                        {item.suffix}
                      </span>
                    </span>
                    <span className="text-[13px] text-neutral-600 dark:text-neutral-400">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Comparison8ResearchDigitalDoctor />

        {/* CTA */}
        <section
          id="demo"
          className="relative z-[1] isolate overflow-hidden bg-neutral-950 px-4 py-[120px] sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 z-0">
            <GradientBlinds
              gradientColors={CTA_GRADIENT_COLORS}
              angle={18}
              noise={0.22}
              blindCount={18}
              blindMinWidth={56}
              spotlightRadius={0.55}
              spotlightSoftness={1.1}
              spotlightOpacity={0.85}
              distortAmount={0.35}
              shineDirection="left"
              mixBlendMode="normal"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-neutral-950/45" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 text-center">
            <h2 className="text-[36px] font-semibold tracking-tight text-white">
              让临床研究从「人力驱动」迈向「AI智能驱动」
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
              研究型数字医生平台与您携手，构建患者、医生、研究机构三位一体的智慧医疗科研生态，为临床研究与慢病管理提供端到端智能化解决方案。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#demo"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-neutral-950 transition-opacity hover:opacity-90"
              >
                预约产品演示
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/#products"
                className="inline-flex h-10 items-center rounded-full border border-white/40 px-5 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                返回产品矩阵
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
