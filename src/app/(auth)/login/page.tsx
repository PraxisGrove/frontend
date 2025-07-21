'use client';

import type { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { LoginForm, SocialLogin } from '@/components/auth';

// export const metadata: Metadata = {
//   title: '登录 - PraxisGrove',
//   description: '登录您的 PraxisGrove 账户',
// };

/**
 * 用户登录页面
 */
export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    // 登录成功后重定向到仪表板或之前的页面
    const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
    router.push(redirectTo);
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
    // 错误处理已在组件内部完成
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          欢迎回来
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          登录您的账户继续学习之旅
        </p>
      </div>

      <LoginForm
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        showSocialLogin={false}
      />

      <SocialLogin
        providers={['google', 'github']}
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        className="mt-6"
      />
    </div>
  );
}
