import { DigitalDoctorTriage } from "@/components/digital-doctor";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "智能导诊",
  description: "智能导诊建议医生与科室。",
};

export default function DigitalDoctorTriagePage(): ReactNode {
  return <DigitalDoctorTriage />;
}
