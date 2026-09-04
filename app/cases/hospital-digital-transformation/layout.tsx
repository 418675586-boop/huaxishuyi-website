import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "客户案例 · 医院数智化转型",
  description:
    "华西二院等医院数智化转型实践案例：以医疗大模型与智能体为中枢，贯通诊前、诊中、诊后全流程，展示建设成效与运营指标。",
  path: "/cases/hospital-digital-transformation",
});

export default function CaseHospitalDigitalTransformationLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
