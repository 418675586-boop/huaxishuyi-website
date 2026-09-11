"use client";

import { motion } from "motion/react";
import SpotlightCard from "@/components/SpotlightCard";
import { OutlineCtaButton } from "@/components/outline-cta";
import { SocialProof9 } from "@/components/blocks/social-proof-9";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "分子医学新突破",
    cta: "查看详情",
    img: "/img/news-molecular-medicine.png",
  },
  {
    title: "基因治疗新突破",
    cta: "查看详情",
    img: "/img/news-gene-therapy.png",
  },
  {
    title: "AI 分子医学智能体",
    cta: "查看详情",
    img: "/img/news-ai-medical-agent.jpg",
  },
];

export default function NotFound4() {
  return (
    <section
      id="news"
      className="relative z-[1] flex w-full flex-col items-stretch bg-white pt-[150px] pb-[100px] dark:bg-transparent"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 flex flex-col gap-8 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white">
              最新动态
            </h2>
            <p className="text-[16px] leading-tight text-neutral-600 dark:text-neutral-400">
              NEWS &amp; UPDATES
            </p>
          </div>

          <OutlineCtaButton className="self-start sm:self-auto">
            查看全部
          </OutlineCtaButton>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-5/4 cursor-pointer group bg-neutral-100 dark:bg-neutral-900"
            >
              <SpotlightCard
                className="h-full w-full"
                spotlightColor="rgba(255, 255, 255, 0.38)"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.055]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col gap-3">
                  <span className="text-xl sm:text-2xl font-semibold text-white leading-none uppercase tracking-tight">
                    {card.title}
                  </span>
                  <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/50 text-neutral-900 text-[10px] sm:text-xs font-medium uppercase tracking-wider w-fit cursor-pointer backdrop-blur-[2px] hover:bg-white/60 transition-colors duration-200">
                    {card.cta}
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <SocialProof9 embedded />
    </section>
  );
}
