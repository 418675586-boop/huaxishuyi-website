"use client";

import { useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import NextImage from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import StaggeredText from "@/components/react-bits/staggered-text";
import {
  SolutionCardMotif,
  type SolutionMotifKind,
} from "@/components/solution-card-motif";

function subscribeLg(onStoreChange: () => void): () => void {
  const mql = window.matchMedia("(min-width: 1024px)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getIsLg(): boolean {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function useIsThreeCol(): boolean {
  return useSyncExternalStore(subscribeLg, getIsLg, () => true);
}

interface CardData {
  title: string;
  href?: string;
  motif: SolutionMotifKind;
}

/** Shared panorama image spanning all three cards */
const PANORAMA_IMAGE = "/img/mock5_compressed.webp";
const CARD_COUNT = 3;

const cards: CardData[] = [
  {
    title: "智慧医院/系统集成",
    href: "/solutions/smart-hospital-integration",
    motif: "modules",
  },
  {
    title: "区域型医共体数智化",
    href: "/solutions/regional-medical-community",
    motif: "network",
  },
  {
    title: "医院数智化转型",
    href: "/solutions/hospital-digital-transformation",
    motif: "layers",
  },
];

interface SolutionCardProps {
  title: string;
  imageSrc: string;
  index: number;
  panorama: boolean;
  motif: SolutionMotifKind;
}

function CardWatermark({
  title,
  motif,
}: {
  title: string;
  motif: SolutionMotifKind;
}): ReactNode {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 flex items-start justify-center pt-[14%] text-white"
        aria-hidden="true"
      >
        <div className="h-[58%] w-[78%] opacity-[0.28]">
          <SolutionCardMotif kind={motif} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-[120px] flex justify-center px-4">
        <h3 className="text-center text-[30px] font-medium leading-[1.15] tracking-tighter text-white">
          <span className="block">{title}</span>
          <span className="block">解决方案</span>
        </h3>
      </div>
    </>
  );
}

function panoramaStyle(index: number): CSSProperties {
  return {
    width: `calc(${CARD_COUNT * 100}% + ${(CARD_COUNT - 1) * 1.5}rem)`,
    left: `calc(${-index} * (100% + 1.5rem))`,
  };
}

function SolutionCard({ title, imageSrc, index, panorama, motif }: SolutionCardProps): ReactNode {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-xl border border-border/25"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={{ scale: isHovered ? 1.055 : 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={panorama ? "absolute top-0 h-full" : "absolute inset-0"}
          style={panorama ? panoramaStyle(index) : {}}
        >
          <NextImage
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes={panorama ? "1200px" : "(max-width: 640px) 100vw, 50vw"}
            priority={index === 0}
          />
        </div>
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 mix-blend-color"
        style={{
          background: "linear-gradient(135deg, #333DA7 0%, #7388DF 100%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: isHovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.22)",
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      <CardWatermark title={title} motif={motif} />
    </motion.div>
  );
}

export function ShowcaseCards(): ReactNode {
  const panorama = useIsThreeCol();

  return (
    <section
      id="solutions"
      className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:gap-10">
        <div className="flex max-w-3xl flex-col gap-2">
            <StaggeredText
              as="h2"
              text="全场景解决方案，赋能医疗数智升级"
              segmentBy="chars"
              direction="bottom"
              delay={70}
              blur={false}
              className="justify-start text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
            />
            <StaggeredText
              as="p"
              text="从院内系统集成到区域医疗协同，以一体化解决方案助力医院与医共体数智化转型。"
              segmentBy="words"
              direction="bottom"
              delay={35}
              blur={false}
              className="justify-start text-[16px] leading-tight text-neutral-600 dark:text-neutral-400"
            />
          </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const cardNode = (
              <SpotlightCard
                className="rounded-xl"
                spotlightColor="rgba(255, 255, 255, 0.3)"
              >
                <SolutionCard
                  title={card.title}
                  imageSrc={PANORAMA_IMAGE}
                  index={index}
                  panorama={panorama}
                  motif={card.motif}
                />
              </SpotlightCard>
            );

            if (!card.href) {
              return <div key={card.title}>{cardNode}</div>;
            }

            return (
              <Link
                key={card.title}
                href={card.href}
                className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:focus-visible:ring-white"
                aria-label={`${card.title}解决方案`}
              >
                {cardNode}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
