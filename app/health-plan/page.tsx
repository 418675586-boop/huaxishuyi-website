import { HealthPlan } from "@/components/health-plan";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "健康干预方案",
  description: "查看进行中与已结束的健康干预方案。",
};

export default function HealthPlanPage(): ReactNode {
  return <HealthPlan />;
}
