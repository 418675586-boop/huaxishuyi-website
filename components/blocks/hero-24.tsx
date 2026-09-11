"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const headline: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

type Hero24Cta = {
  label: string;
  href: string;
};

type Hero24Props = {
  badge?: string;
  title?: ReactNode;
  titleAccent?: string;
  description?: string;
  primaryCta?: Hero24Cta;
  secondaryCta?: Hero24Cta;
  partnersLabel?: string;
  partners?: string[];
  backgroundImage?: string;
  backgroundImageClassName?: string;
  bottomContent?: ReactNode;
};

const DEFAULT_PARTNERS = ["Northwind", "Vela", "Cortex", "Odyssey", "Lumen"];

export function Hero24({
  badge = "Synaptics: inference platform",
  title = "Models that think",
  titleAccent,
  description = "Deploy, route, and scale inference across any model with a single endpoint. Sub-second responses, streamed from the edge, priced by the token.",
  primaryCta = { label: "Deploy a model", href: "#waitlist" },
  secondaryCta = { label: "View pricing", href: "#highlights" },
  partnersLabel = "Powering inference for",
  partners = DEFAULT_PARTNERS,
  backgroundImage = "/img/partner-hospitals/xuanwu-hospital-hero-hd.jpg",
  backgroundImageClassName,
  bottomContent,
}: Hero24Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-[1] flex min-h-[800px] w-full flex-col overflow-hidden bg-[#E7F1F7] px-4 pt-[66px] pb-[30px] dark:bg-[#0a0a0a] sm:px-6 lg:h-[800px] lg:min-h-0 lg:px-8">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className={cn(
            "origin-[center_right] object-cover object-[center_right]",
            backgroundImageClassName,
          )}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(231,241,247,0.92)_10%,rgba(231,241,247,0.42)_38%,rgba(231,241,247,0)_70%)] dark:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,10,10,0.94)_8%,rgba(10,10,10,0.62)_30%,rgba(12,13,20,0.22)_52%,rgba(16,21,44,0)_78%)] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_bottom,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.12)_38%,rgba(14,18,33,0.42)_72%,rgba(16,21,44,0.78)_100%)] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_50%_100%,rgba(16,21,44,0.9)_0%,transparent_58%)] dark:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(231,241,247,0)_78%,rgba(255,255,255,0.55))] dark:hidden"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex max-w-4xl flex-col items-start py-6 text-left lg:py-0"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
          >
            <span className="relative flex h-2 w-2">
              {!reduceMotion ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-70" />
              ) : null}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            {badge}
          </motion.div>

          <motion.h1
            variants={headline}
            className="mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-neutral-950 dark:text-white sm:text-4xl md:text-5xl"
          >
            {title}
            {titleAccent ? (
              <>
                <br />
                <span className="text-neutral-500 dark:text-neutral-400">
                  {titleAccent}
                </span>
              </>
            ) : null}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href={primaryCta.href}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              {primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-neutral-300 bg-white/60 px-6 py-3 text-sm font-medium text-neutral-900 backdrop-blur transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-neutral-950 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              {secondaryCta.label}
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 w-full">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400 dark:text-white">
              {partnersLabel}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
              {partners.map((name) => (
                <span
                  key={name}
                  className="text-sm font-normal tracking-tight text-neutral-950 dark:text-white"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {bottomContent ? (
        <div className="relative z-10 mx-auto w-full max-w-[1200px] shrink-0">
          {bottomContent}
        </div>
      ) : null}
    </section>
  );
}

export default Hero24;
