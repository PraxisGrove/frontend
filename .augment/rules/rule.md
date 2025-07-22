---
type: 'always_apply'
---

# PraxisGrove 前端项目 Augment 编程规则

## 🎯 项目概述

- **项目类型**: AI 驱动沉浸式在线教育平台前端
- **架构**: Next.js 15 + App Router + TypeScript 纯前端应用
- **后端交互**: 通过 RESTful API 与 Rust 后端通信

## 📦 技术栈约束

### 核心框架

- **必须使用**: Next.js 15 App Router 架构
- **状态管理**: Zustand (客户端) + TanStack Query (服务端)
- **类型系统**: TypeScript 5.0+ 严格模式

### UI 组件库优先级

1. **基础组件**: 优先使用 shadcn/ui
2. **动画特效**: 使用 Aceternity UI
3. **高级动画**: 使用 ReactBit UI
4. **统一导入**: 通过 `@/components/unified` 导入

### 样式系统

- **主要**: Tailwind CSS 4.0+
- **动画**: Framer Motion 11.0+
- **3D效果**: Three.js + React Three Fiber

## 🛠 开发规范

### 包管理

- **强制使用**: pnpm（禁用 npm/yarn）
- **安装命令**: `pnpm add <package>`
- **开发依赖**: `pnpm add -D <package>`

### 代码组织

```
src/
├── app/                 # Next.js App Router 页面
├── components/          # 组件库
│   ├── unified/        # 统一组件导入
│   ├── ui/            # shadcn/ui 组件
│   └── custom/        # 自定义组件
├── lib/               # 工具库和配置
├── hooks/             # 自定义 Hooks
├── stores/            # Zustand 状态管理
└── types/             # TypeScript 类型定义
```

### API 交互

- **HTTP 客户端**: 使用配置好的 Axios 实例
- **状态管理**: TanStack Query 处理服务端状态
- **错误处理**: 统一的错误边界和处理机制

## 🎨 UI 开发规范

### 组件导入优先级

```typescript
// 1. 优先使用统一导入
import { Button, Card, Input } from '@/components/unified';

// 2. 动画组件
import { BackgroundBeams, AnimatedContainer } from '@/components/unified';

// 3. 避免直接导入原始库
// ❌ import { Button } from '@/components/ui/button';
// ✅ import { Button } from '@/components/unified';
```

### 样式规范

- **主要**: 使用 Tailwind CSS 类名
- **主题**: 支持深色/浅色主题切换
- **响应式**: 移动优先设计原则
- **动画**: 优先使用 Framer Motion

### 性能优化

- **代码分割**: 使用 Next.js 动态导入
- **图片优化**: 使用 Next.js Image 组件
- **3D 性能**: 使用 AdaptiveParticles 自适应渲染

## 🧪 测试规范

### 测试框架

- **单元测试**: Vitest + Testing Library
- **E2E 测试**: Playwright
- **组件文档**: Storybook

### 测试文件命名

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── Button.stories.tsx
```

## 🚀 部署和环境

### 环境配置

- **开发**: `pnpm dev` (Turbopack)
- **构建**: `pnpm build`
- **部署**: Vercel 自动部署

### 环境变量

- **配置文件**: 使用 `src/lib/env.ts` 统一管理
- **类型安全**: 所有环境变量必须有类型定义

## 📋 代码质量

### 代码规范

- **ESLint**: 严格模式，自动修复
- **Prettier**: 统一代码格式
- **Husky**: Git hooks 自动检查
- **TypeScript**: 严格类型检查

### 提交规范

- **格式**: 使用 Conventional Commits
- **示例**: `feat: 添加用户认证组件`
- **类型**: feat, fix, docs, style, refactor, test, chore

## 🔧 开发工具集成

### VS Code 推荐插件

- TypeScript + Tailwind CSS IntelliSense
- ESLint + Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

### 性能监控

- **构建分析**: 使用 `tools/quick-optimize.js`
- **性能测试**: Lighthouse CI 集成
- **监控指标**: 构建时间、打包大小、组件使用统计

## ⚠️ 注意事项

### 禁止事项

- ❌ 不要使用 npm 或 yarn
- ❌ 不要直接导入原始 UI 库组件
- ❌ 不要在组件中直接写内联样式
- ❌ 不要忽略 TypeScript 类型错误

### 最佳实践

- ✅ 使用统一的组件导入系统
- ✅ 遵循 App Router 最佳实践
- ✅ 保持组件的单一职责原则
- ✅ 编写有意义的测试用例
- ✅ 使用语义化的 Git 提交信息

## 📚 参考文档

- [项目架构文档](docs/architecture/)
- [API 文档](docs/api/)
- [组件使用指南](docs/UI_LIBRARIES_GUIDE.md)
- [部署指南](docs/deployment/)
- [任务规划](docs/tasks/TASKS.md)
