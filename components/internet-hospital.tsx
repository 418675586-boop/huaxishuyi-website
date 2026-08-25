"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import "./internet-hospital.css";

const assetRoot = "/figma/internet-hospital";

const departments = [
  { label: "儿科", image: "department-pediatrics.svg" },
  { label: "妇科", image: "department-gynecology.png" },
  { label: "产科", image: "department-obstetrics.png" },
  { label: "全部科室", image: "department-all.png" },
];

const visitServices = [
  {
    title: "团队问诊",
    subtitle: "首席专家团队",
    image: "visit-team.png",
  },
  { title: "线上问诊", subtitle: "24小时接诊", image: "visit-online.png" },
  {
    title: "预约问诊",
    subtitle: "预约时段问诊",
    image: "visit-appointment.png",
  },
  { title: "极速问诊", subtitle: "10分钟应答", image: "visit-express.png" },
  {
    title: "门特专区",
    subtitle: "线上门特续方",
    image: "visit-special.svg",
  },
  { title: "自助开单", subtitle: "在线开检查", image: "visit-order.svg" },
  { title: "自制药", subtitle: "自制药申请", image: "visit-medicine.svg" },
  {
    title: "上门服务",
    subtitle: "专业上门服务",
    image: "visit-home-care.svg",
  },
];

const zones = [
  { label: "儿童血液专区", image: "zone-child.png", color: "pink" },
  { label: "儿童呼吸专区", image: "zone-pediatric.png", color: "peach" },
  { label: "待开发专区", image: "zone-genetic.png", color: "blue" },
  { label: "待开发专区", image: "zone-pregnancy.png", color: "blue" },
];

const featureServices = [
  { label: "健康义诊", image: "service-health.svg" },
  { label: "药品查询", image: "service-medicine.svg" },
  { label: "线上MDT", image: "service-video.svg" },
  { label: "特色咨询", image: "service-chat.svg" },
];

const articles = [
  {
    title: "妊娠高血糖不用饿肚子！华西产科医生揭秘“长胎不长肉”",
    image: "article-nutrition.png",
    tags: ["置顶", "多学科诊疗"],
    pinned: true,
  },
  {
    title: "无创DNA vS 羊水穿刺：如何选择适合的产前筛查方式",
    image: "article-amniocentesis.png",
    tags: ["产前诊断", "孕中期"],
  },
  {
    title: "孕期检查时间表：从建档到分娩的完整产检指南",
    image: "article-checkup.png",
    tags: ["产检指南"],
  },
  {
    title: "孕期营养补充指南：叶酸、钙片、DHA怎么吃才科学？",
    image: "article-dna.png",
    tags: ["产前诊断", "孕中期"],
  },
];

const navItems = [
  { label: "最近咨询", image: "nav-chat.svg" },
  { label: "我的关注", image: "nav-star.svg" },
  { label: "问诊订单", image: "nav-file.svg" },
  { label: "我的客服", image: "nav-service.svg" },
];

function AssetImage({
  name,
  alt = "",
  width,
  height,
  className,
}: {
  name: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
}): ReactNode {
  return (
    <Image
      src={`${assetRoot}/${name}`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

export function InternetHospital(): ReactNode {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [likedArticles, setLikedArticles] = useState<number[]>([]);
  const [activeNav, setActiveNav] = useState(0);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 1800);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showNotice(
      query.trim() ? `正在搜索：${query.trim()}` : "请输入症状、科室或医生"
    );
  };

  const toggleLike = (index: number) => {
    setLikedArticles((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  };

  return (
    <main className="hospital-stage" id="main-content">
      <div className="hospital-shell">
        <header className="hospital-hero">
          <div className="hospital-status" aria-label="状态栏，12点32分">
            <time>12:32</time>
            <AssetImage name="status.svg" width={64} height={11} />
          </div>

          <div className="hospital-titlebar">
            <div className="hospital-brand">
              <AssetImage
                name="hospital.png"
                alt="华西二院院徽"
                width={32}
                height={32}
              />
              <strong>华西二院·互联网医院</strong>
            </div>
            <AssetImage
              name="system-menu.svg"
              alt="小程序菜单"
              width={79}
              height={30}
            />
          </div>

          <form className="hospital-search" onSubmit={submitSearch}>
            <AssetImage name="sparkle.svg" width={21} height={21} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="搜索症状、科室或医生"
              placeholder="描述症状、科室或医生"
            />
            <button type="submit" aria-label="开始搜索">
              <AssetImage name="search-button.svg" width={32} height={32} />
              <AssetImage name="search-arrow.svg" width={13} height={13} />
            </button>
          </form>
        </header>

        <div className="hospital-content">
          <section
            className="hospital-card departments-card"
            aria-label="常用科室"
          >
            {departments.map((department) => (
              <button
                type="button"
                className="department-item"
                key={department.label}
                onClick={() => showNotice(`已选择${department.label}`)}
              >
                <span className="department-image">
                  <AssetImage
                    name={department.image}
                    alt=""
                    width={44}
                    height={44}
                  />
                </span>
                <span>{department.label}</span>
              </button>
            ))}
          </section>

          <section className="hospital-card visit-card" aria-label="便捷就医">
            <div className="visit-benefits">
              <span>
                <AssetImage name="correct.svg" width={12} height={12} />
                科学智能匹配
              </span>
              <span>
                <AssetImage name="correct.svg" width={12} height={12} />
                便捷问诊服务
              </span>
              <span>
                <AssetImage name="correct.svg" width={12} height={12} />
                专家资源丰富
              </span>
            </div>
            <div className="visit-grid">
              {visitServices.map((service, index) => (
                <button
                  type="button"
                  className={`visit-item visit-item-${index + 1}`}
                  key={service.title}
                  onClick={() => showNotice(`${service.title}服务即将开启`)}
                >
                  <AssetImage
                    name={service.image}
                    alt=""
                    width={44}
                    height={44}
                  />
                  <strong>{service.title}</strong>
                  <span>{service.subtitle}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="hospital-card zone-card">
            <h2>特色专区</h2>
            <div className="zone-scroller">
              {zones.map((zone, index) => (
                <button
                  type="button"
                  className={`zone-item zone-${zone.color}`}
                  key={`${zone.label}-${index}`}
                  onClick={() => showNotice(zone.label)}
                >
                  <AssetImage name={zone.image} alt="" width={52} height={52} />
                  <span>{zone.label}</span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="hospital-banner"
            onClick={() => showNotice("早孕门诊活动详情")}
            aria-label="查看早孕门诊活动"
          >
            <AssetImage
              name="banner.png"
              alt="早孕门诊，照亮新生命最初旅程"
              width={694}
              height={150}
            />
            <span className="banner-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>

          <section className="hospital-card feature-card">
            <h2>特色服务</h2>
            <div className="feature-grid">
              {featureServices.map((service) => (
                <button
                  type="button"
                  key={service.label}
                  onClick={() => showNotice(`${service.label}服务即将开启`)}
                >
                  <AssetImage
                    name={service.image}
                    alt=""
                    width={34}
                    height={34}
                  />
                  <span>{service.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="hospital-card science-card">
            <div className="science-heading">
              <h2>科普推荐</h2>
              <button
                type="button"
                onClick={() => showNotice("查看更多科普文章")}
              >
                <span>更多</span>
                <AssetImage name="more.svg" alt="" width={18} height={16} />
              </button>
            </div>
            <div
              className="science-filters"
              role="tablist"
              aria-label="科普分类"
            >
              {["全部", "检查检验", "孕期营养", "孕期保健"].map((filter) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter}
                  className={activeFilter === filter ? "active" : ""}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="article-list">
              {articles.map((article, index) => (
                <article className="article-item" key={article.title}>
                  <div className="article-copy">
                    <h3>{article.title}</h3>
                    <div className="article-tags">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          className={
                            tagIndex === 1 || article.pinned ? "tag-accent" : ""
                          }
                          key={tag}
                        >
                          {article.pinned && tagIndex === 0 ? "◆ " : ""}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="article-image">
                    <AssetImage
                      name={article.image}
                      alt=""
                      width={100}
                      height={80}
                    />
                  </div>
                  {!article.pinned && (
                    <div className="article-meta">
                      <time dateTime="2026-02-23">2026-02-23</time>
                      <span className="article-count">
                        <AssetImage name="eye.svg" width={16} height={16} />{" "}
                        2.3K
                        <button
                          type="button"
                          aria-label={
                            likedArticles.includes(index) ? "取消点赞" : "点赞"
                          }
                          className={
                            likedArticles.includes(index) ? "liked" : ""
                          }
                          onClick={() => toggleLike(index)}
                        >
                          <AssetImage name="thumb.svg" width={16} height={16} />
                          {likedArticles.includes(index) ? "2.4K" : "2.3K"}
                        </button>
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        <button
          type="button"
          className="hospital-assistant"
          onClick={() => showNotice("华华助手正在为您服务")}
        >
          <span>
            <AssetImage
              name="assistant.png"
              alt="华华助手"
              width={42}
              height={42}
            />
          </span>
          <small>华华助手</small>
        </button>

        <nav className="hospital-bottom-nav" aria-label="互联网医院功能导航">
          {navItems.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={activeNav === index ? "active" : ""}
              onClick={() => {
                setActiveNav(index);
                showNotice(item.label);
              }}
            >
              <span className="nav-icon">
                <AssetImage name={item.image} alt="" width={24} height={24} />
                {index === 0 && <i />}
              </span>
              <small>{item.label}</small>
            </button>
          ))}
        </nav>

        <div className="hospital-home-indicator" aria-hidden="true" />
        {notice && (
          <div className="hospital-toast" role="status">
            {notice}
          </div>
        )}
      </div>
    </main>
  );
}
