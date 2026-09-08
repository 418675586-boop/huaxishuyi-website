import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "合作医院",
  description:
    "华西数医合作医院网络，携手国内一流医疗机构推进医疗数智化转型与临床智能应用落地。",
  path: "/partner-hospitals",
});

export default function PartnerHospitalsLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
