"use client";

import "./social-proof-9.css";

const logits1 = [
  { name: "华为", url: "#", img: "/img/ecosystem-logos/huawei.png" },
  { name: "阿斯利康", url: "#", img: "/img/ecosystem-logos/astrazeneca.png" },
  { name: "百川大模型", url: "#", img: "/img/ecosystem-logos/baichuan-model.png" },
  { name: "百川智能", url: "#", img: "/img/ecosystem-logos/baichuan-ai.png" },
  { name: "国信医控", url: "#", img: "/img/ecosystem-logos/medical-control.png" },
  { name: "IQVIA", url: "#", img: "/img/ecosystem-logos/iqvia.png" },
];

const logits2 = [
  { name: "华为昇腾", url: "#", img: "/img/ecosystem-logos/ascend.png" },
  { name: "科大讯飞", url: "#", img: "/img/ecosystem-logos/iflytek.png" },
  { name: "迈迪科为", url: "#", img: "/img/ecosystem-logos/medical-way.png" },
  { name: "麒麟软件", url: "#", img: "/img/ecosystem-logos/kylinsoft.jpg" },
  { name: "医焕医疗", url: "#", img: "/img/ecosystem-logos/yihuan-medical.png" },
  { name: "圆心科技", url: "#", img: "/img/ecosystem-logos/yuanxin.png" },
];

const Marquee = ({
  items,
  direction = "left",
  durationSec = 48,
}: {
  items: typeof logits1;
  direction?: "left" | "right";
  durationSec?: number;
}) => {
  // Triple the sequence so wide screens still loop seamlessly after removals.
  const track = [...items, ...items, ...items];

  return (
    <div className="sp9-marquee">
      <div
        className={`sp9-marquee__track gap-10 pr-10 sm:gap-20 sm:pr-20 ${
          direction === "left"
            ? "sp9-marquee__track--left"
            : "sp9-marquee__track--right"
        }`}
        style={{ ["--sp9-duration" as string]: `${durationSec}s` }}
      >
        {track.map((logo, idx) => (
          <a
            key={`${logo.name}-${idx}`}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[34px] w-44 shrink-0 items-center justify-center opacity-90 transition-opacity duration-300 hover:opacity-100 dark:opacity-40 dark:hover:opacity-70"
          >
            <img
              src={logo.img}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain dark:mix-blend-screen dark:invert dark:grayscale"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export function SocialProof9({ embedded = false }: { embedded?: boolean } = {}) {
  const content = (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee items={logits1} direction="left" durationSec={48} />

      <div className="h-10" />

      <Marquee items={logits2} direction="right" durationSec={48} />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-white to-transparent dark:from-[#0c0816]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-white to-transparent dark:from-[#0c0816]" />
    </div>
  );

  if (embedded) {
    return (
      <div className="mt-16 w-full overflow-hidden text-neutral-900 dark:text-white sm:mt-20">
        {content}
      </div>
    );
  }

  return (
    <section className="overflow-hidden bg-white pt-0 pb-[150px] text-neutral-900 dark:bg-neutral-950 dark:text-white">
      {content}
    </section>
  );
}
