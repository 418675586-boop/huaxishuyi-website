"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import "./ui-spec.css";

const asset = "/figma/ui-spec";

const colors = {
  brand: [
    { label: "渐变色", value: "#577FFF-52A5FF", swatch: "gradient" },
    { label: "主色", value: "#52A5FF", swatch: "#52A5FF" },
    { label: "辅助色", value: "#EDF3FF", swatch: "#EDF3FF" },
  ],
  text: [
    { label: "一级文字", value: "#081841", swatch: "#081841", invert: true },
    { label: "二级文字", value: "#6C738C", swatch: "#6C738C", invert: true },
    { label: "三级文字", value: "#AAAEBA", swatch: "#AAAEBA", invert: true },
  ],
  bg: [
    { label: "白色", value: "#FFFFFF", swatch: "#FFFFFF" },
    { label: "次级背景", value: "#F3F5F7", swatch: "#F3F5F7" },
    { label: "遮罩层 50%", value: "#010101", swatch: "mask", invert: true },
  ],
  func: [
    { label: "警告色", value: "#F4434A", swatch: "#F4434A", invert: true },
    { label: "提示色", value: "#FFAA5E", swatch: "#FFAA5E" },
    { label: "禁用色", value: "#C7C9D1", swatch: "#C7C9D1" },
  ],
  neutral: [{ label: "分割线", value: "#F0F0F0", swatch: "#F0F0F0" }],
};

const typeRows = [
  ["超大标题", "24", "首页主题标题、营销banner", "Semibold"],
  ["大标题", "18", "用于一级标题", "Semibold"],
  ["标题", "16", "卡片标题、按钮、正文", "Regular/Medium"],
  ["常规", "14", "输入框、正文", "Regular"],
  ["辅助", "12", "标签、注释、次要信息", "Regular/Light"],
];

function Swatch({
  label,
  value,
  swatch,
  invert,
}: {
  label: string;
  value: string;
  swatch: string;
  invert?: boolean;
}): ReactNode {
  return (
    <div
      className={`ui-swatch ${swatch === "gradient" ? "is-gradient" : ""} ${swatch === "mask" ? "is-mask" : ""}`}
      style={
        swatch.startsWith("#")
          ? { background: swatch, color: invert ? "#fff" : "#081841" }
          : {}
      }
    >
      <strong>
        {label}
        <br />
        {value}
      </strong>
    </div>
  );
}

function Phone({
  title,
  children,
  variant = "plain",
}: {
  title: string;
  children: ReactNode;
  variant?: "plain" | "chat";
}): ReactNode {
  return (
    <div className={`ui-phone ${variant}`}>
      <Image
        src={`${asset}/${variant === "chat" ? "chat-status-bar" : "status-bar"}.png`}
        alt=""
        width={375}
        height={44}
        className="ui-phone-status"
      />
      <div className="ui-phone-nav">
        <h3>{title}</h3>
      </div>
      <div className="ui-phone-body">{children}</div>
      <Image
        src={`${asset}/home-indicator.png`}
        alt=""
        width={375}
        height={20}
        className="ui-phone-home"
      />
    </div>
  );
}

export function UiSpec(): ReactNode {
  const [tab, setTab] = useState<"user" | "agent">("user");
  const [toast, setToast] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [composer, setComposer] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main className="ui-spec">
      <header className="ui-spec-hero">
        <p>AI 医生应用平台（APP）</p>
        <h1>移动端通用-UI规范</h1>
      </header>

      <section className="ui-panel">
        <div className="ui-panel-grid">
          <div>
            <h2>
              <i />
              配色规范
            </h2>
            <p className="ui-kicker">1，主色</p>
            <div className="ui-swatch-row">
              {colors.brand.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <p className="ui-kicker">2，文字色</p>
            <div className="ui-swatch-row">
              {colors.text.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <p className="ui-kicker">3，背景色</p>
            <div className="ui-swatch-row">
              {colors.bg.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <p className="ui-kicker">4，功能色</p>
            <div className="ui-swatch-row">
              {colors.func.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
            <p className="ui-kicker">5，中性色</p>
            <div className="ui-swatch-row">
              {colors.neutral.map((item) => (
                <Swatch key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div>
            <h2>
              <i />
              字体规范
            </h2>
            <table className="ui-type-table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>字号（px）</th>
                  <th>使用场景</th>
                  <th>字重</th>
                </tr>
              </thead>
              <tbody>
                {typeRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>
              <i />
              圆角规范
            </h2>
            <div className="ui-radius-row">
              {[
                ["4PX", "小圆角"],
                ["10PX", "中圆角"],
                ["20PX", "大圆角"],
              ].map(([size, name]) => (
                <div className="ui-radius-item" key={size}>
                  <span>{size}</span>
                  <div
                    className="ui-radius-box"
                    style={{ borderRadius: size.toLowerCase() }}
                  >
                    {name}
                  </div>
                </div>
              ))}
            </div>

            <h2>
              <i />
              分割线
            </h2>
            <p className="ui-caption">0.5PX分割线</p>
            <hr className="ui-hairline" />
          </div>
        </div>
      </section>

      <section className="ui-panel">
        <div className="ui-layout-row">
          <div>
            <h2>
              <i />
              缺省页
            </h2>
            <Phone title="我是标题">
              <div className="ui-empty">
                <Image
                  src={`${asset}/empty-panda.png`}
                  alt="暂无数据"
                  width={100}
                  height={100}
                />
                <p>暂无数据</p>
              </div>
            </Phone>
          </div>

          <div>
            <h2>
              <i />
              页面间距
            </h2>
            <div className="ui-space-groups">
              <article>
                <div className="ui-space-labels">
                  <b>2PX</b>
                  <b>4PX</b>
                  <b>6PX</b>
                </div>
                <div className="ui-space-bar tight" />
                <p>用于文字与文字 文字与图标之间的间距</p>
              </article>
              <article>
                <div className="ui-space-labels">
                  <b>10PX</b>
                  <b>14PX</b>
                  <b>20PX</b>
                </div>
                <div className="ui-space-bar mid" />
                <p>用于卡片与卡片、文字与文字之间的间距 其中14PX使用率最高</p>
              </article>
              <article>
                <div className="ui-space-labels">
                  <b>30PX</b>
                  <b>50PX</b>
                  <b>100PX</b>
                </div>
                <div className="ui-space-bar large" />
                <p>大间距</p>
              </article>
            </div>
          </div>

          <div>
            <h2>
              <i />
              卡片阴影
            </h2>
            <div className="ui-shadow-card">卡片阴影</div>
            <p className="ui-caption">
              X：0 Y：4 模糊：20 扩展：0 30%不透明度 #C7C9D1
            </p>
          </div>
        </div>
      </section>

      <section className="ui-panel">
        <h2>
          <i />
          页面布局及弹窗样式
        </h2>
        <div className="ui-phones">
          <div>
            <Phone title="对话页" variant="chat">
              <div className="ui-chat">
                <div className="ui-bubble-user">我是富文本我是富文</div>
                <div className="ui-bubble-ai">
                  <p>
                    我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本我是富文本
                  </p>
                  <small>该回答由AI生成，内容仅供参考</small>
                </div>
              </div>
              <div className="ui-composer">
                <div className="ui-chips">
                  <button type="button" className="ui-chip">
                    <img src={`${asset}/icon-spark.svg`} alt="" width={24} height={24} />
                    智能
                    <img src={`${asset}/icon-arrow.svg`} alt="" width={12} height={12} />
                  </button>
                  <button type="button" className="ui-chip">
                    <Image
                      src={`${asset}/chip-smart.png`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    病情评估
                  </button>
                  <button type="button" className="ui-chip">
                    <Image
                      src={`${asset}/chip-rounds.png`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    辅助查房
                  </button>
                </div>
                <label className="ui-composer-field">
                  <img src={`${asset}/icon-mic.svg`} alt="" width={24} height={24} />
                  <input
                    value={composer}
                    onChange={(event) => setComposer(event.target.value)}
                    placeholder="请输入您的问题"
                    aria-label="请输入您的问题"
                  />
                  <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
                </label>
              </div>
            </Phone>
            <p className="ui-caption">其中14PX使用率最高</p>
          </div>

          <div>
            <Phone title="我是内页">
              <div className="ui-sheet-page">
                <div className="ui-sheet-mask">
                  <div className="ui-sheet">
                    <div className="ui-sheet-head">
                      <strong>我是标题</strong>
                      <button type="button" aria-label="关闭" className="ui-close">
                        ×
                      </button>
                    </div>
                    <div className="ui-sheet-body">内容区域</div>
                    <button type="button" className="ui-btn">
                      开始体验
                    </button>
                  </div>
                </div>
              </div>
            </Phone>
            <p className="ui-caption">
              弹窗的页面样式，不是内页。最高显示高度为：690PX 超过在内容区间滚动
            </p>
          </div>
        </div>
      </section>

      <section className="ui-panel">
        <div className="ui-dialog-layout">
          <div>
            <h2>
              <i />
              弹窗规范
            </h2>
            <div className="ui-dialog-board">
              <div>
                <p className="ui-kicker">基础样式</p>
                <div className="ui-dialog">
                  <p className="is-center">单行居中对齐，超过一行居中显示</p>
                  <button type="button" className="ui-dialog-action">
                    我知道了
                  </button>
                </div>
                <div className="ui-dialog">
                  <p>
                    我是富文本，超过了两排，就需要居左显示，这样的对齐方式更好看一些
                  </p>
                  <div className="ui-dialog-dual">
                    <button type="button">取消</button>
                    <button type="button" className="is-primary">
                      主操作
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="ui-kicker">配置标题</p>
                <div className="ui-dialog">
                  <h3 className="is-center">我是标题</h3>
                  <p className="is-center">单行居中对齐，超过一行居中显示</p>
                  <button type="button" className="ui-dialog-action">
                    主操作
                  </button>
                </div>
                <div className="ui-dialog">
                  <h3 className="is-center">我是标题</h3>
                  <p>
                    我是富文本，超过了两排，就需要居左显示，这样的对齐方式更好看一些
                  </p>
                  <div className="ui-dialog-dual">
                    <button type="button">取消</button>
                    <button type="button" className="is-primary">
                      主操作
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="ui-kicker">默认输入框</p>
                <div className="ui-dialog">
                  <h3 className="is-center">我是标题</h3>
                  <p>
                    我是富文本，超过了两排，就需要居左显示，这样的对齐方式更好看一些
                  </p>
                  <div className="ui-dialog-input">请填写你的建议或者意见</div>
                  <div className="ui-dialog-dual">
                    <button type="button">取消</button>
                    <button type="button" className="is-primary">
                      主操作
                    </button>
                  </div>
                </div>
                <p className="ui-kicker">输入状态</p>
                <div className="ui-dialog">
                  <h3 className="is-center">我是标题</h3>
                  <p>
                    我是富文本，超过了两排，就需要居左显示，这样的对齐方式更好看一些
                  </p>
                  <div className="ui-dialog-input is-focus">
                    整体不错，如果功能更全面就更好了
                  </div>
                  <div className="ui-dialog-dual">
                    <button type="button">取消</button>
                    <button type="button" className="is-primary">
                      主操作
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>
              <i />
              toast弹窗
            </h2>
            <button
              type="button"
              className="ui-toast"
              onClick={() => showToast("未识别到内容")}
            >
              未识别到内容
            </button>
          </div>
        </div>
      </section>

      <section className="ui-panel">
        <h2>
          <i />
          组件
        </h2>
        <div className="ui-components">
          <div>
            <p className="ui-kicker">主按钮</p>
            <button type="button" className="ui-btn">
              开始体验
            </button>
            <button type="button" className="ui-btn is-disabled" disabled>
              开始体验
            </button>
            <button type="button" className="ui-btn is-secondary">
              <span>开始体验</span>
            </button>
          </div>
          <div>
            <p className="ui-kicker">主按钮带图标</p>
            <button type="button" className="ui-btn">
              <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
              开始体验
            </button>
            <button type="button" className="ui-btn is-disabled" disabled>
              <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
              开始体验
            </button>
            <button type="button" className="ui-btn is-secondary">
              <img src={`${asset}/icon-plus.svg`} alt="" width={24} height={24} />
              <span>开始体验</span>
            </button>
          </div>
          <div>
            <p className="ui-kicker">主按钮-分图标</p>
            <div className="ui-btn-split">
              <button type="button" className="ui-btn is-secondary">
                <span>取消</span>
              </button>
              <button type="button" className="ui-btn">
                确定
              </button>
            </div>
          </div>
          <div>
            <p className="ui-kicker">输入框</p>
            <label className="ui-field">
              <span>
                我是标题
                <img src={`${asset}/icon-star.svg`} alt="必填" width={12} height={12} />
              </span>
              <input placeholder="请输入标题" />
            </label>
            <label className="ui-field">
              <span>
                我是标题
                <img src={`${asset}/icon-star.svg`} alt="必填" width={12} height={12} />
              </span>
              <input value="华华助手" readOnly />
            </label>
          </div>
          <div>
            <p className="ui-kicker">表单</p>
            <label className="ui-field">
              <span>
                你的电话
                <img src={`${asset}/icon-star.svg`} alt="必填" width={12} height={12} />
              </span>
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="请输入手机号"
              />
            </label>
            <label className="ui-switch">
              <span>
                <strong>消息通知</strong>
                <small>智能体主动消息时通知你</small>
              </span>
              <input type="checkbox" defaultChecked aria-label="消息通知" />
            </label>
          </div>
        </div>

        <div className="ui-tag-row">
          <div>
            <p className="ui-kicker">中标签</p>
            <span className="ui-tag">我是标题</span>
            <span className="ui-tag is-soft">我是标题</span>
            <span className="ui-tag is-gradient">
              <span>我是标题</span>
            </span>
            <span className="ui-tag is-disabled">我是标题</span>
          </div>
          <div>
            <p className="ui-kicker">小标签</p>
            <span className="ui-tag is-sm">我是标题</span>
            <span className="ui-tag is-sm is-soft">我是标题</span>
            <span className="ui-tag is-sm is-stroke">我是标题</span>
            <span className="ui-tag is-sm is-disabled">我是标题</span>
          </div>
        </div>

        <div className="ui-tab" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "user"}
            className={tab === "user" ? "active" : ""}
            onClick={() => setTab("user")}
          >
            按用户维度
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "agent"}
            className={tab === "agent" ? "active" : ""}
            onClick={() => setTab("agent")}
          >
            按智能体维度
          </button>
        </div>
      </section>

      {toast ? (
        <div className="ui-toast-live" role="status">
          {toast}
        </div>
      ) : null}
    </main>
  );
}
