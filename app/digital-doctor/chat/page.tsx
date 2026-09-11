import { DigitalDoctorChat } from "@/components/digital-doctor";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "华华助手",
  description: "华华助手预约挂号对话。",
};

export default function DigitalDoctorChatPage(): ReactNode {
  return <DigitalDoctorChat />;
}
