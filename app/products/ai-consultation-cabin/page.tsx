import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI智能问诊舱",
  description: "AI智能问诊舱官网",
  path: "/products/ai-consultation-cabin",
});

export default function AiConsultationCabinPage(): ReactNode {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
        AI智能问诊舱（待开发）
      </p>
    </main>
  );
}
