"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

const footerGroups = [
  {
    title: "产品方案",
    links: [
      { text: "AI医疗应用开发平台", href: "#" },
      { text: "AI患者应用平台", href: "#" },
      { text: "AI医生应用平台", href: "#" },
    ],
  },
  {
    title: "解决方案",
    links: [
      {
        text: "医院数智化转型解决方案",
        href: "/solutions/hospital-digital-transformation",
      },
      {
        text: "区域型医共体数智化解决方案",
        href: "/solutions/regional-medical-community",
      },
      {
        text: "智慧医院/系统集成解决方案",
        href: "/solutions/smart-hospital-integration",
      },
    ],
  },
  {
    title: "联系支持",
    links: [
      {
        text: "双华数字健康产业园A3栋8F",
        href: "#",
      },
      {
        text: "成都市武侯区三环路南段69号",
        href: "#",
      },
      { text: "028-60198639", href: "tel:02860198639" },
    ],
  },
] as const;

export function Footer5() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8 dark:bg-neutral-950">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">
        <div
          className="relative w-full overflow-hidden rounded-2xl p-8 sm:rounded-3xl sm:p-12 lg:p-16"
          style={{ backgroundColor: "#5227FF" }}
        >
          <div className="pointer-events-none absolute inset-0 flex flex-row items-end justify-center">
            {Array.from({ length: 9 }).map((_, i) => {
              const distFromCenter = Math.abs(i - 4);
              const height = Math.max(20, 90 - distFromCenter * 15);
              const opacity = Math.max(0.1, 1.0 - distFromCenter * 0.2);

              return (
                <div
                  key={i}
                  className="relative flex-1"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(to top, rgba(0,0,0,${opacity * 0.3}) 0%, rgba(0,0,0,0) 100%)`,
                  }}
                />
              );
            })}
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col space-y-6 sm:space-y-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/img/huaxi-footer-logo-dark.png"
                  alt="华西数医"
                  width={651}
                  height={166}
                  className="h-10 w-auto object-contain"
                />
              </div>

              <p className="max-w-sm text-base leading-relaxed font-medium text-white/90 sm:text-lg">
                华西数医以医疗大模型与智能体为核心，赋能医疗机构数智化转型。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 lg:gap-16">
              {footerGroups.map((group) => (
                <div key={group.title} className="flex flex-col space-y-4">
                  <h3 className="text-lg font-medium tracking-tight text-white/90">
                    {group.title}
                  </h3>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className="group/link inline-flex items-start gap-1 text-white/90 transition-colors hover:text-white"
                        >
                          <span>{link.text}</span>
                          {"external" in link && link.external ? (
                            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm font-medium text-neutral-500 sm:mt-12 sm:text-base dark:text-neutral-500">
          Copyright © 2026 成都华西数字医疗科技有限公司
        </div>
      </div>
    </section>
  );
}
