"use client";

import { motion } from "motion/react";
import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import { OutlineCtaLink } from "@/components/outline-cta";
import { SocialProof9 } from "@/components/blocks/social-proof-9";
import { homepageNewsPosts } from "@/components/news/posts";
import { ParallaxNewsSection } from "@/components/news/parallax-news-section";
import { ArrowRight } from "lucide-react";

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

          <OutlineCtaLink href="/news" className="self-start sm:self-auto">
            查看全部
          </OutlineCtaLink>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 sm:gap-6">
          {homepageNewsPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              className="relative overflow-hidden rounded-xl bg-neutral-100 aspect-5/4 cursor-pointer group sm:rounded-2xl dark:bg-neutral-900"
            >
              <Link
                href={`/news?id=${post.id}#news-list`}
                className="absolute inset-0"
                aria-label={post.title}
              >
                <SpotlightCard
                  className="h-full w-full"
                  spotlightColor="rgba(255, 255, 255, 0.38)"
                >
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.055]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-6">
                    <span className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
                      {post.title}
                    </span>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/50 px-3.5 py-1.5 text-[10px] font-medium tracking-wider text-neutral-900 uppercase backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-white/60 sm:text-xs">
                      查看详情
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <ParallaxNewsSection />

      <SocialProof9 embedded />
    </section>
  );
}
