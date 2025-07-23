'use client';

import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth';
import {
  EnhancedLoginForm,
  EnhancedSocialLogin,
} from '@/components/auth/EnhancedLoginForm';

/**
 * 用户登录页面
 */
export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // 登录成功后重定向到仪表板或之前的页面
    const redirectTo =
      new URLSearchParams(window.location.search).get('redirect') ||
      '/dashboard';
    router.push(redirectTo);
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
    // 错误处理已在组件内部完成
  };

  return (
    <AuthLayout
      title="欢迎回来"
      subtitle="登录您的账户，继续探索知识的无限可能"
      type="login"
    >
      <EnhancedLoginForm
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />

      <EnhancedSocialLogin
        providers={['google', 'github', 'feishu']}
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        className="mt-6"
      />
    </AuthLayout>
  );
}
