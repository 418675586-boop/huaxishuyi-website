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
  tone?: "white" | "muted";
  title?: string;
  titleLine2?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  backgroundMirrored?: boolean;
  cta?: Hero12Cta;
  cardImage?: string;
  cardImageAlt?: string;
  cardTitle?: string;
  cardDescription?: string;
  cardCta?: Hero12Cta | null;
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
  tone = "white",
  title = "Transforming Homes",
  titleLine2 = "Since 1995",
  backgroundImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop",
  backgroundAlt = "",
  backgroundMirrored = false,
  cta = DEFAULT_CTA,
  cardImage = "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1692&auto=format&fit=crop",
  cardImageAlt = "",
  cardTitle = "Custom Design Solutions",
  cardDescription = "Personalized interiors crafted to reflect your vision.",
  cardCta = DEFAULT_CARD_CTA,
}: Hero12Props) {
  const surface = tone === "muted" ? "bg-[#F8F8F8]" : "bg-white";
  const surfaceMark = tone === "muted" ? "text-[#F8F8F8]" : "text-white";

  return (
    <section
      id={id}
      className={cn(
        "relative z-[1] w-full scroll-mt-[90px] overflow-hidden px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8",
        surface,
        className,
      )}
    >
      <div className="relative mx-auto h-full min-h-[760px] w-full max-w-[1200px]">
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800">
          <img
            src={backgroundImage}
            alt={backgroundAlt}
            className={cn(
              "h-full w-full object-cover",
              backgroundMirrored && "-scale-x-100",
            )}
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30 lg:bg-transparent" />
        </div>

        <div className="pointer-events-none absolute top-0 left-0 z-10 flex w-full max-w-2xl flex-col items-start">
          <div
            className={cn(
              "pointer-events-auto relative w-fit rounded-br-4xl p-4 dark:bg-neutral-950",
              surface,
            )}
          >
            <h2 className="text-[36px] font-medium leading-[1.15] tracking-tight whitespace-nowrap text-neutral-900 dark:text-white">
              {title}
            </h2>
            <CornerMark
              className={cn(
                "absolute top-0 -right-10 rotate-180 dark:text-neutral-950",
                surfaceMark,
              )}
            />
          </div>

          {titleLine2 ? (
            <div
              className={cn(
                "pointer-events-auto relative w-fit rounded-br-4xl p-4 dark:bg-neutral-950",
                surface,
              )}
            >
              <p className="text-[36px] font-medium leading-[1.15] tracking-tight whitespace-nowrap text-neutral-900 dark:text-white">
                {titleLine2}
              </p>
              <CornerMark
                className={cn(
                  "absolute top-0 -right-10 rotate-180 dark:text-neutral-950",
                  surfaceMark,
                )}
              />
              <CornerMark
                className={cn(
                  "absolute -bottom-10 left-0 rotate-180 dark:text-neutral-950",
                  surfaceMark,
                )}
              />
            </div>
          ) : null}

          <div className="mt-8 ml-4 lg:hidden">
            <motion.a
              href={cta.href}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <motion.a
            href={cta.href}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-[14px] font-medium text-neutral-900 shadow-lg transition-colors hover:bg-neutral-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {cta.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.a>
        </div>

        <div className="absolute right-4 bottom-4 left-4 z-20 lg:top-auto lg:right-8 lg:bottom-8 lg:left-auto lg:w-[420px]">
          <motion.div
            className="space-y-4 rounded-2xl border border-white/50 bg-white/40 p-2 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:shadow-none"
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
              <p className="text-sm leading-relaxed text-neutral-900 dark:text-white">
                {cardDescription}
              </p>
            </div>

            {cardCta ? (
              <a
                href={cardCta.href}
                className="group m-2 flex w-full cursor-pointer items-center justify-between gap-2 text-sm font-medium text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
              >
                {cardCta.label}{" "}
                <ArrowRight className="mr-4 h-4 w-4 transform" />
              </a>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero12;
