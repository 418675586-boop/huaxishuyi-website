import { ChildGrowth } from "@/components/child-growth";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "儿童生长发育健康服务",
  description: "儿童生长发育健康咨询对话。",
};

export default function ChildGrowthPage(): ReactNode {
  return <ChildGrowth />;
}
