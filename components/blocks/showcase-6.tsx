"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Showcase6Moment = {
  caption: string;
  date?: string;
  detail?: string;
  image: string;
  href?: string;
  tilt: number;
  lift?: string;
};

type Showcase6Cta = {
  label: string;
  href: string;
};

type Showcase6Props = {
  id?: string;
  className?: string;
  title?: ReactNode;
  description?: string;
  cta?: Showcase6Cta | null;
  captionClassName?: string;
  headerLayout?: "split" | "stack";
  moments?: Showcase6Moment[];
};

const DEFAULT_MOMENTS: Showcase6Moment[] = [
  {
    caption: "Opening night · Lisbon",
    date: "04.18.26",
    image: "/svg/placeholder.svg",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    caption: "Material review · Copenhagen",
    date: "05.02.26",
    image: "/svg/placeholder.svg",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    caption: "Night prototyping · Seoul",
    date: "05.29.26",
    image: "/svg/placeholder.svg",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    caption: "Launch wall · New York",
    date: "06.11.26",
    image: "/svg/placeholder.svg",
    tilt: 3.5,
    lift: "lg:mt-6",
  },
];

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stripVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, rotate: 0 },
  visible: (tilt: number) => ({
    opacity: 1,
    y: 0,
    rotate: tilt,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Showcase6({
  id,
  className,
  title = (
    <>
      Life between{" "}
      <span className="text-neutral-400 dark:text-neutral-500">launches.</span>
    </>
  ),
  description = "Lisbon HQ, Copenhagen, Seoul, New York, and a rotating cast of pop-up desks wherever the work lands.",
  cta = { label: "Browse the archive", href: "#" },
  captionClassName,
  headerLayout = "split",
  moments = DEFAULT_MOMENTS,
}: Showcase6Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[1] w-full scroll-mt-[90px] overflow-hidden bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={
            headerLayout === "stack"
              ? "mb-10 flex max-w-3xl flex-col gap-3"
              : "grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
          }
        >
          <motion.div variants={fadeUp}>
            <h2
              className={
                headerLayout === "stack"
                  ? "text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
                  : "text-balance text-4xl leading-[0.98] font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
              }
            >
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className={
              headerLayout === "stack"
                ? undefined
                : "lg:max-w-sm lg:justify-self-end lg:pt-2"
            }
          >
            <p
              className={
                headerLayout === "stack"
                  ? "text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
                  : "text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400"
              }
            >
              {description}
            </p>
            {cta ? (
              <a
                href={cta.href}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:outline-white"
              >
                {cta.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div
          variants={stripVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={cn(
            "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:justify-center lg:gap-0",
            headerLayout === "stack"
              ? "mt-0"
              : "mt-16 sm:mt-20 lg:mt-24",
          )}
        >
          {moments.map((moment) => (
            <motion.article
              key={moment.caption}
              custom={moment.tilt}
              variants={cardVariants}
              whileHover={{ rotate: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative block lg:-ml-14 lg:w-[28%] lg:first:ml-0",
                moment.lift,
              )}
            >
              <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.28)] transition-shadow duration-300 group-hover:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.4)] sm:p-3.5 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none dark:backdrop-blur-xl dark:group-hover:shadow-none">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-1 pt-4 pb-1.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className={cn(
                        "font-mono text-[15px] tracking-[0.08em] text-neutral-600 dark:text-neutral-300",
                        captionClassName,
                      )}
                    >
                      {moment.caption}
                    </span>
                    {moment.date ? (
                      <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                        {moment.date}
                      </span>
                    ) : null}
                  </div>
                  {moment.detail ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {moment.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Showcase6;
