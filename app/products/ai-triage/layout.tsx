import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI智能导诊 — 让患者挂对科、找对人",
  description:
    "基于医疗大模型的诊前智能引导服务，帮助患者挂对科、找对人、减少转诊。覆盖30+一级科室、200+二级科室、800+常见症状，上线12个月服务280+家医院。",
  path: "/products/ai-triage",
});

export default function AiTriageLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
