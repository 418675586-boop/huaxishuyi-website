import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "区域型医共体数智化解决方案",
  description:
    "以数字化手段推动医共体真正形成责任、服务、管理和发展共同体，统一数智底座，实现五个统一，助力区域医疗协同发展。",
  path: "/solutions/regional-medical-community",
});

export default function RegionalMedicalCommunityLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
