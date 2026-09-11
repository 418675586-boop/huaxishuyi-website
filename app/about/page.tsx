import About2 from "@/components/blocks/about-2";
import Contact2 from "@/components/blocks/contact-2";
import Contact9 from "@/components/blocks/contact-9";
import { Hero17 } from "@/components/blocks/hero-17";
import { Showcase6 } from "@/components/blocks/showcase-6";
import { BackToTop } from "@/components/back-to-top";
import { Header } from "@/components/header";
import { ThemeSwitch } from "@/components/theme-switch";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "关于我们",
  description: "了解成都华西数字医疗科技有限公司。",
  path: "/about",
});

const researchMoments = [
  {
    caption: "企业核心理念",
    detail:
      "秉持精业创新、合作共赢的价值理念，以包容向善的态度与责任担当，推动医疗服务持续进步。",
    label: "精业共赢",
    image: "/img/about/culture-excellence.png",
    tilt: -4,
    lift: "lg:mt-12",
  },
  {
    caption: "数字医疗愿景",
    detail:
      "以AI赋能与信创驱动医疗创新，致力于成为国内领先的数字医疗创新运营服务商。",
    label: "数智创新",
    image: "/img/about/culture-vision.png",
    tilt: 2.5,
    lift: "lg:mt-2",
  },
  {
    caption: "技术服务能力",
    detail:
      "汇聚自研团队、合作伙伴与高校人才优势，融合专业解决方案能力，支撑医疗产品研发与落地。",
    label: "专业赋能",
    image: "/img/about/culture-capability.png",
    tilt: -2,
    lift: "lg:mt-16",
  },
  {
    caption: "华西实践经验",
    detail:
      "依托华西第二医院及三甲医院实践积累，深度融合临床需求，助力高质量发展。",
    label: "华西积淀",
    image: "/img/about/culture-huaxi.png",
    tilt: 3.5,
    lift: "lg:mt-6",
  },
];

export default function AboutPage(): ReactNode {
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
          <Hero17 />
          <Contact9
            badge="公司简介"
            title="以AI全栈能力赋能医院数智转型"
            titleClassName="text-[40px]"
            descriptionClassName="text-[14px]"
            description={
              <>
                <p>
                  成都华西数字医疗科技有限公司（以下简称华西数医）由头部医疗机构四川大学华西第二医院、国资平台武侯发展集团等相关方发起，于2023年成立，总部位于成都，是一家专注于人工智能与医疗数智化转型的创新科技企业。
                </p>
                <p>
                  华西数医立足成都市建圈强链的总体产业规划，通过数智化和
                  AI
                  助力医院实现多模态融合，以 AI
                  技术提升医疗服务的效率与精准度，建设高质量数据集和可信数据空间，为医疗行业提供多维度、高效的解决方案，创新助力医疗机构实现「AI
                  医院」建设，推动我国医疗健康产业数智化转型升级。
                </p>
              </>
            }
            capabilities={[]}
            showCtas={false}
            footer={
              <div className="flex select-none items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2">
                  {[
                    {
                      src: "/img/about/logo-huaxi-second-hospital.png",
                      alt: "四川大学华西第二医院",
                    },
                    {
                      src: "/img/about/logo-huawei.png",
                      alt: "华为",
                    },
                    {
                      src: "/img/about/logo-sichuan-university.png",
                      alt: "四川大学",
                    },
                    {
                      src: "/img/about/logo-uestc.png",
                      alt: "电子科技大学",
                    },
                  ].map((logo) => (
                    <div
                      key={logo.alt}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_4px_10px_rgba(0,0,0,0.12)] sm:h-12 sm:w-12 dark:border-neutral-950 dark:shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-full w-full object-contain p-0.5"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-900 sm:text-lg dark:text-white">
                    合作机构
                  </span>
                  <span className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-400">
                    华西二院与武侯发展联合发起
                  </span>
                </div>
              </div>
            }
            views={[
              {
                label: "AI 全栈赋能",
                image: "/img/about/contact-ai-fullstack.png",
              },
              {
                label: "多模态融合",
                image: "/img/about/contact-multimodal.png",
              },
              {
                label: "可信数据空间",
                image: "/img/about/contact-data-space.png",
              },
              {
                label: "AI 医院建设",
                image: "/img/about/contact-ai-hospital.png",
              },
            ]}
          />

          <Showcase6
            title="文化与理念"
            description="精业共赢、数智创新，以华西积淀专业赋能，驱动医疗数智化转型。"
            cta={null}
            captionClassName="text-[20px] font-bold tracking-normal text-neutral-950 dark:text-white"
            headerLayout="stack"
            moments={researchMoments}
          />

          <About2 />

          <Contact2 />
        </div>
      </main>
    </>
  );
}
