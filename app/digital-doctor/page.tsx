import { DigitalDoctorShowcase } from "@/components/digital-doctor";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "数字医生",
  description: "数字医生、智能导诊与华华助手三屏预览。",
};

export default function DigitalDoctorPage(): ReactNode {
  return <DigitalDoctorShowcase />;
}
