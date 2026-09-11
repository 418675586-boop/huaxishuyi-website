import { DigitalDoctorIntro } from "@/components/digital-doctor";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "数字医生",
  description: "AI 数字医生介绍与开始问诊。",
};

export default function DigitalDoctorIntroPage(): ReactNode {
  return <DigitalDoctorIntro />;
}
