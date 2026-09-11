"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import "./digital-doctor.css";

const asset = "/figma/ui-spec";
const hospital = "/figma/internet-hospital";
const hero = "/img/solutions/hero7-hospital/hero-hospital-02-digital-doctor.png";

const doctors = [
  {
    name: "吕子涵",
    title: "一级专家",
    dept: "儿科",
    available: true,
    summary: "儿童呼吸系统与生长发育方向，擅长线上预问诊与分诊。",
    analysis: "近90天处理儿童发热、咳嗽相关问诊 1280 例，匹配度 96%。",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "陈思远",
    title: "副主任医师",
    dept: "小儿内科",
    available: true,
    summary: "儿童常见病与慢病随访，可预约今日下午号源。",
    analysis: "陈姓医生中匹配优先，近30天接诊完成率 98%。",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "陈婉清",
    title: "主治医师",
    dept: "儿童保健",
    available: false,
    summary: "儿童营养与生长发育评估，目前暂无当日号源。",
    analysis: "保健方向匹配度 91%，建议改约明日上午。",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
  },
];

const chips = ["智能思考", "预约挂号", "在线门诊"] as const;
const steps = [
  { no: "01", title: "病情收集", desc: "补充症状与病史" },
  { no: "02", title: "智能问诊", desc: "AI 梳理关键信息" },
  { no: "03", title: "发送医生", desc: "交给医生继续看诊" },
];

type Screen = "intro" | "triage" | "chat";

function StatusBar(): ReactNode {
  return (
    <Image
      src={`${asset}/status-bar.png`}
      alt=""
      width={375}
      height={44}
      className="dd-status"
    />
  );
}

function Nav({ title }: { title: string }): ReactNode {
  return (
    <header className="dd-nav">
      <button type="button" className="dd-nav-hit" aria-label="返回">
        <img src={`${asset}/arrow-left.svg`} alt="" width={24} height={24} />
      </button>
      <h1>{title}</h1>
      <img
        src={`${hospital}/system-menu.svg`}
        alt="小程序菜单"
        width={87}
        height={32}
        className="dd-menu"
      />
    </header>
  );
}

function HomeBar(): ReactNode {
  return (
    <div className="dd-home" aria-hidden="true">
      <i />
    </div>
  );
}

function Phone({
  title,
  children,
  composer,
}: {
  title: string;
  children: ReactNode;
  composer?: ReactNode;
}): ReactNode {
  return (
    <div className="dd-phone">
      <div className="dd-top">
        <StatusBar />
        <Nav title={title} />
      </div>
      <section className="dd-body">{children}</section>
      {composer}
      <HomeBar />
    </div>
  );
}

export function DigitalDoctorIntro({
  onStart,
}: {
  onStart?: () => void;
} = {}): ReactNode {
  const [toast, setToast] = useState("");
  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="dd-stage">
      <Phone
        title="数字医生"
        composer={
          <div className="dd-foot">
            <button type="button" className="dd-btn is-ghost" onClick={() => showToast("历史问诊即将打开")}>
              历史问诊
            </button>
            <button type="button" className="dd-btn" onClick={() => onStart?.() ?? showToast("即将开始问诊")}>
              开始问诊
            </button>
          </div>
        }
      >
        <div className="dd-hero">
          <Image src={hero} alt="AI 数字医生吕子涵" width={347} height={210} />
          <button type="button" className="dd-mute" aria-label="静音" onClick={() => showToast("已静音")}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 10V14H7L12 18V6L7 10H4ZM16.5 12L19 14.5L20.5 13L18 10.5L20.5 8L19 6.5L16.5 9L14 6.5L12.5 8L15 10.5L12.5 13L14 14.5L16.5 12Z"
                fill="#081841"
              />
            </svg>
          </button>
        </div>
        <article className="dd-card">
          <h2>
            你好，杜依依
            <span>我是 AI 数字医生 吕子涵</span>
          </h2>
          <p>
            我会先帮你整理就诊信息，完成智能预问诊后发送给医生，方便医生更快了解你的病情。
          </p>
        </article>
        <div className="dd-section-head">问诊流程</div>
        <div className="dd-steps">
          {steps.map((item) => (
            <article key={item.no} className="dd-step">
              <em>{item.no}</em>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </article>
          ))}
        </div>
      </Phone>
      {toast ? <div className="dd-toast">{toast}</div> : null}
    </main>
  );
}

export function DigitalDoctorTriage(): ReactNode {
  const [tab, setTab] = useState<"doctor" | "dept">("doctor");
  const [sort, setSort] = useState("匹配优先");

  return (
    <main className="dd-stage">
      <Phone title="智能导诊">
        <div className="dd-progress">
          <span>智能问诊</span>
          <i />
          <strong>导诊建议</strong>
        </div>
        <div className="dd-tab" role="tablist">
          <button type="button" className={tab === "doctor" ? "active" : ""} onClick={() => setTab("doctor")}>
            建议医生
          </button>
          <button type="button" className={tab === "dept" ? "active" : ""} onClick={() => setTab("dept")}>
            建议科室
          </button>
        </div>
        <div className="dd-chips">
          {["匹配优先", "号源优先", "级别优先"].map((item) => (
            <button
              type="button"
              key={item}
              className={`dd-chip ${sort === item ? "is-on" : ""}`}
              onClick={() => setSort(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {tab === "doctor" ? (
          <ul className="dd-list">
            {doctors.map((item) => (
              <li key={item.name}>
                <article className="dd-doc">
                  <Image src={item.photo} alt={item.name} width={72} height={72} />
                  <div>
                    <header>
                      <strong>{item.name}</strong>
                      <span>{item.title}</span>
                      <b className={item.available ? "is-on" : "is-off"}>
                        {item.available ? "有号" : "无号"}
                      </b>
                    </header>
                    <p>{item.summary}</p>
                    <div className="dd-ai">
                      <img src={`${hospital}/sparkle.svg`} alt="" width={14} height={14} />
                      <span>AI分析　{item.analysis}</span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="dd-grid">
            {["儿科门诊", "儿童保健", "小儿呼吸", "小儿消化"].map((name) => (
              <article key={name} className="dd-dept">
                <strong>{name}</strong>
                <span>今日可约</span>
              </article>
            ))}
          </div>
        )}
      </Phone>
    </main>
  );
}

export function DigitalDoctorChat(): ReactNode {
  const [composer, setComposer] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="dd-stage">
      <Phone
        title="华华助手"
        composer={
          <div className="dd-composer">
            <div className="dd-chips">
              {chips.map((label) => (
                <button type="button" className="dd-chip" key={label} onClick={() => showToast(`${label}即将打开`)}>
                  {label}
                </button>
              ))}
            </div>
            <label className="dd-field">
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
        }
      >
        <p className="dd-time">2025年05月12日 12:00:23</p>
        <div className="dd-user">华华，我要挂陈医生的号。</div>
        <article className="dd-ai-msg">
          <p>
            当前可预约的陈姓医生有陈思远、陈婉清。请选择医生后，我帮你继续挂号。
          </p>
          <div className="dd-tools">
            <button type="button" onClick={() => showToast("已复制")}>
              复制
            </button>
            <button type="button" aria-label="有用">
              <img src={`${hospital}/thumb.svg`} alt="" width={16} height={16} />
            </button>
          </div>
          <small>该回答由AI生成，内容仅供参考</small>
        </article>
        <article className="dd-card">
          <h3>请选择医生</h3>
          <div className="dd-pick">
            {doctors
              .filter((item) => item.name.startsWith("陈"))
              .map((item) => (
                <button
                  type="button"
                  key={item.name}
                  className={`dd-pick-card ${picked === item.name ? "is-on" : ""}`}
                  onClick={() => {
                    setPicked(item.name);
                    showToast(`已选择${item.name}`);
                  }}
                >
                  <Image src={item.photo} alt="" width={64} height={64} />
                  <strong>{item.name}</strong>
                  <span>
                    {item.title} · {item.dept}
                  </span>
                </button>
              ))}
          </div>
        </article>
      </Phone>
      {toast ? <div className="dd-toast">{toast}</div> : null}
    </main>
  );
}

function FramedScreen({
  active,
  children,
}: {
  active?: boolean;
  children: ReactNode;
}): ReactNode {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.48);

  useEffect(() => {
    const node = screenRef.current;
    if (!node) {
      return;
    }
    const sync = () => setScale(node.clientWidth / 375);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`dd-device ${active ? "is-main" : ""}`}>
      <div className="dd-device-screen" ref={screenRef}>
        <div className="dd-device-scale" style={{ transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
      <img
        src="/figma/digital-doctor/phone-shell.png"
        alt=""
        className="dd-device-shell"
      />
    </div>
  );
}

export function DigitalDoctorShowcase(): ReactNode {
  const [main, setMain] = useState<Screen>("chat");

  const screens: Record<Screen, ReactNode> = {
    intro: <DigitalDoctorIntro onStart={() => setMain("chat")} />,
    triage: <DigitalDoctorTriage />,
    chat: <DigitalDoctorChat />,
  };

  return (
    <div className="dd-show">
      <header className="dd-show-copy">
        <p>华西第二医院 · 数字医生</p>
        <h1>三屏预览</h1>
      </header>
      <div className="dd-gallery">
        <div
          className="dd-side is-left"
          role="button"
          tabIndex={0}
          onClick={() => setMain("intro")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setMain("intro");
            }
          }}
        >
          <FramedScreen>{screens.intro}</FramedScreen>
          <span>数字医生</span>
        </div>
        <div className="dd-main">
          <FramedScreen active>{screens[main]}</FramedScreen>
        </div>
        <div
          className="dd-side is-right"
          role="button"
          tabIndex={0}
          onClick={() => setMain("triage")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setMain("triage");
            }
          }}
        >
          <FramedScreen>{screens.triage}</FramedScreen>
          <span>智能导诊</span>
        </div>
      </div>
      <nav className="dd-show-nav">
        {(
          [
            ["chat", "华华助手"],
            ["intro", "数字医生"],
            ["triage", "智能导诊"],
          ] as const
        ).map(([key, label]) => (
          <button
            type="button"
            key={key}
            className={main === key ? "is-on" : ""}
            onClick={() => setMain(key)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
