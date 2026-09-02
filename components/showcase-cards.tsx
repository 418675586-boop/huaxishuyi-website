"use client";

import { useRef, useEffect, useCallback, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import NextImage from "next/image";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import StaggeredText from "@/components/react-bits/staggered-text";
import { OutlineCtaLink } from "@/components/outline-cta";

function getIsSafari(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium");
}

function subscribeLg(onStoreChange: () => void): () => void {
  const mql = window.matchMedia("(min-width: 1024px)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getIsLg(): boolean {
  return window.matchMedia("(min-width: 1024px)").matches;
}

const emptySubscribe = () => () => {};

function useIsSafari(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    getIsSafari,
    () => false
  );
}

function useIsThreeCol(): boolean {
  return useSyncExternalStore(subscribeLg, getIsLg, () => true);
}

interface CardData {
  title: string;
  href?: string;
}

/** Shared panorama image spanning all three cards */
const PANORAMA_IMAGE = "/img/mock5_compressed.webp";
/** Matches Tailwind `gap-6` (1.5rem) on the card grid */
const CARD_GAP_PX = 24;
const CARD_COUNT = 3;

const cards: CardData[] = [
  { title: "智慧医院/系统集成" },
  { title: "区域医疗数智化转型" },
  {
    title: "医疗数智化转型",
    href: "/solutions/hospital-digital-transformation",
  },
];

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  varying vec2 vLocalUv;
  uniform vec2 uTextureResolution;
  uniform vec2 uResolution;
  uniform vec2 uVirtualResolution;
  uniform float uSliceStart;
  uniform float uSliceWidth;
  uniform float uPanorama;

  vec2 resizeUvCover(vec2 uv, vec2 size, vec2 resolution) {
    vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (size.x / size.y), 1.0),
      min((resolution.y / resolution.x) / (size.y / size.x), 1.0)
    );
    return vec2(
      uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  }

  void main() {
    vec2 flippedUv = vec2(uv.x, 1.0 - uv.y);
    vLocalUv = flippedUv;
    vec2 virtualUv = uPanorama > 0.5
      ? vec2(uSliceStart + flippedUv.x * uSliceWidth, flippedUv.y)
      : flippedUv;
    vec2 coverResolution = uPanorama > 0.5 ? uVirtualResolution : uResolution;
    vUv = resizeUvCover(virtualUv, uTextureResolution, coverResolution);
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uBulge;
  uniform float uRadius;
  uniform float uStrength;
  
  varying vec2 vUv;
  varying vec2 vLocalUv;

  vec2 bulge(vec2 uv, vec2 center) {
    vec2 delta = uv - center;
    float dist = length(delta);
    
    float falloff = exp(-dist * dist / (uRadius * uRadius));
    
    float edgeFade = smoothstep(0.0, 0.15, vLocalUv.x) * smoothstep(0.0, 0.15, 1.0 - vLocalUv.x) *
                     smoothstep(0.0, 0.15, vLocalUv.y) * smoothstep(0.0, 0.15, 1.0 - vLocalUv.y);
    
    float bulgeAmount = falloff * uStrength * uBulge * edgeFade;
    vec2 displaced = uv + delta * bulgeAmount;
    return clamp(displaced, 0.001, 0.999);
  }

  void main() {
    vec2 bulgeUV = bulge(vUv, uMouse);
    vec4 tex = texture2D(uTexture, bulgeUV);
    gl_FragColor = vec4(tex.rgb, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

interface BulgeCardProps {
  title: string;
  imageSrc: string;
  index: number;
  panorama: boolean;
}

/** One continuous image across the 3-column grid (accounts for gap-6). */
function panoramaStyle(index: number): CSSProperties {
  return {
    width: `calc(${CARD_COUNT * 100}% + ${(CARD_COUNT - 1) * 1.5}rem)`,
    left: `calc(${-index} * (100% + 1.5rem))`,
  };
}

// Safari-friendly card with CSS hover effect instead of WebGL
function SafariCard({ title, imageSrc, index, panorama }: BulgeCardProps): ReactNode {
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
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-center text-[32px] font-medium tracking-tight text-white">
          <span className="block">{title}</span>
          <span className="mt-1 block">解决方案</span>
        </h3>
      </div>
    </motion.div>
  );
}

function BulgeCard({ title, imageSrc, index, panorama }: BulgeCardProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number>(0);
  const startLoopRef = useRef<(() => void) | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const imageLoadedRef = useRef(false);
  const imageSizeRef = useRef({ width: 1, height: 1 });
  const isDisposedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const [shouldInitWebgl, setShouldInitWebgl] = useState(false);

  const mouseX = useRef(0.5);
  const mouseY = useRef(0.5);
  const targetMouseX = useRef(0.5);
  const targetMouseY = useRef(0.5);
  const bulgeValue = useRef(0);
  const targetBulge = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldInitWebgl(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldInitWebgl) return;

    isDisposedRef.current = false;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;
    glRef.current = gl;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    programRef.current = program;

    gl.useProgram(program);

    const positions = new Float32Array([
      -1, -1, 0, 0,
       3, -1, 2, 0,
      -1,  3, 0, 2,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    const uvLoc = gl.getAttribLocation(program, "uv");

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    uniformsRef.current = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uBulge: gl.getUniformLocation(program, "uBulge"),
      uRadius: gl.getUniformLocation(program, "uRadius"),
      uStrength: gl.getUniformLocation(program, "uStrength"),
      uTextureResolution: gl.getUniformLocation(program, "uTextureResolution"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uVirtualResolution: gl.getUniformLocation(program, "uVirtualResolution"),
      uSliceStart: gl.getUniformLocation(program, "uSliceStart"),
      uSliceWidth: gl.getUniformLocation(program, "uSliceWidth"),
      uPanorama: gl.getUniformLocation(program, "uPanorama"),
    };

    const uniforms = uniformsRef.current;
    if (uniforms.uRadius) gl.uniform1f(uniforms.uRadius, 0.62);
    if (uniforms.uStrength) gl.uniform1f(uniforms.uStrength, 0.22);
    if (uniforms.uPanorama) gl.uniform1f(uniforms.uPanorama, panorama ? 1 : 0);
    if (uniforms.uTexture) gl.uniform1i(uniforms.uTexture, 0);

    const texture = gl.createTexture();
    textureRef.current = texture;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([128, 128, 128, 255])
    );

    const drawFrame = () => {
      if (!gl || !programRef.current || !imageLoadedRef.current || !textureRef.current) return;

      mouseX.current += (targetMouseX.current - mouseX.current) * 0.045;
      mouseY.current += (targetMouseY.current - mouseY.current) * 0.045;
      bulgeValue.current += (targetBulge.current - bulgeValue.current) * 0.035;

      gl.useProgram(programRef.current);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);

      const u = uniformsRef.current;
      if (u.uTexture) gl.uniform1i(u.uTexture, 0);
      if (u.uMouse) gl.uniform2f(u.uMouse, mouseX.current, mouseY.current);
      if (u.uBulge) gl.uniform1f(u.uBulge, bulgeValue.current);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const isSettled = () =>
      Math.abs(targetBulge.current - bulgeValue.current) < 0.001 &&
      Math.abs(targetMouseX.current - mouseX.current) < 0.001 &&
      Math.abs(targetMouseY.current - mouseY.current) < 0.001 &&
      bulgeValue.current < 0.001;

    const render = () => {
      if (isDisposedRef.current) return;
      if (!imageLoadedRef.current) {
        rafRef.current = 0;
        return;
      }

      drawFrame();

      if (isSettled()) {
        rafRef.current = 0;
        return;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isDisposedRef.current || rafRef.current) return;
      rafRef.current = requestAnimationFrame(render);
    };

    startLoopRef.current = startLoop;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      if (width <= 0 || height <= 0) return;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const totalWidth = panorama
        ? CARD_COUNT * width + (CARD_COUNT - 1) * CARD_GAP_PX
        : width;
      const sliceStart = panorama
        ? (index * (width + CARD_GAP_PX)) / totalWidth
        : 0;
      const sliceWidth = panorama ? width / totalWidth : 1;

      const u = uniformsRef.current;
      if (u.uResolution) gl.uniform2f(u.uResolution, width, height);
      if (u.uVirtualResolution) gl.uniform2f(u.uVirtualResolution, totalWidth, height);
      if (u.uSliceStart) gl.uniform1f(u.uSliceStart, sliceStart);
      if (u.uSliceWidth) gl.uniform1f(u.uSliceWidth, sliceWidth);
      if (u.uPanorama) gl.uniform1f(u.uPanorama, panorama ? 1 : 0);

      if (imageLoadedRef.current) {
        drawFrame();
      }
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (!gl || !texture || isDisposedRef.current) return;
      imageSizeRef.current = { width: image.width, height: image.height };
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      imageLoadedRef.current = true;
      const texResLoc = uniformsRef.current.uTextureResolution;
      if (texResLoc) {
        gl.uniform2f(texResLoc, image.width, image.height);
      }
      resize();
      drawFrame();
      setWebglReady(true);
      startLoop();
    };
    image.onerror = () => {
      setWebglReady(false);
    };
    image.src = imageSrc;

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);

    return () => {
      isDisposedRef.current = true;
      startLoopRef.current = null;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      if (program) gl.deleteProgram(program);
      if (texture) gl.deleteTexture(texture);
      glRef.current = null;
      programRef.current = null;
      textureRef.current = null;
      setWebglReady(false);
    };
  }, [shouldInitWebgl, imageSrc, index, panorama]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetMouseX.current = (e.clientX - rect.left) / rect.width;
    targetMouseY.current = (e.clientY - rect.top) / rect.height;
    startLoopRef.current?.();
  }, []);

  const handleMouseEnter = useCallback(() => {
    targetBulge.current = 1;
    startLoopRef.current?.();
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetBulge.current = 0;
    startLoopRef.current?.();
  }, []);
  return (
    <motion.div
      ref={containerRef}
      className="group relative aspect-4/5 w-full cursor-pointer overflow-hidden rounded-xl border border-border/25"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        animate={{ scale: isHovered ? 1.055 : 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Fallback image when WebGL is unavailable or still loading */}
        <div
          className={panorama ? "absolute top-0 h-full" : "absolute inset-0"}
          style={panorama ? panoramaStyle(index) : {}}
          aria-hidden={webglReady}
        >
          <NextImage
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes={panorama ? "1200px" : "(max-width: 640px) 100vw, 50vw"}
            priority={index === 0}
          />
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
            webglReady ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-center text-[32px] font-medium tracking-tight text-white">
          <span className="block">{title}</span>
          <span className="mt-1 block">解决方案</span>
        </h3>
      </div>
    </motion.div>
  );
}

export function ShowcaseCards(): ReactNode {
  const isSafari = useIsSafari();
  const panorama = useIsThreeCol();
  const CardComponent = isSafari ? SafariCard : BulgeCard;

  return (
    <section
      id="solutions"
      className="bg-white px-4 py-[150px] dark:bg-black sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:gap-10">
        {/* 标题在卡片/图片上方 */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-3xl flex-col gap-2">
            <StaggeredText
              as="h2"
              text="解决方案"
              segmentBy="chars"
              direction="bottom"
              delay={70}
              blur={false}
              className="justify-start text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white"
            />
            <StaggeredText
              as="p"
              text="一体化服务，全周期管理"
              segmentBy="words"
              direction="bottom"
              delay={35}
              blur={false}
              className="justify-start text-[16px] leading-tight text-neutral-600 dark:text-neutral-400"
            />
          </div>

          <OutlineCtaLink href="#" className="self-start sm:self-auto">
            查看全部
          </OutlineCtaLink>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cards.map((card, index) => {
            const cardNode = (
              <SpotlightCard
                className="rounded-xl"
                spotlightColor="rgba(255, 255, 255, 0.3)"
              >
                <CardComponent
                  title={card.title}
                  imageSrc={PANORAMA_IMAGE}
                  index={index}
                  panorama={panorama}
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
