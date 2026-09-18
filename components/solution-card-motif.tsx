import type { ReactNode } from "react";

export type SolutionMotifKind = "modules" | "network" | "layers";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

function GlassPlate({
  x,
  y,
  w,
  h,
  rx = 16,
  rotate,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  rotate?: number;
}): ReactNode {
  const transform = rotate
    ? `rotate(${rotate} ${x + w / 2} ${y + h / 2})`
    : undefined;

  return (
    <g transform={transform}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <path
        d={`M${x + 10} ${y + 11}h${Math.max(w - 28, 18)}`}
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </g>
  );
}

function GlassRing({
  cx,
  cy,
  r,
}: {
  cx: number;
  cy: number;
  r: number;
}): ReactNode {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx={cx - r * 0.18}
        cy={cy - r * 0.22}
        r={r * 0.62}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
      />
    </g>
  );
}

function ModulesMotif(): ReactNode {
  return (
    <svg viewBox="0 0 220 240" className="h-full w-full" aria-hidden="true">
      <GlassPlate x={28} y={42} w={78} h={78} rx={18} />
      <GlassPlate x={118} y={28} w={72} h={72} rx={18} rotate={8} />
      <GlassPlate x={22} y={132} w={82} h={76} rx={18} rotate={-4} />
      <GlassPlate x={112} y={122} w={80} h={80} rx={18} />
      <path d="M106 78h16M67 120v16M104 164h18" {...stroke} />
    </svg>
  );
}

function NetworkMotif(): ReactNode {
  return (
    <svg viewBox="0 0 240 250" className="h-full w-full" aria-hidden="true">
      <path
        d="M120 126L58 62M120 126L186 70M120 126L52 178M120 126L184 186M120 126L120 48"
        {...stroke}
      />
      <GlassRing cx={120} cy={126} r={40} />
      <GlassRing cx={54} cy={56} r={20} />
      <GlassRing cx={190} cy={66} r={16} />
      <GlassRing cx={46} cy={182} r={22} />
      <GlassRing cx={188} cy={190} r={24} />
      <GlassRing cx={120} cy={42} r={14} />
    </svg>
  );
}

function LayersMotif(): ReactNode {
  return (
    <svg viewBox="0 0 220 250" className="h-full w-full" aria-hidden="true">
      <GlassPlate x={24} y={176} w={172} h={32} rx={16} />
      <GlassPlate x={38} y={132} w={144} h={32} rx={16} />
      <GlassPlate x={54} y={88} w={112} h={32} rx={16} />
      <GlassPlate x={70} y={44} w={80} h={32} rx={16} />
      <path d="M110 78V32M110 32l-8 9M110 32l8 9" {...stroke} />
    </svg>
  );
}

export function SolutionCardMotif({
  kind,
}: {
  kind: SolutionMotifKind;
}): ReactNode {
  switch (kind) {
    case "modules":
      return <ModulesMotif />;
    case "network":
      return <NetworkMotif />;
    case "layers":
      return <LayersMotif />;
  }
}
