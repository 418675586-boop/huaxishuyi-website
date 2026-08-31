import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "研究型数字医生平台 — 智慧医疗科研新范式",
  description:
    "聚焦临床研究与慢病管理，通过「患者数字医生+医生工作台」双端协同，依托研究型知识库核心底座，构建患者、医生、研究机构三位一体的智慧医疗科研生态。",
  path: "/products/research-digital-doctor",
});

export default function ResearchDigitalDoctorLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
