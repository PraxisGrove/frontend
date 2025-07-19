import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * 用户信息接口
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: 'user' | 'admin' | 'instructor';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 认证状态接口
 */
export interface AuthState {
  // 状态
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 操作
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
}

/**
 * 注册数据接口
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

/**
 * 认证状态管理
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初始状态
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // 登录操作
        login: async (email: string, password: string, remember = false) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password, remember }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || '登录失败');
            }

            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error instanceof Error ? error.message : '登录失败',
            });
            throw error;
          }
        },

        // 登出操作
        logout: async () => {
          set({ isLoading: true });

          try {
            await fetch('/api/auth/logout', {
              method: 'POST',
            });
          } catch (error) {
            console.error('Logout API error:', error);
            // 即使API调用失败，也要清除本地状态
          }

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        },

        // 注册操作
        register: async (userData: RegisterData) => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch('/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || '注册失败');
            }

            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error instanceof Error ? error.message : '注册失败',
            });
            throw error;
          }
        },

        // 更新用户信息
        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
            });
          }
        },

        // 清除错误
        clearError: () => {
          set({ error: null });
        },

        // 设置加载状态
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        // 检查认证状态
        checkAuth: async () => {
          const token = get().token;

          if (!token) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          set({ isLoading: true });

          try {
            const response = await fetch('/api/auth/login', {
              method: 'GET',
            });

            if (response.ok) {
              const data = await response.json();
              // 如果token有效，保持当前状态
              set({
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              // token无效，清除状态
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          } catch (error) {
            console.error('Auth check error:', error);
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        // 只持久化必要的数据
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
        // 版本控制，用于数据迁移
        version: 1,
        // 数据迁移函数
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // 从版本0迁移到版本1的逻辑
            return persistedState;
          }
          return persistedState;
        },
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

/**
 * 认证状态选择器
 */
export const authSelectors = {
  // 获取用户信息
  user: (state: AuthState) => state.user,

  // 获取认证状态
  isAuthenticated: (state: AuthState) => state.isAuthenticated,

  // 获取加载状态
  isLoading: (state: AuthState) => state.isLoading,

  // 获取错误信息
  error: (state: AuthState) => state.error,

  // 检查用户角色
  isAdmin: (state: AuthState) => state.user?.role === 'admin',
  isInstructor: (state: AuthState) => state.user?.role === 'instructor',

  // 获取用户显示名称
  displayName: (state: AuthState) =>
    state.user?.name || state.user?.email || '未知用户',
};
