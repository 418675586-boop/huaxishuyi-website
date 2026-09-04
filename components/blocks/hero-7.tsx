"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const carouselVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const carouselFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uBarWidth;

  varying vec2 vUv;
  varying vec3 vWorldPosition;

  float bayerDither(vec2 position) {
    int x = int(mod(position.x, 8.0));
    int y = int(mod(position.y, 8.0));

    int index = x + y * 8;
    float threshold = 0.0;

    if (index == 0) threshold = 0.0/64.0;
    else if (index == 1) threshold = 32.0/64.0;
    else if (index == 2) threshold = 8.0/64.0;
    else if (index == 3) threshold = 40.0/64.0;
    else if (index == 4) threshold = 2.0/64.0;
    else if (index == 5) threshold = 34.0/64.0;
    else if (index == 6) threshold = 10.0/64.0;
    else if (index == 7) threshold = 42.0/64.0;
    else if (index == 8) threshold = 48.0/64.0;
    else if (index == 9) threshold = 16.0/64.0;
    else if (index == 10) threshold = 56.0/64.0;
    else if (index == 11) threshold = 24.0/64.0;
    else if (index == 12) threshold = 50.0/64.0;
    else if (index == 13) threshold = 18.0/64.0;
    else if (index == 14) threshold = 58.0/64.0;
    else if (index == 15) threshold = 26.0/64.0;
    else if (index == 16) threshold = 12.0/64.0;
    else if (index == 17) threshold = 44.0/64.0;
    else if (index == 18) threshold = 4.0/64.0;
    else if (index == 19) threshold = 36.0/64.0;
    else if (index == 20) threshold = 14.0/64.0;
    else if (index == 21) threshold = 46.0/64.0;
    else if (index == 22) threshold = 6.0/64.0;
    else if (index == 23) threshold = 38.0/64.0;
    else if (index == 24) threshold = 60.0/64.0;
    else if (index == 25) threshold = 28.0/64.0;
    else if (index == 26) threshold = 52.0/64.0;
    else if (index == 27) threshold = 20.0/64.0;
    else if (index == 28) threshold = 62.0/64.0;
    else if (index == 29) threshold = 30.0/64.0;
    else if (index == 30) threshold = 54.0/64.0;
    else if (index == 31) threshold = 22.0/64.0;
    else threshold = mod(float(index) * 0.125, 1.0);

    return threshold;
  }

  float roundedRectSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    float barTransition = smoothstep(-uBarWidth, uBarWidth, vWorldPosition.x);

    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayscaleColor = vec3(gray);

    vec2 pixelPos = vUv * uResolution;
    float ditherThreshold = bayerDither(pixelPos);

    float levels = 4.0;
    float quantized = floor(gray * levels + ditherThreshold) / levels;
    vec3 ditheredGray = vec3(quantized);

    vec3 finalColor = mix(ditheredGray, texColor.rgb, barTransition);

    vec2 centeredUv = vUv * 2.0 - 1.0;
    float cornerRadius = 0.1;
    float dist = roundedRectSDF(centeredUv, vec2(1.0, 1.0), cornerRadius);
    float alpha = 1.0 - smoothstep(-0.02, 0.02, dist);

    gl_FragColor = vec4(finalColor, alpha * texColor.a);
  }
`;

const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float centerDist = abs(vUv.x - 0.5) * 2.0;

    float coreGlow = exp(-centerDist * 60.0) * 2.5;
    float midGlow = exp(-centerDist * 12.0) * 1.2;
    float outerGlow = exp(-centerDist * 4.0) * 0.5;
    float glow = coreGlow + midGlow + outerGlow;

    float pulse = sin(uTime * 1.5) * 0.08 + 0.92;
    glow *= pulse;

    float scanLine = sin(vUv.y * 60.0 + uTime * 2.0) * 0.02 + 0.98;
    glow *= scanLine;

    vec3 glowColor = vec3(1.0, 0.624, 0.988);

    float edgeDist = abs(vUv.y - 0.5) * 2.0;
    float vertFade = 1.0 - smoothstep(0.2, 0.95, edgeDist);
    glow *= vertFade;

    gl_FragColor = vec4(glowColor * glow, glow);
  }
`;

const CAROUSEL_IMAGES = [
  "/img/solutions/hero7/hero7-01-platform.png",
  "/img/solutions/hero7/hero7-02-foundation.png",
  "/img/solutions/hero7/hero7-03-apps.png",
  "/img/solutions/hero7/hero7-04-collaboration.png",
  "/img/solutions/hero7/hero7-05-security.png",
  "/img/solutions/hero7/hero7-06-primary.png",
  "/img/solutions/hero7/hero7-07-sharing.png",
  "/img/solutions/hero7/hero7-08-community.png",
  "/img/solutions/hero7/hero7-09-unification.png",
];

interface CarouselItemProps {
  texture: THREE.Texture;
  index: number;
  totalItems: number;
  rotationRef: React.RefObject<number>;
  radius: number;
}

function CarouselItem({
  texture,
  index,
  totalItems,
  rotationRef,
  radius,
}: CarouselItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(400, 300) },
      uBarWidth: { value: 0.1 },
    }),
    [texture],
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const anglePerItem = (Math.PI * 2) / totalItems;
    const baseAngle = index * anglePerItem;
    const currentAngle = baseAngle + rotationRef.current;

    const normalizedAngle =
      (((currentAngle % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) -
      Math.PI;

    const x = Math.sin(normalizedAngle) * radius;
    const z = -Math.cos(normalizedAngle) * radius + radius * 0.1;

    meshRef.current.position.set(x, 0, z);
    meshRef.current.rotation.y = -normalizedAngle;

    const isBehind = Math.abs(normalizedAngle) > Math.PI * 0.7;
    meshRef.current.visible = !isBehind;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.0, 2.0]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={carouselVertexShader}
        fragmentShader={carouselFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 80;
  const fadeDistance = 0.4;

  const velocitiesRef = useRef<Float32Array>(
    new Float32Array(particleCount * 3),
  );
  const lifetimesRef = useRef<Float32Array>(new Float32Array(particleCount));

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const y = (i / particleCount - 0.5) * 1.2;
      positions[i * 3] = 0;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = (((i * 0.618) % 1.0) - 0.5) * 0.1;
    }

    return positions;
  }, [particleCount]);

  useEffect(() => {
    const velocities = velocitiesRef.current;
    const lifetimes = lifetimesRef.current;

    for (let i = 0; i < particleCount; i++) {
      const direction = i % 2 === 0 ? 1 : -1;
      velocities[i * 3] = direction * (((i * 0.382) % 1.0) * 0.012 + 0.004);
      velocities[i * 3 + 1] = (((i * 0.786) % 1.0) - 0.4) * 0.006;
      velocities[i * 3 + 2] = (((i * 0.214) % 1.0) - 0.5) * 0.003;

      lifetimes[i] = (i * 0.123) % 1.0;
    }
  }, [particleCount]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const opacities = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      opacities[i] = 1.0;
    }
    geo.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [positions]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#FF9FFC") },
        uFadeDistance: { value: fadeDistance },
      },
      vertexShader: `
        attribute float aOpacity;
        varying float vOpacity;
        varying float vDistance;

        void main() {
          vOpacity = aOpacity;
          vDistance = abs(position.x);

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 20.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uFadeDistance;
        varying float vOpacity;
        varying float vDistance;

        void main() {
          float fade = 1.0 - smoothstep(0.0, uFadeDistance, vDistance);

          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

          gl_FragColor = vec4(uColor, alpha * fade * vOpacity * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [fadeDistance]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positionAttr = particlesRef.current.geometry.attributes.position;
    const opacityAttr = particlesRef.current.geometry.attributes.aOpacity;
    const posArray = positionAttr.array as Float32Array;
    const opacityArray = opacityAttr.array as Float32Array;
    const velocities = velocitiesRef.current;
    const lifetimes = lifetimesRef.current;

    for (let i = 0; i < particleCount; i++) {
      const currentLifetime = lifetimes[i] + 0.012;
      const newLifetime = currentLifetime > 1 ? 0 : currentLifetime;
      lifetimes[i] = newLifetime;

      if (currentLifetime > 1) {
        posArray[i * 3] = 0;
        posArray[i * 3 + 1] =
          (((i + state.clock.elapsedTime * 10) % particleCount) /
            particleCount -
            0.5) *
          1.2;
        posArray[i * 3 + 2] =
          (((i * 0.618 + state.clock.elapsedTime) % 1.0) - 0.5) * 0.1;

        const direction = i % 2 === 0 ? 1 : -1;
        velocities[i * 3] =
          direction *
          ((((i + state.clock.elapsedTime) * 0.382) % 1.0) * 0.012 + 0.004);
        velocities[i * 3 + 1] =
          ((((i + state.clock.elapsedTime) * 0.786) % 1.0) - 0.4) * 0.006;
      }

      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] +=
        velocities[i * 3 + 1] +
        Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.0008;
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      const dist = Math.abs(posArray[i * 3]);
      opacityArray[i] = Math.max(0, 1.0 - dist / fadeDistance);
    }

    positionAttr.needsUpdate = true;
    opacityAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry} material={shaderMaterial} />
  );
}

function GlowBar() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group position={[0, 0, 2]}>
      <mesh>
        <planeGeometry args={[0.7, 2.0]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      <GlowParticles />
    </group>
  );
}

function ResizeHandler() {
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const { gl, camera } = useThree();

  useEffect(() => {
    glRef.current = gl;
    cameraRef.current = camera;
  }, [gl, camera]);

  useEffect(() => {
    const canvas = gl.domElement;
    const parent = canvas.parentElement;
    if (!parent) return;

    const updateSize = () => {
      const currentGl = glRef.current;
      const currentCamera = cameraRef.current;
      if (!currentGl || !currentCamera) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (width > 0 && height > 0) {
        currentGl.setSize(width, height);
        if (currentCamera instanceof THREE.PerspectiveCamera) {
          currentCamera.aspect = width / height;
          currentCamera.updateProjectionMatrix();
        }
      }
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(parent);

    const interval = setInterval(updateSize, 500);
    setTimeout(updateSize, 100);
    setTimeout(updateSize, 300);
    setTimeout(updateSize, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [gl]);

  return null;
}

function CarouselScene() {
  const textures = useTexture(CAROUSEL_IMAGES);
  const rotationRef = useRef(0);
  const radius = 4.5;

  useFrame((state) => {
    rotationRef.current = state.clock.elapsedTime * 0.15;
  });

  return (
    <group>
      {textures.map((texture, index) => (
        <CarouselItem
          key={index}
          texture={texture}
          index={index}
          totalItems={textures.length}
          rotationRef={rotationRef}
          radius={radius}
        />
      ))}
      <GlowBar />
    </group>
  );
}

function Scene() {
  return (
    <group scale={1}>
      <CarouselScene />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="#1a1a1a" />
    </mesh>
  );
}

const HOSPITAL_HERO_TAGS = [
  "四大数智支柱",
  "六大核心能力",
  "三大智能应用",
  "四大应用场景",
];

type Hero7Props = {
  badgeLabel?: string;
  /** 黑色胶囊文案；传 null 则隐藏 */
  badgePrefix?: string | null;
  title?: string;
  description?: string;
  tags?: string[];
  badgePrefixClassName?: string;
  badgeLabelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function Hero7({
  badgeLabel = "医院数智化转型解决方案",
  badgePrefix = "解决方案",
  title = "数智驱动医疗·智慧引领未来",
  description = "以AI赋能为核心引擎，构建以患者为中心的智慧医疗服务体系，推动医院高质量发展",
  tags = HOSPITAL_HERO_TAGS,
  badgePrefixClassName,
  badgeLabelClassName,
  titleClassName,
  descriptionClassName,
}: Hero7Props) {
  return (
    <section className="relative z-[1] w-full min-h-screen overflow-hidden bg-white dark:bg-transparent">
      {/* 首屏弥散光晕：浅色淡蓝紫 / 深色透出页面暗紫底色，与方案概述一致 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] select-none"
      >
        {/* light */}
        <div className="absolute -top-[10%] left-[0%] h-[55%] w-[55%] rounded-full bg-[#A8C8EC]/55 blur-[110px] dark:hidden" />
        <div className="absolute top-[15%] right-[-5%] h-[50%] w-[50%] rounded-full bg-[#B8B8F0]/50 blur-[120px] dark:hidden" />
        <div className="absolute bottom-[-15%] left-[10%] h-[60%] w-[60%] rounded-full bg-[#8EBCE8]/55 blur-[130px] dark:hidden" />
        <div className="absolute bottom-[-10%] right-[5%] h-[55%] w-[55%] rounded-full bg-[#C4C0F2]/50 blur-[120px] dark:hidden" />
        <div className="absolute top-[35%] left-[35%] h-[40%] w-[40%] rounded-full bg-[#B0D4F5]/40 blur-[100px] dark:hidden" />
        {/* dark：仅保留星点，底色交给页面暗紫氛围层，与方案概述衔接 */}
        <div className="absolute top-[12%] left-[18%] hidden h-1.5 w-1.5 rounded-full bg-white/50 blur-[1px] dark:block" />
        <div className="absolute top-[22%] right-[24%] hidden h-1 w-1 rounded-full bg-white/40 blur-[1px] dark:block" />
        <div className="absolute top-[30%] left-[42%] hidden h-1 w-1 rounded-full bg-white/35 blur-[0.5px] dark:block" />
        <div className="absolute top-[18%] right-[38%] hidden h-[3px] w-[3px] rounded-full bg-white/45 blur-[1px] dark:block" />
        <div className="absolute top-[40%] left-[12%] hidden h-1 w-1 rounded-full bg-white/30 blur-[1px] dark:block" />
        <div className="absolute top-[28%] right-[12%] hidden h-1.5 w-1.5 rounded-full bg-white/40 blur-[1px] dark:block" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-start px-4 pt-[120px] text-left sm:items-center sm:text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="flex w-fit items-center gap-2 rounded-full border border-neutral-300 p-1 sm:gap-3 dark:border-neutral-800"
        >
          {badgePrefix ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-black px-3 py-1 font-medium text-white dark:bg-white dark:text-black",
                badgePrefixClassName ?? "text-xs sm:text-sm",
              )}
            >
              {badgePrefix}
            </span>
          ) : null}
          <span
            className={cn(
              "mr-2 text-neutral-900 dark:text-neutral-100",
              badgeLabelClassName ?? "text-sm sm:text-base",
            )}
          >
            {badgeLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "mt-6 max-w-4xl font-medium leading-[1.1] tracking-tight text-neutral-900 dark:text-white",
            titleClassName ??
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400 sm:mt-6",
            descriptionClassName ??
              "max-w-xl text-sm sm:text-base md:text-lg",
          )}
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-start gap-2 sm:mt-8 sm:justify-center sm:gap-3"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-3 py-1.5 text-[12px] font-normal text-neutral-700 dark:bg-white/10 dark:text-neutral-200"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10 translate-y-[50px] sm:translate-y-[150px] xl:translate-y-[100px]">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          frameloop="always"
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ResizeHandler />
          <Suspense fallback={<LoadingFallback />}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Hero7;
