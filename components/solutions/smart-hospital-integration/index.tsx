"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  Crosshair,
  Flag,
  Lock,
  MessageCircle,
  MonitorSmartphone,
  Radio,
  Scale,
  Settings2,
  Stethoscope,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Features4,
  type Features4Tab,
} from "@/components/blocks/features-4";
import {
  ArchitectureLayersSection,
  SMART_HOSPITAL_ARCHITECTURE_LAYERS,
} from "@/components/blocks/architecture-layers";
import Features12, {
  SMART_HOSPITAL_FEATURES12_CARDS,
} from "@/components/blocks/features-12";
import ScrollStack from "@/components/react-bits/scroll-stack";
import type { ScrollStackItem } from "@/components/react-bits/scroll-stack";
import Stats12 from "@/components/blocks/stats-12";
import Stats3 from "@/components/blocks/stats-3";
import Waitlist6 from "@/components/blocks/waitlist-6";
import { Hero7 } from "@/components/blocks/hero-7";
import {
  LenticularCarouselSection,
  SMART_HOSPITAL_VALUE_ITEMS,
} from "@/components/lenticular-carousel-section";

const SCROLL_STACK_ITEMS: ScrollStackItem[] = SMART_HOSPITAL_VALUE_ITEMS.map(
  (item, index) => ({
    eyebrow: item.meta,
    title: item.title,
    body: item.description,
    image: item.src,
    accent: ["#9bd1ff", "#a8c8ec", "#b8b8f0", "#8ebce8"][index] ?? "#9bd1ff",
  }),
);

const overviewTabs: Features4Tab[] = [
  {
    icon: ClipboardList,
    title: "方案必要性",
    description: "信息孤岛与合规要求倒逼集成升级",
    detail:
      "大型医疗机构通常运行 80—150 套业务系统，来自 30+ 厂商，烟囱式建设导致信息孤岛；约 85% 医院难以实现跨院数据互通。国家卫健委要求公立医院于 2026 年 1 月 1 日前完成 HL7 FHIR R4+ 接口适配，系统集成已成为数智化转型刚需。",
    features: [
      {
        title: "系统高度复杂",
        description: "单院普遍运行 80—150 套业务系统",
      },
      {
        title: "厂商高度分散",
        description: "业务系统来自 30+ 家厂商，对接成本高",
      },
      {
        title: "数据互通受阻",
        description: "约 85% 医院难以实现跨院数据互通",
      },
      {
        title: "标准合规倒逼",
        description: "2026 年前需完成 HL7 FHIR R4+ 接口适配",
      },
    ],
  },
  {
    icon: Crosshair,
    title: "方案定位",
    description: "从点对点对接迈向总线式集成平台",
    detail:
      "面向大型医疗机构的领先集成平台，以「应用集成可视化、数据集成自动化、MQ 消息统一化、API 管理标准化」为核心能力，推动从点对点接口对接迈向总线式集成平台架构。",
    features: [
      {
        title: "应用集成可视化",
        description: "统一应用接入与集成过程可视化管理",
      },
      {
        title: "数据集成自动化",
        description: "自动化数据汇聚、转换与同步",
      },
      {
        title: "MQ 消息统一化",
        description: "统一消息总线，保障业务事件可靠流转",
      },
      {
        title: "API 管理标准化",
        description: "标准化 API 发布、治理与复用",
      },
    ],
  },
  {
    icon: Flag,
    title: "方案目标",
    description: "四个统一，降本增效可量化",
    detail:
      "建设医院统一集成中枢，实现「四个统一」：统一应用集成入口、统一数据集成底座、统一消息管控中枢、统一 API 运营平台；接口对接成本降低 60% 以上，API 复用率提升至 80% 以上。",
    features: [
      {
        title: "统一应用集成入口",
        description: "收敛多系统接入，形成统一集成入口",
      },
      {
        title: "统一数据集成底座",
        description: "夯实跨系统数据汇聚与共享底座",
      },
      {
        title: "统一消息管控中枢",
        description: "构建可靠、可观测的消息流转中枢",
      },
      {
        title: "统一 API 运营平台",
        description: "提升 API 复用率，降低对接成本",
      },
    ],
  },
  {
    icon: Scale,
    title: "方案原则",
    description: "标准化、松耦合、安全可控、高性能",
    detail:
      "坚持标准化、松耦合、安全可控与高性能四项原则，保障集成平台可扩展、可治理、可持续演进。",
    features: [
      {
        title: "标准化",
        description: "遵循 HL7 FHIR、CDA、DICOM 等医疗互操作标准",
      },
      {
        title: "松耦合",
        description: "总线架构支撑业务系统即插即用",
      },
      {
        title: "安全可控",
        description: "精细化权限管理与全链路审计留痕",
      },
      {
        title: "高性能",
        description: "支持万级 TPS 并发，保障医嘱等关键数据一致性",
      },
    ],
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
    title: "数字医生",
    description:
      "规模化复制顶级专家临床推理的 AI 医疗智能体，让诊疗能力可学习、可复制、可部署。",
    tags: ["复杂医学推理", "主动交互", "多模态感知", "辅助决策", "病历质控"],
    icon: Stethoscope,
  },
  {
    title: "AI 患者服务助手",
    description:
      "主动式 AI 患者服务，覆盖诊前、诊中、诊后全流程，提供连续个性化就医体验。",
    tags: ["智能分诊", "预约挂号", "报告解读", "诊后随访", "健康监测"],
    icon: MessageCircle,
  },
  {
    title: "医生 AI 智能工作台",
    description: "辅助医教研管各项事务的 AI 助手，覆盖临床、办公与个人智能体。",
    tags: ["临床辅助决策", "文书生成", "患者管理", "数据分析", "个人智能体"],
    icon: MonitorSmartphone,
  },
  {
    title: "AIOS 智能体开发平台",
    description:
      "医院级智能体开发与运行基座，支持模型、数据、知识与工具复用及低代码构建。",
    tags: ["智能体管理", "自然语言开发", "低代码构建", "运行监测", "安全治理"],
    icon: Settings2,
  },
  {
    title: "院内医疗物联网",
    description: "IoT + AI 智能在线监测与数字化管理，实现设备、环境与资产一体化。",
    tags: ["设备在线监测", "环境智能感知", "AI 预警", "可视化平台", "智能运维"],
    icon: Radio,
  },
  {
    title: "数据治理与保护平台",
    description: "一站式数据全生命周期管理，兼顾数据资产化与隐私安全合规。",
    tags: ["数据接入", "数据治理", "数据资产", "隐私保护", "全链路审计"],
    icon: Lock,
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
      className="group relative flex h-[340px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/80 bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06),inset_0_0_0_1px_rgba(255,255,255,0.95)] transition-[box-shadow,color,border-color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
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
        className={`relative z-[1] line-clamp-2 text-[14px] leading-relaxed transition-colors duration-300 sm:text-[15px] ${
          isHovered ? "text-white/90" : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

export function SmartHospitalIntegration() {
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
          badgeLabel="智慧医院/系统集成解决方案"
          title="集成无界 · 数智连通"
          description="打破医疗信息壁垒，构建统一集成底座，实现应用、数据、消息与API高效协同，赋能数智医院高质量转型。"
          tags={[
            "451亿｜市场规模持续增长",
            "80–150套｜系统高度复杂",
            "85%｜数据互通受阻",
          ]}
          badgePrefixClassName="text-[12px]"
          badgeLabelClassName="text-[14px]"
          titleClassName="text-[48px]"
          descriptionClassName="max-w-[1200px] text-[16px] max-sm:whitespace-normal sm:whitespace-nowrap"
        />

        <Features4
          description="打破医疗信息烟囱，构建统一集成底座"
          tabs={overviewTabs}
        />

        <LenticularCarouselSection
          title="领先的医疗行业服务集成"
          description="四大核心能力，构建医院集成新范式"
          items={SMART_HOSPITAL_VALUE_ITEMS}
        />

        <ArchitectureLayersSection
          label={null}
          title="四层技术架构 · 医疗系统集成平台"
          description="以应用集成、集成总线、数据集成、基础设施四层贯通，打造医疗系统一站式混合集成平台"
          layers={SMART_HOSPITAL_ARCHITECTURE_LAYERS}
          variant="diagram"
          className="bg-white"
        />

        <Features12
          badgeLabel={null}
          title="核心功能"
          description="六大核心模块，覆盖医疗集成全场景"
          cards={SMART_HOSPITAL_FEATURES12_CARDS}
          columns={3}
          className="bg-[#F8F8F8]"
        />

        <ScrollStack
          items={SCROLL_STACK_ITEMS}
          variant="stack"
          showCounter={false}
          className="bg-white dark:bg-transparent"
        />

        {/* Main features */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                主要功能
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                六大核心功能模块，覆盖医教研管全场景智能应用
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {pains.map((item, index) => (
                <PainCard key={item.title} item={item} index={index} />
              ))}
            </div>
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
                  以可量化的指标体系跟踪评估数智化转型成效
                </p>
              </div>

              <Stats3
                embedded
                title="建设成效与运营指标"
                description="基于华西二院实践数据，从应用活跃、建设评级、能力覆盖与业务成效四个维度，展示数智化转型的阶段成果。"
                stats={[
                  { value: "42万+", label: "患者助手累计会话" },
                  { value: "21万+", label: "AI服务累计用户" },
                ]}
              />
            </div>

            <Stats12 embedded variant="hospital" />
          </div>
        </section>

        <Waitlist6 />
      </main>
    </>
  );
}

export default SmartHospitalIntegration;
