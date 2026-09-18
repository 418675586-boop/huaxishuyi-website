"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Brain,
  Search,
  MessageCircleQuestion,
  Stethoscope,
  FileCheck,
  UserCheck,
  CalendarCheck,
  Sparkles,
  BookOpen,
  Check,
  Plus,
} from "lucide-react";
import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 品牌主色
const BRAND_CYAN = "#00A896";

// Hero 数据卡片
const heroStats = [
  { value: "98", suffix: "%+", label: "科室匹配准确率" },
  { value: "60", suffix: "%↓", label: "误挂号率下降" },
  { value: "37", suffix: "%", label: "导诊挂号转化率" },
];

// 痛点数据
const pains = [
  {
    title: "关键词匹配局限",
    description: "传统导诊依赖关键词匹配，无法理解患者模糊症状描述",
    icon: Search,
  },
  {
    title: "挂错号率高",
    description: "缺乏医学知识图谱支撑，导致科室推荐错误频发",
    icon: Stethoscope,
  },
  {
    title: "导医台压力大",
    description: "高峰期导医人员应接不暇，患者等待时间长",
    icon: MessageCircleQuestion,
  },
  {
    title: "患者不懂术语",
    description: "患者难以准确描述病情，不理解专业科室分类",
    icon: Brain,
  },
  {
    title: "医生资源错配",
    description: "热门科室拥挤，专家号源浪费在非适配患者",
    icon: UserCheck,
  },
  {
    title: "专病分流不足",
    description: "缺乏专病门诊智能分流机制，专科就诊效率低",
    icon: FileCheck,
  },
];

// 8步流程
const steps = [
  { num: "01", title: "入口触发", desc: "患者通过公众号/小程序等入口进入导诊" },
  { num: "02", title: "症状理解", desc: "AI理解患者模糊描述的自然语言症状" },
  { num: "03", title: "关键追问", desc: "通过多轮对话精准定位关键症状信息" },
  { num: "04", title: "点选交互", desc: "引导患者选择关键症状选项确认" },
  { num: "05", title: "科室推荐", desc: "基于医学逻辑推理推荐最优科室" },
  { num: "06", title: "推荐解释", desc: "清晰呈现推荐理由，增强患者信任" },
  { num: "07", title: "医生推荐", desc: "结合患者偏好推荐合适医生" },
  { num: "08", title: "挂号衔接", desc: "一键跳转挂号，无缝衔接就诊流程" },
];

// 核心功能
const features = [
  {
    icon: Sparkles,
    title: "智能唤起",
    points: ["多入口自动识别触发", "零门槛即开即用", "无感化交互体验"],
    enhanced: false,
  },
  {
    icon: Brain,
    title: "症状理解",
    points: ["医疗大模型语义理解", "模糊症状精准解析", "上下文记忆保持"],
    enhanced: false,
  },
  {
    icon: MessageCircleQuestion,
    title: "关键追问",
    points: ["医学逻辑引导追问", "聚焦关键症状信息", "智能收敛判断"],
    enhanced: false,
  },
  {
    icon: Stethoscope,
    title: "科室推荐",
    points: ["医学知识图谱支撑", "98%+匹配准确率", "科室适应症映射"],
    enhanced: false,
  },
  {
    icon: FileCheck,
    title: "推荐解释",
    points: ["透明化推荐理由", "患者知情权保障", "信任度提升"],
    enhanced: false,
  },
  {
    icon: UserCheck,
    title: "医生推荐",
    points: ["医生擅长领域匹配", "患者偏好智能适配", "号源实时可查"],
    enhanced: false,
  },
  {
    icon: CalendarCheck,
    title: "挂号衔接",
    points: ["一键跳转挂号系统", "诊间信息自动传递", "就诊体验闭环"],
    enhanced: false,
  },
  {
    icon: BookOpen,
    title: "诊前报告生成",
    points: ["患者主诉结构化", "病史摘要自动生成", "医生接诊效率提升"],
    enhanced: true,
  },
  {
    icon: Sparkles,
    title: "个性化科普推送",
    points: ["疾病知识精准推送", "就医准备提示", "患者教育赋能"],
    enhanced: true,
  },
];

// 应用场景
const scenarios = [
  {
    title: "线上预约挂号前",
    description: "患者在线预约前通过AI导诊精准选择科室，减少盲目挂号",
  },
  {
    title: "医院公众号/小程序入口",
    description: "作为服务入口第一站，为患者提供智能问诊引导服务",
  },
  {
    title: "导医台减压",
    description: "分担导医台压力，常见问题AI先行解答，复杂问题人工介入",
  },
  {
    title: "专病门诊分流",
    description: "精准识别专病患者，引导至专病门诊，提升专科就诊效率",
  },
  {
    title: "患者助手联动",
    description: "与患者健康管家联动，提供全周期健康管理服务",
  },
  {
    title: "候诊区预问诊",
    description: "候诊期间完成症状采集，医生接诊即可获取预问诊报告",
  },
];

// 核心价值
const values = [
  {
    title: "减少挂错号",
    description: "基于医学知识图谱的智能推荐，科室匹配准确率达98%以上",
  },
  {
    title: "提升首诊效率",
    description: "精准科室分流，减少转诊次数，患者首次就诊即找对医生",
  },
  {
    title: "缓解导医台压力",
    description: "AI先行解答常见问题，释放导医人员专注复杂case",
  },
  {
    title: "优化资源配置",
    description: "智能分流引导，提升专家号源利用率，优化医疗资源配置",
  },
  {
    title: "提升患者满意度",
    description: "减少就医迷茫感，就诊体验流畅，患者满意度显著提升",
  },
  {
    title: "沉淀数据反哺运营",
    description: "采集患者就诊路径数据，为医院运营决策提供数据支撑",
  },
];

// 数据指标条
const stats = [
  { value: "98", suffix: "%+", label: "科室匹配准确率" },
  { value: "60", suffix: "%↓", label: "误挂号率下降" },
  { value: "30", suffix: "%↓", label: "导诊人员配置减少" },
  { value: "7.8", suffix: "%↓", label: "门诊平均等候缩短" },
];

// 对比表格
const comparisonRows = [
  { dimension: "交互方式", ai: "自然语言对话", traditional: "关键词检索" },
  { dimension: "症状理解", ai: "深度语义理解+追问", traditional: "固定模板匹配" },
  { dimension: "追问能力", ai: "多轮医学逻辑追问", traditional: "无追问机制" },
  { dimension: "科室推荐", ai: "医学知识图谱推理", traditional: "关键词命中" },
  { dimension: "推荐解释", ai: "透明化理由呈现", traditional: "无解释" },
  { dimension: "医生推荐", ai: "擅长领域+偏好匹配", traditional: "列表展示" },
  { dimension: "挂号衔接", ai: "一键跳转+信息传递", traditional: "手动跳转" },
  { dimension: "诊前报告", ai: "结构化预问诊报告", traditional: "无报告" },
  { dimension: "数据沉淀", ai: "就诊路径数据采集", traditional: "数据孤岛" },
];

// 动画变体
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// 横向滚动文字组件
function MarqueeText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        <span className="px-8 text-[120px] font-bold leading-none tracking-tight text-[#111111] dark:text-white sm:text-[160px] lg:text-[200px]">
          {text}
        </span>
        <span className="px-8 text-[120px] font-bold leading-none tracking-tight text-[#111111] dark:text-white sm:text-[160px] lg:text-[200px]">
          {text}
        </span>
      </motion.div>
    </div>
  );
}

// 章节导航
export default function AiTriagePage() {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />

      <main id="main-content" className="relative flex-1 bg-white dark:bg-[#03040a]">
        {/* Hero 首屏 - nextgennow 风格：左右分栏 */}
        <section id="intro" className="relative overflow-hidden px-6 pt-[100px] lg:pt-[120px]">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              {/* 左：超大标题 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide text-[#999999] dark:text-neutral-500">
                    01
                  </span>
                  <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                    智慧服务 · 诊前闭环
                  </span>
                </div>
                <h1 className="text-[60px] font-bold leading-[0.95] tracking-tight text-[#111111] dark:text-white sm:text-[80px] lg:text-[120px] xl:text-[140px]">
                  医疗大模型
                  <br />
                  驱动的
                  <br />
                  <span style={{ color: BRAND_CYAN }}>AI 导诊</span>
                </h1>
              </motion.div>

              {/* 右：描述 + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex max-w-[360px] flex-col gap-6 lg:pb-8"
              >
                <p className="text-lg leading-relaxed text-[#555555] dark:text-neutral-400">
                  让患者挂对科、找对人。<br />
                  AI 智能导诊 — 从关键词匹配到基于医学逻辑的精准引导。
                </p>
                <a
                  href="#demo"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-[#111111] dark:text-white"
                >
                  <span className="border-b border-[#111111] pb-1 dark:border-white">
                    预约产品演示
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.div>
            </div>

            {/* 横向滚动标题 */}
            <div className="mt-20 border-y border-[#111111]/10 py-8 dark:border-white/10">
              <MarqueeText text="AI 智能导诊 · 让患者挂对科 · 找对人" />
            </div>

            {/* 数据统计 - nextgennow 风格 */}
            <div className="mt-20 grid gap-12 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col gap-3 border-t border-[#111111]/20 pt-6 dark:border-white/20"
                >
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-[80px] font-bold leading-none tracking-tight lg:text-[100px]"
                      style={{ color: BRAND_CYAN }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-2xl font-semibold lg:text-3xl"
                      style={{ color: BRAND_CYAN }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-[#111111] dark:text-white">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 行业痛点 - 左右分栏 */}
        <section id="pains" className="px-6 py-32 lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              {/* 左：标题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide text-[#999999]">
                    02
                  </span>
                  <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                    行业痛点
                  </span>
                </div>
                <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                  该挂什么科？
                  <br />
                  患者就医的
                  <br />
                  <span style={{ color: BRAND_CYAN }}>第一道门槛</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                  传统导诊方式面临诸多挑战，患者常常在选择科室时感到迷茫
                </p>
              </motion.div>

              {/* 右：痛点列表 */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col divide-y divide-[#111111]/10 dark:divide-white/10"
              >
                {pains.map((pain, index) => {
                  const Icon = pain.icon;
                  return (
                    <motion.div
                      key={pain.title}
                      variants={fadeUp}
                      className="group flex items-start gap-6 py-6"
                    >
                      <span className="text-sm font-medium text-[#999999] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                        <Icon
                          className="h-5 w-5"
                          style={{ color: BRAND_CYAN }}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#111111] dark:text-white">
                          {pain.title}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                          {pain.description}
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[#999999] opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 操作流程 - 步骤式 */}
        <section id="flow" className="bg-[#F5F5F0] px-6 py-32 dark:bg-white/[0.02] lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-[700px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm font-medium tracking-wide text-[#999999]">
                  03
                </span>
                <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                  操作流程
                </span>
              </div>
              <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                就医第一步
                <br />
                <span style={{ color: BRAND_CYAN }}>选对科室</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                从模糊症状到精准挂号，8 步完成诊前智能引导
              </p>
            </motion.div>

            {/* 步骤 - nextgennow 案例卡片风格 */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group flex flex-col rounded-2xl bg-white p-6 transition-all hover:shadow-lg dark:bg-white/[0.02]"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#999999] tabular-nums">
                      /{step.num}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#999999] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111111] dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666] dark:text-neutral-400">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 核心功能 - nextgennow 案例卡片风格 */}
        <section id="features" className="px-6 py-32 lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-[800px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm font-medium tracking-wide text-[#999999]">
                  04
                </span>
                <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                  核心功能
                </span>
              </div>
              <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                七大核心能力
                <br />
                <span style={{ color: BRAND_CYAN }}>全流程精准引导</span>
              </h2>
            </motion.div>

            {/* 大型功能卡片网格 */}
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#111111]/10 dark:border-white/10 dark:bg-white/10 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="group relative flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#FAFAF5] dark:bg-[#03040a] dark:hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-8 w-8"
                        style={{ color: BRAND_CYAN }}
                        strokeWidth={1.5}
                      />
                      {feature.enhanced && (
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                          style={{ backgroundColor: `${BRAND_CYAN}10`, color: BRAND_CYAN }}
                        >
                          增强
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-[#111111] dark:text-white">
                      {feature.title}
                    </h3>
                    <ul className="flex flex-1 flex-col gap-2">
                      {feature.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-sm leading-relaxed text-[#555555] dark:text-neutral-400"
                        >
                          <Plus
                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                            style={{ color: BRAND_CYAN }}
                            strokeWidth={2}
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] dark:text-white"
                    >
                      <span className="border-b border-[#111111] pb-0.5 dark:border-white">
                        了解更多
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 应用场景 - 大图卡片 */}
        <section id="scenarios" className="bg-[#F5F5F0] px-6 py-32 dark:bg-white/[0.02] lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 grid gap-12 lg:grid-cols-[1fr_2fr]"
            >
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide text-[#999999]">
                    05
                  </span>
                  <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                    应用场景
                  </span>
                </div>
                <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                  六大场景
                  <br />
                  <span style={{ color: BRAND_CYAN }}>全方位</span>
                  <br />
                  覆盖患者旅程
                </h2>
              </div>
              <p className="self-end text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                从入院前到就诊后，AI 智能导诊全程陪伴患者就医旅程的每一个关键节点
              </p>
            </motion.div>

            {/* 大型案例卡片 */}
            <div className="grid gap-6 lg:grid-cols-2">
              {scenarios.slice(0, 4).map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group flex flex-col justify-between rounded-2xl bg-white p-8 transition-all hover:shadow-xl dark:bg-white/[0.02]"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#999999] tabular-nums">
                        / 0{index + 1}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[#111111] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#111111] dark:text-white">
                      {scenario.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                      {scenario.description}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] dark:text-white"
                  >
                    <span className="border-b border-[#111111] pb-0.5 dark:border-white">
                      查看详情
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* 后两个场景 */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {scenarios.slice(4).map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group flex items-center justify-between rounded-2xl bg-white p-6 dark:bg-white/[0.02]"
                >
                  <div>
                    <span className="text-xs font-medium text-[#999999] tabular-nums">
                      / 0{index + 5}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-[#111111] dark:text-white">
                      {scenario.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#555555] dark:text-neutral-400">
                      {scenario.description}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#111111] dark:text-white" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 核心价值 - 数字统计风格 */}
        <section id="values" className="px-6 py-32 lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-[800px]"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm font-medium tracking-wide text-[#999999]">
                  06
                </span>
                <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                  核心价值
                </span>
              </div>
              <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                六大价值
                <br />
                <span style={{ color: BRAND_CYAN }}>患者省心</span>
                <br />
                医院提效
              </h2>
            </motion.div>

            {/* 价值列表 */}
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#111111]/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-3 bg-white p-8 dark:bg-[#03040a]"
                >
                  <Check
                    className="h-5 w-5"
                    style={{ color: BRAND_CYAN }}
                    strokeWidth={2.5}
                  />
                  <h3 className="text-lg font-semibold text-[#111111] dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#555555] dark:text-neutral-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 数据指标条 - nextgennow 数字滚动风格 */}
            <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[#111111]/10 bg-[#111111]/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-3 bg-white p-8 text-center dark:bg-[#03040a]"
                >
                  <div className="text-2xl font-medium text-[#999999] tabular-nums">
                    0
                  </div>
                  <div
                    className="text-[64px] font-bold leading-none tracking-tight lg:text-[80px]"
                    style={{ color: BRAND_CYAN }}
                  >
                    {stat.value}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-medium text-[#111111] dark:text-white">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 对比优势 - 左右分栏 */}
        <section id="comparison" className="bg-[#F5F5F0] px-6 py-32 dark:bg-white/[0.02] lg:py-40">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 grid gap-12 lg:grid-cols-[1fr_2fr]"
            >
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-sm font-medium tracking-wide text-[#999999]">
                    07
                  </span>
                  <span className="text-sm font-medium tracking-wide text-[#666666] dark:text-neutral-400">
                    对比优势
                  </span>
                </div>
                <h2 className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[64px]">
                  传统 vs
                  <br />
                  <span style={{ color: BRAND_CYAN }}>AI 智能</span>
                </h2>
              </div>
              <p className="self-end text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                从关键词匹配到基于医学逻辑的精准引导，AI 智能导诊全面超越传统方案
              </p>
            </motion.div>

            {/* 对比列表 */}
            <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.02]">
              {comparisonRows.map((row, rowIndex) => (
                <motion.div
                  key={row.dimension}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: rowIndex * 0.03 }}
                  className={`grid grid-cols-[120px_1fr_1fr] items-center gap-6 px-6 py-5 lg:grid-cols-[200px_1fr_1fr] lg:px-8 ${
                    rowIndex < comparisonRows.length - 1
                      ? "border-b border-[#111111]/10 dark:border-white/10"
                      : ""
                  }`}
                >
                  <div className="text-xs font-medium uppercase tracking-wide text-[#999999] tabular-nums">
                    / {String(rowIndex + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-[#999999]">
                      AI 智能导诊
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-base font-medium text-[#111111] dark:text-white">
                      <Check
                        className="h-4 w-4"
                        style={{ color: BRAND_CYAN }}
                        strokeWidth={2.5}
                      />
                      {row.ai}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-[#999999]">
                      传统关键词导诊
                    </div>
                    <div className="mt-1 text-base text-[#999999]">
                      {row.traditional}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 底部 CTA - nextgennow 简洁风格 */}
        <section
          id="demo"
          className="bg-[#F5F5F0] px-6 py-32 dark:bg-white/[0.02] lg:py-40"
        >
          <div className="mx-auto max-w-[1400px]">
            {/* 左右分栏 */}
            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-[48px] font-bold leading-[1.05] tracking-tight text-[#111111] dark:text-white lg:text-[80px]"
              >
                让每一位患者<br />都能找到<br />
                <span style={{ color: BRAND_CYAN }}>最合适的科室</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col justify-end gap-8"
              >
                <p className="text-base leading-relaxed text-[#555555] dark:text-neutral-400">
                  AI 智能导诊 — 从关键词匹配到基于医学逻辑的精准引导
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-between gap-2 rounded-full border border-[#111111] px-6 py-3 text-sm font-medium transition-colors hover:bg-[#111111] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#111111]"
                  >
                    <span>预约产品演示</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                  <a
                    href="/#products"
                    className="group inline-flex items-center justify-between gap-2 rounded-full border border-[#111111]/20 px-6 py-3 text-sm font-medium text-[#111111] transition-colors hover:border-[#111111] dark:border-white/20 dark:text-white dark:hover:border-white"
                  >
                    <span>返回产品矩阵</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
    </main>
    </>
  );
}
