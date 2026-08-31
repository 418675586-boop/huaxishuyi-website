import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI预问诊系统 — 患者未到，信息先到",
  description:
    "面向多医疗场景的诊前AI病史采集工具，依托华西数医大模型与多模态智能体，复刻临床标准化问诊逻辑，赋能医生高效接诊、规范病历采集，实现诊前信息前置、诊中高效决策。",
  path: "/products/ai-pre-consultation",
});

export default function AiPreConsultationLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
