export type NewsTag = "新闻快讯" | "市场调研";

export type NewsPost = {
  id: string;
  tag: NewsTag;
  title: string;
  desc: string;
  date: string;
  image: string;
  imageAlt: string;
};

export const newsPosts: NewsPost[] = [
  {
    id: "embodied-robot",
    tag: "市场调研",
    title:
      "成都华西数字医疗科技有限公司具身智能机器人采购价格市场调研公告",
    desc: "为了保障我公司研发，现就具身智能机器人参数及采购价格进行市场调研。我们诚邀具备相关资质和能力的供应商参与此次市场调研活动，按要求提供产品参数及报价。",
    date: "2026年03月02日",
    image: "/img/news/embodied-robot.jpg?v=2",
    imageAlt: "具身智能机器人",
  },
  {
    id: "chengdu-ai-medical",
    tag: "新闻快讯",
    title:
      "数智赋能破局·创新同频共生|华西数医亮相2026成都AI医疗创新交流大会",
    desc: "2026年2月6日，“破局·共生——2026成都AI医疗创新交流大会”在成都隆重启幕，华西数医作为AI医疗领域的创新践行者与临床赋能先行者受邀参展。",
    date: "2026年02月06日",
    image: "/img/news/chengdu-ai-medical-conference.jpg?v=2",
    imageAlt: "2026成都AI医疗创新交流大会现场",
  },
  {
    id: "tiyi-ronghe",
    tag: "新闻快讯",
    title: "当运动遇见医疗：华西妇幼体医融合平台，开启健康管理新篇章",
    desc: "10月31日，由四川省优生托育协会、西部妇幼医学研究发展中心联合主办，四川大学华西第二医院、四川省优生托育协会体医融合分会承办的“2025年体医融合与生殖健康——体医融合在生殖健康维护与疾病防治中的应用”主题活动顺利举行。",
    date: "2026年01月19日",
    image: "/img/news/tiyi-ronghe-conference.jpg?v=2",
    imageAlt: "2025年体医融合与生殖健康大会现场",
  },
  {
    id: "lmg-2025",
    tag: "新闻快讯",
    title:
      "第四届全国大模型智能生成大会顺利闭幕，华西数医携数字医生勾勒AI医疗新生态",
    desc: "第四届全国大模型智能生成大会（LMG 2025）在四川成都成功举办，华西数医携数字医生亮相，展示AI医疗创新成果。",
    date: "2026年01月19日",
    image: "/img/news/lmg-2025-conference.jpg?v=2",
    imageAlt: "第四届全国大模型智能生成大会 LMG 2025 现场",
  },
  {
    id: "xibu-jianbohui",
    tag: "新闻快讯",
    title:
      "华西数医亮相首届西部健博会：AI数智产品引热议，共孵医疗创新新生态",
    desc: "2025年10月10日至12日，以“健康四川·健联未来”为主题的首届西部（成都）健康促进博览会在中国西部国际博览城盛大举办。",
    date: "2026年01月19日",
    image: "/img/news/xibu-jianbohui.jpg?v=2",
    imageAlt: "华西数字医生 AI 数智应用体验区",
  },
  {
    id: "maic-digital-doctor",
    tag: "新闻快讯",
    title: "人机共智 数智共融 | 华西数医亮相MAIC大会 引领智算时代新生态",
    desc: "9月26日至28日，首届医学人工智能大会（MAIC）在山东省济南市召开，华西数医受邀参会并分享数智医疗实践。",
    date: "2026年01月19日",
    image: "/img/news/maic-digital-doctor.jpg?v=2",
    imageAlt: "华西妇幼数字医生问诊间展台",
  },
  {
    id: "huaxi-fuyou",
    tag: "新闻快讯",
    title:
      "AI赋能医疗革新 创新驱动数智底座 —— 华西数医亮相第四届华西妇幼国际会议",
    desc: "2025年7月18-19日，由四川省优生托育协会、海南博鳌医学创新研究院主办，四川大学华西第二医院承办的第四届华西妇幼国际会议在成都世纪城国际会议中心盛大启幕。",
    date: "2026年01月19日",
    image: "/img/news/huaxi-fuyou-conference.jpg?v=2",
    imageAlt: "第四届华西妇幼国际会议现场",
  },
];

export const homepageNewsPosts = newsPosts.slice(0, 3);
