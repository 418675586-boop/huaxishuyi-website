"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const defaultStats = [
  {
    value: "87.6%",
    label: "双向转诊协同效率",
  },
  {
    value: "91.2%",
    label: "风险预警准确率",
  },
];

export type Stats3Stat = {
  value: string;
  label: string;
};

type Stats3Props = {
  embedded?: boolean;
  title?: string;
  description?: string;
  stats?: Stats3Stat[];
  imageSrc?: string;
};

export default function Stats3({
  embedded = false,
  title = "四维成效协同提升",
  description = "围绕医院管理、基层赋能、群众服务与数智支撑四个维度，全面提升医共体统筹运营、资源下沉、协同服务与智能化能力，推动区域医疗服务更加高效、便捷、连续。",
  stats = defaultStats,
  imageSrc = "/img/solutions/stats-banner.png",
}: Stats3Props) {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const squares = Array.from({ length: 30 }, (_, i) => i);

  useEffect(() => {
    const marquee1 = marquee1Ref.current;
    const marquee2 = marquee2Ref.current;

    if (!marquee1 || !marquee2) return;

    let animation: number;
    let scrollPos1 = 0;
    let scrollPos2 = -(marquee2.scrollHeight / 2);

    const animate = () => {
      scrollPos1 += 0.8;
      if (scrollPos1 >= marquee1.scrollHeight / 2) {
        scrollPos1 = 0;
      }
      marquee1.style.transform = `translateY(-${scrollPos1}px)`;

      scrollPos2 += 0.8;
      if (scrollPos2 >= 0) {
        scrollPos2 = -(marquee2.scrollHeight / 2);
      }
      marquee2.style.transform = `translateY(${scrollPos2}px)`;

      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="overflow-hidden rounded-2xl border bg-black sm:rounded-3xl dark:border-neutral-900"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 text-3xl font-medium leading-tight text-white sm:mb-8 sm:text-4xl md:text-4xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 text-[14px] leading-relaxed tracking-tight text-neutral-300 sm:mb-12"
          >
            {description}
          </motion.p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                  {stat.value}
                </span>
                <span className="whitespace-nowrap text-base text-neutral-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden bg-black sm:h-[500px] lg:h-auto">
          <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-b from-black via-black/60 via-30% to-transparent lg:bg-linear-to-r" />

          <div className="absolute inset-0" style={{ isolation: "isolate" }}>
            <div className="absolute inset-0 bg-white" />

            <div className="absolute inset-0">
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full scale-[1.15] object-cover"
              />
            </div>

            <div
              className="absolute inset-0 bg-black"
              style={{ mixBlendMode: "multiply" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: "rotate(45deg) scale(2.2)",
                  transformOrigin: "center center",
                }}
              >
                <div className="flex h-full items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  <div className="relative overflow-hidden">
                    <div
                      ref={marquee1Ref}
                      className="flex flex-col gap-3 sm:gap-4"
                    >
                      {[...squares, ...squares].map((_, index) => (
                        <div
                          key={`marquee1-${index}`}
                          className="h-16 w-16 shrink-0 rounded-md bg-white sm:h-20 sm:w-20 sm:rounded-lg md:h-24 md:w-24"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <div
                      ref={marquee2Ref}
                      className="flex flex-col gap-3 sm:gap-4"
                    >
                      {[...squares, ...squares].map((_, index) => (
                        <div
                          key={`marquee2-${index}`}
                          className="h-16 w-16 shrink-0 rounded-md bg-white sm:h-20 sm:w-20 sm:rounded-lg md:h-24 md:w-24"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (embedded) {
    return <div className="mx-auto w-full max-w-[1200px]">{card}</div>;
  }

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-[1200px]">{card}</div>
    </section>
  );
}
