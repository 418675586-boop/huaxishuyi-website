import Blog7 from "@/components/blocks/blog-7";
import { Hero1 } from "@/components/blocks/hero-1";
import Waitlist6 from "@/components/blocks/waitlist-6";
import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { ThemeSwitch } from "@/components/theme-switch";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";

export const metadata: Metadata = createMetadata({
  title: "新闻动态",
  description: "华西数医新闻动态。",
  path: "/news",
});

export default function NewsPage(): ReactNode {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />

      <main id="main-content" className="relative flex-1 dark:bg-neutral-950">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[55vh] dark:block"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_90%,rgba(122,31,110,0.21)_0%,transparent_55%),radial-gradient(ellipse_at_50%_85%,rgba(107,91,149,0.17)_0%,transparent_50%),radial-gradient(ellipse_at_82%_90%,rgba(43,79,212,0.23)_0%,transparent_55%)]" />
        </div>

        <div className="relative z-[1]">
          <Hero1 />
          <Suspense fallback={null}>
            <Blog7 />
          </Suspense>
          <Waitlist6
            title="开始建立合作吧"
            description="为你提供更加专业的产品服务和解决方案"
            darkTransparent
          />
        </div>
      </main>
    </>
  );
}
