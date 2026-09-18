"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const outlineCtaClassName =
  "inline-flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white/60 px-5 py-2.5 text-[14px] font-medium text-neutral-900 backdrop-blur transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-950 sm:px-7 sm:py-3";

type OutlineCtaButtonProps = ComponentPropsWithoutRef<"button"> & {
  children?: ReactNode;
};

export function OutlineCtaButton({
  children = "查看详情",
  className,
  type = "button",
  ...props
}: OutlineCtaButtonProps) {
  return (
    <button
      type={type}
      className={cn(outlineCtaClassName, className)}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight
        className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  );
}

type OutlineCtaLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children?: ReactNode;
  showArrow?: boolean;
};

export function OutlineCtaLink({
  children = "查看全部",
  className,
  showArrow = true,
  ...props
}: OutlineCtaLinkProps) {
  return (
    <Link className={cn(outlineCtaClassName, className)} {...props}>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}
