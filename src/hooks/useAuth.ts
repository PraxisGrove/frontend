import { useAuthStore, authSelectors, type User } from '@/store/auth';

/**
 * 认证Hook接口
 */
export interface UseAuthReturn {
  // 状态
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 用户角色检查
  isAdmin: boolean;
  displayName: string;

  // 操作方法
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;

  // 密码重置
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (data: { token: string; password: string }) => Promise<void>;

  // 社交登录
  socialLogin: (
    provider: 'google' | 'github' | 'wechat',
    code: string
  ) => Promise<void>;

  // 权限检查
  hasRole: (role: 'user' | 'admin') => boolean;
  hasAnyRole: (roles: ('user' | 'admin')[]) => boolean;
  canAccess: (requiredRole?: 'user' | 'admin') => boolean;
}

/**
 * 认证Hook
 * 提供简化的认证状态访问接口
 */
export function useAuth(): UseAuthReturn {
  // 状态选择器
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const isLoading = useAuthStore(authSelectors.isLoading);
  const error = useAuthStore(authSelectors.error);
  const isAdmin = useAuthStore(authSelectors.isAdmin);
  const displayName = useAuthStore(authSelectors.displayName);

  // 操作方法
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const register = useAuthStore((state) => state.register);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearError = useAuthStore((state) => state.clearError);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const resetPassword = useAuthStore((state) => state.resetPassword);
  const socialLogin = useAuthStore((state) => state.socialLogin);

  /**
   * 检查用户是否具有指定角色
   */
  const hasRole = (role: 'user' | 'admin' | 'instructor'): boolean => {
    if (!user) return false;
    return user.role === role;
  };

  /**
   * 检查用户是否具有任意一个指定角色
   */
  const hasAnyRole = (roles: ('user' | 'admin' | 'instructor')[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  /**
   * 检查用户是否可以访问需要特定角色的资源
   */
  const canAccess = (
    requiredRole?: 'user' | 'admin' | 'instructor'
  ): boolean => {
    // 如果没有要求特定角色，只需要登录即可
    if (!requiredRole) {
      return isAuthenticated;
    }

    // 如果用户未登录，无法访问
    if (!isAuthenticated || !user) {
      return false;
    }

    // 管理员可以访问所有资源
    if (user.role === 'admin') {
      return true;
    }

    // 检查用户角色是否匹配要求
    return user.role === requiredRole;
  };

  return {
    // 状态
    user,
    isAuthenticated,
    isLoading,
    error,

    // 用户角色检查
    isAdmin,
    displayName,

    // 操作方法
    login,
    logout,
    register,
    updateUser,
    clearError,
    checkAuth,

    // 密码重置
    forgotPassword,
    resetPassword,

    // 社交登录
    socialLogin,

    // 权限检查
    hasRole,
    hasAnyRole,
    canAccess,
  };
}

export default useAuth;
