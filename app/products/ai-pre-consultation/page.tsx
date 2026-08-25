import { AiPreConsultation } from "@/components/products/ai-pre-consultation";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI预问诊",
  description: "AI预问诊官网",
  path: "/products/ai-pre-consultation",
});

export default function AiPreConsultationPage(): ReactNode {
  return <AiPreConsultation />;
}
