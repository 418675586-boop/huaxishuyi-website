import type { ReactNode } from "react";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "客户案例",
  description:
    "华西医院等医疗机构数智化转型与智能应用实践案例，展示建设路径、落地场景与运营成效。",
  path: "/cases",
});

export default function CasesLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
