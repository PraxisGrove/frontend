'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useAuthStore, authSelectors, type User } from '@/store/auth';

/**
 * 认证上下文接口
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

/**
 * 认证上下文
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 认证提供者组件
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const isLoading = useAuthStore(authSelectors.isLoading);
  const error = useAuthStore(authSelectors.error);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const register = useAuthStore((state) => state.register);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearError = useAuthStore((state) => state.clearError);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // 应用启动时检查认证状态
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 监听存储变化（多标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-storage') {
        // 存储发生变化，重新检查认证状态
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]);

  // 定期检查token有效性
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(
      () => {
        checkAuth();
      },
      5 * 60 * 1000
    ); // 每5分钟检查一次

    return () => clearInterval(interval);
  }, [isAuthenticated, checkAuth]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    updateUser,
    clearError,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 使用认证Hook
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * 认证守卫组件
 * 用于保护需要认证的页面
 */
export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  // 加载中显示加载状态
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 需要认证但未认证时显示fallback
  if (requireAuth && !isAuthenticated) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              需要登录
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              请登录后访问此页面
            </p>
            <a
              href="/login"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              前往登录
            </a>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}

/**
 * 角色守卫组件
 * 用于保护需要特定角色的页面
 */
export function RoleGuard({
  children,
  roles,
  fallback,
}: {
  children: React.ReactNode;
  roles: string[];
  fallback?: React.ReactNode;
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  if (!roles.includes(user.role)) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              权限不足
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              您没有权限访问此页面
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              返回首页
            </a>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
