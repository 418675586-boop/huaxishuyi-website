"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/blocks/section-label";

const FRAMES = [
  { label: "01 · 关键词匹配局限", image: "/img/products/ai-triage/01.jpg" },
  { label: "02 · 挂错号率高",      image: "/img/products/ai-triage/02.jpg" },
  { label: "03 · 导医台压力大",   image: "/img/products/ai-triage/03.jpg" },
  { label: "04 · 患者不懂术语",    image: "/img/products/ai-triage/04.jpg" },
  { label: "05 · 医生资源错配",    image: "/img/products/ai-triage/05.jpg" },
  { label: "06 · 专病分流不足",    image: "/img/products/ai-triage/06.jpg" },
];

type Pain = {
  title: string;
  items: string[];
};

export function PainPointsSection({ pains }: { pains: Pain[] }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const isMobile =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 767.98px)").matches;
    const stage = root.querySelector<HTMLElement>(".pps-stage");
    const frames = Array.from(
      root.querySelectorAll<HTMLElement>(".pps-frame"),
    );
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".pps-row"));
    if (!stage || frames.length === 0 || rows.length === 0) return;

    const TOTAL = frames.length;
    let step = -1; // -1 表示标题区还没开始推进
    let inited = false;

    function setStep(s: number) {
      if (s === step) return;
      step = s;

      // 锁定阶段（0 <= s < TOTAL）：只激活当前一项；上一项做 pushed 动画
      if (s >= 0 && s < TOTAL) {
        rows.forEach((row, j) => {
          const on = j === s;
          row.classList.toggle("active", on);
          row.setAttribute("aria-expanded", on ? "true" : "false");
        });

        frames.forEach((frame, j) => {
          frame.classList.remove("active", "pushed");
          if (j === s) {
            frame.classList.add("active");
            // 进入动画：从前一项 pushed 状态切换
            if (inited) {
              frame.style.transition = "none";
              frame.style.bottom = "-32%";
              frame.style.transform = "scale(0.85)";
              void frame.offsetWidth;
              frame.style.transition = "";
              frame.style.bottom = "";
              frame.style.transform = "";
            }
          } else if (j === s - 1) {
            frame.classList.add("pushed");
          }
        });
        inited = true;
        return;
      }

      // step 达到 TOTAL（6）：sticky 失效，画布自然跟随页面滚动离开，无需处理
      if (s >= TOTAL) return;
    }

    if (isMobile) {
      rows.forEach((row) => row.classList.add("active"));
      return;
    }

    /**
     * 通过滚动比例计算当前 step。
     *
     * stage 总高 = 150vh，sticky canvas 高度 = 100vh，
     * 所以滚动 50vh 内画布粘在视口顶。
     *
     * 进度 p = (stage.offsetTop 距离视口顶的负值) / (50vh)
     *   p ∈ [0, 1] 对应 step ∈ [0, TOTAL]
     *
     * 进入画布前（标题区）→ step = -1
     * 进入画布（r.top ≤ 0）→ step = 0 → 推进到 step = TOTAL
     * 离开画布（r.top < -50vh）→ step = TOTAL → 放行
     */
    function computeStep() {
      if (!stage) return -1;
      const r = stage.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const LOCK_VH = vh * 0.5; // 锁定滚动区 = 50vh

      if (r.top > 0) {
        // 还在标题区
        return -1;
      }

      // r.top ≤ 0 → 已经在画布锁定区
      const offset = -r.top; // ≥ 0
      const p = Math.min(1, offset / LOCK_VH);
      const s = Math.min(TOTAL, Math.floor(p * (TOTAL + 1)));
      return s;
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const s = computeStep();
        if (s !== step) setStep(s);
      });
    }

    // 滚回标题区（r.top > 0）时重置回 -1
    function resetIfAbove() {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.top > 10 && step !== -1) {
        setStep(-1);
      }
    }

    window.addEventListener("scroll", () => {
      onScroll();
      resetIfAbove();
    }, { passive: true });

    rows.forEach((row, i) => {
      row.addEventListener("click", () => {
        // 点击直接跳到对应 step
        setStep(i);
      });
      row.addEventListener("focus", () => setStep(i));
    });

    // 键盘：可在画布锁定区手动切换 step（辅助功能）
    const onKey = (e: KeyboardEvent) => {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.top > 0) return;
      if (step < 0 || step >= TOTAL) return;
      let next: number | null = null;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        next = Math.min(TOTAL, step + 1);
        e.preventDefault();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        next = Math.max(0, step - 1);
        e.preventDefault();
      }
      if (next !== null && next !== step) {
        setStep(next);
      }
    };
    window.addEventListener("keydown", onKey);

    setStep(-1);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="pps-root relative bg-[#F4F5F7]/50 font-[family-name:var(--font-sans)] font-normal text-neutral-950 dark:bg-transparent dark:text-white"
    >
      <style>{`
        .pps-root *,
        .pps-root *::before,
        .pps-root *::after { box-sizing: border-box; }

        /* 渐变光晕层（浅色 / 深色） */
        .pps-glows { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .pps-glow { position: absolute; border-radius: 9999px; filter: blur(100px); }
        .pps-glow-a { top: 8%; left: -10%; width: 420px; height: 420px; background: rgba(196, 217, 255, 0.40); }
        .pps-glow-b { top: 20%; right: -5%; width: 480px; height: 480px; background: rgba(165, 196, 255, 0.45); }
        .pps-glow-c { bottom: -10%; left: 35%; width: 360px; height: 360px; background: rgba(214, 228, 255, 0.35); }
        :where(.dark) .pps-glow-a { background: rgba(87, 127, 255, 0.20); }
        :where(.dark) .pps-glow-b { background: rgba(82, 165, 255, 0.15); }
        :where(.dark) .pps-glow-c { background: rgba(59, 130, 246, 0.10); }

        /* 区域1：标题区 */
        .pps-heading { position: relative; z-index: 1; padding: 100px 0 60px; }
        .pps-heading-inner { max-width: 1200px; margin: 0 auto; padding: 0 16px; display: flex; flex-direction: column; gap: 24px; }
        @media (min-width: 640px) { .pps-heading-inner { padding: 0 24px; } }
        @media (min-width: 1024px) { .pps-heading-inner { padding: 0 32px; } }

        .pps-split-title { margin: 0; color: #0a0a0a; }
        :where(.dark) .pps-split-title { color: #fafafa; }
        .pps-split-title span { display: block; }
        .pps-split-title .muted { color: #737373; }

        .pps-lead { color: #737373; max-width: 48rem; line-height: 1.6; font-size: 16px; }

        /* 区域2：画布 */
        .pps-stage { position: relative; z-index: 1; height: 150vh; }
        .pps-canvas { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; }
        .pps-content { display: flex; align-items: center; justify-content: space-between; gap: 32px; width: 100%; max-width: 1200px; height: 100%; margin: 0 auto; padding: 0 16px; }
        @media (min-width: 640px) { .pps-content { padding: 0 24px; } }
        @media (min-width: 1024px) { .pps-content { padding: 0 32px; } }

        /* 左侧图片帧 */
        .pps-frames { position: relative; flex-shrink: 0; width: 600px; height: 700px; }
        .pps-frame { position: absolute; left: 0; right: 0; bottom: 0; height: 100%; opacity: 0; will-change: transform, bottom, opacity; transition: bottom 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s linear; }
        .pps-frame.active { opacity: 1; z-index: 3; }
        .pps-frame.pushed { opacity: 1; bottom: 46%; transform: scale(0.82); transform-origin: bottom center; z-index: 2; }
        .pps-frame .pps-inner { position: absolute; inset: 0; border-radius: 20px; background: rgba(255,255,255,0.55); border: 1px solid rgba(15,23,42,0.06); overflow: hidden; box-shadow: 0 0 24px rgba(0,0,0,0.06); }
        :where(.dark) .pps-frame .pps-inner { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); box-shadow: 0 0 28px rgba(0,0,0,0.28); }
        .pps-frame .pps-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .pps-frame .pps-inner::after { position: absolute; inset: 0; background: radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0.4) 0, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.10)); content: ""; }
        .pps-frame .pps-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #737373; font-size: 13px; letter-spacing: 0.06em; text-align: center; padding: 16px; z-index: 1; }
        :where(.dark) .pps-frame .pps-placeholder { color: rgba(255,255,255,0.55); }

        /* 右侧列表 */
        .pps-list { flex: 1; max-width: 560px; display: flex; flex-direction: column; justify-content: center; height: 100%; }
        .pps-list-label { margin: 0 0 16px; color: #737373; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.16em; }
        .pps-rows { margin: 0; padding: 0; list-style: none; }
        .pps-row { display: grid; grid-template-columns: 48px 1fr; gap: 24px; padding: 14px 0; opacity: 0.45; transition: opacity 0.3s linear; cursor: pointer; outline: none; color: inherit; }
        .pps-row:focus-visible { outline: 2px solid rgba(99,102,241,0.6); outline-offset: 4px; border-radius: 4px; }
        .pps-row.active { opacity: 1; }
        .pps-row .pps-num { color: #737373; font-variant-numeric: tabular-nums; font-size: 18px; font-weight: 500; }
        .pps-row .pps-body .pps-title { display: inline-flex; align-items: center; gap: 12px; color: inherit; font-size: 20px; font-weight: 500; letter-spacing: -0.01em; }
        .pps-row .pps-body .pps-title .pps-icon { width: 18px; height: 18px; color: #737373; transition: transform 0.3s ease; flex-shrink: 0; }
        .pps-row.active .pps-body .pps-title .pps-icon { transform: translateX(2px); color: #52A5FF; }
        :where(.dark) .pps-row.active .pps-body .pps-title .pps-icon { color: #52A5FF; }
        .pps-row .pps-body .pps-items { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.45s cubic-bezier(0.25,0.46,0.45,0.94); }
        .pps-row.active .pps-body .pps-items { grid-template-rows: 1fr; }
        .pps-row .pps-body .pps-items ul { display: flex; flex-direction: column; gap: 8px; min-height: 0; margin: 0; padding: 12px 0 0; overflow: hidden; list-style: none; }
        .pps-row .pps-body .pps-items ul li { border-radius: 10px; background: rgba(15,23,42,0.04); padding: 12px 16px; font-size: 14px; line-height: 1.5; color: #0a0a0a; border: 1px solid rgba(15,23,42,0.05); }
        :where(.dark) .pps-row .pps-body .pps-items ul li { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.88); border-color: rgba(255,255,255,0.06); }


        /* 较矮视口 */
        @media (max-height: 850px) {
          .pps-row { padding: 10px 0; }
          .pps-row .pps-body .pps-items ul { gap: 6px; }
          .pps-row .pps-body .pps-items ul li { padding: 10px 14px; font-size: 13px; }
          .pps-list-label { margin-bottom: 12px; }
          .pps-frames { width: 460px; height: 600px; }
        }

        /* 移动端 */
        @media (max-width: 767.98px) {
          .pps-heading { padding: 60px 0 40px; }
          .pps-stage { height: auto; }
          .pps-canvas { position: static; height: auto; padding: 20px 0 60px; }
          .pps-content { flex-direction: column; gap: 24px; padding: 0 16px; }
          .pps-frames { width: 100%; max-width: 360px; aspect-ratio: 570 / 800; }
          .pps-frame { height: 70%; }
          .pps-frame .pps-inner { border-radius: 16px; }
          .pps-list { max-width: 100%; }
          .pps-list-label { display: none; }
          .pps-row { grid-template-columns: 1fr; gap: 8px; padding: 0 0 16px; opacity: 1; cursor: default; margin-bottom: 16px; border-bottom: 1px solid rgba(15,23,42,0.06); }
          :where(.dark) .pps-row { border-bottom-color: rgba(255,255,255,0.06); }
          .pps-row .pps-num { display: none; }
          .pps-row .pps-body .pps-title { gap: 8px; }
          .pps-row .pps-body .pps-title .pps-icon { display: none; }
          .pps-row .pps-body .pps-items { grid-template-rows: 1fr; }
        }
      `}</style>

      {/* 渐变光晕层 */}
      <div aria-hidden="true" className="pps-glows">
        <div className="pps-glow pps-glow-a" />
        <div className="pps-glow pps-glow-b" />
        <div className="pps-glow pps-glow-c" />
      </div>

      {/* 区域1：标题区 */}
      <section className="pps-heading">
        <div className="pps-heading-inner">
          <SectionLabel variant="dark">行业痛点</SectionLabel>
          <h2 className="pps-split-title text-[44px] font-semibold tracking-tight">
            <span>患者就医的第一道门槛</span>
            <span className="muted">六大传统导诊模式的核心痛点</span>
          </h2>
          <p className="pps-lead">
            研究表明，超过 40% 的患者在首次就诊时面临科室选择困惑。传统关键词匹配式导诊、口头导医咨询与电话分诊台，都无法满足真实就医需求。
          </p>
        </div>
      </section>

      {/* 区域2：一屏画布 */}
      <section className="pps-stage">
        <div className="pps-canvas">
          <div className="pps-content">
            {/* 左侧图片帧 */}
            <div className="pps-frames">
              {FRAMES.map((frame, i) => (
                <div className="pps-frame" key={i}>
                  <span className="pps-inner">
                    <img
                      className="pps-image"
                      src={frame.image}
                      alt={frame.label}
                      loading={i === 0 ? "eager" : "lazy"}
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/* 右侧痛点列表 */}
            <div className="pps-list">
              <p className="pps-list-label">行业痛点 · 6 ISSUES</p>
              <ul className="pps-rows">
                {pains.map((pain, i) => (
                  <li
                    key={pain.title}
                    className="pps-row"
                    tabIndex={0}
                    role="button"
                    aria-expanded="false"
                  >
                    <span className="pps-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="pps-body">
                      <span className="pps-title">
                        <span>{pain.title}</span>
                        <ArrowRight className="pps-icon" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <div className="pps-items">
                        <ul>
                          {pain.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
