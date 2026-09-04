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
  Features2,
  HOSPITAL_ARCHITECTURE_FEATURES,
} from "@/components/blocks/features-2";
import {
  HowItWorks3,
  HOSPITAL_HOW_IT_WORKS_ITEMS,
} from "@/components/blocks/how-it-works-3";
import Features12, {
  HOSPITAL_FEATURES12_CARDS,
} from "@/components/blocks/features-12";
import Stats12 from "@/components/blocks/stats-12";
import Stats3 from "@/components/blocks/stats-3";
import Waitlist6 from "@/components/blocks/waitlist-6";
import { Hero7 } from "@/components/blocks/hero-7";
import {
  LenticularCarouselSection,
  HOSPITAL_VALUE_ITEMS,
} from "@/components/lenticular-carousel-section";

/** 医院数智化页专属首屏图（按方案优势及价值配图质感重生成，共 9 张） */
const HOSPITAL_HERO_IMAGES = [
  "/img/solutions/hero7-hospital/hero-hospital-01-patient-care.png",
  "/img/solutions/hero7-hospital/hero-hospital-02-digital-doctor.png",
  "/img/solutions/hero7-hospital/hero-hospital-03-patient-assistant.png",
  "/img/solutions/hero7-hospital/hero-hospital-04-clinical-ai.png",
  "/img/solutions/hero7-hospital/hero-hospital-05-doctor-workbench.png",
  "/img/solutions/hero7-hospital/hero-hospital-06-data-governance.png",
  "/img/solutions/hero7-hospital/hero-hospital-07-collaboration.png",
  "/img/solutions/hero7-hospital/hero-hospital-08-iot-ward.png",
  "/img/solutions/hero7-hospital/hero-hospital-09-smart-future.png",
];

const overviewTabs: Features4Tab[] = [
  {
    icon: ClipboardList,
    title: "建设背景与必要性",
    description: "数智化转型是智慧医院建设的关键支撑",
    detail:
      "以 AI 驱动信息化建设，提供个性化、智能化的医疗服务，是对医院治理、服务与运营体系的全面重构，推动医院高质量发展。",
    features: [
      {
        title: "关键支撑",
        description: "数智化转型支撑智慧医院体系建设",
      },
      {
        title: "AI 驱动",
        description: "以人工智能驱动医院信息化升级",
      },
      {
        title: "个性智能服务",
        description: "提供个性化、智能化的医疗服务能力",
      },
      {
        title: "体系重构",
        description: "全面重构医院治理、服务与运营体系",
      },
    ],
  },
  {
    icon: Crosshair,
    title: "建设定位",
    description: "以电子病历为核心，以 AI 为驱动",
    detail:
      "围绕电子病历核心，以 AI 为驱动，覆盖数智化基建、AI 智能应用、医疗物联网与数据治理四大领域，构建医院数智化能力底座。",
    features: [
      {
        title: "数智化基建",
        description: "信息系统、数据中心、网络架构、智能硬件",
      },
      {
        title: "AI 智能应用",
        description: "大数据、AI、云计算、智能工作流",
      },
      {
        title: "医疗物联网",
        description: "IoT 监测、AI 预警、可视化平台",
      },
      {
        title: "数据治理",
        description: "全生命周期管理、数据资产化",
      },
    ],
  },
  {
    icon: Flag,
    title: "总体目标",
    description: "数据驱动、AI 赋能、安全可控",
    detail:
      "以数据驱动、AI 赋能、安全可控为支柱，构建「基础平台 → 数据中台 → AI 能力层 → 智能应用层」四层技术架构，形成智慧医院新生态。",
    features: [
      {
        title: "数据驱动",
        description: "数据汇聚、治理沉淀",
      },
      {
        title: "AI 赋能",
        description: "模型驱动、能力增强",
      },
      {
        title: "智能协同与新生态",
        description: "人机协同提效，创新服务持续共赢",
      },
      {
        title: "安全可控",
        description: "数据安全、隐私保护",
      },
    ],
  },
  {
    icon: Scale,
    title: "建设原则",
    description: "统一标准、数据互通、安全合规、支撑 AI",
    detail:
      "坚持统一标准、数据互通、安全合规与支撑 AI 应用四项原则，夯实医院数智化底座，保障建设可持续演进。",
    features: [
      {
        title: "统一标准",
        description: "建立统一数据与接口标准",
      },
      {
        title: "数据互通",
        description: "打通异构系统互联互通",
      },
      {
        title: "安全合规",
        description: "严格落实等级保护要求",
      },
      {
        title: "支撑 AI 应用",
        description: "为 AI 训练提供高质量数据",
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

const riskControls = [
  {
    step: "01",
    title: "数据安全管控",
    image: "/img/solutions/risk-control/risk-01-data-security.png",
    points: [
      "数据权限精细化管理",
      "患者隐私保护与数据脱敏",
      "数据分类分级管控",
      "数据访问审计留痕",
    ],
  },
  {
    step: "02",
    title: "全链路过程管控",
    image: "/img/solutions/risk-control/risk-02-process.png",
    points: [
      "全链路追踪与审计",
      "AI决策可追溯、可解释",
      "模型行为监测与评估",
      "审计留痕与合规检查",
    ],
  },
  {
    step: "03",
    title: "渐进式上线策略",
    image: "/img/solutions/risk-control/risk-03-rollout.png",
    points: [
      "“逐步试点→验证评估→逐步放开”",
      "风险可控前提下的快速迭代",
      "灰度发布与A/B测试",
      "应急回滚机制",
    ],
  },
] as const;

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

export function HospitalDigitalTransformation() {
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
          badgeLabel="医院数智化转型解决方案"
          title="数智驱动医疗·智慧引领未来"
          description="以AI赋能为核心引擎，构建以患者为中心的智慧医疗服务体系，推动医院高质量发展"
          tags={[
            "四大数智支柱",
            "六大核心能力",
            "三大智能应用",
            "四大应用场景",
          ]}
          images={HOSPITAL_HERO_IMAGES}
          badgePrefixClassName="text-[12px]"
          badgeLabelClassName="text-[14px]"
          titleClassName="text-[48px]"
          descriptionClassName="max-w-[1200px] text-[16px] max-sm:whitespace-normal sm:whitespace-nowrap"
        />

        <Features4
          description="通过数智化技术提升医疗服务质量和效率，构建以患者为中心的医疗服务体系"
          tabs={overviewTabs}
        />

        <LenticularCarouselSection
          description="四大支柱构建数智化转型基础，全面覆盖医院建设场景"
          items={HOSPITAL_VALUE_ITEMS}
        />

        <Features2
          features={HOSPITAL_ARCHITECTURE_FEATURES}
          description="四层技术架构 + 数据飞轮驱动，构建医院数智化转型完整体系"
        />

        {/* Main features */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
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

        <Features12
          badgeLabel={null}
          title="落地场景·全流程智慧医疗服务"
          description="覆盖各级医疗机构、区域协同、专业领域及公共卫生体系，全面覆盖医疗细分场景"
          cards={HOSPITAL_FEATURES12_CARDS}
        />

        <section
          className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8"
          aria-label="落地场景与实施路径"
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[50px]">
            <HowItWorks3
              embedded
              items={HOSPITAL_HOW_IT_WORKS_ITEMS}
              title="实施路径：四步走战略"
              description={null}
            />
          </div>
        </section>

        {/* AI risk control */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                AI风险管控体系
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                三维度风险管控框架，确保AI应用安全可控
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {riskControls.map((item, index) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[0_0_24px_rgba(0,0,0,0.06)] dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl"
                >
                  <span className="text-[28px] font-semibold tracking-tight text-neutral-300 dark:text-neutral-600">
                    {item.step}
                  </span>
                  <h3 className="text-[18px] font-semibold text-neutral-950 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-white/[0.06]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <ul className="flex flex-col gap-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                      >
                        <svg
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 shrink-0 text-[#cdcdcd]"
                          aria-hidden="true"
                        >
                          <path
                            fill="currentColor"
                            d="M486.4 630.4c-19.2 19.2-48 19.2-67.2 3.2l-137.6-131.2-32 35.2 137.6 131.2c38.4 35.2 96 35.2 134.4-3.2l281.6-297.6-35.2-32L486.4 630.4z"
                          />
                          <path
                            fill="currentColor"
                            d="M512 51.2c-252.8 0-460.8 204.8-460.8 460.8s204.8 460.8 460.8 460.8 460.8-204.8 460.8-460.8S764.8 51.2 512 51.2zM512 924.8c-227.2 0-412.8-185.6-412.8-412.8s185.6-412.8 412.8-412.8 412.8 185.6 412.8 412.8S739.2 924.8 512 924.8z"
                          />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
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

export default HospitalDigitalTransformation;
