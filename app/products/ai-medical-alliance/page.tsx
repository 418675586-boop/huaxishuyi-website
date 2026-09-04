"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Bot,
  Boxes,
  CalendarClock,
  GitBranchPlus,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  MonitorPlay,
  Network,
  Scale,
  Share2,
  ShieldOff,
  Stethoscope,
  TrendingUp,
  Video,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { OutlineCtaLink } from "@/components/outline-cta";
import Comparison8 from "@/components/blocks/comparison-8";
import Features12 from "@/components/blocks/features-12";
import {
  ArchitectureLayersSection,
  AI_MEDICAL_ALLIANCE_ARCHITECTURE_LAYERS,
} from "@/components/blocks/architecture-layers";
import { CountUp } from "@/components/blocks/stats-10";
import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";

const CTA_GRADIENT_COLORS = ["#1496d9", "#3b82f6", "#9ec9ff"];

const stats = [
  {
    value: 7.7,
    format: (n: number) => n.toFixed(1),
    suffix: "万+",
    label: "基层医疗机构覆盖（讯飞标杆）",
  },
  {
    value: 12,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "亿+",
    label: "累计辅助诊断建议次数",
  },
  {
    value: 52.6,
    format: (n: number) => n.toFixed(1),
    suffix: "%",
    label: "基层诊疗人次占比",
  },
];

const painHoverStyles = [
  {
    // 蓝 → 薰衣草
    background:
      "linear-gradient(145deg, #3b82f6 0%, #6b8cff 45%, #b8a4f8 100%)",
    shadow: "0 18px 40px rgba(59, 130, 246, 0.28)",
  },
  {
    // 中蓝
    background: "linear-gradient(180deg, #5ba8ff 0%, #3b82f6 55%, #2563eb 100%)",
    shadow: "0 18px 40px rgba(37, 99, 235, 0.28)",
  },
] as const;

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
}[] = [
  {
    title: "数据壁垒高",
    description: "各机构业务系统独立运行，患者信息无法跨机构共享，重复检查用药突出。",
    icon: Boxes,
  },
  {
    title: "资源分布不均",
    description: "优质专家集中在上级医院，基层资源匮乏，患者无序流动，分级诊疗难落地。",
    icon: Scale,
  },
  {
    title: "基层能力薄弱",
    description: "基层诊疗能力参差不齐，缺少上级专家实时指导，疑难重症识别率与信任度不足。",
    icon: Stethoscope,
  },
  {
    title: "转诊通道不畅",
    description: "双向转诊依赖线下审批，就诊信息无法同步流转，转诊响应慢、链路易断裂。",
    icon: GitBranchPlus,
  },
  {
    title: "集团调度困难",
    description: "多院区缺乏统一排班排床与号源调配，资源统筹效率低，运营管理分散。",
    icon: Network,
  },
  {
    title: "协同管控缺失",
    description: "跨机构业务缺少统一权限、内容审计与运营监控，合规与效率难以保障。",
    icon: ShieldOff,
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
    audience: "面向基层医生：诊疗能力提升",
    items: [
      {
        title: "AI辅助诊断决策",
        description:
          "AI大模型提供辅助诊断建议，辅助基层医生规范诊疗路径，累计提供超12亿次辅助诊断建议。",
        icon: Bot,
      },
      {
        title: "上级专家远程指导",
        description:
          "疑难重症实时申请上级专家远程会诊、远程查房指导，获取专家诊疗方案建议，提升诊断准确率。",
        icon: Video,
      },
      {
        title: "双向转诊一键发起",
        description:
          "线上智能转诊模块，精简线下审批流程，患者双向转诊、诊疗信息同步流转，转诊响应率达100%。",
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    audience: "面向上级专家：知识数字沉淀",
    items: [
      {
        title: "专家知识库构建",
        description:
          "专家诊疗经验、诊断路径数字化沉淀为可复用知识库，形成专家「数字分身」赋能基层。",
        icon: BookOpen,
      },
      {
        title: "远程会诊工作台",
        description:
          "专属工作端口支持远程会诊、数字MDT、跨院查房，实时调阅患者360全景数据，高效输出诊疗意见。",
        icon: MonitorPlay,
      },
      {
        title: "专科能力标准化输出",
        description:
          "将专科诊疗能力标准化输出至基层，推动专科联盟同质化发展，缩小上下级诊疗能力差距。",
        icon: GraduationCap,
      },
    ],
  },
  {
    audience: "面向管理端：集团化统一管控",
    items: [
      {
        title: "集团统筹资源调度",
        description:
          "多院区、医联体统筹排班、统一排床、号源智能调配，集团化运营效率显著提升。",
        icon: CalendarClock,
      },
      {
        title: "全域运营监控",
        description:
          "机构人员、AI模型、知识库、内容安全统一管理，权限审计、运营监控全流程保障合规高效。",
        icon: Activity,
      },
      {
        title: "智慧监管大屏",
        description:
          "依托医疗大数据动态监测核心业务指标，实现医疗风险全流程管控，提升精细化管理水平。",
        icon: LayoutDashboard,
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
    title: "全域资源互联互通",
    description:
      "打破机构院区数据壁垒，患者信息、诊疗资源与专家能力跨院共享，互认项目达888项。",
    icon: Share2,
  },
  {
    title: "优质资源精准下沉",
    description:
      "专家知识库与数字分身赋能基层，辅助查房评估与出院研判，异常检出率从32%升至68%。",
    icon: ArrowDownToLine,
  },
  {
    title: "分层AI精准赋能",
    description:
      "适配基层医生、上级专家、管理端三类角色，覆盖诊疗辅助、知识沉淀与平台管控。",
    icon: Layers,
  },
  {
    title: "全业务场景一站式集成",
    description:
      "整合诊疗协同、资源调度、科研随访与专科联盟，一站式满足医联体运营，避免平台割裂。",
    icon: LayoutGrid,
  },
  {
    title: "双向转诊闭环畅通",
    description:
      "线上智能转诊实现双向转诊与信息同步，上转优先诊疗检查住院，转诊响应率100%。",
    icon: ArrowLeftRight,
  },
  {
    title: "AI能力持续迭代进化",
    description:
      "依托真实临床数据持续优化模型与知识库，平台能力自主进化，越用越智能、越用越精准。",
    icon: TrendingUp,
  },
];

const valueStats = [
  {
    value: 7.7,
    format: (n: number) => n.toFixed(1),
    suffix: "万+",
    label: "基层机构覆盖（讯飞标杆）",
  },
  {
    value: 888,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "项",
    label: "检验检查互认项目",
  },
  {
    value: 100,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%",
    label: "双向转诊响应率",
  },
  {
    value: 50,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%↑",
    label: "双向转诊人次增长（vs2020）",
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
      className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-[box-shadow,color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
      style={
        isHovered ? { boxShadow: hoverStyle.shadow, color: "#fff" } : {}
      }
    >
      {/* 悬停渐变：透明度淡入，避免硬切与描边 */}
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

export default function AiMedicalAlliancePage() {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />

      <main id="main-content" className="relative flex-1 dark:bg-neutral-950">
        {/* 深色模式：页面底部淡光晕 */}
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
                    多智能体 · 跨机构协同 · 分级诊疗连续服务
                  </span>
                </div>

                <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-[44px]">
                  AI医联体平台
                  <br />
                  跨机构AI医疗协同赋能
                </h1>
                <p className="max-w-2xl text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  面向医联体、多院区、专科联盟的一体化跨机构医疗协同平台。以患者为核心，串联患者服务、基层医疗机构、上级专科资源与院内业务系统，打通院内外、上下级医疗服务链路，实现跨院诊疗协同、信息共享、资源下沉与集团化统一调度。
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
                  src="/img/products/ai-medical-alliance.jpeg"
                  alt="AI 医联体平台"
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
                医联体协同的六大困局
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                机构间数据壁垒高、资源分布不均、基层能力薄弱，连续医疗服务体系建设面临系统性挑战
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {pains.map((item, index) => (
                <PainCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <ArchitectureLayersSection
          layers={AI_MEDICAL_ALLIANCE_ARCHITECTURE_LAYERS}
        />

        <Features12 />

        {/* Roles */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>分层赋能</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                基层医生 · 上级专家 · 管理端 三角色协同
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                针对性适配三类角色，实现诊疗辅助、知识沉淀、平台管控全覆盖
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
                六大价值 · 协同提效 · 资源下沉
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                打破机构壁垒，让优质资源下沉基层，让数据在跨机构间安全流动
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

        <Comparison8 />

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
              让优质资源下沉基层 — 构建连续医疗服务新生态
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
              AI医联体平台与您携手，打破机构壁垒，打通上下级服务链路，实现跨院诊疗协同、信息共享、资源下沉与集团化统一调度。
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
