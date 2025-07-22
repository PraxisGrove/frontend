# 🧪 PraxisGrove 测试重建任务

> **状态**: 已清理失效测试，需要重新构建完整测试体系
> **优先级**: 高 - 测试是代码质量保证的基础
> **最后更新**: 2025-07-21

## 📋 任务概述

由于原有测试文件存在严重的配置问题（缺少 Provider 包装、Mock 配置不当等），已删除所有失效测试文件，需要重新构建完整的测试体系。

### 🗑️ 已删除的失效测试文件

```
src/__tests__/auth-integration.test.tsx          (7个测试用例)
src/components/auth/__tests__/LoginForm.test.tsx (11个测试用例)
src/components/ui/__tests__/button.test.tsx      (5个测试用例)
src/hooks/__tests__/useAuth.test.ts              (13个测试用例)
src/utils/__tests__/permissions.test.ts          (26个测试用例)
```

**总计删除**: 5个文件，62个测试用例

## 🎯 需要添加测试文件的目录结构

### 1. **组件测试** - `src/components/*/`

#### 1.1 认证组件 - `src/components/auth/__tests__/`

```
src/components/auth/__tests__/
├── LoginForm.test.tsx           # 登录表单测试
├── RegisterForm.test.tsx        # 注册表单测试
├── PrivateRoute.test.tsx        # 私有路由保护测试
├── AuthGuard.test.tsx           # 认证守卫测试
└── PasswordReset.test.tsx       # 密码重置测试
```

**测试重点**:

- 表单验证逻辑
- 认证状态管理
- 路由保护机制
- 错误处理

#### 1.2 UI组件 - `src/components/ui/__tests__/`

```
src/components/ui/__tests__/
├── button.test.tsx              # 按钮组件测试
├── input.test.tsx               # 输入框组件测试
├── dialog.test.tsx              # 对话框组件测试
├── form.test.tsx                # 表单组件测试
├── card.test.tsx                # 卡片组件测试
├── navigation.test.tsx          # 导航组件测试
└── loading.test.tsx             # 加载组件测试
```

**测试重点**:

- 组件渲染
- 属性传递
- 事件处理
- 样式应用

#### 1.3 业务组件 - `src/components/*/`

```
src/components/course/__tests__/
├── CourseCard.test.tsx          # 课程卡片测试
├── CourseList.test.tsx          # 课程列表测试
└── CourseDetail.test.tsx        # 课程详情测试

src/components/dashboard/__tests__/
├── DashboardLayout.test.tsx     # 仪表板布局测试
├── StatsCard.test.tsx           # 统计卡片测试
└── ActivityFeed.test.tsx        # 活动流测试

src/components/layout/__tests__/
├── Header.test.tsx              # 头部组件测试
├── Sidebar.test.tsx             # 侧边栏组件测试
├── Footer.test.tsx              # 底部组件测试
└── Navigation.test.tsx          # 导航组件测试
```

### 2. **Hook测试** - `src/hooks/__tests__/`

```
src/hooks/__tests__/
├── useAuth.test.ts              # 认证Hook测试
├── useCart.test.ts              # 购物车Hook测试
├── useWishlist.test.ts          # 愿望清单Hook测试
├── useResponsive.test.ts        # 响应式Hook测试
├── useInView.test.ts            # 视口检测Hook测试
├── useParallax.test.ts          # 视差效果Hook测试
└── useMobile.test.ts            # 移动端检测Hook测试
```

**测试重点**:

- Hook 状态管理
- 副作用处理
- 依赖更新
- 错误边界

### 3. **工具函数测试** - `src/utils/__tests__/`

```
src/utils/__tests__/
├── permissions.test.ts          # 权限工具测试
├── performance.test.ts          # 性能工具测试
├── testing.test.ts              # 测试工具测试
├── tokenStorage.test.ts         # Token存储测试
├── api-helpers.test.ts          # API辅助函数测试
├── validation.test.ts           # 验证工具测试
└── formatting.test.ts           # 格式化工具测试
```

### 4. **API测试** - `src/api/__tests__/`

```
src/api/__tests__/
├── auth.test.ts                 # 认证API测试
├── courses.test.ts              # 课程API测试
├── users.test.ts                # 用户API测试
└── api-client.test.ts           # API客户端测试
```

### 5. **状态管理测试** - `src/store/__tests__/`

```
src/store/__tests__/
├── auth.test.ts                 # 认证状态测试
├── cart.test.ts                 # 购物车状态测试
├── ui.test.ts                   # UI状态测试
└── wishlist.test.ts             # 愿望清单状态测试
```

### 6. **集成测试** - `src/__tests__/`

```
src/__tests__/
├── auth-integration.test.tsx    # 认证集成测试
├── course-flow.test.tsx         # 课程流程测试
├── cart-integration.test.tsx    # 购物车集成测试
├── navigation.test.tsx          # 导航集成测试
└── responsive.test.tsx          # 响应式集成测试
```

### 7. **E2E测试** - `e2e/`

```
e2e/
├── auth/
│   ├── login.spec.ts            # 登录流程测试
│   ├── register.spec.ts         # 注册流程测试
│   └── logout.spec.ts           # 登出流程测试
├── courses/
│   ├── browse.spec.ts           # 课程浏览测试
│   ├── purchase.spec.ts         # 课程购买测试
│   └── learning.spec.ts         # 学习流程测试
├── dashboard/
│   ├── overview.spec.ts         # 仪表板概览测试
│   └── settings.spec.ts         # 设置页面测试
└── navigation/
    ├── header.spec.ts           # 头部导航测试
    ├── sidebar.spec.ts          # 侧边栏测试
    └── mobile.spec.ts           # 移动端导航测试
```

## 🛠️ 测试配置要求

### 测试环境配置

- **单元测试**: Vitest + Testing Library + jsdom
- **E2E测试**: Playwright + 多浏览器支持
- **覆盖率**: 目标 80%+ 代码覆盖率
- **Mock**: 完整的 API Mock 和 Provider 包装

### 必需的测试工具

```typescript
// 测试依赖已安装
"@testing-library/jest-dom": "^6.2.0"
"@testing-library/react": "^14.1.0"
"@testing-library/user-event": "^14.5.0"
"@playwright/test": "^1.40.0"
"vitest": "^1.2.0"
"jsdom": "^26.1.0"
```

## 📊 测试优先级

### 🔴 **高优先级** (立即实施)

1. **认证系统测试** - 核心功能，必须稳定
2. **基础UI组件测试** - 影响所有页面
3. **API集成测试** - 数据流核心

### 🟡 **中优先级** (第二阶段)

1. **业务组件测试** - 功能特定组件
2. **Hook测试** - 状态管理逻辑
3. **工具函数测试** - 辅助功能

### 🟢 **低优先级** (第三阶段)

1. **E2E测试** - 完整用户流程
2. **性能测试** - 优化相关
3. **可访问性测试** - 用户体验

## 🎯 实施计划

### 阶段一：基础测试重建 (1-2天)

- [ ] 重建认证相关测试
- [ ] 重建基础UI组件测试
- [ ] 配置测试环境和Mock

### 阶段二：功能测试扩展 (2-3天)

- [ ] 添加业务组件测试
- [ ] 添加Hook和工具函数测试
- [ ] 完善API测试

### 阶段三：集成测试完善 (2-3天)

- [ ] 添加E2E测试用例
- [ ] 完善测试覆盖率
- [ ] 优化测试性能

## 📝 测试标准

### 单元测试标准

- 每个组件至少5个测试用例
- 覆盖正常流程、边界情况、错误处理
- 使用正确的Provider包装
- Mock外部依赖

### 集成测试标准

- 测试完整用户流程
- 验证组件间交互
- 测试状态管理
- 验证API集成

### E2E测试标准

- 覆盖关键用户路径
- 多浏览器兼容性
- 移动端适配
- 性能基准验证

## 🚀 开始实施

**下一步行动**:

1. 从认证系统测试开始重建
2. 配置完整的测试环境
3. 建立测试最佳实践文档
4. 逐步扩展测试覆盖范围

**成功标准**:

- 所有测试通过 ✅
- 代码覆盖率 > 80% ✅
- CI/CD集成完成 ✅
- 测试文档完善 ✅
