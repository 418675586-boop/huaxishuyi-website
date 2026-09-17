import type { ReactNode } from "react";

type Variant = "light" | "dark";

/**
 * 通用板块标签。
 * light：浅色背景用（中性灰边 + 灰字）
 * dark：深色背景用（蓝色渐变边 + 品牌蓝字，与 HOW IT WORKS 一致）
 */
export function SectionLabel({
  children,
  variant = "light",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  if (variant === "dark") {
    return (
      <span className="inline-flex w-fit items-center rounded-full border border-[#577FFF]/40 bg-[#577FFF]/10 px-3 py-1 text-xs tracking-wide text-[#52A5FF]">
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-neutral-300 px-3 py-1 text-[12px] tracking-wide text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
      {children}
    </span>
  );
}
