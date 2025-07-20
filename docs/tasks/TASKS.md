# 🚀 PraxisGrove 前端开发任务规划

## 📋 项目概览

PraxisGrove 是一个纯前端的 AI 驱动沉浸式在线教育平台，基于 Next.js 15 构建，通过 RESTful API 与后端服务交互。

## 🎯 核心开发阶段

### 阶段 1: 项目基础设施

#### 1.1 项目脚手架与环境

- [x] **Next.js 15 项目初始化**
  - [x] App Router + TypeScript 配置
  - [x] Tailwind CSS 4.0 + shadcn/ui 集成
  - [x] Aceternity UI 安装配置
  - [x] Three.js + React Three Fiber 依赖安装
  - [x] ESLint + Prettier + Husky 配置
  - [x] pnpm 包管理器设置

- [x] **开发环境配置**
  - [x] Turbopack 开发服务器
  - [x] 环境变量管理 (.env)
  - [x] API 基础 URL 配置
  - [x] 代理设置 (开发环境)

- [x] **测试与质量保证**
  - [x] Vitest + Testing Library 配置
  - [x] Playwright E2E 测试配置
  - [x] Storybook 组件文档配置
  - [x] 代码覆盖率配置

#### 1.2 核心架构设计

- [x] **路由结构规划**
  - [x] App Router 目录结构
  - [x] 路由组织与嵌套
  - [x] 动态路由配置
  - [x] 路由中间件设置

- [x] **状态管理架构**
  - [x] Zustand 全局状态设计
  - [x] TanStack Query 配置
  - [x] React Context 设计
  - [x] 本地存储策略

- [x] **API 服务层**
  - [x] Axios/Fetch 封装
  - [x] 请求拦截器 (Token 注入)
  - [x] 响应拦截器 (错误处理)
  - [x] API 类型定义 (TypeScript)
  - [x] 错误处理机制

### 阶段 2: 核心 UI 组件库

#### 2.1 基础组件开发

- [x] **Aceternity UI 定制**
  - [x] 组件库主题定制
  - [x] 动画效果配置
  - [x] 组件样式覆盖
  - [x] 自定义组件扩展

- [x] **通用组件**
  - [x] Button, Input, Select 组件
  - [x] Modal, Dialog, Drawer 组件
  - [x] Table, Pagination 组件
  - [x] Loading, Skeleton 组件
  - [x] Toast, Notification 组件

- [x] **布局组件**
  - [x] Header 导航组件
  - [x] Footer 页脚组件
  - [x] Sidebar 侧边栏组件
  - [x] Layout 布局容器
  - [x] 响应式网格系统
  - [x] 集成 /logo 目录下的 logo 文件和 ico

- [x] **表单组件**
  - [x] React Hook Form 集成
  - [x] 表单验证 (Zod)
  - [x] 文件上传组件

#### 2.2 首页定制

- [x] **首页核心布局**
  - [x] Hero 区域设计
  - [x] 功能特性展示区
  - [x] 产品介绍区域
  - [x] 用户推荐/案例展示
  - [x] CTA (Call-to-Action) 区域

- [x] **交互与导航**
  - [x] 主导航菜单
  - [x] 快速入口按钮
  - [x] 滚动导航指示器
  - [x] 返回顶部功能
  - [x] 页面内锚点跳转

- [x] **视觉效果与动画**
  - [x] Aceternity UI 背景效果
  - [x] 页面滚动视差效果
  - [x] 元素进入动画
  - [x] 悬停交互效果
  - [x] 加载动画优化

- [x] **响应式与性能**
  - [x] 移动端适配
  - [x] 平板端优化
  - [x] 图片懒加载
  - [x] 关键资源预加载
  - [x] 首屏渲染优化

- [x] **SEO 与可访问性**
  - [x] Meta 标签优化
  - [x] 结构化数据标记
  - [x] 语义化 HTML
  - [x] 键盘导航支持
  - [x] 屏幕阅读器优化

#### 2.3 主题与国际化

- [ ] **主题系统**
  - [ ] 深色/浅色主题
  - [ ] 主题切换组件
  - [ ] CSS 变量配置
  - [ ] 主题持久化

- [ ] **多语言支持**
  - [ ] next-intl 配置
  - [ ] 语言切换器
  - [ ] 翻译文件管理
  - [ ] 动态语言加载

- [ ] **错误处理**
  - [ ] 全局错误边界
  - [ ] 404 页面
  - [ ] 500 错误页面
  - [ ] 错误日志收集

### 阶段 3: 身份认证系统

#### 3.1 认证 UI 组件

- [ ] **登录注册界面**
  - [ ] 登录表单组件
  - [ ] 注册表单组件
  - [ ] 密码重置界面
  - [ ] 社交登录按钮

- [ ] **认证状态管理**
  - [ ] Token 存储 (localStorage/cookie)
  - [ ] 用户信息状态
  - [ ] 登录状态检查
  - [ ] 自动登录/退出

#### 3.2 权限控制系统

- [ ] **路由守卫**
  - [ ] 私有路由组件
  - [ ] 权限检查中间件
  - [ ] 未授权重定向
  - [ ] 角色权限判断

- [ ] **用户界面**
  - [ ] 个人资料页面
  - [ ] 设置页面
  - [ ] 头像上传组件
  - [ ] 偏好设置界面

### 阶段 4: 学习管理前端

#### 4.1 课程展示界面

- [ ] **课程列表页面**
  - [ ] 课程卡片组件
  - [ ] 搜索过滤功能
  - [ ] 分页组件
  - [ ] 排序功能

- [ ] **课程详情页面**
  - [ ] 课程信息展示
  - [ ] 课程大纲组件
  - [ ] 评价评论区
  - [ ] 报名/学习按钮

#### 4.2 学习进度界面

- [ ] **学习仪表板**
  - [ ] 进度统计图表
  - [ ] 学习日历
  - [ ] 成就展示
  - [ ] 推荐课程

- [ ] **多媒体播放器**
  - [ ] 视频播放组件
  - [ ] 进度记录
  - [ ] 播放控制
  - [ ] 笔记功能

### 阶段 5: AI 助手前端

#### 5.1 聊天界面

- [ ] **对话组件**
  - [ ] 消息列表组件
  - [ ] 输入框组件
  - [ ] 消息气泡样式
  - [ ] 打字动画效果

- [ ] **AI 交互功能**
  - [ ] 实时消息发送
  - [ ] 流式响应处理
  - [ ] 消息历史记录
  - [ ] 上下文管理

#### 5.2 智能推荐界面

- [ ] **推荐展示**
  - [ ] 推荐卡片组件
  - [ ] 推荐理由说明
  - [ ] 用户反馈收集
  - [ ] 个性化设置

### 阶段 6: 3D 知识宇宙前端

#### 6.1 3D 渲染系统

- [x] **Three.js 集成**
  - [x] React Three Fiber 设置
  - [x] 3D 场景组件
  - [x] 相机控制
  - [ ] 性能优化

- [x] **知识图谱可视化**
  - [x] 节点渲染组件
  - [x] 连接线绘制
  - [x] 动态布局
  - [x] 交互响应

#### 6.2 3D 交互界面

- [ ] **导航控制**
  - [ ] 鼠标/触摸控制
  - [ ] 缩放平移功能
  - [ ] 视角切换
  - [ ] 导航辅助UI

- [ ] **信息展示**
  - [ ] 节点信息面板
  - [ ] 详情弹窗
  - [ ] 搜索定位
  - [ ] 路径高亮

### 阶段 7: 社区功能前端

#### 7.1 社交界面

- [ ] **用户社交**
  - [ ] 用户列表页面
  - [ ] 用户详情页面
  - [ ] 关注/粉丝列表
  - [ ] 私信功能

- [ ] **内容发布**
  - [ ] 动态发布组件
  - [ ] 内容编辑器
  - [ ] 图片上传
  - [ ] 发布设置

#### 7.2 社区互动

- [ ] **讨论区界面**
  - [ ] 帖子列表
  - [ ] 帖子详情
  - [ ] 评论回复
  - [ ] 点赞收藏

- [ ] **学习圈子**
  - [ ] 圈子列表
  - [ ] 圈子详情
  - [ ] 成员管理
  - [ ] 活动展示

### 阶段 8: 性能优化与部署

#### 8.1 前端性能优化

- [ ] **代码优化**
  - [ ] 代码分割
  - [ ] 懒加载实现
  - [ ] Bundle 分析
  - [ ] Tree shaking

- [ ] **资源优化**
  - [ ] 图片优化
  - [ ] 字体优化
  - [ ] 缓存策略
  - [ ] CDN 配置

- [ ] **SEO 优化**
  - [ ] 元数据管理
  - [ ] Sitemap 生成
  - [ ] 结构化数据
  - [ ] Open Graph 配置

#### 8.2 部署与监控

- [ ] **PWA 配置**
  - [ ] Service Worker
  - [ ] Web App Manifest
  - [ ] 离线功能
  - [ ] 推送通知

- [ ] **部署配置**
  - [ ] Vercel 部署
  - [ ] 环境变量配置
  - [ ] 域名配置
  - [ ] HTTPS 设置

- [ ] **监控分析**
  - [ ] Sentry 错误监控
  - [ ] Vercel Analytics
  - [ ] 性能监控
  - [ ] 用户行为分析

## 🔧 API 集成规划

### 认证相关 API

- [ ] `POST /api/auth/login` - 用户登录
- [ ] `POST /api/auth/register` - 用户注册
- [ ] `POST /api/auth/logout` - 用户登出
- [ ] `GET /api/auth/profile` - 获取用户信息
- [ ] `PUT /api/auth/profile` - 更新用户信息

### 课程相关 API

- [ ] `GET /api/courses` - 获取课程列表
- [ ] `GET /api/courses/:id` - 获取课程详情
- [ ] `GET /api/courses/:id/progress` - 获取学习进度
- [ ] `POST /api/courses/:id/enroll` - 报名课程

### AI 助手 API

- [ ] `POST /api/ai/chat` - AI 对话
- [ ] `GET /api/ai/recommendations` - 获取推荐
- [ ] `POST /api/ai/feedback` - 反馈收集

### 3D 数据 API

- [ ] `GET /api/knowledge-graph` - 获取知识图谱数据
- [ ] `GET /api/knowledge-graph/nodes/:id` - 获取节点详情

### 社区相关 API

- [ ] `GET /api/posts` - 获取动态列表
- [ ] `POST /api/posts` - 发布动态
- [ ] `GET /api/users/:id/follow` - 关注用户
- [ ] `GET /api/communities` - 获取社区列表

## 📊 技术栈重点

### 核心技术

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript 5.0
- **样式**: Tailwind CSS 4.0 + shadcn/ui + Aceternity UI
- **3D**: Three.js + React Three Fiber
- **状态**: Zustand + TanStack Query

### 开发工具

- **包管理**: pnpm
- **构建**: Turbopack
- **测试**: Vitest + Testing Library + Playwright
- **文档**: Storybook
- **部署**: Vercel

## 🎯 交付里程碑

### MVP

- ✅ 基础架构和组件库
- ✅ 用户认证系统
- ✅ 课程浏览功能
- ✅ 基础 AI 对话

### Beta

- ✅ 完整学习管理系统
- ✅ 3D 知识宇宙
- ✅ 社区功能
- ✅ 移动端适配

### 正式版

- ✅ 性能优化
- ✅ PWA 功能
- ✅ 完整监控体系
- ✅ SEO 优化
