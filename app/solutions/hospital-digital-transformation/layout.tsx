import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "医院数智化转型解决方案",
  description:
    "以医疗大模型与智能体为中枢，贯通诊前、诊中、诊后全流程，连接门急诊、住院、患者服务与运营管理，助力医院从信息化迈向智能化。",
  path: "/solutions/hospital-digital-transformation",
});

export default function HospitalDigitalTransformationLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
