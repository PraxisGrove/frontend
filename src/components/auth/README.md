# 认证系统文档

## 概述

PraxisGrove 认证系统提供了完整的用户认证和权限管理功能，包括登录、注册、密码重置、社交登录、路由守卫和基于角色的权限控制。

## 核心组件

### 1. 认证表单组件

#### LoginForm
功能完整的登录表单组件，支持：
- 邮箱和密码验证
- 记住我功能
- 密码显示/隐藏切换
- 错误处理和加载状态
- 表单验证和用户反馈

```tsx
import { LoginForm } from '@/components/auth';

<LoginForm
  onSuccess={() => router.push('/dashboard')}
  onError={(error) => console.error(error)}
  showSocialLogin={false}
/>
```

#### RegisterForm
注册表单组件，包含：
- 姓名、邮箱、密码字段
- 密码强度检查
- 密码确认验证
- 服务条款同意
- 实时表单验证

```tsx
import { RegisterForm } from '@/components/auth';

<RegisterForm
  onSuccess={() => router.push('/login')}
  onError={(error) => console.error(error)}
/>
```

#### ResetPassword
密码重置组件，支持两种模式：
- `forgot`: 忘记密码，发送重置邮件
- `reset`: 重置密码，使用令牌设置新密码

```tsx
import { ResetPassword } from '@/components/auth';

// 忘记密码模式
<ResetPassword
  mode="forgot"
  onSuccess={() => console.log('Email sent')}
/>

// 重置密码模式
<ResetPassword
  mode="reset"
  token={resetToken}
  onSuccess={() => router.push('/login')}
/>
```

#### SocialLogin
社交登录组件，支持：
- Google、GitHub、微信登录
- 可配置的提供商列表
- 自定义样式和布局

```tsx
import { SocialLogin } from '@/components/auth';

<SocialLogin
  providers={['google', 'github']}
  onSuccess={() => router.push('/dashboard')}
  onError={(error) => console.error(error)}
/>
```

### 2. 路由守卫组件

#### PrivateRoute
保护需要认证的页面：

```tsx
import { PrivateRoute } from '@/components/auth';

<PrivateRoute requiredRole="admin">
  <AdminPanel />
</PrivateRoute>
```

#### withPrivateRoute
高阶组件形式的路由保护：

```tsx
import { withPrivateRoute } from '@/components/auth';

const ProtectedPage = withPrivateRoute(MyComponent, {
  requiredRole: 'admin'
});
```

#### RoleGuard
组件内部的角色权限检查：

```tsx
import { RoleGuard } from '@/components/auth';

<RoleGuard allowedRoles={['admin']}>
  <SensitiveContent />
</RoleGuard>
```

### 3. 认证状态管理

#### useAuth Hook
提供完整的认证状态和方法：

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
    canAccess
  } = useAuth();

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <LoginPrompt />;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {hasRole('admin') && <AdminControls />}
    </div>
  );
}
```

#### AuthProvider
认证上下文提供者，需要包装应用根组件：

```tsx
import { AuthProvider } from '@/contexts/auth-provider';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

### 4. 权限系统

#### PermissionChecker
基于角色的权限检查：

```tsx
import { PermissionChecker, PERMISSIONS } from '@/utils/permissions';

const checker = new PermissionChecker('instructor');

if (checker.hasPermission(PERMISSIONS.INSTRUCTOR.COURSES_CREATE)) {
  // 用户可以创建课程
}

if (checker.canAccess(['user:profile:read', 'admin:users:read'])) {
  // 用户可以访问资源
}
```

## 用户角色和权限

### 角色层级
1. **user** - 普通用户
2. **admin** - 管理员（拥有所有权限）

### 权限列表

#### 用户权限
- `user:profile:read` - 查看个人资料
- `user:profile:update` - 更新个人资料
- `user:courses:enroll` - 报名课程
- `user:courses:view` - 查看课程
- `user:progress:view` - 查看学习进度

#### 管理员权限
- `admin:users:create` - 创建用户
- `admin:users:read` - 查看用户
- `admin:users:update` - 更新用户
- `admin:users:delete` - 删除用户
- `admin:courses:create` - 创建课程
- `admin:courses:update` - 更新课程
- `admin:courses:delete` - 删除课程
- `admin:courses:manage` - 管理所有课程
- `admin:students:view` - 查看学生
- `admin:system:config` - 系统配置
- `admin:analytics:view` - 查看分析数据
- `admin:roles:manage` - 角色管理

## 中间件配置

系统包含路由级别的权限检查中间件，自动处理：
- 认证状态检查
- 令牌有效性验证
- 基于路径的权限控制
- 国际化路由处理

### 路径配置

```typescript
// 需要认证的路径
const authRequiredPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/courses/my',
];

// 需要管理员权限的路径
const adminRequiredPaths = [
  '/admin',
];

// 需要管理员权限的路径（包含原讲师功能）
const adminRequiredPaths = [
  '/admin',
  '/courses/create',
  '/courses/manage',
];
```

## Token 存储策略

系统支持多种 Token 存储方案：

### localStorage（默认）
```tsx
import { defaultTokenStorage } from '@/utils/tokenStorage';

// 自动使用 localStorage
```

### Cookie（安全）
```tsx
import { secureTokenStorage } from '@/utils/tokenStorage';

// 使用 HTTP-only cookies（需要服务端配合）
```

### 内存存储（SSR）
```tsx
import { memoryTokenStorage } from '@/utils/tokenStorage';

// 用于服务端渲染场景
```

## API 集成

### 认证 API
系统提供完整的认证 API 服务：

```tsx
import { authApi } from '@/api/auth';

// 登录
await authApi.login({ email, password });

// 注册
await authApi.register({ email, password, name });

// 忘记密码
await authApi.forgotPassword(email);

// 重置密码
await authApi.resetPassword({ token, password });

// 社交登录
await authApi.socialLogin('google', authCode);
```

## 最佳实践

### 1. 页面保护
```tsx
// 使用 PrivateRoute 保护整个页面
export default function DashboardPage() {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  );
}

// 或使用 HOC
export default withPrivateRoute(DashboardPage);
```

### 2. 条件渲染
```tsx
function Navigation() {
  const { isAuthenticated, hasRole } = useAuth();

  return (
    <nav>
      {isAuthenticated && <DashboardLink />}
      {hasRole('admin') && <AdminLink />}
    </nav>
  );
}
```

### 3. 错误处理
```tsx
function LoginPage() {
  const [error, setError] = useState('');

  return (
    <LoginForm
      onSuccess={() => router.push('/dashboard')}
      onError={setError}
    />
  );
}
```

### 4. 加载状态
```tsx
function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <MainApp />;
}
```

## 测试

系统包含完整的测试套件：
- 单元测试：组件、Hook、工具函数
- 集成测试：完整认证流程
- E2E 测试：用户交互场景

运行测试：
```bash
# 单元测试
pnpm test

# 测试覆盖率
pnpm test:coverage

# E2E 测试
pnpm test:e2e
```

## 安全考虑

1. **Token 安全**：支持 HTTP-only cookies
2. **CSRF 保护**：内置 CSRF 令牌支持
3. **XSS 防护**：输入验证和输出编码
4. **密码策略**：强密码要求和验证
5. **会话管理**：自动过期和刷新机制

## 故障排除

### 常见问题

1. **认证状态不同步**
   - 检查 AuthProvider 是否正确包装应用
   - 确认 localStorage 权限

2. **路由守卫不工作**
   - 检查中间件配置
   - 确认路径匹配规则

3. **权限检查失败**
   - 验证用户角色设置
   - 检查权限配置

4. **社交登录问题**
   - 确认 OAuth 配置
   - 检查回调 URL 设置
