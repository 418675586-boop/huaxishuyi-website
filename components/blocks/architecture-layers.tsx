"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type ArchitectureLayer = {
  name: string;
  /** 标题中「·」后的说明，用于 diagram 变体 */
  subtitle?: string;
  items: string[];
};

/** AI 医联体默认五层架构 */
export const AI_MEDICAL_ALLIANCE_ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    name: "场景层",
    items: [
      "远程会诊",
      "数字MDT",
      "双向转诊",
      "资源调度",
      "专科联盟",
      "科研随访",
      "平台运营",
    ],
  },
  {
    name: "协同层",
    items: [
      "跨院诊疗协同",
      "集团资源调度",
      "专科联盟管理",
      "统筹排班排床",
      "号源智能调配",
      "跨院信息查询",
      "全域协同",
    ],
  },
  {
    name: "引擎层",
    items: [
      "医疗大模型",
      "多智能体协同",
      "专家知识库",
      "数字分身引擎",
      "转诊决策引擎",
      "资源调度算法",
    ],
  },
  {
    name: "底座层",
    items: [
      "患者360全景视图",
      "跨机构数据中台",
      "检验检查互认",
      "影像共享中心",
      "心电/病理共享",
      "数据底座",
    ],
  },
  {
    name: "机构层",
    items: [
      "村卫生室",
      "乡镇卫生院",
      "县级医院",
      "市级三甲",
      "多院区",
      "专科联盟",
    ],
  },
];

/** 智慧医院/系统集成四层架构 */
export const SMART_HOSPITAL_ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    name: "应用集成层",
    subtitle: "多服务一站式混合集成",
    items: [
      "HIS系统集成",
      "EMR/LIS/PACS",
      "互联网医院",
      "SaaS服务对接",
      "微信公众号/小程序",
    ],
  },
  {
    name: "集成总线层",
    subtitle: "API网关 + ESB + MQ消息中枢",
    items: [
      "API网关",
      "企业服务总线ESB",
      "MQ消息中间件",
      "协议转换引擎",
      "流程编排引擎",
    ],
  },
  {
    name: "数据集成层",
    subtitle: "ELT/ETL数据管道",
    items: ["数据采集", "数据清洗", "数据转换", "数据分发", "湖仓一体"],
  },
  {
    name: "基础设施层",
    subtitle: "安全与运维底座",
    items: ["信创适配", "等保三级", "全链路监控", "日志审计", "容器化部署"],
  },
];

const DIAGRAM_MESH_VARIANTS = [
  // 偏淡蓝
  [
    "absolute -top-[45%] -left-[15%] h-[140%] w-[70%] rounded-full bg-[#A8C8EC]/32 blur-[70px] dark:bg-sky-400/12",
    "absolute -bottom-[50%] -right-[20%] h-[130%] w-[65%] rounded-full bg-[#B0D4F5]/28 blur-[75px] dark:bg-blue-300/8",
    "absolute top-[20%] right-[25%] h-[70%] w-[45%] rounded-full bg-[#C4C0F2]/24 blur-[65px] dark:bg-violet-300/8",
  ],
  // 偏淡青紫
  [
    "absolute -top-[40%] -right-[15%] h-[135%] w-[70%] rounded-full bg-[#B8B8F0]/28 blur-[70px] dark:bg-violet-400/12",
    "absolute -bottom-[45%] -left-[20%] h-[125%] w-[65%] rounded-full bg-[#8EBCE8]/28 blur-[75px] dark:bg-sky-300/8",
    "absolute top-[15%] left-[30%] h-[65%] w-[40%] rounded-full bg-[#A8C8EC]/22 blur-[60px] dark:bg-blue-300/8",
  ],
] as const;

function DiagramLayerMesh({ index }: { index: number }) {
  const orbs = DIAGRAM_MESH_VARIANTS[index % DIAGRAM_MESH_VARIANTS.length];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]"
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-white/[0.04]" />
      {orbs.map((orbClass) => (
        <div key={orbClass} className={orbClass} />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
      {children}
    </span>
  );
}

type ArchitectureLayersSectionProps = {
  /** 传 `null` 或空字符串时不显示标签 */
  label?: string | null;
  title?: string;
  description?: string;
  layers?: ArchitectureLayer[];
  /**
   * rows：左右标签+标签云（医联体）
   * diagram：弥散底分层卡片+上箭头（医院集成）
   */
  variant?: "rows" | "diagram";
  className?: string;
};

export function ArchitectureLayersSection({
  label = "产品架构",
  title = "五层架构 · 跨机构AI医疗协同底座",
  description = "以患者360全景视图为核心底座，多智能体协同，构建从基层到专家的全链路协同生态",
  layers = AI_MEDICAL_ALLIANCE_ARCHITECTURE_LAYERS,
  variant = "rows",
  className,
}: ArchitectureLayersSectionProps) {
  return (
    <section
      className={cn(
        "relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {(title || description || label) && (
          <div className="mb-10 flex max-w-3xl flex-col gap-3">
            {label ? <SectionLabel>{label}</SectionLabel> : null}
            {title ? (
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            ) : null}
          </div>
        )}

        {variant === "diagram" ? (
          <div className="flex flex-col items-stretch">
            {layers.map((layer, index) => (
              <div key={layer.name} className="flex flex-col items-center">
                {index > 0 ? (
                  <div className="flex h-8 items-center justify-center text-neutral-400 dark:text-neutral-500">
                    <ArrowUp className="size-5" strokeWidth={2.5} />
                  </div>
                ) : null}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="relative w-full overflow-hidden rounded-[16px] px-5 py-5 sm:px-6 sm:py-6"
                >
                  <DiagramLayerMesh index={index} />
                  <h3 className="relative z-[1] mb-4 text-[16px] font-semibold text-neutral-950 dark:text-white sm:text-[18px]">
                    {layer.name}
                    {layer.subtitle ? (
                      <span className="font-normal text-neutral-600 dark:text-neutral-300">
                        {" · "}
                        {layer.subtitle}
                      </span>
                    ) : null}
                  </h3>
                  <div className="relative z-[1] grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
                    {layer.items.map((item) => (
                      <div
                        key={item}
                        className="flex min-h-[48px] items-center justify-center rounded-[12px] bg-white/90 px-3 py-3 text-center text-[13px] font-medium text-neutral-800 shadow-sm backdrop-blur-sm dark:bg-white/10 dark:text-neutral-200 sm:text-[14px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {layers.map((layer, index) => (
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
        )}
      </div>
    </section>
  );
}

export default ArchitectureLayersSection;
