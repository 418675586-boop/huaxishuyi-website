import { PelvicHealth } from "@/components/pelvic-health";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "盆底健康管家",
  description: "根据服务包查看监测、干预与随访健康计划。",
};

export default function PelvicHealthPage(): ReactNode {
  return <PelvicHealth />;
}
