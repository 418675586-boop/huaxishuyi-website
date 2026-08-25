import { AiMedicalAllianceProduct } from "@/components/ai-medical-alliance-product";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI医联体平台 — 跨机构AI医疗协同赋能",
  description:
    "面向医联体、多院区、专科联盟的一体化跨机构医疗协同平台。以患者为核心，实现跨院诊疗协同、信息共享、资源下沉与集团化统一调度。",
  path: "/products/ai-medical-alliance",
});

export default function AiMedicalAlliancePage(): ReactNode {
  return <AiMedicalAllianceProduct />;
}
