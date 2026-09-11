import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "成都市郫都区妇幼保健院",
  description:
    "华西数医与成都市郫都区妇幼保健院合作：三级甲等妇幼保健院，建设四位一体智慧医院，信息化覆盖 28 个以上核心业务模块。",
  path: "/partner-hospitals/chengdu-pidu-maternal-child-hospital",
});

export default function ChengduPiduMaternalChildHospitalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
