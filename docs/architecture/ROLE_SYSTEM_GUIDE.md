# 🔐 PraxisGrove 用户角色系统指南

## 📋 概述

PraxisGrove 采用简化的两级用户角色系统，提供清晰的权限管理和访问控制。本指南详细介绍了角色系统的设计、实现和使用方法。

## 🎯 角色体系

### 角色层级

我们的系统采用两级角色设计：

```
📊 角色层级
├── 👤 user (普通用户)
│   ├── 个人资料管理
│   ├── 课程学习
│   └── 进度查看
└── 👑 admin (管理员)
    ├── 继承所有用户权限
    ├── 用户管理
    ├── 课程管理
    ├── 系统配置
    └── 数据分析
```

### 角色特性

#### 👤 普通用户 (user)

- **目标用户**: 学习者、学生
- **主要功能**: 学习课程、管理个人资料
- **权限范围**: 个人数据和学习相关功能

#### 👑 管理员 (admin)

- **目标用户**: 系统管理员、内容管理者
- **主要功能**: 系统管理、用户管理、内容管理
- **权限范围**: 完整的系统访问权限

## 🔑 权限系统

### 权限分类

#### 用户权限 (user:\*)

```typescript
'user:profile:read'; // 查看个人资料
'user:profile:update'; // 更新个人资料
'user:courses:enroll'; // 报名课程
'user:courses:view'; // 查看课程
'user:progress:view'; // 查看学习进度
```

#### 管理员权限 (admin:\*)

```typescript
// 用户管理
'admin:users:create'; // 创建用户
'admin:users:read'; // 查看用户
'admin:users:update'; // 更新用户
'admin:users:delete'; // 删除用户

// 课程管理
'admin:courses:create'; // 创建课程
'admin:courses:update'; // 更新课程
'admin:courses:delete'; // 删除课程
'admin:courses:manage'; // 管理课程

// 系统管理
'admin:students:view'; // 查看学生数据
'admin:system:config'; // 系统配置
'admin:analytics:view'; // 查看分析数据
'admin:roles:manage'; // 角色管理
```

### 权限继承

```
admin 权限 = user 权限 + admin 专有权限
```

管理员自动继承所有用户权限，无需重复定义。

## 🛠️ 技术实现

### 类型定义

```typescript
// 用户角色类型
export type UserRole = 'user' | 'admin';

// 用户接口
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}
```

### 权限检查

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, hasRole, canAccess } = useAuth();

  // 角色检查
  const isAdmin = hasRole('admin');
  const isUser = hasRole('user');

  // 权限检查
  const canCreateCourse = canAccess('admin');
  const canViewProfile = canAccess('user');

  return (
    <div>
      {isAdmin && <AdminPanel />}
      {canCreateCourse && <CreateCourseButton />}
    </div>
  );
}
```

### 路由保护

```typescript
import { PrivateRoute, RoleGuard } from '@/components/auth';

// 页面级保护
<PrivateRoute requiredRole="admin">
  <AdminDashboard />
</PrivateRoute>

// 组件级保护
<RoleGuard allowedRoles={['admin']}>
  <SensitiveContent />
</RoleGuard>
```

## 🚀 使用指南

### 1. 基础权限检查

```typescript
import { useAuth } from '@/hooks/useAuth';

function Navigation() {
  const { isAuthenticated, hasRole } = useAuth();

  return (
    <nav>
      {isAuthenticated && (
        <>
          <Link href="/dashboard">仪表板</Link>
          <Link href="/profile">个人资料</Link>
        </>
      )}

      {hasRole('admin') && (
        <>
          <Link href="/admin">管理后台</Link>
          <Link href="/users">用户管理</Link>
          <Link href="/courses/manage">课程管理</Link>
        </>
      )}
    </nav>
  );
}
```

### 2. 条件渲染

```typescript
function Dashboard() {
  const { user, hasRole } = useAuth();

  return (
    <div>
      <h1>欢迎, {user?.name}!</h1>

      {/* 所有用户都能看到 */}
      <UserStats />

      {/* 只有管理员能看到 */}
      {hasRole('admin') && (
        <div>
          <AdminStats />
          <UserManagement />
          <SystemSettings />
        </div>
      )}
    </div>
  );
}
```

### 3. 路由配置

```typescript
// middleware.ts
const adminRequiredPaths = [
  '/admin',
  '/users',
  '/courses/create',
  '/courses/manage',
  '/system/config',
];

const authRequiredPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/courses/my',
];
```

## 🔄 迁移指南

### 从三级角色迁移

如果您的系统之前使用了三级角色（user、instructor、admin），请按以下步骤迁移：

#### 1. 数据库迁移

```sql
-- 将所有 instructor 角色更新为 admin
UPDATE users SET role = 'admin' WHERE role = 'instructor';
```

#### 2. 代码更新

```typescript
// 旧代码
if (hasRole('instructor')) {
  // 讲师功能
}

// 新代码
if (hasRole('admin')) {
  // 管理员功能（包含原讲师功能）
}
```

#### 3. 权限映射

| 旧权限                      | 新权限                 |
| --------------------------- | ---------------------- |
| `instructor:courses:create` | `admin:courses:create` |
| `instructor:courses:update` | `admin:courses:update` |
| `instructor:courses:delete` | `admin:courses:delete` |
| `instructor:courses:manage` | `admin:courses:manage` |
| `instructor:students:view`  | `admin:students:view`  |
| `instructor:analytics:view` | `admin:analytics:view` |

## 🧪 测试

### 权限测试示例

```typescript
import { PermissionChecker } from '@/utils/permissions';

describe('权限系统', () => {
  it('用户权限检查', () => {
    const userChecker = new PermissionChecker('user');

    expect(userChecker.hasPermission('user:profile:read')).toBe(true);
    expect(userChecker.hasPermission('admin:users:create')).toBe(false);
  });

  it('管理员权限检查', () => {
    const adminChecker = new PermissionChecker('admin');

    expect(adminChecker.hasPermission('user:profile:read')).toBe(true);
    expect(adminChecker.hasPermission('admin:users:create')).toBe(true);
  });
});
```

## 📝 最佳实践

### 1. 权限检查原则

- 总是在组件中进行权限检查
- 使用 `hasRole()` 进行角色检查
- 使用 `canAccess()` 进行功能访问检查

### 2. 安全考虑

- 前端权限检查仅用于 UI 控制
- 后端必须进行完整的权限验证
- 敏感操作需要额外的安全检查

### 3. 用户体验

- 提供清晰的权限不足提示
- 隐藏用户无权访问的功能
- 提供合适的降级体验

## 🔗 相关文档

- [认证系统文档](../src/components/auth/README.md)
- [权限系统 API](../src/utils/permissions.ts)
- [useAuth Hook 文档](../src/hooks/useAuth.ts)
- [路由守卫文档](../src/components/auth/PrivateRoute.tsx)

---

**最后更新**: 2025-07-21  
**版本**: v2.0.0 (两级角色系统)  
**状态**: ✅ 已完成
