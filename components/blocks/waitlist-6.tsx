"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const rippleVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const rippleFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uTheme;

  float ring(vec2 p, float radius, float width) {
    float d = abs(length(p) - radius);
    return 1.0 - smoothstep(0.0, width, d);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (vUv - 0.5) * aspect;
    float dist = length(p);

    float waves = 0.0;
    for (int i = 0; i < 6; i++) {
      float phase = fract(uTime * 0.05 + float(i) / 6.0);
      float radius = phase * 1.35;
      float fade = smoothstep(0.02, 0.2, radius) * (1.0 - smoothstep(0.5, 1.3, radius));
      float width = 0.014 + radius * 0.055;
      waves += ring(p, radius, width) * fade;
    }
    waves = min(waves, 1.0);

    float glow = exp(-dist * 3.2);
    float grain = hash(gl_FragCoord.xy) - 0.5;

    vec3 lightColor = vec3(1.0)
      - vec3(0.085, 0.083, 0.075) * waves
      - vec3(0.030, 0.028, 0.020) * glow;
    vec3 darkColor = vec3(0.039, 0.039, 0.043)
      + vec3(0.62, 0.66, 0.74) * waves * 0.17
      + vec3(0.25, 0.36, 0.52) * waves * 0.09
      + vec3(0.10, 0.12, 0.18) * glow * 0.4;

    vec3 color = mix(lightColor, darkColor, clamp(uTheme, 0.0, 1.0));
    color += grain * 0.012;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const isDarkTheme = () => {
  const classes = document.documentElement.classList;
  if (classes.contains("dark")) return true;
  if (classes.contains("light")) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

function RippleField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: rippleVertexShader,
      fragmentShader: rippleFragmentShader,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uTheme: { value: isDarkTheme() ? 1 : 0 },
      },
      depthWrite: false,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      geometry.dispose();
      material.dispose();
      return;
    }

    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    host.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    let themeTarget = material.uniforms.uTheme.value as number;
    let frame = 0;

    const renderScene = () => renderer.render(scene, camera);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      material.uniforms.uResolution.value.set(width, height);
      renderScene();
    };

    const tick = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      const current = material.uniforms.uTheme.value as number;
      material.uniforms.uTheme.value = current + (themeTarget - current) * 0.08;
      renderScene();
      frame = requestAnimationFrame(tick);
    };

    const syncTheme = () => {
      themeTarget = isDarkTheme() ? 1 : 0;
      if (reduceMotion) {
        material.uniforms.uTheme.value = themeTarget;
        renderScene();
      }
    };

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", syncTheme);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    if (reduceMotion) {
      material.uniforms.uTime.value = 5.2;
      renderScene();
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", syncTheme);
      resizeObserver.disconnect();
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        className,
      )}
    />
  );
}

type Waitlist6Props = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  darkTransparent?: boolean;
};

export default function Waitlist6({
  title = "开始建立合作吧",
  description = "为你提供更加专业的产品服务和解决方案",
  ctaLabel = "立即联系",
  ctaHref = "tel:02860198639",
  className,
  darkTransparent = false,
}: Waitlist6Props) {
  const reduce = useReducedMotion();

  return (
    <section
      id="waitlist"
      className={cn(
        "relative flex h-[400px] w-full scroll-mt-[90px] items-center overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8",
        darkTransparent ? "dark:bg-transparent" : "dark:bg-neutral-950",
        className,
      )}
    >
      <RippleField className={darkTransparent ? "dark:opacity-35" : undefined} />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(255,255,255,0.85),transparent_72%)]",
          darkTransparent
            ? "dark:bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(10,10,10,0.22),transparent_72%)]"
            : "dark:bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(10,10,10,0.85),transparent_72%)]",
        )}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto w-full max-w-[1200px]"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
          <motion.h2
            variants={item}
            className="text-[32px] font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-[40px]"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={item}
            className="mt-4 max-w-3xl text-[16px] leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {description}
          </motion.p>

          <motion.a
            variants={item}
            href={ctaHref}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-neutral-950"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
