import { UiSpec } from "@/components/ui-spec";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "移动端通用 UI 规范",
  description: "华西 AI 医生应用平台移动端配色、字体、圆角、间距与组件规范。",
};

export default function UiSpecPage(): ReactNode {
  return <UiSpec />;
}
