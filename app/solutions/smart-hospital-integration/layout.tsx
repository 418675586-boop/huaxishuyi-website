import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "智慧医院/系统集成解决方案",
  description:
    "面向智慧医院建设与医疗系统集成，贯通诊前、诊中、诊后全流程，连接门急诊、住院、患者服务与运营管理，助力医院从信息化迈向智能化。",
  path: "/solutions/smart-hospital-integration",
});

export default function SmartHospitalIntegrationLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
