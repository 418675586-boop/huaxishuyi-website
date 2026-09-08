"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Hero12Cta = {
  label: string;
  href: string;
};

type Hero12Props = {
  id?: string;
  className?: string;
  title?: string;
  titleLine2?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  cta?: Hero12Cta;
  cardImage?: string;
  cardImageAlt?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardCta?: Hero12Cta;
};

const DEFAULT_CTA = { label: "Book a Consultation", href: "#waitlist" };
const DEFAULT_CARD_CTA = { label: "More info", href: "#waitlist" };

function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Hero12({
  id,
  className,
  title = "Transforming Homes",
  titleLine2 = "Since 1995",
  backgroundImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop",
  backgroundAlt = "",
  cta = DEFAULT_CTA,
  cardImage = "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1692&auto=format&fit=crop",
  cardImageAlt = "",
  cardTitle = "Custom Design Solutions",
  cardDescription = "Personalized interiors crafted to reflect your vision.",
  cardCta = DEFAULT_CARD_CTA,
}: Hero12Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative z-[1] w-full scroll-mt-[90px] overflow-hidden bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="relative mx-auto h-full min-h-[760px] w-full max-w-[1200px]">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800">
          <img
            src={backgroundImage}
            alt={backgroundAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 lg:bg-transparent" />
        </div>

        <div className="pointer-events-none absolute top-0 left-0 z-10 flex w-full max-w-2xl flex-col items-start">
          <div className="pointer-events-auto relative w-fit rounded-br-4xl bg-white p-4 dark:bg-neutral-950">
            <h2 className="text-2xl font-medium leading-[1.1] tracking-tight whitespace-nowrap text-neutral-900 sm:text-5xl lg:text-7xl dark:text-white">
              {title}
            </h2>
            <CornerMark className="absolute top-0 -right-10 rotate-180 text-white dark:text-neutral-950" />
          </div>

          {titleLine2 ? (
            <div className="pointer-events-auto relative w-fit rounded-br-4xl bg-white p-4 dark:bg-neutral-950">
              <p className="text-3xl font-medium leading-[1.1] tracking-tight whitespace-nowrap text-neutral-900 sm:text-5xl lg:text-7xl dark:text-white">
                {titleLine2}
              </p>
              <CornerMark className="absolute top-0 -right-10 rotate-180 text-white dark:text-neutral-950" />
              <CornerMark className="absolute -bottom-10 left-0 rotate-180 text-white dark:text-neutral-950" />
            </div>
          ) : null}

          <div className="mt-8 ml-4 lg:hidden">
            <motion.a
              href={cta.href}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <motion.a
            href={cta.href}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        <div className="absolute right-4 bottom-4 left-4 z-20 lg:top-auto lg:right-8 lg:bottom-8 lg:left-auto lg:w-[420px]">
          <motion.div
            className="space-y-4 rounded-2xl border border-neutral-100 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="h-32 w-full overflow-hidden rounded-lg">
              <img
                src={cardImage}
                alt={cardImageAlt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-2">
              <h3 className="mb-1 text-xl font-medium text-neutral-900 dark:text-white">
                {cardTitle}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {cardDescription}
              </p>
            </div>

            <a
              href={cardCta.href}
              className="group m-2 flex w-full cursor-pointer items-center justify-between gap-2 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
            >
              {cardCta.label}{" "}
              <ArrowRight className="mr-4 h-4 w-4 transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero12;
