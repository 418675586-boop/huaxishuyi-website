"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./child-growth.css";

const asset = "/figma/ui-spec";
const hospital = "/figma/internet-hospital";

const suggestions = [
  "儿童白血病的主要临床表现有哪些？",
  "儿童白血病的常见类型有哪些？",
  "儿童白血病如何治疗？",
  "高蛋白食物有哪些？",
  "儿童白血病患者饮食注意事项？",
  "儿童白血病的预后如何？",
  "如何预防儿童白血病？",
  "儿童白血病化疗副作用有哪些？",
  "儿童白血病复查频率？",
];

function formatDuration(total: number): string {
  const hours = String(Math.floor(total / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function ChildGrowth(): ReactNode {
  const startedAt = useRef(Date.now() - (2 * 3600 + 20 * 60 + 42) * 1000);
  const [elapsed, setElapsed] = useState(2 * 3600 + 20 * 60 + 42);
  const [composer, setComposer] = useState("");
  const [ended, setEnded] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState("");
  const [extras, setExtras] = useState<string[]>([]);

  useEffect(() => {
    if (ended) {
      return;
    }
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [ended]);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  const send = (text: string) => {
    const value = text.trim();
    if (!value || ended) {
      return;
    }
    setExtras((current) => [...current, value]);
    setComposer("");
  };

  return (
    <main className="cg-stage">
      <div className="cg-phone">
        <div className="cg-top">
          <Image
            src={`${asset}/status-bar.png`}
            alt=""
            width={375}
            height={44}
            className="cg-status"
          />
          <header className="cg-nav">
            <button type="button" className="cg-nav-hit" aria-label="返回">
              <img
                src={`${asset}/arrow-left.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <h1>儿童生长发育健康服务</h1>
            <img
              src={`${hospital}/system-menu.svg`}
              alt="小程序菜单"
              width={87}
              height={32}
              className="cg-menu"
            />
          </header>
        </div>

        <section className="cg-chat">
          <div className="cg-session">
            <div>
              <span className={`cg-tag ${ended ? "is-off" : ""}`}>
                {ended ? "已结束" : "咨询中"}
              </span>
              <p>
                对话进行时间：
                <em>{formatDuration(elapsed)}</em>
              </p>
            </div>
            {ended ? null : (
              <button
                type="button"
                className="cg-end"
                onClick={() => setConfirm(true)}
              >
                结束咨询
              </button>
            )}
          </div>

          <article className="cg-card">
            <strong>您是否想咨询</strong>
            <ol>
              {suggestions.map((item, index) => (
                <li key={item}>
                  <button
                    type="button"
                    disabled={ended}
                    onClick={() => send(item)}
                  >
                    [{index + 1}]{item}
                  </button>
                </li>
              ))}
            </ol>
          </article>

          <div className="cg-msg">
            <div className="cg-who">
              <span className="cg-avatar is-ai" aria-hidden="true">
                <img src={`${asset}/icon-spark.svg`} alt="" width={16} height={16} />
              </span>
              <span>AI助手</span>
            </div>
            <div className="cg-ai">
              <b>服务提醒</b>
              <p>
                您的问题我暂不能回复，已为你呼叫管家—
                <em>张云阳</em>
                继续为您提供服务
              </p>
              <small>该回答由AI生成，内容仅供参考</small>
            </div>
          </div>

          <div className="cg-msg">
            <div className="cg-who">
              <span className="cg-avatar is-human" aria-hidden="true">
                张
              </span>
              <span>健管师—张云阳</span>
            </div>
            <div className="cg-human">好的，我来介绍一下我们的服务！</div>
          </div>

          {extras.map((item, index) => (
            <div className="cg-user" key={`${index}-${item}`}>
              {item}
            </div>
          ))}
        </section>

        <div className="cg-composer">
          <label className="cg-field">
            <img src={`${asset}/icon-mic.svg`} alt="" width={24} height={24} />
            <input
              value={composer}
              onChange={(event) => setComposer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  send(composer);
                }
              }}
              placeholder="请输入内容"
              aria-label="请输入内容"
              disabled={ended}
            />
            <button
              type="button"
              className="cg-plus"
              aria-label="更多"
              onClick={() => showToast(ended ? "咨询已结束" : "功能即将开放")}
            >
              <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
            </button>
          </label>
        </div>

        <div className="cg-home" aria-hidden="true">
          <i />
        </div>

        {confirm ? (
          <div className="cg-mask">
            <div className="cg-dialog" role="dialog" aria-labelledby="cg-end-title">
              <h2 id="cg-end-title">结束咨询？</h2>
              <p>结束后将无法继续当前对话，确定要结束本次咨询吗？</p>
              <div className="cg-actions">
                <button type="button" onClick={() => setConfirm(false)}>
                  取消
                </button>
                <button
                  type="button"
                  className="is-primary"
                  onClick={() => {
                    setConfirm(false);
                    setEnded(true);
                    showToast("咨询已结束");
                  }}
                >
                  结束咨询
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {toast ? (
          <div className="cg-toast" role="status">
            {toast}
          </div>
        ) : null}
      </div>
    </main>
  );
}
