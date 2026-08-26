"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  BedDouble,
  Bot,
  Building2,
  CircleCheck,
  ClipboardList,
  Clock,
  FilePenLine,
  Handshake,
  Laptop,
  Link2,
  Microscope,
  Shield,
  Zap,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { OutlineCtaLink } from "@/components/outline-cta";
import Comparison8DoctorPlatform from "@/components/blocks/comparison-8-doctor-platform";
import Features12DoctorPlatform from "@/components/blocks/features-12-doctor-platform";
import { CountUp } from "@/components/blocks/stats-10";
import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";

const CTA_GRADIENT_COLORS = ["#1496d9", "#3b82f6", "#9ec9ff"];

const stats = [
  {
    value: 84,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "病历录入时间缩减",
  },
  {
    value: 98,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%",
    label: "病历甲级率",
  },
  {
    value: 40,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "医疗差错率下降",
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
    title: "文书负担过重",
    description:
      "病历书写占临床工作总时长的40%以上，每日花费2-3小时在重复性文书工作上，核心诊疗精力被严重稀释。",
    icon: FilePenLine,
  },
  {
    title: "多系统频繁切换",
    description:
      "HIS、EMR、LIS、PACS等数十套系统各自独立，医生需频繁切换登录、重复录入信息，操作碎片化严重。",
    icon: ArrowLeftRight,
  },
  {
    title: "病历质控滞后",
    description:
      "病历质控依赖事后抽查，问题发现时已错过修正窗口，病历甲级率提升困难，电子病历评级压力大。",
    icon: Clock,
  },
  {
    title: "任务管理分散",
    description:
      "日程待办、随访任务、会诊通知、行政事务散落各处，缺乏统一工作入口，遗漏和延误频发。",
    icon: ClipboardList,
  },
  {
    title: "风险预警缺失",
    description:
      "危急值、药物相互作用、病情恶化等风险依赖人工识别，预警不及时，患者安全隐患大。",
    icon: AlertTriangle,
  },
  {
    title: "诊疗决策受限",
    description:
      "医生决策依赖个人经验，缺乏循证知识库和AI辅助，多专科信息整合视角有限，诊疗同质化难保障。",
    icon: Building2,
  },
];

const architectureLayers = [
  {
    name: "场景层",
    items: [
      "互联网医院",
      "门诊接诊",
      "住院查房",
      "远程会诊",
      "事务管理",
    ],
  },
  {
    name: "工具层",
    items: [
      "病历AI助手",
      "质控AI助手",
      "病情监控AI",
      "专科报告AI",
      "任务管理AI",
      "语音录入AI",
    ],
  },
  {
    name: "核心层",
    items: [
      "统一智能工作台",
      "医疗+事务双核驱动",
      "语音录入",
      "病历生成",
      "质控反馈",
      "风险预警",
      "任务提醒",
      "统一入口",
    ],
  },
  {
    name: "引擎层",
    items: [
      "华西数医大模型",
      "多智能体协同",
      "医学知识图谱",
      "临床循证引擎",
      "语音识别引擎",
    ],
  },
  {
    name: "数据源",
    items: [
      "HIS/EMR院内数据",
      "LIS/PACS检验检查",
      "医嘱/护理数据",
      "患者体征数据",
      "排班/日程数据",
    ],
  },
];

const applicationScenarios: {
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    category: "线上场景",
    title: "互联网医院",
    description:
      "AI驱动的全流程智慧服务，优化在线诊疗生态，自动关联患者数据，辅助线上问诊决策，自动生成线上问诊记录。",
    icon: Laptop,
  },
  {
    category: "核心场景",
    title: "门诊接诊",
    description:
      "AI赋能全流程创新，重塑门诊全流程，接诊前调阅病史，接诊中辅助决策，接诊后自动生成病历并质控。",
    icon: Building2,
  },
  {
    category: "住院场景",
    title: "住院查房",
    description:
      "AI驱动全周期诊疗协同，重构住院全链路，查房前病情摘要，查房中语音记录，查房后自动生成记录。",
    icon: BedDouble,
  },
  {
    category: "协同场景",
    title: "远程会诊",
    description:
      "AI协同全流程智慧升级，重构会诊链路，自动汇聚多院数据，生成会诊摘要，辅助决策与记录。",
    icon: Handshake,
  },
  {
    category: "事务场景",
    title: "事务管理",
    description:
      "AI驱动智慧政务中枢，赋能医院行政事务管理，日程、审批流程、会议纪要等事务智能处理。",
    icon: ClipboardList,
  },
  {
    category: "专科场景",
    title: "专科报告辅助",
    description:
      "历史报告自动调取与病情变化对比，报告错别字检测纠错，报告意义解读与专科诊疗建议。",
    icon: Microscope,
  },
];

const values: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "全场景能力集成，统一工作台入口",
    description:
      "整合诊疗、文书、质控、任务管理各类工具，统一工作台入口，减少多系统频繁切换，操作效率显著提升。",
    icon: Zap,
  },
  {
    title: "文书减负，病历效率飞跃",
    description:
      "语音录入+AI病历生成，病历录入时间缩短84%，书写效率提升60%，每日节省2小时，病历甲级率达98%。",
    icon: FilePenLine,
  },
  {
    title: "质控前移，病历质量保障",
    description:
      "事前+事中+事后全流程质控，缺陷自动检出与一键纠错，病历当日完成率从68%升至99.2%，支撑电子病历评审。",
    icon: CircleCheck,
  },
  {
    title: "风险预警，医疗安全提升",
    description:
      "危急值实时识别、药物相互作用拦截、病情恶化预测，主动推送风险预警，医疗差错率下降40%。",
    icon: Shield,
  },
  {
    title: "多AI联动，数据一次调用多处复用",
    description:
      "病历、质控、病情监控多类专项AI工具联动协同，数据一次调用多处复用，减少重复信息录入。",
    icon: Bot,
  },
  {
    title: "全流程闭环，问题可追踪可闭环",
    description:
      "任务提醒、风险预警、质控反馈一体化，问题可追踪闭环处置，实现全流程闭环管控。",
    icon: Link2,
  },
];

const valueStats = [
  {
    value: 84,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "病历录入时间缩减",
  },
  {
    value: 98,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%",
    label: "病历甲级率",
  },
  {
    value: 40,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "医疗差错率下降",
  },
  {
    value: 2,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "h+",
    label: "每日节省文书时间",
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
      className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-[box-shadow,color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
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
          className={`line-clamp-2 min-h-[2.75em] text-[14px] leading-relaxed transition-colors duration-300 sm:min-h-[3em] sm:text-[15px] ${
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

export default function AiDoctorPlatformPage() {
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
                    华西数医大模型驱动 · 多智能体协同 · 医疗+事务双核驱动
                  </span>
                </div>

                <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-[44px]">
                  AI医生助手
                  <br />
                  打通医务工作全链条
                </h1>
                <p className="max-w-2xl text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  聚焦临床医生的统一智能工作入口，聚合各类医疗AI能力，覆盖日程待办、门诊接诊、住院查房、病历撰写、病历质控、风险预警等全场景工作，协助医生完成95%+的医务工作，实现效率、质量、安全三重突破。
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
                  src="/img/products/ai-doctor-platform.jpeg"
                  alt="AI 医生助手"
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
                        <CountUp to={item.value} format={item.format} />
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
                临床医生的六大负担
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                病历书写占临床工作40%以上，多系统切换、重复录入、质控滞后，医生核心诊疗精力被严重稀释
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
                五层架构 · 统一智能工作入口
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                以华西数医大模型为核心引擎，多类专项AI工具联动协同，构建医疗+事务双核驱动的智能工作台
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

        <Features12DoctorPlatform />

        {/* Application scenarios */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>应用场景</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                五大场景 · 全链路覆盖医务工作
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从互联网医院到住院查房，从门诊接诊到行政事务，AI驱动全场景智慧升级
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {applicationScenarios.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-[16px] border-l-4 border-l-neutral-950 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-1">
                        <h3 className="text-[17px] font-semibold text-neutral-950 dark:text-white">
                          {item.title}
                        </h3>
                        <span className="inline-flex w-fit rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-950 dark:bg-white/10 dark:text-white">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>核心价值</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                六大价值 · 效率 · 质量 · 安全三重突破
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从文书减负到诊疗增效，从质控前移到风险防控，助推医疗数字化转型
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
                      <p className="line-clamp-2 text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
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
                        <CountUp to={item.value} format={item.format} />
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

        <Comparison8DoctorPlatform />

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
              让医生从文书减负回归诊疗核心
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
              AI医生助手与您携手，打通医务工作全链条，以「医疗+事务」双核驱动模式，实现效率、质量、安全三重突破，助推医疗数字化转型。
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
