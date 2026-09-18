"use client";

import { SocialProof9 } from "@/components/blocks/social-proof-9";
import { ParallaxNewsSection } from "@/components/news/parallax-news-section";

export default function NotFound4() {
  return (
    <section
      id="news"
      className="relative z-[1] flex w-full flex-col items-stretch bg-white dark:bg-transparent"
    >
      <ParallaxNewsSection />

      <SocialProof9 embedded />
    </section>
  );
}
