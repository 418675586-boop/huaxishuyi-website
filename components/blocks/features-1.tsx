"use client";

import { motion } from "motion/react";
import {
  CalendarCheck,
  ClipboardCheck,
  Database,
  Fingerprint,
  Gauge,
  Network,
  Share2,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "统一认证与门户接入",
    description: "统一身份体系与访问入口，打通成员单位及业务系统登录认证。",
  },
  {
    icon: Network,
    title: "接口集成与数据交换",
    description: "建立统一接口与交换标准，实现跨系统、跨机构数据高效流通。",
  },
  {
    icon: Database,
    title: "基础数据中心建设",
    description: "汇聚核心业务数据，完善主数据管理与数据治理能力。",
  },
  {
    icon: Gauge,
    title: "医共体监管平台",
    description: "构建全景监管、运营分析、专题监测与辅助决策能力。",
  },
  {
    icon: Share2,
    title: "三大共享服务中心",
    description: "建设影像、检验、心电共享中心，推动优质医疗资源协同共享。",
  },
  {
    icon: CalendarCheck,
    title: "预约转诊协同服务",
    description: "打通统一预约与双向转诊流程，提升跨机构就医协同效率。",
  },
  {
    icon: ClipboardCheck,
    title: "检查检验结果互认",
    description: "推进结果共享调阅与互认应用，减少重复检查，提升就医效率。",
  },
  {
    icon: Sparkles,
    title: "数智化应用试点",
    description: "落地 AI 辅助分析、重点人群识别、智能预警与数字医生服务。",
  },
] as const;

export function Features1({ embedded = false }: { embedded?: boolean }) {
  const grid = (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-lg sm:h-12 sm:w-12 dark:border-neutral-800 dark:bg-neutral-950">
                  <Icon className="h-5 w-5 text-neutral-900 sm:h-6 sm:w-6 dark:text-white" />
                </div>

                <h3 className="mb-2 text-base font-medium tracking-tight text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-[#666666]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
  );

  if (embedded) {
    return grid;
  }

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-[1200px]">{grid}</div>
    </section>
  );
}

export default Features1;
