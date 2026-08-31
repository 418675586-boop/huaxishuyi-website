import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI医生助手 — 打通医务工作全链条",
  description:
    "聚焦临床医生的统一智能工作入口，聚合各类医疗AI能力，覆盖日程待办、门诊接诊、住院查房、病历撰写、病历质控、风险预警等全场景工作，协助医生完成95%+的医务工作。",
  path: "/products/ai-doctor-platform",
});

export default function AiDoctorPlatformLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
