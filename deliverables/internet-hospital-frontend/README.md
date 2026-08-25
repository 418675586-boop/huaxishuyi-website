# 华西二院互联网医院页面交付包

本交付包同时包含 Next.js/React 源码和可独立运行的 HTML/CSS/JavaScript 静态版本。

## 技术要求

- Next.js App Router
- React
- TypeScript
- 项目需要支持 `@/` 指向项目根目录的路径别名

## 接入方式

### HTML 静态版本

直接打开下面的文件即可预览，不需要安装依赖：

```text
static-html/index.html
```

静态版文件：

```text
static-html/index.html
static-html/styles.css
static-html/script.js
static-html/assets/*
```

复制或部署 `static-html` 整个目录即可，不能单独移动 `index.html`，否则相对资源路径会失效。

### Next.js/React 版本

将交付包中的目录按原结构复制到 Next.js 项目根目录：

```text
app/internet-hospital/page.tsx
components/internet-hospital.tsx
components/internet-hospital.css
public/figma/internet-hospital/*
```

启动项目后访问：

```text
/internet-hospital
```

## 文件说明

- `app/internet-hospital/page.tsx`：页面路由及 SEO 信息
- `components/internet-hospital.tsx`：完整页面结构与交互逻辑
- `components/internet-hospital.css`：页面全部样式和移动端布局
- `public/figma/internet-hospital/`：页面实际使用的图片与 SVG 资源

## 开发说明

- 页面基准宽度为 `375px`，宽屏环境下居中展示。
- 图片资源通过 `/figma/internet-hospital/` 绝对路径加载。
- 搜索、筛选、点赞、底部导航及提示反馈已经提供前端交互状态。
- 问诊、专区和服务入口目前使用前端提示占位；接入业务时可在对应按钮的 `onClick` 中替换为路由跳转或接口逻辑。
- 页面依赖 Next.js 内置的 `next/image`，无需额外 UI 组件库。

## 验收页面

本地开发地址：

```text
http://127.0.0.1:3000/internet-hospital
```

## 交付检查

- 页面入口和组件已通过 ESLint 检查。
- 交付文件已通过 Prettier 格式检查。
- 当前原项目的全量 TypeScript 检查仍包含 `components/react-bits/` 中的既有报错；本交付页面相关文件未产生 ESLint 报错。
