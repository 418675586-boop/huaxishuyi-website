"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ParallaxCarousel from "@/components/react-bits/parallax-carousel";
import { newsPosts } from "@/components/news/posts";

const IMAGE_WIDTH = 384;
const IMAGE_HEIGHT = 288;
const CAPTION_HEIGHT = 108;
const STAGE_HEIGHT = IMAGE_HEIGHT + CAPTION_HEIGHT;

const newsImages = newsPosts.map((post) => post.image);

export function ParallaxNewsSection() {
  const router = useRouter();

  return (
    <section
      aria-label="最新动态轮播"
      className="flex w-full flex-col items-stretch py-[100px]"
    >
      <div className="mx-auto mb-8 w-full max-w-[1200px] px-4 sm:mb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white">
            最新动态
          </h2>
          <p className="text-[16px] leading-tight text-neutral-600 dark:text-neutral-400">
            汇集公司公告、行业活动与创新实践
          </p>
        </div>
      </div>

      <div
        className="mx-auto w-full max-w-[1200px] overflow-hidden px-8"
        style={{ height: STAGE_HEIGHT }}
      >
        <ParallaxCarousel
          images={newsImages}
          imageWidth={IMAGE_WIDTH}
          imageHeight={IMAGE_HEIGHT}
          gap={24}
          borderRadius={20}
          parallaxIntensity={0.4}
          uvScale={0.85}
          loop
          autoplaySpeed={42}
          pauseOnHover
          showProgress={false}
          captionHeight={CAPTION_HEIGHT}
          className="h-full w-full"
          renderCaption={(index) => {
            const post = newsPosts[index];
            if (!post) return null;
            return (
              <div className="flex flex-col items-start pt-3">
                <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-neutral-950 dark:text-white">
                  {post.title}
                </p>
                <Link
                  href={`/news?id=${post.id}#news-list`}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    if (
                      event.button !== 0 ||
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    ) {
                      return;
                    }
                    router.push(`/news?id=${post.id}#news-list`);
                  }}
                  onClick={(event) => event.stopPropagation()}
                  className="group pointer-events-auto relative z-10 mt-2 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full border-[0.5px] border-neutral-900/50 bg-white/80 px-3.5 py-1.5 text-[10px] font-normal tracking-wider text-neutral-900 uppercase backdrop-blur-[2px] transition-colors hover:bg-neutral-900/5 dark:border-transparent dark:bg-white/20 dark:text-white dark:hover:bg-white/10 sm:text-xs"
                >
                  查看详情
                  <ArrowRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
