"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Box, Orbit, Workflow, Circle } from "lucide-react";

const vehicles = [
  {
    title: "建设必要性",
    desc: "统一连接牵头医院与基层成员单位，贯通医疗、公卫、医保等协同服务，形成基层检查、上级诊断、结果共享的服务格局。",
  },
  {
    title: "建设定位",
    desc: "打造集统一监管、资源共享、业务协同、便民服务和数智赋能于一体的医共体智慧平台。",
  },
  {
    title: "总体目标",
    desc: "以“五个统一”为核心，打通平台、标准、数据、协同与安全体系，全面提升医共体运行与服务能力。",
  },
  {
    title: "建设原则",
    desc: "坚持利旧建设、集约共享、业务协同、分步实施与安全可控，稳步推进医共体数智化建设。",
  },
];

const icons = [Box, Orbit, Workflow, Circle];

export default function Features6() {
  return (
    <section className="w-full min-h-[var(--rb-section-min-h,100vh)] flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1200px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl"
        >
          <h2 className="text-[36px] font-medium tracking-tight leading-[1.15] text-neutral-900 dark:text-white">
            方案概述
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            以数字化手段推动医共体真正形成责任、服务、管理和发展共同体
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.map((v, i) => (
            <Card key={i} vehicle={v} index={i} Icon={icons[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Vehicle = (typeof vehicles)[number];

function Card({
  vehicle,
  index,
  Icon,
}: {
  vehicle: Vehicle;
  index: number;
  Icon: (typeof icons)[number];
}) {
  const [hovered, setHovered] = useState(false);
  const words = vehicle.desc.split(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl p-6"
    >
      {/* 弥散网格背景 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src="/img/solutions/overview-card-mesh.png"
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            objectPosition:
              index % 2 === 0 ? "left center" : "right center",
          }}
        />
        <div className="absolute inset-0 bg-white/50 dark:bg-neutral-950/55" />
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <Icon className="relative z-[1] h-7 w-7 text-neutral-900 dark:text-neutral-200" />

      <p className="relative z-[1] mt-3 max-w-[220px] text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        {words.map((w, wi) => (
          <motion.span
            key={wi}
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 4,
              filter: hovered ? "blur(0px)" : "blur(3px)",
            }}
            transition={{
              duration: 0.3,
              delay: hovered ? wi * 0.03 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-[0.25em] inline-block"
          >
            {w}
          </motion.span>
        ))}
      </p>

      <div className="relative z-[1] mt-auto flex items-center pt-8">
        <span className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
          {vehicle.title}
        </span>
      </div>
    </motion.div>
  );
}
