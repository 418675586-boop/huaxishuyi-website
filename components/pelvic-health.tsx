"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import "./pelvic-health.css";

const asset = "/figma/ui-spec";
const hospital = "/figma/internet-hospital";

const plans = [
  {
    key: "monitor",
    title: "监测计划",
    tone: "primary" as const,
    items: ["盆底肌力评估：每周1次", "漏尿频率记录：每日记录", "训练完成度追踪：实时监控"],
  },
  {
    key: "intervene",
    title: "干预计划",
    tone: "soft" as const,
    items: [
      "凯格尔训练：每天3组，每组10次",
      "盆底拉伸：每天1次，每次10分钟",
      "生活方式调整：避免久坐、控制体重",
    ],
  },
  {
    key: "follow",
    title: "随访计划",
    tone: "warn" as const,
    items: ["第1次随访：2周后", "第2次随访：1个月后", "第3次随访：3个月后"],
  },
];

const chips = ["入组申请", "健康计划", "健康自测", "任务 (1/6)"] as const;

function PlanIcon({ tone }: { tone: (typeof plans)[number]["tone"] }): ReactNode {
  if (tone === "primary") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M3 14V8H6V14H3ZM8 14V4H11V14H8ZM13 14V10H16V14H13Z"
          fill="#52A5FF"
        />
      </svg>
    );
  }
  if (tone === "soft") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M9 2.5L10.2 6.2H14.1L10.95 8.5L12.15 12.2L9 9.9L5.85 12.2L7.05 8.5L3.9 6.2H7.8L9 2.5Z"
          fill="#081841"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M5 3H13V5H15V15H3V5H5V3ZM7 5H11V3H7V5ZM5 7V13H13V7H5Z"
        fill="#FFAA5E"
      />
    </svg>
  );
}

export function PelvicHealth(): ReactNode {
  const [composer, setComposer] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const onChip = (label: (typeof chips)[number]) => {
    if (label === "健康计划") {
      setSheetOpen(true);
      return;
    }
    showToast(`${label}即将打开`);
  };

  return (
    <main className="pf-stage">
      <div className="pf-phone">
        <div className="pf-top">
          <Image
            src={`${asset}/status-bar.png`}
            alt=""
            width={375}
            height={44}
            className="pf-status"
          />
          <header className="pf-nav">
            <button type="button" className="pf-nav-hit" aria-label="菜单">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  fill="none"
                  stroke="#081841"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <h1>盆底健康管家</h1>
            <img
              src={`${hospital}/system-menu.svg`}
              alt="小程序菜单"
              width={87}
              height={32}
              className="pf-menu"
            />
          </header>
        </div>

        <section className="pf-chat">
          <div className="pf-ai">
            <p>
              根据您的服务包，为您制定了以下健康计划：点击卡片可查看详细内容
            </p>
            <small>该回答由AI生成，内容仅供参考</small>
          </div>

          <article
            className="pf-plan"
            role="button"
            tabIndex={0}
            onClick={() => setSheetOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSheetOpen(true);
              }
            }}
          >
            <strong>您的健康计划</strong>
            {plans.map((plan) => (
              <div key={plan.key} className={`pf-block is-${plan.tone}`}>
                <div className="pf-block-head">
                  <PlanIcon tone={plan.tone} />
                  <span>{plan.title}</span>
                </div>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        </section>

        <div className="pf-composer">
          <div className="pf-chips">
            {chips.map((label) => (
              <button
                type="button"
                className="pf-chip"
                key={label}
                onClick={() => onChip(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="pf-field">
            <img src={`${asset}/icon-mic.svg`} alt="" width={24} height={24} />
            <input
              value={composer}
              onChange={(event) => setComposer(event.target.value)}
              placeholder="请问有什么可以帮你的呢？"
              aria-label="请问有什么可以帮你的呢？"
            />
            <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
          </label>
        </div>

        <div className="pf-home" aria-hidden="true">
          <i />
        </div>

        {sheetOpen ? (
          <div className="pf-mask">
            <div
              className="pf-sheet"
              role="dialog"
              aria-labelledby="pf-sheet-title"
            >
              <div className="pf-sheet-head">
                <strong id="pf-sheet-title">您的健康计划</strong>
                <button
                  type="button"
                  className="pf-close"
                  aria-label="关闭"
                  onClick={() => setSheetOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="pf-sheet-body">
                {plans.map((plan) => (
                  <div key={plan.key} className={`pf-block is-${plan.tone}`}>
                    <div className="pf-block-head">
                      <PlanIcon tone={plan.tone} />
                      <span>{plan.title}</span>
                    </div>
                    <ul>
                      {plan.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="pf-btn"
                onClick={() => {
                  setSheetOpen(false);
                  showToast("计划详情即将打开");
                }}
              >
                查看详情
              </button>
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className="pf-toast" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </main>
  );
}
