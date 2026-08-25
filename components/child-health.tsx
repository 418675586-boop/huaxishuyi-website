"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import "./child-health.css";

const asset = "/figma/ui-spec";
const hospital = "/figma/internet-hospital";

const children = ["胡嘻嘻", "胡小宝", "胡果果"];

const tests = [
  {
    title: "儿童抑郁障碍自评量表",
    people: 241,
    questions: 18,
    rank: "TOP1",
    pending: 3,
  },
  {
    title: "注意缺陷多动障碍评定量表",
    people: 225,
    questions: 26,
    rank: "TOP2",
  },
  {
    title: "儿童甲型H1N1流感风险自测",
    people: 102,
    questions: 10,
  },
  {
    title: "儿童多动症程度自测",
    people: 522,
    questions: 17,
  },
  {
    title: "儿童社交焦虑量表 (SASC)",
    people: 291,
    questions: 10,
  },
];

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "上午好";
  }
  if (hour < 18) {
    return "下午好";
  }
  return "晚上好";
}

export function ChildHealth(): ReactNode {
  const [child, setChild] = useState(children[0]);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [pending, setPending] = useState<(typeof tests)[0] | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="ch-stage">
      <div className="ch-phone">
        <Image
          src={`${asset}/status-bar.png`}
          alt=""
          width={375}
          height={44}
          className="ch-status"
        />
        <header className="ch-nav">
          <button type="button" aria-label="返回" className="ch-nav-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M15 5L8 12L15 19"
                fill="none"
                stroke="#081841"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1>儿童健康自测</h1>
          <Image
            src={`${hospital}/system-menu.svg`}
            alt="小程序菜单"
            width={87}
            height={32}
            className="ch-menu"
          />
        </header>

        <section className="ch-body">
          <div className="ch-user">
            <p>
              {greeting()}，<strong>{child}</strong>
            </p>
            <button
              type="button"
              className="ch-switch"
              onClick={() => setSwitchOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M5 4H13M13 4L11 2M13 4L11 6M11 12H3M3 12L5 10M3 12L5 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              切换
            </button>
            <button
              type="button"
              className="ch-qr"
              aria-label="二维码"
              onClick={() => showToast("已打开就诊码")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H16V16H14V14ZM18 14H20V16H18V14ZM14 18H16V20H14V18ZM18 18H20V20H18V18ZM6 6H8V8H6V6ZM16 6H18V8H16V6ZM6 16H8V18H6V16Z"
                  fill="#081841"
                />
              </svg>
            </button>
          </div>

          <div className="ch-list">
            {tests.map((item) => (
              <button
                type="button"
                className="ch-card"
                key={item.title}
                onClick={() => setPending(item)}
              >
                <div className="ch-card-main">
                  <div className="ch-card-title">
                    {item.rank ? (
                      <span
                        className={`ch-tag ${item.rank === "TOP1" ? "is-primary" : "is-soft"}`}
                      >
                        {item.rank}
                      </span>
                    ) : null}
                    <strong>{item.title}</strong>
                  </div>
                  <p>
                    {item.people}人测过 · 共{item.questions}题
                  </p>
                </div>
                {item.pending ? (
                  <span className="ch-badge" aria-label={`待处理 ${item.pending}`}>
                    {item.pending}
                  </span>
                ) : (
                  <span className="ch-arrow" aria-hidden="true">
                    ›
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="ch-end">没有更多了</p>
        </section>

        <Image
          src={`${asset}/home-indicator.png`}
          alt=""
          width={375}
          height={20}
          className="ch-home"
        />

        {switchOpen ? (
          <div className="ch-mask" role="presentation">
            <div className="ch-dialog" role="dialog" aria-labelledby="switch-title">
              <h2 id="switch-title">切换儿童</h2>
              <p className="is-center">请选择当前需要测评的儿童档案</p>
              <ul>
                {children.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      className={name === child ? "is-active" : ""}
                      onClick={() => {
                        setChild(name);
                        setSwitchOpen(false);
                        showToast(`已切换至${name}`);
                      }}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="ch-dialog-action"
                onClick={() => setSwitchOpen(false)}
              >
                取消
              </button>
            </div>
          </div>
        ) : null}

        {pending ? (
          <div className="ch-mask" role="presentation">
            <div className="ch-dialog" role="dialog" aria-labelledby="start-title">
              <h2 id="start-title">开始测评？</h2>
              <p>
                即将为{child}开始「{pending.title}」，共{pending.questions}
                题，结果仅供参考。
              </p>
              <div className="ch-dialog-dual">
                <button type="button" onClick={() => setPending(null)}>
                  取消
                </button>
                <button
                  type="button"
                  className="is-primary"
                  onClick={() => {
                    showToast("测评即将开始");
                    setPending(null);
                  }}
                >
                  主操作
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className="ch-toast" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </main>
  );
}
