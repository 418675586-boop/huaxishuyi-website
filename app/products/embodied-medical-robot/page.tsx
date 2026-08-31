import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "具身智能医疗机器人",
  description: "具身智能医疗机器人官网",
  path: "/products/embodied-medical-robot",
});

export default function EmbodiedMedicalRobotPage(): ReactNode {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-neutral-950">
      <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
        具身智能医疗机器人（待开发）
      </p>
    </main>
  );
}
