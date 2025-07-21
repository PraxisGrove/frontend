# PraxisGrove 认证系统使用示例

## 快速开始

### 1. 基础页面保护

```tsx
// app/dashboard/page.tsx
import { PrivateRoute } from '@/components/auth';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div>
        <h1>用户仪表板</h1>
        <p>这是受保护的内容</p>
      </div>
    </PrivateRoute>
  );
}
```

### 2. 基于角色的页面保护

```tsx
// app/admin/page.tsx
import { PrivateRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <PrivateRoute requiredRole="admin">
      <div>
        <h1>管理员面板</h1>
        <p>只有管理员可以看到这个内容</p>
      </div>
    </PrivateRoute>
  );
}
```

### 3. 使用 useAuth Hook

```tsx
// components/UserProfile.tsx
import { useAuth } from '@/hooks/useAuth';

export function UserProfile() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    logout,
    hasRole,
    canAccess 
  } = useAuth();

  if (isLoading) return <div>加载中...</div>;
  if (!isAuthenticated) return <div>请先登录</div>;

  return (
    <div>
      <h2>欢迎, {user.name}!</h2>
      <p>角色: {user.role}</p>
      
      {hasRole('admin') && (
        <button>管理员功能</button>
      )}
      
      {canAccess('instructor') && (
        <button>创建课程</button>
      )}
      
      <button onClick={logout}>退出登录</button>
    </div>
  );
}
```

### 4. 条件渲染组件

```tsx
// components/Navigation.tsx
import { RoleGuard } from '@/components/auth';
import { useAuth } from '@/hooks/useAuth';

export function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <a href="/">首页</a>
      
      {isAuthenticated ? (
        <>
          <a href="/dashboard">仪表板</a>
          
          <RoleGuard allowedRoles={['instructor', 'admin']}>
            <a href="/courses/create">创建课程</a>
          </RoleGuard>
          
          <RoleGuard allowedRoles={['admin']}>
            <a href="/admin">管理面板</a>
          </RoleGuard>
        </>
      ) : (
        <>
          <a href="/login">登录</a>
          <a href="/register">注册</a>
        </>
      )}
    </nav>
  );
}
```

### 5. 自定义登录页面

```tsx
// app/login/page.tsx
import { LoginForm, SocialLogin } from '@/components/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  const handleError = (error: string) => {
    console.error('登录失败:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center">登录账户</h2>
        </div>
        
        <LoginForm
          onSuccess={handleSuccess}
          onError={handleError}
        />
        
        <SocialLogin
          providers={['google', 'github']}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}
```

### 6. 权限检查工具

```tsx
// utils/authHelpers.ts
import { PermissionChecker, PERMISSIONS } from '@/utils/permissions';

export function checkUserPermissions(userRole: string) {
  const checker = new PermissionChecker(userRole as any);
  
  return {
    canCreateCourse: checker.hasPermission(PERMISSIONS.INSTRUCTOR.COURSES_CREATE),
    canManageUsers: checker.hasPermission(PERMISSIONS.ADMIN.USERS_CREATE),
    canViewAnalytics: checker.hasAnyPermission([
      PERMISSIONS.INSTRUCTOR.ANALYTICS_VIEW,
      PERMISSIONS.ADMIN.ANALYTICS_FULL
    ]),
  };
}
```

### 7. 高阶组件使用

```tsx
// components/ProtectedComponent.tsx
import { withPrivateRoute } from '@/components/auth';

function MyComponent() {
  return <div>受保护的组件内容</div>;
}

// 导出受保护的组件
export default withPrivateRoute(MyComponent, {
  requiredRole: 'instructor'
});
```

### 8. 表单集成示例

```tsx
// components/CustomAuthForm.tsx
import { useState } from 'react';
import { RegisterForm } from '@/components/auth';

export function CustomAuthForm() {
  const [step, setStep] = useState<'register' | 'success'>('register');

  const handleSuccess = () => {
    setStep('success');
    // 可以添加额外的成功处理逻辑
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleError = (error: string) => {
    // 自定义错误处理
    alert(`注册失败: ${error}`);
  };

  if (step === 'success') {
    return (
      <div className="text-center">
        <h2>注册成功！</h2>
        <p>正在跳转到仪表板...</p>
      </div>
    );
  }

  return (
    <RegisterForm
      onSuccess={handleSuccess}
      onError={handleError}
      className="max-w-lg mx-auto"
    />
  );
}
```

## 高级用法

### 1. 自定义权限检查

```tsx
// hooks/useCustomPermissions.ts
import { useAuth } from '@/hooks/useAuth';
import { PermissionChecker } from '@/utils/permissions';

export function useCustomPermissions() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const checker = new PermissionChecker(user.role);
  
  return {
    canEditProfile: checker.hasPermission('user:profile:update'),
    canCreateCourse: checker.hasPermission('instructor:courses:create'),
    canManageSystem: checker.hasPermission('admin:system:config'),
    
    // 自定义业务逻辑
    canEditCourse: (courseOwnerId: string) => {
      return user.id === courseOwnerId || checker.hasPermission('admin:courses:manage');
    },
    
    canViewUserData: (targetUserId: string) => {
      return user.id === targetUserId || checker.hasAnyPermission([
        'instructor:students:view',
        'admin:users:read'
      ]);
    }
  };
}
```

### 2. 路由级别的权限配置

```tsx
// config/routePermissions.ts
export const routePermissions = {
  '/dashboard': { requireAuth: true },
  '/profile': { requireAuth: true },
  '/courses/create': { requireAuth: true, requiredRole: 'instructor' },
  '/admin': { requireAuth: true, requiredRole: 'admin' },
  '/admin/users': { requireAuth: true, requiredRole: 'admin' },
  '/instructor': { requireAuth: true, requiredRole: 'instructor' },
} as const;

// middleware.ts 中使用
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const config = routePermissions[pathname];
  
  if (config?.requireAuth) {
    // 执行认证检查
  }
  
  if (config?.requiredRole) {
    // 执行角色检查
  }
}
```

### 3. 动态权限加载

```tsx
// hooks/useDynamicPermissions.ts
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function useDynamicPermissions() {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // 从服务器获取用户的动态权限
    fetch(`/api/users/${user.id}/permissions`)
      .then(res => res.json())
      .then(data => {
        setPermissions(data.permissions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load permissions:', error);
        setLoading(false);
      });
  }, [user]);

  return { permissions, loading };
}
```

## 测试示例

### 1. 组件测试

```tsx
// __tests__/ProtectedComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { PrivateRoute } from '@/components/auth';

// Mock useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { id: '1', role: 'user' },
    canAccess: (role: string) => role === 'user'
  })
}));

test('renders protected content for authenticated user', () => {
  render(
    <PrivateRoute>
      <div>Protected Content</div>
    </PrivateRoute>
  );
  
  expect(screen.getByText('Protected Content')).toBeInTheDocument();
});
```

### 2. 权限测试

```tsx
// __tests__/permissions.test.tsx
import { PermissionChecker } from '@/utils/permissions';

test('admin has all permissions', () => {
  const checker = new PermissionChecker('admin');
  
  expect(checker.hasPermission('user:profile:read')).toBe(true);
  expect(checker.hasPermission('instructor:courses:create')).toBe(true);
  expect(checker.hasPermission('admin:users:create')).toBe(true);
});
```

## 部署配置

### 1. 环境变量

```env
# .env.local
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth 配置
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 2. 生产环境配置

```tsx
// config/auth.ts
export const authConfig = {
  tokenStorage: process.env.NODE_ENV === 'production' ? 'cookie' : 'localStorage',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    httpOnly: true,
  },
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
};
```

这些示例展示了如何在实际项目中使用 PraxisGrove 认证系统的各种功能。系统设计灵活，可以根据具体需求进行定制和扩展。
