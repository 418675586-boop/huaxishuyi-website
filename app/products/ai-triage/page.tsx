"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Header } from "@/components/header";
import { BackToTop } from "@/components/back-to-top";
import { ThemeSwitch } from "@/components/theme-switch";
import { OutlineCtaLink } from "@/components/outline-cta";
import { CountUp } from "@/components/blocks/stats-10";
import GradientBlinds from "@/components/GradientBlinds/GradientBlinds";
import { PainPointsSection } from "@/components/blocks/pain-points-section";
import { SectionLabel } from "@/components/blocks/section-label";

// ─── 数据定义 ───────────────────────────────────────────────────────────────

const stats = [
  { value: 98, format: (n: number) => `${Math.round(n)}`, suffix: "%+", label: "科室匹配准确率" },
  { value: 60, format: (n: number) => `${Math.round(n)}`, suffix: "%↓", label: "误挂号率下降" },
  { value: 30, format: (n: number) => `${Math.round(n)}`, suffix: "%↓", label: "导诊人力节省" },
  { value: 280, format: (n: number) => `${Math.round(n)}`, suffix: "+", label: "覆盖医院数量" },
];

const CTA_GRADIENT_COLORS = ["#6366f1", "#8b5cf6", "#a78bfa"];

const pains = [
  {
    title: "关键词匹配局限",
    items: [
      "传统导诊依赖关键词检索",
      "患者口语化描述\"肚子不舒服\"无法精确匹配科室",
      "导诊效果差",
    ],
  },
  {
    title: "挂错号率高",
    items: [
      "缺乏医学逻辑引导",
      "患者凭经验选科，挂错号后二次转诊",
      "浪费号源、延长就医周期",
    ],
  },
  {
    title: "导医台压力大",
    items: [
      "门诊高峰期导医台日均承接数百次重复咨询",
      "人工导诊难以同时兼顾效率与准确性",
    ],
  },
  {
    title: "患者不懂术语",
    items: [
      "老年患者和儿童家属对医学专业术语理解困难",
      "自然语言交互需求强烈",
    ],
  },
  {
    title: "医生资源错配",
    items: [
      "患者不了解医生专长",
      "热门科室一号难求，专病门诊门可罗雀",
      "资源分配不均",
    ],
  },
  {
    title: "专病分流不足",
    items: [
      "患者涌入大科室",
      "无法精准引导至专病门诊（如肝病、甲状腺）",
      "专病资源浪费",
    ],
  },
];

const steps = [
  {
    num: "01",
    tag: "多入口智能唤起",
    title: "入口触发",
    desc: "患者通过公众号/小程序/医院APP等多入口触发AI智能导诊。支持从魔法棒、对话意图、挂号入口、导医台等多场景智能唤起。",
    meta: "支持公众号 / 小程序 / APP / Web",
  },
  {
    num: "02",
    tag: "自然语言理解",
    title: "症状理解",
    desc: "当患者只知道\"孩子咳嗽\"，但说不清具体情况时，AI会主动接住这个模糊需求。基于医疗大模型，能理解患者口语化描述，不局限于关键词匹配。",
    meta: "医疗大模型 · 上下文记忆",
  },
  {
    num: "03",
    tag: "模拟医生思维",
    title: "关键追问",
    desc: "系统模拟医生导诊思路，用少量关键问题快速补齐信息：持续时间、是否咳痰、痰液颜色、是否发热。围绕核心症状追加必要问题。",
    meta: "平均 3-4 个关键问题",
  },
  {
    num: "04",
    tag: "低门槛交互",
    title: "点选交互",
    desc: "点选式交互降低了患者表达门槛，尤其适合老人、儿童家属和不熟悉医学术语的用户。无需打字，点选即可完成完整导诊。",
    meta: "点选 + 文字混合输入",
  },
  {
    num: "05",
    tag: "推荐+匹配度",
    title: "科室推荐",
    desc: "完成症状采集后，AI结合科室结构树、专病门诊、年龄/性别规则、症状特征进行匹配，生成科室推荐和匹配度（如80%、70%、65%），支持专病门诊精准分流。",
    meta: "准确率 98%+",
  },
  {
    num: "06",
    tag: "推荐可解释",
    title: "推荐解释",
    desc: "患者不仅看到\"推荐挂哪个科\"，还可以看到推荐依据，理解自己的症状为什么匹配这个门诊。展示匹配度和推荐原因，让患者理解推荐依据。",
    meta: "决策更安心 · 信任度更高",
  },
  {
    num: "07",
    tag: "医生一体化",
    title: "医生推荐",
    desc: "进一步结合医生擅长方向、门诊诊断数据、号源情况辅助选择医生。从\"找科室\"走到\"找医生\"，缩短就医决策路径，提升专家号源利用率。",
    meta: "擅长领域 + 患者偏好 + 号源",
  },
  {
    num: "08",
    tag: "诊前服务闭环",
    title: "挂号衔接",
    desc: "导诊结果可自然承接预约挂号，形成诊前服务闭环。减少挂错号和二次转诊，缓解人工导诊压力，让科室资源配置更高效。",
    meta: "诊间信息自动传递",
  },
];

const features = [
  {
    num: "01",
    name: "智能唤起",
    hint: "多入口场景化触发，识别对话意图，挂号流程前置接入",
    points: [
      { title: "多入口接入", desc: "公众号 / 小程序 / 医院 APP / Web 端全场景覆盖，支持从魔法棒图标、对话意图识别、挂号流程前置按钮触发。" },
      { title: "零门槛即开即用", desc: "无需下载或注册，识别患者在挂号前的犹豫瞬间，主动推送导诊入口。" },
      { title: "无感化交互", desc: "嵌入医院数字化就诊主流程，无需跳转第三方页面，体验自然流畅。" },
    ],
  },
  {
    num: "02",
    name: "症状理解",
    hint: "医疗大模型语义理解，模糊症状精准解析",
    points: [
      { title: "大模型深度理解", desc: "基于医疗领域微调的大语言模型，深度理解患者口语化描述，不局限于关键词匹配。" },
      { title: "模糊症状解析", desc: "处理\"肚子不舒服\"\"有点咳嗽\"等模糊表述，自动归一到标准医学术语。" },
      { title: "上下文记忆", desc: "支持多轮对话中的指代、补充、修正等表达形式，跟踪症状演化轨迹。" },
    ],
  },
  {
    num: "03",
    name: "关键追问",
    hint: "医学逻辑引导追问，聚焦关键症状信息",
    points: [
      { title: "医学逻辑引导", desc: "模拟医生问诊思路，围绕主诉动态生成追问策略，聚焦病程、伴随症状和排他性特征。" },
      { title: "精准收敛", desc: "通过最小必要问题数（通常3-4个）快速收敛症状空间，避免过度询问影响体验。" },
      { title: "点选交互", desc: "支持点选 + 文字混合输入，降低老年患者和儿童家属的表达门槛。" },
    ],
  },
  {
    num: "04",
    name: "科室推荐",
    hint: "知识图谱推理，98%+ 匹配准确率，量化匹配度",
    points: [
      { title: "三层知识图谱", desc: "症状-疾病-科室三层医学知识图谱，支持多标签推理和不确定性建模。" },
      { title: "置信度评分", desc: "对候选科室计算置信度评分，生成推荐排序，标注匹配度（80%、70%、65%）。" },
      { title: "专病精准分流", desc: "支持医院专科门诊、专病中心配置，精准引导患者到肝病、甲状腺等专病门诊。" },
    ],
  },
  {
    num: "05",
    name: "推荐解释",
    hint: "透明化推理，匹配度可视化，可解释、可追溯",
    points: [
      { title: "推荐依据展示", desc: "展示推荐原因标签，例如\"咳嗽 + 黄痰 → 呼吸内科\"。患者理解推荐依据，决策更安心。" },
      { title: "推荐原因解释", desc: "让患者理解为什么系统推荐这个科室，建立信任，减少疑虑和反复修改。" },
      { title: "可追溯决策链", desc: "完整记录推理过程，方便医院运营分析质控和问题追溯。" },
    ],
  },
  {
    num: "06",
    name: "医生推荐",
    hint: "擅长方向 + 门诊数据 + 号源实时推荐具体医生",
    points: [
      { title: "医生擅长方向匹配", desc: "结合医生擅长方向、历史诊断数据，为患者匹配最适合的医生。" },
      { title: "号源实时同步", desc: "结合实时号源情况，避免推荐无号医生，提升预约履约率。" },
      { title: "偏好智能推荐", desc: "支持患者按职称、科室、专病等维度筛选推荐医生。" },
    ],
  },
  {
    num: "07",
    name: "挂号衔接",
    hint: "一键跳转 + 诊间信息自动传递，形成诊前闭环",
    points: [
      { title: "一键预约", desc: "导诊结果一键跳转预约挂号，挂号的科室、医生信息自动传递，无需重复填写。" },
      { title: "信息传递", desc: "诊前报告自动同步至医生工作站，医生接诊时可直接查阅主诉信息。" },
      { title: "履约跟踪", desc: "跟踪患者预约履约情况，对退号、改诊进行智能提醒。" },
    ],
  },
  {
    num: "08",
    name: "诊前报告",
    hint: "结构化诊前报告自动生成，医生端同步查阅",
    points: [
      { title: "结构化报告", desc: "导诊过程中同步生成结构化诊前报告，包含主诉、现病史、既往史、体征摘要。" },
      { title: "医生端查阅", desc: "医生可提前查阅诊前报告，问诊时间平均缩短3-5分钟。" },
      { title: "病历自动补充", desc: "诊前报告内容可一键补充至电子病历，减少医生重复录入。" },
    ],
  },
  {
    num: "09",
    name: "个性化科普推送",
    hint: "疾病知识精准推送，患者教育赋能",
    points: [
      { title: "精准推送", desc: "基于导诊结果有针对性地推送健康医学科普内容，进行个性化健康教育。" },
      { title: "就医准备提示", desc: "推送检查前注意事项、用药提醒、复诊建议等实用信息。" },
      { title: "健康素养提升", desc: "提升患者依从性和自我健康管理能力，降低复诊率。" },
    ],
  },
];

const scenarios = [
  { num: "1 / 6", title: "线上预约挂号前", desc: "患者在线预约挂号前通过AI智能导诊精准选择科室。先导诊再挂号，告别盲目选择，一步到位精准就医。", img: "/img/products/ai-triage/01.png" },
  { num: "2 / 6", title: "医院公众号 / 小程序入口", desc: "作为医院数字化服务首页的智能入口，承接患者的高频问询。日均触达数千患者，成为线上就医的第一站。", img: "/img/products/ai-triage/02.png" },
  { num: "3 / 6", title: "导医台减压", desc: "将标准化、重复性的导诊问题交给AI处理，导诊台日均咨询量下降近半，人工聚焦复杂疑难场景。", img: "/img/products/ai-triage/03.png" },
  { num: "4 / 6", title: "专病门诊分流", desc: "将患者从大科室进一步引导到更精确的专病门诊，优化科室资源均衡分配，提升专病门诊利用率。", img: "/img/products/ai-triage/04.png" },
  { num: "5 / 6", title: "患者助手联动", desc: "患者在助手中提出\"我该挂什么科\"，系统直接调起导诊卡片，对话式交互自然衔接导诊流程。", img: "/img/products/ai-triage/05.png" },
  { num: "6 / 6", title: "候诊区预问诊", desc: "患者线下到达候诊区后扫码进行预问诊，提前描述病情信息，输出诊前报告同步医生端，提升门诊效率。", img: "/img/products/ai-triage/06.png" },
];

const comparisonGroups = [
  {
    title: "交互与理解",
    rows: [
      { dim: "01 交互方式", ai: "自然语言对话 + 点选式交互，模拟医生问诊思路", trad: "关键词搜索 + 科室列表展示，机械式匹配" },
      { dim: "02 症状理解", ai: "大模型深度理解口语化描述，自动匹配医学术语", trad: "依赖关键词精确匹配，口语化描述无法识别" },
      { dim: "03 追问能力", ai: "动态生成追问策略，补齐病程、伴随症状、排他特征", trad: "无追问能力，单次输入即返回结果" },
    ],
  },
  {
    title: "推荐与衔接",
    rows: [
      { dim: "04 科室推荐", ai: "医学知识图谱推理，98%+ 匹配准确率，量化匹配度", trad: "单一关键词匹配，无匹配度评分" },
      { dim: "05 推荐解释", ai: "透明化推理，匹配度可视化，可解释、可追溯", trad: "仅展示推荐科室名称，无解释说明" },
      { dim: "06 医生推荐", ai: "擅长方向 + 门诊数据 + 号源实时推荐具体医生", trad: "仅展示科室医生列表，无个性化推荐" },
    ],
  },
  {
    title: "闭环与数据",
    rows: [
      { dim: "07 挂号衔接", ai: "一键跳转 + 诊间信息自动传递，形成诊前闭环", trad: "需患者手动返回挂号页重新选择" },
      { dim: "08 诊前报告", ai: "结构化诊前报告自动生成，医生端同步查阅", trad: "无诊前报告生成能力" },
      { dim: "09 数据沉淀", ai: "就诊路径数据采集，反哺智慧运营决策", trad: "数据孤岛，无系统化采集" },
    ],
  },
];

const faqs = [
  { q: "AI 智能导诊如何与医院现有 HIS / 挂号系统对接？", a: "我们提供标准化 API 接口和 SDK，可与医院公众号、小程序、APP 快速集成；同时支持对接 HIS、预约挂号、电子病历等系统，平均对接周期为 2-4 周。" },
  { q: "导诊的医学知识图谱覆盖哪些科室和症状？", a: "系统默认覆盖 30+ 一级科室、200+ 二级科室、800+ 常见症状。同时支持基于医院科室结构进行定制化配置，可适配专科医院和专病门诊的特殊需求。" },
  { q: "AI 推荐会不会出错，导致医疗风险？", a: "AI 智能导诊仅作为挂号前的\"科室推荐辅助\"，不参与诊断。所有推荐都附带匹配度和推荐理由，最终就医决策权仍在医生和患者。同时系统会设置兜底逻辑，关键症状触发人工介入提醒。" },
  { q: "患者的数据安全和隐私如何保障？", a: "系统通过国家信息安全等级保护三级认证，患者主诉和问诊数据全程加密存储和传输。医院拥有数据所有权，我们仅提供技术服务和算法支持，严格遵守《个人信息保护法》和医疗数据相关法规。" },
  { q: "部署一套 AI 智能导诊大概需要多少时间？", a: "标准化 SaaS 部署最快 2 周可上线；私有化部署通常 4-8 周，包括医院知识图谱定制、医生数据对接、UI 适配、压力测试等环节。后续我们会持续迭代医学知识库和算法。" },
];

// ─── 组件 ───────────────────────────────────────────────────────────────────

// HOW IT WORKS - Sticky Stack Section
function HowItWorksSection() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const stack = stackRef.current;
    if (!stack) return;

    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;
      const top = stack.getBoundingClientRect().top;
      const n = 8;

      for (let k = 0; k < n; k++) {
        const inner = stack.querySelector(`[data-card="${k}"] .card-inner`) as HTMLElement | null;
        if (!inner) continue;

        const p = Math.max(0, Math.min(1, (-top - k * vh) / vh));

        if (k < n - 1) {
          inner.style.transform = `translateY(${-p * 4}%) scale(${1 - p * 0.05})`;
        } else {
          inner.style.transform = `translateY(${(1 - p) * 4}%)`;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative z-[1] bg-[#fafafa] dark:bg-[#03040a]">
      {/* Hero intro */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-[100px] pb-[60px] sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-[#577FFF]/40 bg-[#577FFF]/10 px-3 py-1 text-xs tracking-wide text-[#3b6ef0] dark:text-[#52A5FF]">
          HOW IT WORKS
        </span>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
          就医第一步<br />选对科室
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-500">
          从模糊症状到精准挂号，8步完成诊前智能引导全流程。系统模拟医生问诊思路：先理解症状，再做关键追问，最后推荐科室与医生。
        </p>
      </div>

      {/* Stack Container */}
      <style>{`
        #how .card {
          background: #fafafa;
          border: 1px solid rgba(229, 229, 229, 0.8);
        }
        :where(.dark) #how .card {
          background: #03040a;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        #how .rail .text-stroke-themed {
          -webkit-text-stroke: 1.5px #0a0a0a !important;
        }
        :where(.dark) #how .rail .text-stroke-themed {
          -webkit-text-stroke: 1.5px #fafafa !important;
        }
      `}</style>
      <div
        ref={stackRef}
        id="how"
        className="relative"
        style={{ height: 'calc(100svh * 8)' }}
      >
        {steps.map((step, index) => (
          <div
            key={step.num}
            data-card={index}
            className="card"
            style={{
              position: 'sticky',
              top: 0,
              height: '100svh',
              display: 'flex',
              alignItems: 'center',
              padding: '0 0',
              overflow: 'hidden',
              zIndex: index + 1,
            }}
          >
            <div
              className="card-inner mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(24px, 3vw, 64px)',
              }}
            >
              {/* Rail - Left */}
              <div
                className="rail"
                style={{
                  flex: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <span
                  className="text-stroke-themed"
                  style={{
                    fontSize: 'clamp(96px, 12vw, 190px)',
                    lineHeight: 0.85,
                    color: 'transparent',
                  }}
                >
                  {step.num}
                </span>
                <span
                  className="font-medium text-neutral-500 dark:text-neutral-500"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 22px)',
                    letterSpacing: '0.24em',
                    marginTop: 8,
                  }}
                >
                  / 08
                </span>
              </div>

              {/* Body - Right */}
              <div
                className="body"
                style={{
                  flex: 'none',
                  width: 'clamp(420px, 44vw, 680px)',
                  marginLeft: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <span className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-[#3b6ef0] dark:text-[#52A5FF]">
                  {step.tag}
                </span>
                <h3 className="mb-5 text-2xl font-semibold leading-tight text-neutral-950 dark:text-white sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mb-6 text-sm leading-[1.95] text-neutral-600 dark:text-neutral-500 sm:text-base">
                  {step.desc}
                </p>
                <figure
                  className="item-media mb-5 w-full overflow-hidden rounded-[20px] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:bg-[#0a0a0a] dark:shadow-none"
                  style={{
                    aspectRatio: '16/9',
                  }}
                >
                  <img
                    src={`/img/products/ai-triage/${encodeURIComponent(step.num + '_' + step.tag)}.png`}
                    alt={step.title}
                    className="h-full w-full object-cover dark:brightness-90"
                  />
                </figure>
                <ul className="m-0 flex flex-wrap gap-2 p-0" style={{ listStyle: 'none' }}>
                  {step.meta.split(' / ').map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mx-auto w-full max-w-[1200px] border-t border-neutral-200 px-4 py-16 sm:px-6 lg:px-8 dark:border-neutral-900">
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 flex max-w-3xl flex-col gap-3 sm:mb-12">
          <SectionLabel>核心能力</SectionLabel>
          <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
            九大核心能力<br />全流程精准引导
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
            从智能唤起到挂号衔接，构建完整的诊前智能服务闭环。系统的核心能力可以拆解为九个相对独立、又彼此衔接的模块。点击任一能力查看详情。
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/10">
          {features.map((feat, i) => (
            <div key={feat.num} className={`border-b border-neutral-200 last:border-b-0 dark:border-white/10 ${i === 0 ? "" : "border-t-0"}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-white/5 sm:px-8"
              >
                <span className="w-12 shrink-0 font-['Barlow_Condensed'] text-[28px] font-medium text-neutral-300 dark:text-white/20 sm:w-16 sm:text-[32px]">
                  {feat.num}
                </span>
                <span className="flex-1 font-['Barlow_Condensed'] text-[22px] font-medium text-neutral-950 dark:text-white sm:text-[26px]">
                  {feat.name}
                </span>
                <span className="hidden flex-1 text-[13px] text-neutral-500 sm:block">{feat.hint}</span>
                <AnimatePresence mode="wait">
                  {open === i ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 45 }} exit={{ rotate: 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="h-5 w-5 shrink-0 text-neutral-400" />
                    </motion.div>
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-neutral-400" />
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-5 border-t border-neutral-200 bg-neutral-50 px-6 py-6 sm:grid-cols-3 sm:px-8 dark:border-white/10 dark:bg-white/5">
                      {feat.points.map((pt) => (
                        <div key={pt.title} className="border-t border-neutral-200 pt-4 dark:border-white/10">
                          <h4 className="mb-2 text-[14px] font-semibold text-neutral-950 dark:text-white">{pt.title}</h4>
                          <p className="text-[13px] leading-relaxed text-neutral-500 dark:text-neutral-400">{pt.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenariosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0~1 展开进度
  const lockedRef = useRef(false);

  // 滚动驱动：根据画布在视口中的位置计算 progress
  // 当画布顶部到达视口 50% 时 progress=0，画布底部到达视口 50% 时 progress=1
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const triggerLine = vh * 0.5;
      // 锁定范围：画布跨越视口中线
      if (sectionTop <= triggerLine && sectionBottom >= triggerLine) {
        lockedRef.current = true;
        const total = el.offsetHeight - vh;
        const consumed = triggerLine - sectionTop;
        const p = Math.min(1, Math.max(0, consumed / Math.max(1, total)));
        setProgress(p);
      } else if (sectionTop > triggerLine) {
        lockedRef.current = false;
        setProgress(0);
      } else {
        lockedRef.current = false;
        setProgress(1);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 锁定期间：拦截 wheel，自己滚动到下一个展开点
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerLine = vh * 0.5;
      const total = el.offsetHeight - vh;
      // 当前画布已滚动的"内部距离"
      const current = triggerLine - rect.top;
      const next = Math.min(total, Math.max(0, current + e.deltaY));
      const targetY = window.scrollY + (next - current);
      window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // 用 state 触发 re-render，用 ref 存储偏移量避免闭包问题
  const [panKey, setPanKey] = useState(0);
  const panOffsetRef = useRef(0);
  useEffect(() => {
    if (progress < 0.95) { panOffsetRef.current = 0; return; }
    const speed = 0.04; // px per ms
    // 周期 = 第二组整体偏移（一个完整循环走一张卡片 + 间距）
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const scale = Math.min(1, (vw - 48 * 2) / (6 * 280 + 5 * 14));
    const cycle = (6 * 280 + 5 * 14 + 14) * scale;
    let raf: number;
    let last = 0;
    const step = (ts: number) => {
      if (last) {
        const dt = ts - last;
        panOffsetRef.current = (panOffsetRef.current + speed * dt) % cycle;
        setPanKey((k) => k + 1);
      }
      last = ts;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  // 锁定画布高度 = 展开滚动所需的高度 + 停留 + 自动轮播停留
  const lockHeight = "400vh";

  // 响应式：卡片宽度 = (视口宽度 - 边距) / 6 - 间距，确保全部可见
  const CARD_W = 280;
  const CARD_H = 380;
  const GAP = 14;
  const PADDING = 48;
  // 动态计算位置：第二组向右偏移，第一组末尾卡片右边缘 + GAP 作为第二组起始
  const getLayout = (offset: number) => {
    if (typeof window === "undefined") return [];
    const vw = window.innerWidth;
    const available = vw - PADDING * 2;
    const totalWidth = 6 * CARD_W + 5 * GAP;
    const scale = Math.min(1, available / totalWidth);
    const finalX = scenarios.map((_, i) => (i * (CARD_W + GAP) - (totalWidth - CARD_W) / 2) * scale);
    const isScrolling = progress >= 0.95;
    const panOffset = isScrolling ? offset : 0;
    const t = progress;
    // 第二组整体偏移：第一组最后一张右边缘 + GAP = 第二组第一张左边缘
    const copyShift = (totalWidth + GAP) * scale;
    const result: { x: number; scale: number; z: number; key: string; opacity: number }[] = [];
    for (let i = 0; i < scenarios.length; i++) {
      const x0 = (finalX[i]! - panOffset) * t;
      const scale0 = (0.55 + 0.45 * t) * scale;
      result.push({ x: x0, scale: scale0, z: i, key: `0-${i}`, opacity: 1 });
    }
    for (let i = 0; i < scenarios.length; i++) {
      const x1 = (finalX[i]! + copyShift - panOffset) * t;
      const scale1 = (0.55 + 0.45 * t) * scale;
      result.push({ x: x1, scale: scale1, z: i, key: `1-${i}`, opacity: isScrolling ? 1 : 0 });
    }
    return result;
  };
  const [layout, setLayout] = useState<{ x: number; scale: number; z: number; key: string; opacity: number }[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      x: 0, scale: 0.55, z: i, key: `0-${i}`, opacity: 1,
    }))
  );

  // panKey 变化触发 re-render，从而用最新的 panOffsetRef.current 重算 layout
  useEffect(() => {
    const update = () => setLayout(getLayout(panOffsetRef.current));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [progress, panKey]);

  return (
    <section ref={sectionRef} className="relative z-[1] bg-[#F8F8F8] dark:bg-transparent">
      {/* 锁定画布：通过容器高度制造可滚动距离 */}
      <div className="relative" style={{ height: lockHeight }}>
        <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-6 flex max-w-3xl flex-col gap-3 sm:mb-8">
              <SectionLabel>应用场景</SectionLabel>
              <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
                六大场景<br />全方位覆盖
              </h2>
              <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
                从线上预约到线下候诊，AI智能导诊覆盖患者就医旅程的关键节点。
              </p>
            </div>

            <div
              className="relative mx-auto"
              style={{ height: CARD_H, width: "100%" }}
            >
              {layout.map((L) => {
                const parts = String(L.key).split("-");
                const k = parseInt(parts[1]!, 10);
                const s = scenarios[k];
                if (!s) return null;
                return (
                  <div
                    key={L.key}
                    className="absolute left-1/2 top-1/2 overflow-hidden rounded-[18px] shadow-[0_18px_40px_rgba(15,23,42,0.18)] ring-1 ring-white/10 dark:shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
                    style={{
                      width: CARD_W,
                      height: CARD_H,
                      transform: `translate(-50%, -50%) translate3d(${L.x}px, 0, 0) scale(${L.scale})`,
                      transformOrigin: "center",
                      zIndex: L.z,
                      opacity: L.opacity,
                      transition: "transform 80ms linear, opacity 200ms linear",
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover dark:brightness-90"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueSection() {
  const rows = [
    { label: "\"我不知道该挂什么科\"", ai: "98%+", trad: "62%", dim: "68%" },
    { label: "\"我挂错号了\"", ai: "60%↓", trad: "35%", dim: "40%" },
    { label: "\"导医台排长队\"", ai: "30%↓", trad: "100%", dim: "500+" },
    { label: "\"门诊等候时间长\"", ai: "7.8%↓", trad: "57%", dim: "30min" },
  ];

  return (
    <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 flex max-w-3xl flex-col gap-3 sm:mb-12">
          <SectionLabel>核心价值</SectionLabel>
          <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
            Stated vs. Simulated.
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
            下面是AI智能导诊上线前后，某三甲医院门诊数据的真实对比：患者主观感受、传统导诊方案表现，与AI智能导诊实测结果。
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:shadow-none dark:backdrop-blur-xl">
          {/* Header */}
          <div className="grid border-b border-neutral-200 bg-neutral-950 dark:border-white/10 sm:grid-cols-4">
            <div className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white/60 sm:col-span-1 sm:px-8">患者主观感受</div>
            <div className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white/60 sm:col-span-1 sm:px-8">传统关键词导诊</div>
            <div className="col-span-2 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white sm:col-span-2 sm:px-8">AI 智能导诊</div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`grid border-b border-neutral-200 bg-white transition-colors hover:bg-neutral-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:grid-cols-4 ${i === rows.length - 1 ? "border-b-0" : ""}`}
            >
              <div className="px-6 py-5 text-[13px] text-neutral-500 sm:col-span-1 sm:px-8">{row.label}</div>
              <div className="px-6 py-5 text-[13px] text-neutral-500 sm:col-span-1 sm:px-8">{row.trad}</div>
              <div className="col-span-2 flex items-center gap-6 px-6 py-5 sm:col-span-2 sm:px-8">
                <span className="font-['Barlow_Condensed'] text-[40px] font-medium leading-none tracking-[-0.04em] text-[#6366f1]">{row.ai}</span>
                <span className="text-[12px] text-neutral-400">{row.dim}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const [open, setOpen] = useState<number | null>(null);
  const allRows = comparisonGroups.flatMap((g) => g.rows);

  return (
    <section className="relative z-[1] bg-[#F8F8F8] px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 flex max-w-3xl flex-col gap-3 sm:mb-12">
          <SectionLabel>对比优势</SectionLabel>
          <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
            传统 vs. AI 智能.
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
            从\"关键词匹配\"到\"基于医学逻辑的精准引导\"。以下是AI智能导诊在9个关键维度上对传统方案的代际升级。
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-[0_10px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:shadow-none dark:backdrop-blur-xl">
          {/* Header */}
          <div className="hidden grid-cols-[1fr_2fr_2fr] border-b border-neutral-200 bg-neutral-950 dark:border-white/10 sm:grid sm:grid-cols-[1fr_2fr_2fr]">
            <div className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white/60 sm:px-8">能力维度</div>
            <div className="border-x border-white/10 bg-black/40 px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white sm:px-8">AI 智能导诊</div>
            <div className="px-6 py-4 text-[12px] font-semibold uppercase tracking-wider text-white/60 sm:px-8">传统关键词导诊</div>
          </div>

          {allRows.map((row, i) => (
            <div key={i} className={`border-b border-neutral-200 last:border-b-0 dark:border-white/10 ${open === i ? "bg-neutral-50 dark:bg-white/5" : ""}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-white/5 sm:px-8"
              >
                <span className="w-20 shrink-0 text-[12px] font-medium uppercase tracking-wider text-neutral-500">{row.dim}</span>
                <span className="hidden flex-1 text-[13px] text-[#6366f1] sm:block">{row.ai}</span>
                <span className="hidden flex-1 text-[13px] text-neutral-400 sm:block">{row.trad}</span>
                <AnimatePresence mode="wait">
                  {open === i ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 45 }} exit={{ rotate: 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="h-4 w-4 shrink-0 text-neutral-400" />
                    </motion.div>
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-neutral-400" />
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 border-t border-neutral-200 bg-white px-6 py-5 sm:grid-cols-2 sm:px-8 dark:border-white/10 dark:bg-white/5">
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-[#6366f1]">
                          <Check className="h-3.5 w-3.5" /> AI 智能导诊
                        </h4>
                        <p className="text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">{row.ai}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-neutral-400">
                          <Minus className="h-3.5 w-3.5" /> 传统关键词导诊
                        </h4>
                        <p className="text-[13px] leading-relaxed text-neutral-400">{row.trad}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative z-[1] bg-white px-4 py-[100px] dark:bg-transparent sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="mb-10 flex max-w-3xl flex-col gap-3 sm:mb-12">
          <SectionLabel>常见问题</SectionLabel>
          <h2 className="text-[36px] font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-[40px]">
            Common Questions.
          </h2>
          <p className="text-[16px] text-neutral-600 dark:text-neutral-400">
            关于AI智能导诊在落地过程中常见的问题。如果没有找到你的答案，欢迎直接联系我们。
          </p>
        </div>

        <div className="flex flex-col gap-0 overflow-hidden rounded-3xl border border-neutral-200 shadow-[0_10px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:shadow-none dark:backdrop-blur-xl">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-b border-neutral-200 last:border-b-0 dark:border-white/10 ${open === i ? "bg-neutral-50 dark:bg-white/5" : ""}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-white/5 sm:px-8"
              >
                <span className="w-10 shrink-0 pt-0.5 font-['Barlow_Condensed'] text-[14px] font-medium text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[16px] font-medium text-neutral-950 dark:text-white sm:text-[18px]">{faq.q}</span>
                <AnimatePresence mode="wait">
                  {open === i ? (
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: 45 }} exit={{ rotate: 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="h-5 w-5 shrink-0 pt-1 text-neutral-400" />
                    </motion.div>
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 pt-1 text-neutral-400" />
                  )}
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20 text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:px-8">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 主页面 ─────────────────────────────────────────────────────────────────

export default function AiTriagePage() {
  return (
    <>
      <Header />
      <ThemeSwitch />
      <BackToTop />

      <main id="main-content" className="relative flex-1 dark:bg-neutral-950">
        {/* Ambient dark glow */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 z-0 hidden h-[55vh] dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_90%,rgba(99,102,241,0.21)_0%,transparent_55%),radial-gradient(ellipse_at_50%_85%,rgba(139,92,246,0.17)_0%,transparent_50%),radial-gradient(ellipse_at_82%_90%,rgba(79,70,229,0.23)_0%,transparent_55%)]" />
          <div className="absolute -left-[10%] bottom-[-10%] h-[280px] w-[380px] rounded-full bg-[#6366f1]/18 blur-[110px]" />
          <div className="absolute left-[35%] bottom-[-15%] h-[240px] w-[420px] rounded-full bg-[#8b5cf6]/15 blur-[120px]" />
          <div className="absolute -right-[8%] bottom-[-8%] h-[300px] w-[400px] rounded-full bg-[#4f46e5]/19 blur-[110px]" />
        </div>

        {/* ── Hero ── */}
        <section className="relative z-[1] flex min-h-screen items-center overflow-hidden bg-[#F4F5F7]/50 pt-[120px] pb-[90px] dark:bg-transparent">
          {/* 深色模式视频背景 */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            aria-hidden="true"
          >
            <source src="/img/products/ai-triage/hero-bg.mov" type="video/mp4" />
          </video>
          {/* 深色模式视频遮罩 */}
          <div className="hero-video-overlay" aria-hidden="true" />

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#c4d9ff]/40 blur-[100px] dark:bg-[#577FFF]/20" />
            <div className="absolute right-[-5%] top-[20%] h-[480px] w-[480px] rounded-full bg-[#a5c4ff]/45 blur-[110px] dark:bg-[#52A5FF]/15" />
            <div className="absolute bottom-[-10%] left-[35%] h-[360px] w-[360px] rounded-full bg-[#d6e4ff]/35 blur-[90px] dark:bg-[#3B82F6]/10" />
          </div>

          <div className="relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex w-fit items-center gap-2 rounded-full border border-neutral-300 bg-white/60 p-1 backdrop-blur-sm sm:gap-3 dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#577FFF] to-[#52A5FF] px-3 py-1 text-[10px] font-medium text-white">
                大模型
              </span>
              <span className="mr-2 text-xs text-neutral-900 dark:text-neutral-100">
                医疗大模型驱动 · 智慧服务诊前闭环
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl"
            >
              AI 智能导诊
              <br />
              让患者挂对科、找对人
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base"
            >
              基于医疗大模型的诊前智能引导服务，帮助患者挂对科、找对人、减少转诊。覆盖30+一级科室、200+二级科室、800+常见症状，上线12个月服务280+家医院。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-1"
            >
              <a
                href="#demo"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-[#577FFF] to-[#52A5FF] px-4 text-sm text-white shadow-[0_4px_20px_rgba(87,127,255,0.35)] transition-opacity hover:opacity-90"
              >
                预约产品演示
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <OutlineCtaLink href="#capabilities">查看核心能力</OutlineCtaLink>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-8 w-full rounded-2xl border border-white/60 bg-white/50 p-8 backdrop-blur-sm shadow-[0_4px_20px_rgba(87,127,255,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_24px_rgba(0,0,0,0.28)]"
            >
              <div className="grid gap-6 sm:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                    <span className="flex items-baseline justify-center font-semibold text-neutral-950 dark:text-white">
                      <span className="text-5xl tabular-nums leading-none">
                        <CountUp to={item.value} format={item.format} />
                      </span>
                      <span className="ml-0.5 text-base leading-none">{item.suffix}</span>
                    </span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Pain points ── */}
        <PainPointsSection pains={pains} />

        {/* ── 8 Steps ── */}
        <HowItWorksSection />

        {/* ── Features ── */}
        <div id="capabilities">
          <FeaturesSection />
        </div>

        {/* ── Scenarios ── */}
        <ScenariosSection />

        {/* ── Value ── */}
        <ValueSection />

        {/* ── Comparison ── */}
        <ComparisonSection />

        {/* ── FAQ ── */}
        <FaqSection />

        {/* ── CTA ── */}
        <section
          id="demo"
          className="relative z-[1] isolate overflow-hidden bg-neutral-950 px-4 py-[120px] sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 z-0">
            <GradientBlinds
              dpr={1}
              gradientColors={CTA_GRADIENT_COLORS}
              angle={18}
              noise={0.22}
              blindCount={18}
              blindMinWidth={56}
              spotlightRadius={0.55}
              spotlightSoftness={1.1}
              spotlightOpacity={0.85}
              distortAmount={0.35}
              shineDirection="left"
              mixBlendMode="normal"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-neutral-950/45" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 text-center">
            <h2 className="text-[36px] font-semibold tracking-tight text-white sm:text-[44px]">
              让每位患者都能挂对科、找对人
            </h2>
            <p className="max-w-2xl text-[16px] leading-relaxed text-white/80">
              AI智能导诊与您携手，从\"关键词匹配\"到\"基于医学逻辑的精准引导\"，开启智慧服务诊前新体验。让我们一起把\"挂对科、找对人\"做到极致。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#demo"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-neutral-950 transition-opacity hover:opacity-90"
              >
                预约产品演示
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/#products"
                className="inline-flex h-10 items-center rounded-full border border-white/40 px-5 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                返回产品矩阵
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
