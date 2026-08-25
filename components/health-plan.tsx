"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import "./health-plan.css";

const asset = "/figma/ui-spec";
const hospital = "/figma/internet-hospital";

const plans = [
  {
    title: "多囊卵巢综合征干预方案1",
    range: "2024-09-10 ~ 2024-11-10",
    status: "ongoing" as const,
  },
  {
    title: "多囊卵巢综合征干预方案2",
    range: "2024-06-10 ~ 2024-08-10",
    status: "ended" as const,
    badge: 1,
  },
  {
    title: "ADHD干预方案",
    range: "2023-11-10 ~ 2024-02-10",
    status: "ended" as const,
  },
];

export function HealthPlan(): ReactNode {
  const [selected, setSelected] = useState<(typeof plans)[0] | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="hp-stage">
      <div className="hp-phone">
        <div className="hp-top">
          <Image
            src={`${asset}/status-bar.png`}
            alt=""
            width={375}
            height={44}
            className="hp-statusbar"
          />

          <header className="hp-nav">
          <button type="button" className="hp-nav-hit" aria-label="返回">
            <img
              src={`${asset}/arrow-left.svg`}
              alt=""
              width={24}
              height={24}
              className="hp-back"
            />
          </button>
          <h1>健康干预方案</h1>
          <img
            src={`${hospital}/system-menu.svg`}
            alt="小程序菜单"
            width={87}
            height={32}
            className="hp-menu"
          />
          </header>
        </div>

        <section className="hp-body">
          <ul className="hp-list">
            {plans.map((item) => (
              <li key={item.title}>
                <button
                  type="button"
                  className="hp-card"
                  onClick={() => setSelected(item)}
                >
                  <div className="hp-card-grid">
                    <div className="hp-icon">
                      <img
                        src={`${hospital}/nav-file.svg`}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </div>
                    <strong className="hp-title">{item.title}</strong>
                    <span
                      className={`hp-tag ${item.status === "ongoing" ? "is-primary" : "is-soft"}`}
                    >
                      {item.status === "ongoing" ? "进行中" : "已结束"}
                    </span>
                    <span className="hp-date">{item.range}</span>
                    <img
                      src={`${hospital}/more.svg`}
                      alt=""
                      width={18}
                      height={16}
                      className="hp-chevron"
                    />
                    {item.badge ? (
                      <span className="hp-badge" aria-label={`未读 ${item.badge}`}>
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <div className="hp-foot">
          <button
            type="button"
            className="hp-apply"
            onClick={() => showToast("申请已提交")}
          >
            立即申请
          </button>
        </div>

        <div className="hp-home" aria-hidden="true">
          <i />
        </div>

        {selected ? (
          <div className="hp-mask">
            <div className="hp-dialog" role="dialog" aria-labelledby="plan-title">
              <h2 id="plan-title">打开方案？</h2>
              <p>
                即将查看「{selected.title}」，周期为{selected.range}。结果仅供参考。
              </p>
              <div className="hp-actions">
                <button type="button" onClick={() => setSelected(null)}>
                  取消
                </button>
                <button
                  type="button"
                  className="is-primary"
                  onClick={() => {
                    showToast("方案详情即将打开");
                    setSelected(null);
                  }}
                >
                  查看
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className="hp-toast" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </main>
  );
}
