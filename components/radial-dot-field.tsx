"use client";

import { useTheme } from "next-themes";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Dot = {
  radius: number;
  angle: number;
  size: number;
  ring: boolean;
  phase: number;
  twinkleSpeed: number;
  baseAlpha: number;
};

type RadialDotFieldProps = {
  className?: string;
  /** Whole-rotation period in seconds */
  rotateSeconds?: number;
};

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function buildDots(seed = 1): Dot[] {
  const dots: Dot[] = [];
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  const rings = 32;
  const innerHole = 0.08;
  const outer = 1.08;

  for (let i = 0; i < rings; i++) {
    const t = i / (rings - 1);
    const radius = innerHole + (outer - innerHole) * t;
    const count = Math.round(22 + t * 64 + rand() * 10);

    for (let j = 0; j < count; j++) {
      const jitterR = (rand() - 0.5) * 0.016;
      const angle = (j / count) * Math.PI * 2 + rand() * 0.1;
      const ring = rand() > 0.58;
      dots.push({
        radius: Math.min(outer, Math.max(innerHole, radius + jitterR)),
        angle,
        size: ring ? 3 + rand() * 2.8 : 2.4 + rand() * 3.2,
        ring,
        phase: rand() * Math.PI * 2,
        twinkleSpeed: 0.4 + rand() * 1.1,
        baseAlpha: 0.22 + rand() * 0.22,
      });
    }
  }

  return dots;
}

const DOTS = buildDots(42);

export function RadialDotField({
  className,
  rotateSeconds = 80,
}: RadialDotFieldProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const start = performance.now();
    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = (now: number) => {
      if (!running) return;
      if (cssW < 2 || cssH < 2) {
        resize();
        raf = requestAnimationFrame(draw);
        return;
      }

      const cx = cssW / 2;
      const cy = cssH / 2;
      const maxR = Math.hypot(cx, cy) * 1.02;
      const elapsed = (now - start) / 1000;
      const rotation =
        reduceMotion || rotateSeconds <= 0
          ? 0
          : ((elapsed / rotateSeconds) * Math.PI * 2) % (Math.PI * 2);

      ctx.clearRect(0, 0, cssW, cssH);

      const stroke = isDark ? "255,255,255" : "15,23,42";

      for (const dot of DOTS) {
        const twinkle = reduceMotion
          ? 1
          : 0.7 +
            0.3 *
              (0.5 +
                0.5 * Math.sin(elapsed * dot.twinkleSpeed + dot.phase));
        const alpha = Math.min(
          0.5,
          dot.baseAlpha * twinkle * (isDark ? 1.35 : 1)
        );
        const angle = dot.angle + rotation;
        const x = cx + Math.cos(angle) * dot.radius * maxR;
        const y = cy + Math.sin(angle) * dot.radius * maxR;

        if (dot.ring) {
          ctx.beginPath();
          ctx.arc(x, y, dot.size, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${stroke},${alpha})`;
          ctx.lineWidth = 1.35;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.6, dot.size * 0.48), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${stroke},${alpha})`;
          ctx.fill();
        }
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    };

    if (reduceMotion) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [isDark, reduceMotion, rotateSeconds]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-[2] h-full w-full",
        className
      )}
    />
  );
}

export default RadialDotField;
