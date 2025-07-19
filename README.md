# 🌳 PraxisGrove

<div align="center">

![PraxisGrove Logo](./logo/android-chrome-192x192.png)

**重新定义在线教育 - AI驱动的沉浸式学习平台**

_融合人工智能、3D可视化与社区协作，打造无边界的知识探索体验_

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.178.0-000000?style=flat-square&logo=three.js)](https://threejs.org/)

[🚀 立即体验](https://www.praxisgrove.com) | [📖 产品文档](./docs) | [💬 加入社区](https://github.com/PraxisGrove/website/discussions) | [🐛 反馈问题](https://github.com/PraxisGrove/website/issues)

</div>

## 🎯 产品愿景

PraxisGrove 致力于构建下一代在线教育生态系统，通过前沿技术与教育理念的深度融合，让每个人都能享受到个性化、沉浸式的学习体验。我们相信，真正的教育应该是无边界的、智能化的、永续的。

### ✨ 核心价值

- **� 智能驱化学习** - AI助手提供24/7个性化指导，让学习更高效
- **🌐 沉浸式体验** - 3D知识地图让抽象概念变得可视化、可交互
- **🤝 社区驱动** - 连接全球学习者，共建知识生态
- **� 多数据驱动** - 深度学习分析，持续优化学习路径
- **� 开放包容** - 无门槛访问，让优质教育触手可及
- **⚡ 永续记录** - 区块链技术确保学习成果永久可信

## 🚀 产品功能

### 🔐 身份认证与权限管理

- **多元化登录** - 邮箱密码、OAuth社交登录、双因素认证
- **智能档案** - 个性化用户画像，学习偏好自动识别
- **分级权限** - 学习者、创作者、专家、管理员多角色体系
- **安全防护** - 端到端加密，会话管理，隐私保护

### 🎓 学习管理

- **课程系统** - 完整的课程创建、管理和学习功能
- **进度跟踪** - 详细的学习进度和成就系统
- **多媒体支持** - 视频播放、文档阅读、交互式内容
- **个性化推荐** - 基于学习历史的智能推荐

### 🤖 AI智能助手

- **智能问答** - 基于大语言模型的24/7学习助手，支持多轮对话
- **个性化推荐** - 分析学习行为，智能推荐最适合的内容和路径
- **自适应学习** - 根据掌握程度动态调整难度和节奏
- **多模态交互** - 支持文字、语音、图像等多种交互方式
- **专业领域** - 涵盖编程、数学、科学、语言等多个学科领域

### 🌐 3D知识宇宙

- **立体知识图谱** - 将抽象知识转化为可探索的3D空间
- **沉浸式导航** - 自由飞行、缩放、旋转，如同探索宇宙
- **智能关联** - 动态展示概念间的依赖关系和相似度
- **学习轨迹** - 可视化个人学习历程和成长路径
- **协作空间** - 多人同时探索，实时分享发现和见解

### 👥 学习社区

- **智能匹配** - 基于兴趣和水平匹配学习伙伴
- **知识市场** - 用户创作内容的分享与交易平台
- **专家网络** - 连接行业专家，提供权威指导
- **学习圈子** - 围绕特定主题建立深度学习社群
- **成就系统** - 游戏化激励机制，让学习更有趣

### 🌍 国际化支持

- **多语言切换** - 中文/英文无缝切换
- **本地化格式** - 日期、数字、时间格式化
- **响应式语言选择器** - 桌面和移动端适配
- **智能语言检测** - 自动检测用户首选语言

### 🎨 现代化设计

- **深色/浅色主题** - 完整的主题切换系统
- **响应式布局** - 完美适配所有设备尺寸
- **流畅动画** - 精心设计的过渡效果
- **无障碍支持** - 符合WCAG标准的可访问性

## 🔐 身份认证系统

### 🚪 多样化登录方式

| 登录类型    | 支持平台                     | 特色功能               |
| ----------- | ---------------------------- | ---------------------- |
| 📧 邮箱登录 | 通用邮箱                     | 密码强度检测、找回密码 |
| 🔗 社交登录 | Google、GitHub、微信、支付宝 | 一键授权、信息同步     |
| 🔒 安全登录 | TOTP、SMS                    | 双因素认证、生物识别   |
| 🎓 教育登录 | 学校邮箱、教育机构           | 身份验证、批量管理     |

### 👥 用户角色体系

```
🔧 管理员   ├─ 系统配置、用户管理、内容审核
👨‍🎓 用户     ├─ 课程学习、内容创作、社区参与
👤 访客     └─ 浏览内容、试用功能
```

### � 注册加与认证流程

```mermaid
graph TD
    A[访问平台] --> B{选择注册方式}
    B -->|邮箱注册| C[填写基本信息]
    B -->|社交登录| D[第三方授权]
    C --> E[邮箱验证]
    D --> F[信息确认]
    E --> G[完善个人档案]
    F --> G
    G --> H[设置学习偏好]
    H --> I[开始学习之旅]
```

### 🛡️ 安全防护机制

- **🔐 数据加密** - bcrypt密码哈希 + AES-256数据加密
- **🎫 会话管理** - JWT令牌 + Redis会话存储
- **🛡️ 攻击防护** - CSRF保护 + XSS过滤 + SQL注入防护
- **⏰ 智能监控** - 异常登录检测 + 自动会话过期
- **🔍 审计日志** - 完整的用户行为记录与分析
- **🌐 隐私保护** - GDPR合规 + 数据最小化原则

## 🛠️ 技术架构

### 🎨 前端技术栈

```
🏗️ 核心框架   Next.js 15 (App Router) + TypeScript 5.0 + React 18
🎨 样式方案   Tailwind CSS 4.0 + shadcn/ui + Aceternity UI +Radix UI + CSS Modules
🌐 3D渲染    Three.js + React Three Fiber + Drei + React Three Rapier
📊 状态管理   Zustand + TanStack Query + Jotai + React Context
🔐 认证系统   NextAuth.js v5 + JWT + OAuth 2.0 + Clerk (可选)
📝 表单处理   React Hook Form + Zod + TypeScript + React Select
🎭 动画效果   Framer Motion + Lottie React + CSS Transitions
🌍 国际化    next-intl + React Intl + ICU MessageFormat
📱 移动适配   PWA + Responsive Design + Touch Gestures
🔍 搜索功能   Algolia + Fuse.js + React InstantSearch
📊 图表可视化 Recharts + D3.js + Observable Plot
🎵 多媒体    React Player + Web Audio API + MediaRecorder
```

### ⚡ 性能优化

- **代码分割** - 基于路由和组件的自动代码分割
- **图像优化** - Next.js Image 组件 + WebP/AVIF 格式 + 响应式图片
- **缓存策略** - SWR + React Query + Service Worker + CDN缓存
- **懒加载** - React.lazy + Intersection Observer + 虚拟滚动
- **预加载** - Link prefetch + Resource hints + Critical CSS
- **Bundle优化** - Tree shaking + Code splitting + Dynamic imports
- **渲染优化** - SSR + SSG + ISR + Streaming + React Suspense

### 🔧 开发工具链

```
📦 包管理器   pnpm + Workspace + Volta (Node版本管理)
🔍 代码质量   ESLint + Prettier + Stylelint + Husky + lint-staged
🧪 测试框架   Vitest + Testing Library + Playwright + Storybook
⚡ 构建工具   Turbopack + SWC + PostCSS + Autoprefixer
🚀 部署平台   Vercel + GitHub Actions + Docker + Nginx
📊 监控分析   Vercel Analytics + Sentry + Lighthouse CI
🔧 开发体验   VS Code + TypeScript + Tailwind IntelliSense
```

## 📁 项目文件结构

### 🌳 目录结构概览

```
src/
├── api/                          # API 服务层
│   ├── auth.ts                   # 认证相关 API 服务
│   └── courses.ts                # 课程相关 API 服务
├── app/                          # Next.js 15 App Router 路由
│   ├── (auth)/                   # 认证路由组
│   │   ├── layout.tsx            # 认证页面布局
│   │   ├── login/
│   │   │   └── page.tsx          # 登录页面
│   │   └── register/
│   │       └── page.tsx          # 注册页面
│   ├── (main)/                   # 主应用路由组
│   │   ├── layout.tsx            # 主应用布局
│   │   ├── dashboard/
│   │   │   └── page.tsx          # 学习仪表板
│   │   ├── courses/
│   │   │   ├── page.tsx          # 课程列表页
│   │   │   └── [id]/
│   │   │       └── page.tsx      # 课程详情页（动态路由）
│   │   └── knowledge-universe/
│   │       └── page.tsx          # 3D知识宇宙页面
│   ├── api/                      # API 路由
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts      # 登录 API 端点
│   │   │   └── logout/
│   │   │       └── route.ts      # 登出 API 端点
│   │   └── courses/
│   │       └── route.ts          # 课程 API 端点
│   ├── layout.tsx                # 根布局组件
│   └── page.tsx                  # 首页
├── components/                   # React 组件库
│   ├── 3d/                       # 3D 相关组件
│   ├── aceternity/               # Aceternity UI 组件
│   └── ui/                       # 基础 UI 组件
├── contexts/                     # React Context 提供者
│   ├── providers.tsx             # 应用程序提供者集合
│   ├── auth-provider.tsx         # 认证上下文提供者
│   ├── theme-provider.tsx        # 主题上下文提供者
│   └── notification-provider.tsx # 通知上下文提供者
├── hooks/                        # 自定义 React Hooks
├── lib/                          # 工具库和配置
│   ├── api.ts                    # API 客户端封装
│   ├── env.ts                    # 环境变量配置
│   ├── query-client.ts           # TanStack Query 配置
│   ├── storage.ts                # 本地存储管理
│   └── utils.ts                  # 通用工具函数
├── store/                        # 状态管理
│   ├── auth.ts                   # 认证状态管理（Zustand）
│   └── ui.ts                     # UI 状态管理（Zustand）
├── styles/                       # 样式文件
│   └── globals.css               # 全局样式
├── test/                         # 测试配置
│   └── setup.ts                  # 测试环境设置
├── types/                        # TypeScript 类型定义
│   └── api.ts                    # API 相关类型定义
├── utils/                        # 工具函数
└── middleware.ts                 # Next.js 中间件
```

### 🔧 核心架构文件详解

#### 🛣️ 路由系统

- **`middleware.ts`** - 路由中间件，处理认证检查、权限控制、安全头设置
- **`app/(auth)/`** - 认证相关页面路由组，包含登录、注册等页面
- **`app/(main)/`** - 主应用功能页面路由组，包含仪表板、课程、知识宇宙等
- **`app/api/`** - API 路由，提供后端接口服务

#### 🗄️ 状态管理

- **`store/auth.ts`** - 用户认证状态管理，包含登录、登出、用户信息等
- **`store/ui.ts`** - UI 状态管理，包含主题、语言、通知、模态框等
- **`contexts/providers.tsx`** - 应用程序提供者集合，整合所有 Context
- **`contexts/auth-provider.tsx`** - 认证上下文，提供认证状态和方法
- **`contexts/theme-provider.tsx`** - 主题上下文，处理深色/浅色主题切换
- **`contexts/notification-provider.tsx`** - 通知上下文，管理全局通知系统

#### 🌐 API 服务层

- **`lib/api.ts`** - HTTP 客户端封装，包含请求/响应拦截器、错误处理
- **`api/auth.ts`** - 认证相关 API 服务，登录、注册、用户管理等
- **`api/courses.ts`** - 课程相关 API 服务，课程列表、详情、进度等
- **`lib/query-client.ts`** - TanStack Query 配置，数据获取和缓存策略
- **`types/api.ts`** - API 接口类型定义，确保类型安全

#### 🔧 工具库

- **`lib/storage.ts`** - 本地存储管理，支持 localStorage、sessionStorage、cookie
- **`lib/env.ts`** - 环境变量配置和验证
- **`lib/utils.ts`** - 通用工具函数，如类名合并、格式化等

#### 🎨 组件系统

- **`components/ui/`** - 基础 UI 组件库，按钮、输入框、模态框等
- **`components/3d/`** - 3D 相关组件，Three.js 封装组件
- **`components/aceternity/`** - Aceternity UI 高级组件

### 🏗️ 架构特点

#### ✅ 已完成的核心架构（第1.2节）

1. **路由结构规划** ✅
   - Next.js 15 App Router 完整目录结构
   - 路由组织与嵌套关系（认证路由组、主应用路由组）
   - 动态路由配置（课程详情页）
   - 路由中间件（认证检查、权限控制、安全防护）

2. **状态管理架构** ✅
   - Zustand 全局状态管理（认证状态、UI状态）
   - TanStack Query 服务器状态管理配置
   - React Context 架构（认证、主题、通知）
   - 本地存储策略（支持多种存储方式）

3. **API 服务层** ✅
   - Axios HTTP 客户端封装
   - 请求拦截器（Token 自动注入、请求追踪）
   - 响应拦截器（统一错误处理、自动重定向）
   - 完整的 TypeScript 类型定义
   - 错误处理机制（用户友好的错误提示）

#### 🔒 安全特性

- **认证保护** - JWT Token 自动管理和验证
- **路由守卫** - 基于角色的访问控制
- **安全头** - CSP、XSS 防护、CSRF 保护
- **数据验证** - Zod 数据验证和类型安全

#### ⚡ 性能优化

- **智能缓存** - TanStack Query 数据缓存策略
- **代码分割** - 基于路由的自动代码分割
- **类型安全** - 完整的 TypeScript 类型系统
- **错误边界** - 优雅的错误处理和用户反馈

## 🤝 参与贡献

我们欢迎所有形式的贡献！无论是代码、设计、文档还是想法。

### 贡献方式

- 🐛 [报告 Bug](https://github.com/PraxisGrove/website/issues/new?template=bug_report.md)
- 💡 [提出功能建议](https://github.com/PraxisGrove/website/issues/new?template=feature_request.md)
- 📝 [改进文档](https://github.com/PraxisGrove/website/tree/main/docs)
- 🔧 [提交代码](https://github.com/PraxisGrove/website/pulls)

### 开发规范

- 遵循 [代码规范](./docs/CODING_STANDARDS.md)
- 提交前运行 `pnpm lint` 和 `pnpm test`
- 使用 [约定式提交](https://www.conventionalcommits.org/zh-hans/)

## 🏆 致谢与支持

感谢所有为 PraxisGrove 项目做出贡献的开发者、设计师和教育工作者。

### 开源致谢

- [Next.js](https://nextjs.org/) - 强大的 React 全栈框架
- [Three.js](https://threejs.org/) - 卓越的 3D 图形库
- [Tailwind CSS](https://tailwindcss.com/) - 高效的 CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 优雅的组件库

## 📞 联系我们

<div align="center">

| 渠道       | 链接                                                                     | 描述               |
| ---------- | ------------------------------------------------------------------------ | ------------------ |
| 🌐 官网    | [praxisgrove.com](https://www.praxisgrove.com)                           | 产品体验与最新资讯 |
| 📧 邮箱    | [contact@praxisgrove.com](mailto:contact@praxisgrove.com)                | 商务合作与技术支持 |
| 💬 社区    | [GitHub Discussions](https://github.com/PraxisGrove/website/discussions) | 用户交流与问题讨论 |
| 🐙 GitHub  | [@PraxisGrove](https://github.com/PraxisGrove)                           | 开源代码与项目管理 |
| 🐦 Twitter | [@PraxisGrove](https://twitter.com/PraxisGrove)                          | 产品动态与行业洞察 |

</div>

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE) 许可证。

```
Copyright 2025 PraxisGrove

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

<div align="center">

**🌟 如果这个项目对你有帮助，请给我们一个 Star！**

Made with ❤️ by the PraxisGrove Team

</div>
