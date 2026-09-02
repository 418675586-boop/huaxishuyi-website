import { Hero6 } from "@/components/blocks/hero-6";
import NotFound4 from "@/components/blocks/404-4";
import Footer2 from "@/components/blocks/footer-2";
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
      <main id="main-content" className="flex-1">
        <Hero />
        <SocialProof12 />
        <AiProductsSection />
        <ShowcaseCards />
        <Hero6 />
        <NotFound4 />
      </main>

      <Footer2 />
    </>
  );
}
