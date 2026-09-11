import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "成都高新区妇女儿童医院",
  description:
    "华西数医与成都高新区妇女儿童医院合作：华西二院全托管、三级甲等标准建设，构建「1+1+2+4」数智化架构，2026 年获评三星级智慧医院。",
  path: "/partner-hospitals/chengdu-hightech-women-children-hospital",
});

export default function ChengduHightechWomenChildrenHospitalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
