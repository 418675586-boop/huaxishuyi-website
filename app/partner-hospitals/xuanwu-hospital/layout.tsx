import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "首都医科大学宣武医院",
  description:
    "华西数医与首都医科大学宣武医院合作：以临床数据与人工智能为驱动，共建一体化数智化应用科研管理平台，加速医疗科研成果转化。",
  path: "/partner-hospitals/xuanwu-hospital",
});

export default function XuanwuHospitalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
