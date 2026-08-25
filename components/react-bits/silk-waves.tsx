"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

import "./silk-waves.css";

export interface SilkWavesProps {
  /** Animation speed multiplier */
  speed?: number;
  /** Zoom level of the wave pattern */
  scale?: number;
  /** Controls wave amplitude/swirl */
  distortion?: number;
  /** Controls phase shift/rotation */
  curve?: number;
  /** Controls alpha contrast/sharpness */
  contrast?: number;
  /** Array of 8 hex colors for the gradient */
  colors?: string[];
  /** Rotation of the pattern in degrees */
  rotation?: number;
  /** Horizontal offset/pan of the pattern */
  offsetX?: number;
  /** Vertical offset/pan of the pattern */
  offsetY?: number;
  /** Overall brightness multiplier */
  brightness?: number;
  /** Overall opacity (0-1) */
  opacity?: number;
  /** Wave complexity (affects iteration count, 0.5-2) */
  complexity?: number;
  /** Wave stripe frequency */
  frequency?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uDistortion;
  uniform float uCurve;
  uniform float uContrast;
  uniform float uRotation;
  uniform float uOffsetX;
  uniform float uOffsetY;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uComplexity;
  uniform float uFrequency;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform vec3 uC5;
  uniform vec3 uC6;
  uniform vec3 uC7;
  uniform vec3 uC8;

  varying vec2 vUv;

  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  }

  void main() {
    vec2 pos = vUv * uScale;
    float aspect = uResolution.x / uResolution.y;
    pos.x *= aspect;

    pos.x += uOffsetX;
    pos.y += uOffsetY;

    vec2 center = vec2(aspect * 0.5 * uScale, 0.5 * uScale);
    pos = rotate2D(pos - center, uRotation) + center;

    float iterations = 10.0 + uComplexity * 10.0;

    for (float i = 1.0; i < 30.0; i++) {
        if (i > iterations) break;
        float timeOffset = uTime * uSpeed * 0.1 * i;
        float amp = 0.8 * uDistortion;
        float shift = 0.3 * uCurve;

        pos.x += amp / i * sin(i * pos.y + timeOffset + shift * i) + 1.6;
        pos.y += (amp * 2.0) / i * sin(pos.x + timeOffset + shift * i + 1.6) - 0.8;
    }

    float wave = cos((pos.x + pos.y) * uFrequency) * 0.5 + 0.5;

    vec3 finalColor = vec3(0.0);

    if (wave < 0.15) {
        finalColor = mix(uC1, uC2, wave * 6.667);
    } else if (wave < 0.35) {
        finalColor = mix(uC2, uC3, (wave - 0.15) * 5.0);
    } else if (wave < 0.55) {
        finalColor = mix(uC3, uC4, (wave - 0.35) * 5.0);
    } else if (wave < 0.7) {
        finalColor = mix(uC4, uC5, (wave - 0.55) * 6.667);
    } else if (wave < 0.82) {
        finalColor = mix(uC5, uC6, (wave - 0.7) * 8.333);
    } else if (wave < 0.92) {
        finalColor = mix(uC6, uC7, (wave - 0.82) * 10.0);
    } else {
        finalColor = mix(uC7, uC8, (wave - 0.92) * 12.5);
    }

    finalColor *= uBrightness;

    float alpha = smoothstep(0.01, 1.0, pow(wave, 2.5 * uContrast)) * uOpacity;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const SilkWaves: React.FC<SilkWavesProps> = ({
  speed = 1,
  scale = 2,
  distortion = 1,
  curve = 1,
  contrast = 1,
  colors = [
    "#0d1326",
    "#162a52",
    "#1e407e",
    "#2657aa",
    "#2e6ed5",
    "#3785ff",
    "#5092ff",
    "#69a0ff",
  ],
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  brightness = 1,
  opacity = 1,
  complexity = 1,
  frequency = 1,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Don't probe WebGL on a throwaway canvas — that burns a context slot.
    let disposed = false;
    let visible = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let clock: THREE.Clock | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;

    const stopLoop = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const animate = () => {
      if (disposed || !visible || !renderer || !material || !scene || !camera || !clock) {
        animationFrameRef.current = null;
        return;
      }
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (disposed || !visible || !renderer || animationFrameRef.current) return;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const syncSize = () => {
      if (!renderer || !material) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      material.uniforms.uResolution.value.set(w, h);
    };

    const init = () => {
      if (disposed || renderer) return;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
        });
      } catch {
        renderer = null;
        return;
      }
      if (!renderer.getContext()) {
        renderer.dispose();
        renderer = null;
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);
      container.classList.add("silk-waves-root--webgl");
      rendererRef.current = renderer;

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uSpeed: { value: speed },
          uScale: { value: scale },
          uDistortion: { value: distortion },
          uCurve: { value: curve },
          uContrast: { value: contrast },
          uRotation: { value: (rotation * Math.PI) / 180 },
          uOffsetX: { value: offsetX },
          uOffsetY: { value: offsetY },
          uBrightness: { value: brightness },
          uOpacity: { value: opacity },
          uComplexity: { value: complexity },
          uFrequency: { value: frequency },
          uC1: { value: new THREE.Color(colors[0]) },
          uC2: { value: new THREE.Color(colors[1]) },
          uC3: { value: new THREE.Color(colors[2]) },
          uC4: { value: new THREE.Color(colors[3]) },
          uC5: { value: new THREE.Color(colors[4]) },
          uC6: { value: new THREE.Color(colors[5]) },
          uC7: { value: new THREE.Color(colors[6]) },
          uC8: { value: new THREE.Color(colors[7]) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      materialRef.current = material;

      geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
      clock = new THREE.Clock();

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          visible = Boolean(entry?.isIntersecting);
          if (visible) startLoop();
          else stopLoop();
        },
        { threshold: 0, rootMargin: "120px" },
      );
      intersectionObserver.observe(container);

      // Start immediately; observer will pause if off-screen.
      startLoop();
    };

    resizeObserver = new ResizeObserver(() => {
      if (!renderer) {
        if (container.clientWidth > 0 && container.clientHeight > 0) init();
        return;
      }
      syncSize();
    });
    resizeObserver.observe(container);

    if (container.clientWidth > 0 && container.clientHeight > 0) {
      init();
    }

    return () => {
      disposed = true;
      visible = false;
      stopLoop();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      container.classList.remove("silk-waves-root--webgl");
      geometry?.dispose();
      material?.dispose();
      rendererRef.current = null;
      materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once; props synced below
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uScale.value = scale;
      materialRef.current.uniforms.uDistortion.value = distortion;
      materialRef.current.uniforms.uCurve.value = curve;
      materialRef.current.uniforms.uContrast.value = contrast;
      materialRef.current.uniforms.uRotation.value = (rotation * Math.PI) / 180;
      materialRef.current.uniforms.uOffsetX.value = offsetX;
      materialRef.current.uniforms.uOffsetY.value = offsetY;
      materialRef.current.uniforms.uBrightness.value = brightness;
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uComplexity.value = complexity;
      materialRef.current.uniforms.uFrequency.value = frequency;
      materialRef.current.uniforms.uC1.value.set(colors[0]);
      materialRef.current.uniforms.uC2.value.set(colors[1]);
      materialRef.current.uniforms.uC3.value.set(colors[2]);
      materialRef.current.uniforms.uC4.value.set(colors[3]);
      materialRef.current.uniforms.uC5.value.set(colors[4]);
      materialRef.current.uniforms.uC6.value.set(colors[5]);
      materialRef.current.uniforms.uC7.value.set(colors[6]);
      materialRef.current.uniforms.uC8.value.set(colors[7]);
    }
  }, [
    speed,
    scale,
    distortion,
    curve,
    contrast,
    rotation,
    offsetX,
    offsetY,
    brightness,
    opacity,
    complexity,
    frequency,
    colors,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("silk-waves-root", className)}
      style={{ minHeight: "inherit", ...style }}
      aria-hidden="true"
    >
      <div className="silk-waves-fallback" />
    </div>
  );
};

export default SilkWaves;
