import { Hero6 } from "@/components/blocks/hero-6";
import NotFound4 from "@/components/blocks/404-4";
import SocialProof12 from "@/components/blocks/social-proof-12";
import { AiProductsSection } from "@/components/ai-products-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ShowcaseCards } from "@/components/showcase-cards";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "React Bits Pro - AI SaaS Template",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />
      <main id="main-content" className="relative flex-1 dark:bg-neutral-950">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[55vh] dark:block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_90%,rgba(122,31,110,0.21)_0%,transparent_55%),radial-gradient(ellipse_at_50%_85%,rgba(107,91,149,0.17)_0%,transparent_50%),radial-gradient(ellipse_at_82%_90%,rgba(43,79,212,0.23)_0%,transparent_55%)]" />
        </div>
        <Hero />
        <SocialProof12 />
        <AiProductsSection />
        <ShowcaseCards />
        <Hero6 />
        <NotFound4 />
      </main>
    </>
  );
}
