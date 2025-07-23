'use client';

import { useRouter } from 'next/navigation';
import { RegisterForm, SocialLogin } from '@/components/auth';

/**
 * 用户注册页面
 */
export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    // 注册成功后重定向到登录页面或验证邮箱页面
    router.push('/login?registered=true');
  };

  const handleRegisterError = (error: string) => {
    console.error('Register error:', error);
    // 错误处理已在组件内部完成
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          创建账户
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          加入 PraxisGrove，开启您的学习之旅
        </p>
      </div>

      <RegisterForm
        onSuccess={handleRegisterSuccess}
        onError={handleRegisterError}
        showSocialLogin={false}
      />

      <SocialLogin
        providers={['google', 'github']}
        onSuccess={handleRegisterSuccess}
        onError={handleRegisterError}
        className="mt-6"
      />
    </div>
  );
}
