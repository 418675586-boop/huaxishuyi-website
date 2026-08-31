"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const outlineCtaClassName =
  "group inline-flex h-9 w-fit shrink-0 cursor-pointer items-center gap-2 rounded-full border-[0.5px] border-neutral-900 bg-transparent px-4 text-[14px] font-normal leading-none text-neutral-900 transition-colors hover:bg-neutral-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 dark:border-white dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950";

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
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </button>
  );
}

type OutlineCtaLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children?: ReactNode;
};

export function OutlineCtaLink({
  children = "查看全部",
  className,
  ...props
}: OutlineCtaLinkProps) {
  return (
    <Link className={cn(outlineCtaClassName, className)} {...props}>
      <span>{children}</span>
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
