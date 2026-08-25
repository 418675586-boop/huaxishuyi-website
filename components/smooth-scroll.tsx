"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  duration: 0.85,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.6,
};

const IDLE_VELOCITY = 0.01;

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    let rafId = 0;
    let running = false;

    function stopRaf() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      running = false;
    }

    function raf(time: number) {
      lenis.raf(time);

      const stillMoving =
        Math.abs(lenis.velocity) > IDLE_VELOCITY || lenis.isScrolling;

      if (stillMoving) {
        rafId = requestAnimationFrame(raf);
      } else {
        stopRaf();
      }
    }

    function startRaf() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(raf);
    }

    // Kick RAF only while the user is interacting / inertia is active.
    const onVirtualScroll = () => startRaf();
    lenis.on("virtual-scroll", onVirtualScroll);
    lenis.on("scroll", startRaf);

    function handleAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      startRaf();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.off("virtual-scroll", onVirtualScroll);
      lenis.off("scroll", startRaf);
      stopRaf();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
