import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "AI健康管理服务平台",
  description: "AI健康管理服务平台官网",
  path: "/products/ai-health-management",
});

export default function AiHealthManagementPage(): ReactNode {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
        AI健康管理服务平台（待开发）
      </p>
    </main>
  );
}
