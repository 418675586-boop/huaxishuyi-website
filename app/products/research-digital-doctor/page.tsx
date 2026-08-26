import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "研究型数字医生平台",
  description: "研究型数字医生平台官网",
  path: "/products/research-digital-doctor",
});

export default function ResearchDigitalDoctorPage(): ReactNode {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
        研究型数字医生平台（待开发）
      </p>
    </main>
  );
}
