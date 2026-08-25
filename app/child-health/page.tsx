import { ChildHealth } from "@/components/child-health";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "儿童健康自测",
  description: "儿童健康自评量表与风险自测。",
};

export default function ChildHealthPage(): ReactNode {
  return <ChildHealth />;
}
