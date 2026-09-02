"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  parallaxX: number;
  parallaxY: number;
  parallaxStrength: number;
}

const HERO_TAGS = ["一个底座", "五类应用", "三大保障", "五个统一"];

export function Hero5() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isDarkMode = () => {
      return document.documentElement.classList.contains("dark");
    };

    const orbs: Orb[] = [];

    const darkColors = [
      "rgba(147, 51, 234, 0.5)",
      "rgba(59, 130, 246, 0.5)",
      "rgba(249, 115, 22, 0.4)",
      "rgba(168, 85, 247, 0.45)",
      "rgba(96, 165, 250, 0.45)",
    ];

    const lightColors = [
      "rgba(147, 51, 234, 0.35)",
      "rgba(59, 130, 246, 0.35)",
      "rgba(249, 115, 22, 0.25)",
      "rgba(168, 85, 247, 0.3)",
      "rgba(96, 165, 250, 0.3)",
    ];

    const orbPositions = [
      { x: 0.15, y: 0.15 },
      { x: 0.5, y: 0.1 },
      { x: 0.85, y: 0.15 },
      { x: 0.08, y: 0.5 },
      { x: 0.92, y: 0.5 },
      { x: 0.15, y: 0.85 },
      { x: 0.35, y: 0.75 },
      { x: 0.5, y: 0.9 },
      { x: 0.65, y: 0.75 },
      { x: 0.85, y: 0.85 },
      { x: 0.25, y: 0.4 },
      { x: 0.75, y: 0.4 },
    ];

    const isDark = isDarkMode();
    const colors = isDark ? darkColors : lightColors;

    for (let i = 0; i < orbPositions.length; i++) {
      const pos = orbPositions[i];
      orbs.push({
        x: pos.x * canvas.width,
        y: pos.y * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 150 + 200,
        color: colors[i % colors.length],
        opacity: Math.random() * 0.2 + 0.5,
        parallaxX: 0,
        parallaxY: 0,
        parallaxStrength: 0.02 + Math.random() * 0.03,
      });
    }

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    section.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.filter = "blur(50px)";

      orbs.forEach((orb) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const mouseOffsetX =
          (mouseRef.current.x - centerX) * orb.parallaxStrength;
        const mouseOffsetY =
          (mouseRef.current.y - centerY) * orb.parallaxStrength;

        orb.parallaxX += (mouseOffsetX - orb.parallaxX) * 0.1;
        orb.parallaxY += (mouseOffsetY - orb.parallaxY) * 0.1;

        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) {
          orb.vx *= -1;
        }
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) {
          orb.vy *= -1;
        }

        const drawX = orb.x + orb.parallaxX;
        const drawY = orb.y + orb.parallaxY;

        const distFromCenterX = Math.abs(drawX - centerX) / centerX;
        const distFromCenterY = Math.abs(drawY - centerY) / centerY;
        const maxDist = Math.max(distFromCenterX, distFromCenterY);
        const edgeFade = Math.max(0, 1 - Math.pow(maxDist, 2) * 0.8);

        const colorMatch = orb.color.match(
          /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/,
        );
        const r = colorMatch ? colorMatch[1] : "147";
        const g = colorMatch ? colorMatch[2] : "51";
        const b = colorMatch ? colorMatch[3] : "234";
        const baseAlpha =
          colorMatch && colorMatch[4] ? parseFloat(colorMatch[4]) : 0.5;
        const fadedAlpha = baseAlpha * edgeFade;

        const gradient = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          orb.radius,
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fadedAlpha})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(drawX, drawY, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.filter = "none";

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] min-h-screen w-full overflow-hidden pt-[66px]"
    >
      <div className="absolute inset-0 z-0 bg-white dark:bg-[#0a0a0a]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{
          opacity: 0.8,
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-20 flex min-h-[calc(100vh-66px)] w-full items-center justify-center px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="relative flex flex-col items-start justify-center space-y-6 text-left sm:items-center sm:space-y-8 sm:text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-purple-700 shadow-sm dark:text-purple-300"
            >
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600 dark:bg-purple-400" />
              <span className="text-xs font-medium sm:text-sm">
                区域型医共体数智化解决方案
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="w-full max-w-5xl text-4xl font-medium leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              数智医共体 ·{" "}
              <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
                健康共同体
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-md"
            >
              以统一数智底座，赋能区域医共体高质量发展
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap justify-start gap-2 sm:justify-center"
            >
              {HERO_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-neutral-200/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur-sm sm:text-sm dark:border-white/10 dark:bg-white/10 dark:text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero5;
