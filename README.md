# 近一年 X 顶级文章与 Thread

精选过去一年全球范围内，在 **Agent / AI / OPC / 写作 / 品味 / 营销 / 数字营销 / 变现** 等领域最具影响力的 X 长文与 Thread 目录站。

> 按领域顶尖作者 `from:` 检索 + 互动阈值（赞 / 收藏 / 曝光）筛选，去重后按综合推荐分排序；**不是**单一话题热帖榜。

## 功能

- **多维排序**：推荐度 · 时间最新 · 观看量 · 点赞 · 收藏
- **领域筛选**：Agent / AI / OPC / 写作 / 品味 / 营销 / 数字营销 / 变现
- **类型筛选**：长文 Article · Thread · 帖子 Post
- **搜索**：标题、作者、句柄、摘要
- **中英双语** + 深浅色主题
- 精美目录布局（Magic UI / shadcn 风格灵感 · Vite 静态站）

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173/x-top-threads/
npm run build    # 输出到 dist/
npm run preview  # 预览生产构建
```

## 数据

- 源数据：`data/items.json`
- 站点读取：`public/data/items.json`（构建时一并打包）

当前收录 **105** 条（28 位作者）。

## GitHub Pages

仓库名建议：`x-top-threads`  
Pages URL：`https://<user>.github.io/x-top-threads/`

`vite.config.ts` 已设置 `base: '/x-top-threads/'`。

## 技术栈

Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide React

设计参考开源模板（MIT）：Vetra、saas-landing-template 的视觉模式；组件灵感来自 Pamela 长文中的 shadcn / Magic UI / Aceternity / Motion 清单。

## 在线访问

https://davidliu12-code.github.io/x-top-threads/

仓库：https://github.com/DavidLiu12-code/x-top-threads
