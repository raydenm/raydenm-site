# Raydenm personal website.

## Overview

- `/` — Home page.
- `/writing` — Writing page.
- `/writing/[slug]` — Static pre-rendered writing pages using [Contentful](https://www.contentful.com).
- `/stack` — Stack page.
- `/bookmarks` — Bookmarks page.
- `/bookmarks/[slug]` — Static pre-rendered bookmarks pages using [Raindrop](https://raindrop.io/).
- `/photo` - Photo page.
- `/journey` - Journey page.
- `/api` — API routes.

## Running Locally

Create a `.env` file similar to [`.env.example`].

## Tech Stack

- [Next.js](https://nextjs.org) 用于构建快速、支持服务端渲染和静态网站的 React 框架，提供强大的功能如 API 路由和自动代码
  分割。
- [Tailwind CSS](https://tailwindcss.com) 实用性优先的 CSS 框架，提供低级样式工具，帮助快速创建完全响应式的现代设计。
- [Shadcn UI](https://ui.shadcn.com) 基于 Tailwind 和 Radix 构建的可自定义 UI 组件库，提供预设计的组件，加快开发速度。
- [Contentful](https://www.contentful.com) 无头 CMS，允许你通过灵活的 API 管理和交付跨数字渠道的内容。
- [Raindrop](https://raindrop.io) 智能书签工具，帮助你高效地组织、保存和分享网页内容。
- [Supabase](https://supabase.com) 一个开源的后端即服务平台，提供实时数据库、认证和 API 端点。
- [Resend](https://resend.com) 开发者友好的电子邮件服务，通过 API 简化邮件发送，并支持现代邮件模板。
- [Giscus](https://giscus.app) 开源、集成 GitHub 的评论系统，使用 GitHub Discussions 管理你网站上的评论。
- [Umami](https://umami.is) 轻量级的开源网站分析工具，提供隐私友好的数据洞察，无需依赖 cookies 或跟踪脚本。
- [Cloudflare](https://cloudflare.com) 全球领先的内容分发网络（CDN）和安全服务提供商，全球部署的 CDN，提供边缘函数。
