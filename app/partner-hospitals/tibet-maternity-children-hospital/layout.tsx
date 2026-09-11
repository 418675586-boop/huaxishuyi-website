import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "西藏自治区妇产儿童医院",
  description:
    "华西数医与西藏自治区妇产儿童医院合作：以妇产、儿童与妇幼保健三位一体专科医院为载体，推进诊前在线化、诊中智能化、诊后连续化与云上妇幼建设。",
  path: "/partner-hospitals/tibet-maternity-children-hospital",
});

export default function TibetMaternityChildrenHospitalLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
