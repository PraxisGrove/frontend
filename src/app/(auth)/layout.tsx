import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PraxisGrove',
  description: '登录或注册 PraxisGrove 账户',
};

/**
 * 认证相关页面的简单布局组件
 * 现在主要功能由 AuthLayout 组件处理
 */
export default function AuthLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
