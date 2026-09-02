"use client";

import { useState, forwardRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Cloud,
  DiamondPlus,
  FilePenLine,
  HouseHeart,
  Link2,
  Puzzle,
  Server,
  ShieldCheck,
  Timer,
  Waypoints,
  Zap,
} from "lucide-react";

import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { OutlineCtaLink } from "@/components/outline-cta";
import Comparison8AiPreConsultation from "@/components/blocks/comparison-8-ai-pre-consultation";
import Features12AiPreConsultation from "@/components/blocks/features-12-ai-pre-consultation";
import { CountUp } from "@/components/blocks/stats-10";
import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";

const CTA_GRADIENT_COLORS = ["#1496d9", "#3b82f6", "#9ec9ff"];

/** 三根柱 + 上升趋势箭头，对齐参考图；24 格内留白与 Lucide 光学尺寸一致 */
const ChartRisingIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <path d="M7 19V14" />
      <path d="M12 19V11" />
      <path d="M17 19V9" />
      <path d="m4 12 3.5-3 3 2L18 5" />
      <path d="M14 5h4v4" />
    </svg>
  ),
);
ChartRisingIcon.displayName = "ChartRisingIcon";

/** 对话气泡 + 加号（用户图形，改描边以对齐同区 Lucide 1.5 粗细） */
const MedicalMessagesIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      <path d="M12 8v6" />
      <path d="M9 11h6" />
    </svg>
  ),
);
MedicalMessagesIcon.displayName = "MedicalMessagesIcon";

/** 几何沙漏（含底部沙粒），对齐参考图 */
const HourglassSandIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <path d="M6 3h12" />
      <path d="M6 21h12" />
      <path d="M6 3v2l6 7 6-7V3" />
      <path d="M6 21v-2l6-7 6 7v2" />
      <path d="M9.5 17h5" />
    </svg>
  ),
);
HourglassSandIcon.displayName = "HourglassSandIcon";

/** 显示器 + 加号（基于 Lucide Monitor，无变形） */
const MonitorPlusIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
      <path d="M12 7v6" />
      <path d="M9 10h6" />
    </svg>
  ),
);
MonitorPlusIcon.displayName = "MonitorPlusIcon";

/** 对话气泡 + AI（气泡用 Lucide 路径，文字不拉伸） */
const AiBubbleIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      <text
        x="12"
        y="12"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        stroke="none"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        AI
      </text>
    </svg>
  ),
);
AiBubbleIcon.displayName = "AiBubbleIcon";

/** 病床 + 医疗加号（按 Lucide 网格，无拉伸） */
const MedicalBedIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <path d="M12 3v3" />
      <path d="M10.5 4.5h3" />
      <path d="M5 10v10" />
      <path d="M19 10v10" />
      <path d="M5 14h14" />
      <path d="M5 18h14" />
      <path d="M8 14a2 2 0 0 1 4 0" />
    </svg>
  ),
);
MedicalBedIcon.displayName = "MedicalBedIcon";

/** 笑脸星星魔法棒（图一图形，图二黑底白描边样式；星形用 Lucide 路径防变形） */
const SmileWandIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, strokeWidth = 1.5, absoluteStrokeWidth, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      <g
        transform="translate(1.1 0.2) scale(0.76) rotate(-14 12 12)"
        vectorEffect="non-scaling-stroke"
      >
        <path
          d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="10.2"
          cy="11"
          r="0.7"
          fill="currentColor"
          stroke="none"
        />
        <circle
          cx="13.8"
          cy="11"
          r="0.7"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M10.2 13.1c.7.75 1.55 1.1 2.3 1.1s1.6-.35 2.3-1.1"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      <path d="M14.9 14.6 18.7 19.3" />
    </svg>
  ),
);
SmileWandIcon.displayName = "SmileWandIcon";

const stats = [
  {
    value: 40,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↑",
    label: "医生接诊效率提升",
  },
  {
    value: 50,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "病历书写时长缩短",
  },
  {
    value: 60,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "患者候诊等待缩减",
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
    title: "问诊时间不足",
    description:
      "门诊高峰期医生平均接诊5-8分钟/人，大量时间花在基础病史采集上，病情研判和方案沟通时间被压缩。",
    icon: Timer,
  },
  {
    title: "病历书写负担重",
    description:
      "医生每日花费大量时间书写病历，重复性文书工作占工作总时长的35%-40%，核心诊疗精力被稀释。",
    icon: FilePenLine,
  },
  {
    title: "病史信息不完整",
    description:
      "患者在诊室紧张环境下容易遗漏关键信息，既往史、用药史、过敏史等维度采集不全，影响诊疗准确性。",
    icon: Puzzle,
  },
  {
    title: "线上问诊信息零散",
    description:
      "互联网医院患者文字描述零散、不完整、不专业，医生需反复追问，线上接诊效率低、体验差。",
    icon: Waypoints,
  },
  {
    title: "基层问诊不规范",
    description:
      "基层医生和社区卫生服务中心人员问诊能力参差不齐，缺乏标准化框架引导，病史采集质量差异大。",
    icon: AlertTriangle,
  },
  {
    title: "专科采集难统一",
    description:
      "儿科、妇科、盆底等不同专科问诊维度差异大，通用病历模板难以满足专科个性化病史采集需求。",
    icon: ClipboardList,
  },
];

const architectureLayers = [
  {
    name: "触达层",
    items: [
      "医院公众号",
      "小程序",
      "互联网医院",
      "院内自助终端",
      "扫码问诊舱",
      "基层医联体终端",
    ],
  },
  {
    name: "交互层",
    items: [
      "结构化表单",
      "AI动态多轮问诊",
      "点选+自然语言",
      "语音输入（适老）",
      "多模态图片上传",
    ],
  },
  {
    name: "引擎层",
    items: [
      "华西数医大模型",
      "多模态智能体",
      "临床标准化问诊逻辑",
      "医学知识图谱",
      "递进式问诊策略",
      "核心引擎",
    ],
  },
  {
    name: "输出层",
    items: [
      "标准化结构化病历",
      "病情摘要",
      "智能标签",
      "重点标注",
      "疑似诊断提示",
      "风险预警",
    ],
  },
  {
    name: "应用层",
    items: [
      "HIS医生工作站",
      "护士工作站",
      "电子病历系统",
      "一键引用/编辑",
      "互联网医院接诊端",
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
    category: "核心场景",
    title: "线下门诊诊前预问诊",
    description:
      "医院公众号或小程序在患者挂号后触发AI预问诊待办，患者在候诊期间完成前置表单和AI病情采集，预问诊结果同步至HIS医生端，供接诊医生查看、复制或引用。",
    icon: DiamondPlus,
  },
  {
    category: "高频场景",
    title: "互联网医院线上问诊前置",
    description:
      "患者选择线上问诊医生后进入AI预问诊，通过前置表单和AI多轮问诊提前梳理病情并同步接诊医生，改善线上患者描述零散、信息不完整的问题。",
    icon: MonitorPlusIcon as LucideIcon,
  },
  {
    category: "分级诊疗",
    title: "基层医联体/社区卫生服务中心",
    description:
      "AI按照标准化框架采集患者病史，为基层医生提供接诊前信息参考，推动规范化问诊能力向基层延伸，缩小诊疗能力差距。",
    icon: HouseHeart,
  },
  {
    category: "专科定制",
    title: "专科门诊个性化预问诊",
    description:
      "根据儿科、妇科、盆底等不同专科的业务需求，配置专科前置表单、问诊策略和结构化输出内容，满足专科病情采集需要。",
    icon: SmileWandIcon as LucideIcon,
  },
  {
    category: "连续医疗",
    title: "复诊患者诊前预问诊",
    description:
      "针对复诊患者，结合本次就诊诉求采集症状变化、检查、用药及治疗反馈等信息，自动形成复诊前病情摘要并同步接诊医生。",
    icon: AiBubbleIcon as LucideIcon,
  },
  {
    category: "入院前置",
    title: "住院入院问诊信息采集",
    description:
      "面向已开具入院证的患者，提前采集基础信息、专科病史、量表及相关资料，形成入院问诊记录，供医生和护士查看使用。",
    icon: MedicalBedIcon as LucideIcon,
  },
];

const values: {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
}[] = [
  {
    title: "医生接诊效率提升40%",
    description:
      "传统问诊中医生需花5-10分钟收集基础信息，AI预问诊前置完成后，医生接诊时间显著缩短，单位时间接诊量提升，高峰期压力缓解。",
    icon: Zap,
  },
  {
    title: "病历书写时长缩短50%",
    description:
      "系统自动生成标准化结构化病历，医生一键引用并编辑修改，病历书写时长缩短50%以上，减少重复性文书工作。",
    icon: FilePenLine,
  },
  {
    title: "病史采集完整性显著提升",
    description:
      "AI遵循临床标准化问诊逻辑，递进式采集主诉、既往史、用药史、过敏史等全维度信息，不漏关键病史，保障诊疗质量。",
    icon: ChartRisingIcon as LucideIcon,
  },
  {
    title: "患者候诊等待缩减60%",
    description:
      "患者在候诊期间完成预问诊，有效利用等待时间；医生提前获取病情信息，接诊更高效，患者感知等待时间缩短60%以上。",
    icon: HourglassSandIcon as LucideIcon,
  },
  {
    title: "病历质量与规范性保障",
    description:
      "结构化病历自动生成，遵循门诊电子病历书写规范，从源头保障数据规范性和完整性，支撑电子病历等级评审。",
    icon: ShieldCheck,
  },
  {
    title: "基层问诊能力同质化提升",
    description:
      "AI按照三甲医院标准化框架采集病史，为基层医生提供规范问诊模板和信息参考，推动优质问诊能力向基层延伸。",
    icon: MedicalMessagesIcon as LucideIcon,
    iconClassName: "size-8",
  },
];

const valueStats = [
  {
    value: 40,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↑",
    label: "医生接诊效率提升",
  },
  {
    value: 50,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "病历书写时长缩短",
  },
  {
    value: 60,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "% ↓",
    label: "患者候诊等待缩减",
  },
  {
    value: 90,
    format: (n: number) => `${Math.round(n)}`,
    suffix: "%+",
    label: "病史采集完整率",
  },
];

const deliveryPlans: {
  title: string;
  description: string;
  suitable: string;
  icon: LucideIcon;
  iconClassName?: string;
}[] = [
  {
    title: "SaaS云端部署",
    description:
      "云端开箱即用，无需本地基础设施投入，快速上线、弹性扩容，按需付费。",
    suitable: "基层诊所、社区卫生服务中心、中小医疗机构",
    icon: Cloud,
    iconClassName: "h-6 w-6",
  },
  {
    title: "私有化部署",
    description:
      "院内本地化部署，数据不出院，满足等保三级和数据安全合规要求，深度定制。",
    suitable: "三级甲等医院、大型专科医院、数据敏感机构",
    icon: Server,
  },
  {
    title: "API对接集成",
    description:
      "以API接口形式对接现有HIS/互联网医院平台，轻量集成，快速嵌入现有流程。",
    suitable: "已有信息化基础的医院、互联网医院平台",
    icon: Link2,
    iconClassName: "h-6 w-6",
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
      className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-7 text-neutral-950 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-[box-shadow,color] duration-300 sm:p-8 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:backdrop-blur-xl"
      style={
        isHovered ? { boxShadow: hoverStyle.shadow, color: "#fff" } : {}
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

function ApplicationScenarioCard({
  item,
  index,
}: {
  item: (typeof applicationScenarios)[number];
  index: number;
}) {
  const Icon = item.icon;
  const [hoverStyle, setHoverStyle] = useState<(typeof painHoverStyles)[number]>(
    painHoverStyles[0],
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => {
        setHoverStyle(pickPainHoverStyle());
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col gap-4 overflow-hidden rounded-[16px] border-l-4 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-[box-shadow,color,border-color] duration-300 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl ${
        isHovered ? "border-l-white/40" : "border-l-neutral-950"
      }`}
      style={
        isHovered ? { boxShadow: hoverStyle.shadow, color: "#fff" } : {}
      }
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-300 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: hoverStyle.background }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-300 ease-out ${
          isHovered ? "opacity-[0.18]" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <div
        className={`relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          isHovered
            ? "bg-black/25 text-white"
            : "bg-neutral-950 text-white dark:bg-white/15"
        }`}
      >
        <Icon
          className="size-5 shrink-0 !transform-none"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[1] flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <h3 className="text-[17px] font-semibold">{item.title}</h3>
          <span
            className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors duration-300 ${
              isHovered
                ? "bg-white/20 text-white"
                : "bg-neutral-100 text-neutral-950 dark:bg-white/10 dark:text-white"
            }`}
          >
            {item.category}
          </span>
        </div>
        <p
          className={`text-[14px] leading-relaxed transition-colors duration-300 ${
            isHovered
              ? "text-white/90"
              : "text-neutral-600 dark:text-neutral-400"
          }`}
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AiPreConsultationPage() {
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
                    华西数医大模型驱动 · 多模态智能体 · 全渠道诊前采集
                  </span>
                </div>

                <h1 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-[44px]">
                  预问诊系统
                  <br />
                  患者未到，信息先到
                </h1>
                <p className="max-w-2xl text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                  面向多医疗场景的诊前AI病史采集工具，依托华西数医大模型与多模态智能体，复刻临床标准化问诊逻辑，赋能医生高效接诊、规范病历采集，实现诊前信息前置、诊中高效决策。
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="#demo"
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-950 px-4 text-[14px] text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
                  >
                    预约产品演示
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <OutlineCtaLink href="#capabilities">
                    查看核心能力
                  </OutlineCtaLink>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="relative overflow-hidden rounded-[20px] bg-neutral-200 dark:bg-neutral-900"
              >
                <Image
                  src="/img/products/ai-pre-consultation.jpeg"
                  alt="AI预问诊系统"
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
                传统问诊模式的六大瓶颈
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                门诊高峰期医生每半日接诊40-60名患者，平均每人仅5-8分钟，病史采集质量难以保障
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
                五层架构 · 从患者输入到医生工作站的全链路
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                以华西数医大模型为核心引擎，构建「采集-理解-生成-推送-应用」的诊前智能闭环
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

        <Features12AiPreConsultation />

        {/* Application scenarios */}
        <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>应用场景</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                六大场景 · 全方位赋能诊前采集
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从门诊到住院，从三甲到基层，从线下到线上，构建全域诊前智能采集网络
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {applicationScenarios.map((item, index) => (
                <ApplicationScenarioCard
                  key={item.title}
                  item={item}
                  index={index}
                />
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
                六大价值 · 医生减负 · 患者受益
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                让医生从重复性病史采集中解放，将时间还给病情研判和医患沟通
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
                    <span className="inline-flex size-10 shrink-0 items-center justify-center">
                      <Icon
                        className={`icon-flip-once text-neutral-900 dark:text-white ${item.iconClassName ?? "size-10"}`}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
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

        <Comparison8AiPreConsultation />

        {/* Delivery */}
        <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 flex max-w-3xl flex-col gap-3">
              <SectionLabel>交付模式</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                三种交付方案 · 适配各级医疗机构
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从云端SaaS到私有化部署，灵活适配三甲、专科、基层诊所的差异化需求
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {deliveryPlans.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex flex-col gap-4 rounded-[16px] bg-[#F8F8F8] p-6 dark:border dark:border-white/10 dark:bg-white/[0.06] dark:backdrop-blur-xl sm:p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-950 text-white dark:bg-white/15">
                      <Icon
                        className={item.iconClassName ?? "h-5 w-5"}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[18px] font-semibold text-neutral-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                      <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-500">
                        适合：{item.suitable}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

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
              患者未到，信息先到 — 开启诊前智能采集新范式
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
              AI预问诊系统与您携手，让医生从重复性文书解放，将时间还给诊疗核心，让患者就医更高效、更温暖。
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
