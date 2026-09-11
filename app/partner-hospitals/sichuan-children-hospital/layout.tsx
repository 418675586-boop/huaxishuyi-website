import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "四川省儿童医院",
  description:
    "华西数医与四川省儿童医院合作：以儿科临床数据与人工智能为驱动，共建一体化数智化应用科研管理平台，加速儿童医疗科研成果转化。",
  path: "/partner-hospitals/sichuan-children-hospital",
});

export default function SichuanChildrenHospitalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
