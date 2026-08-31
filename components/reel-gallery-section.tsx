"use client";

import { useEffect, useRef, useState } from "react";

import ReelGallery from "@/components/react-bits/reel-gallery";

/** Keep sources light — oversized JPEGs stall WebGL atlas baking. */
const reelImages = [
  "/img/mock1_compressed.webp",
  "/img/mock2_compressed.webp",
  "/img/mock3_compressed.webp",
  "/img/mock4_compressed.webp",
  "/img/mock5_compressed.webp",
  "/img/mock6_compressed.webp",
  "/img/mock7_compressed.webp",
  "/img/mock8_compressed.webp",
  "/img/mock9_compressed.webp",
  "/img/mock10_compressed.webp",
  "/img/mock11_compressed.webp",
  "/img/mock12_compressed.webp",
  "/img/solutions/pelvic-floor-ai-operations-platform.png",
  "/img/solutions/reproductive-medicine-ai-platform.png",
  "/img/solutions/healthcare-system-integration.png",
  "/img/news-gene-therapy.png",
  "/img/news-ai-assisted-care-2026.png",
  "/img/news-molecular-medicine.png",
];

export function ReelGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible) setMounted(true);
      },
      { rootMargin: "240px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F6FA] py-[80px] dark:bg-neutral-950 sm:py-[120px]"
    >
      <div className="mx-auto h-[460px] w-full max-w-[1200px] px-4 sm:h-[560px] sm:px-6 lg:px-8">
        <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0b1020]">
          {mounted ? (
            <ReelGallery
              images={reelImages}
              rows={3}
              rowHeight={150}
              rowGap={20}
              itemGap={16}
              tilt={10}
              arch={80}
              autoScroll={32}
              grayscale={0.1}
              fade={0.14}
              dim={0.28}
              taper={0.18}
              brightness={1.08}
              backgroundColor="#0b1020"
              radius={16}
              paused={!inView}
              maxFps={45}
              dpr={1.5}
              className="h-full min-h-[460px] w-full"
            />
          ) : (
            <div className="h-full w-full bg-[#0b1020]" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
