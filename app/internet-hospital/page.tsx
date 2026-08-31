import { InternetHospital } from "@/components/internet-hospital";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "华西二院·互联网医院",
  description: "华西第二医院互联网医院在线问诊与健康科普服务。",
};

export default function InternetHospitalPage(): ReactNode {
  return <InternetHospital />;
}
