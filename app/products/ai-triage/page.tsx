import { AiTriage } from "@/components/products/ai-triage";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI智能导诊",
  description: "AI智能导诊官网",
  path: "/products/ai-triage",
});

export default function AiTriagePage(): ReactNode {
  return <AiTriage />;
}
