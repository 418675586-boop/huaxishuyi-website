"use client";

import { EmbodiedRobotNotice } from "@/components/news/embodied-robot-notice";
import { ChengduAiMedicalNotice } from "@/components/news/chengdu-ai-medical-notice";
import { ArrowLeft, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const topics = ["全部", "新闻快讯", "市场调研"] as const;

type PostTag = "新闻快讯" | "市场调研";

type Post = {
  id: string;
  tag: PostTag;
  title: string;
  desc: string;
  date: string;
  image: string;
  imageAlt: string;
};

const posts: Post[] = [
  {
    id: "embodied-robot",
    tag: "市场调研",
    title:
      "成都华西数字医疗科技有限公司具身智能机器人采购价格市场调研公告",
    desc: "为了保障我公司研发，现就具身智能机器人参数及采购价格进行市场调研。我们诚邀具备相关资质和能力的供应商参与此次市场调研活动，按要求提供产品参数及报价。",
    date: "2026年03月02日",
    image: "/img/news/embodied-robot.jpg?v=2",
    imageAlt: "具身智能机器人",
  },
  {
    id: "chengdu-ai-medical",
    tag: "新闻快讯",
    title:
      "数智赋能破局·创新同频共生|华西数医亮相2026成都AI医疗创新交流大会",
    desc: "2026年2月6日，“破局·共生——2026成都AI医疗创新交流大会”在成都隆重启幕，华西数医作为AI医疗领域的创新践行者与临床赋能先行者受邀参展。",
    date: "2026年02月06日",
    image: "/img/news/chengdu-ai-medical-conference.jpg?v=2",
    imageAlt: "2026成都AI医疗创新交流大会现场",
  },
  {
    id: "tiyi-ronghe",
    tag: "新闻快讯",
    title: "当运动遇见医疗：华西妇幼体医融合平台，开启健康管理新篇章",
    desc: "10月31日，由四川省优生托育协会、西部妇幼医学研究发展中心联合主办，四川大学华西第二医院、四川省优生托育协会体医融合分会承办的“2025年体医融合与生殖健康——体医融合在生殖健康维护与疾病防治中的应用”主题活动顺利举行。",
    date: "2026年01月19日",
    image: "/img/news/tiyi-ronghe-conference.jpg?v=2",
    imageAlt: "2025年体医融合与生殖健康大会现场",
  },
  {
    id: "lmg-2025",
    tag: "新闻快讯",
    title:
      "第四届全国大模型智能生成大会顺利闭幕，华西数医携数字医生勾勒AI医疗新生态",
    desc: "第四届全国大模型智能生成大会（LMG 2025）在四川成都成功举办，华西数医携数字医生亮相，展示AI医疗创新成果。",
    date: "2026年01月19日",
    image: "/img/news/lmg-2025-conference.jpg?v=2",
    imageAlt: "第四届全国大模型智能生成大会 LMG 2025 现场",
  },
  {
    id: "xibu-jianbohui",
    tag: "新闻快讯",
    title:
      "华西数医亮相首届西部健博会：AI数智产品引热议，共孵医疗创新新生态",
    desc: "2025年10月10日至12日，以“健康四川·健联未来”为主题的首届西部（成都）健康促进博览会在中国西部国际博览城盛大举办。",
    date: "2026年01月19日",
    image: "/img/news/xibu-jianbohui.jpg?v=2",
    imageAlt: "华西数字医生 AI 数智应用体验区",
  },
  {
    id: "maic-digital-doctor",
    tag: "新闻快讯",
    title: "人机共智 数智共融 | 华西数医亮相MAIC大会 引领智算时代新生态",
    desc: "9月26日至28日，首届医学人工智能大会（MAIC）在山东省济南市召开，华西数医受邀参会并分享数智医疗实践。",
    date: "2026年01月19日",
    image: "/img/news/maic-digital-doctor.jpg?v=2",
    imageAlt: "华西妇幼数字医生问诊间展台",
  },
  {
    id: "huaxi-fuyou",
    tag: "新闻快讯",
    title:
      "AI赋能医疗革新 创新驱动数智底座 —— 华西数医亮相第四届华西妇幼国际会议",
    desc: "2025年7月18-19日，由四川省优生托育协会、海南博鳌医学创新研究院主办，四川大学华西第二医院承办的第四届华西妇幼国际会议在成都世纪城国际会议中心盛大启幕。",
    date: "2026年01月19日",
    image: "/img/news/huaxi-fuyou-conference.jpg?v=2",
    imageAlt: "第四届华西妇幼国际会议现场",
  },
];

const tagStyle: Record<PostTag, string> = {
  新闻快讯:
    "bg-neutral-100 text-neutral-700 dark:bg-white/10 dark:text-neutral-200",
  市场调研:
    "bg-neutral-200 text-neutral-800 dark:bg-white/15 dark:text-neutral-100",
};

export default function Blog7() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<(typeof topics)[number]>("全部");

  const selectedId = searchParams.get("id");
  const selectedPost = useMemo(
    () => (selectedId ? posts.find((p) => p.id === selectedId) : undefined),
    [selectedId],
  );

  const visible = useMemo(
    () => (active === "全部" ? posts : posts.filter((p) => p.tag === active)),
    [active],
  );

  useEffect(() => {
    if (!selectedPost) return;
    document.getElementById("news-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedPost?.id]);

  const openPost = (id: string) => {
    router.push(`/news?id=${id}#news-list`, { scroll: false });
  };

  const backToList = () => {
    router.push("/news#news-list", { scroll: false });
  };

  return (
    <section
      id="news-list"
      className="flex w-full min-h-[var(--rb-section-min-h,100vh)] scroll-mt-[90px] items-start bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 dark:bg-transparent"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <AnimatePresence mode="wait" initial={false}>
          {selectedPost ? (
            <motion.article
              key={`detail-${selectedPost.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex w-full max-w-[1200px] flex-col gap-6"
            >
              <button
                type="button"
                onClick={backToList}
                className="inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                返回列表
              </button>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl leading-snug font-semibold tracking-tight text-neutral-900 sm:text-[32px] dark:text-white">
                  {selectedPost.title}
                </h2>
              </div>

              {selectedPost.id === "embodied-robot" ? (
                <EmbodiedRobotNotice />
              ) : selectedPost.id === "chengdu-ai-medical" ? (
                <ChengduAiMedicalNotice />
              ) : (
                <>
                  <div className="mx-auto aspect-16/11 w-2/3 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-white/[0.06]">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
                    {selectedPost.desc}
                  </p>
                </>
              )}
            </motion.article>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-12"
            >
              <aside className="flex flex-col gap-3">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="text-sm font-semibold text-neutral-900 dark:text-white"
                >
                  推荐话题
                </motion.h3>
                <div className="flex flex-col items-start gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActive(t)}
                      className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                        active === t
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                          : "border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </aside>

              <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((post, i) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        layout: { type: "spring", stiffness: 260, damping: 30 },
                        opacity: { duration: 0.25, ease: "easeOut" },
                        y: { duration: 0.25, ease: "easeOut" },
                        delay: i * 0.03,
                      }}
                      whileHover={{ y: -4 }}
                      onClick={() => openPost(post.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openPost(post.id);
                        }
                      }}
                      role="link"
                      tabIndex={0}
                      className="group flex cursor-pointer flex-col gap-5"
                    >
                      <div className="aspect-16/11 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-white/[0.06]">
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
                            <Calendar
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {post.date}
                          </span>
                          <span
                            className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-medium ${tagStyle[post.tag]}`}
                          >
                            {post.tag}
                          </span>
                        </div>
                        <h3 className="line-clamp-2 text-xl leading-snug font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
                          {post.desc}
                        </p>
                        <span className="mt-1 inline-flex items-center text-sm font-medium text-neutral-800 transition-colors group-hover:text-neutral-950 dark:text-neutral-300 dark:group-hover:text-white">
                          查看更多 &gt;
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
