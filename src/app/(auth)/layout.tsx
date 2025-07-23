import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PraxisGrove',
  description: '登录或注册 PraxisGrove 账户',
};

/**
 * 认证相关页面的布局组件
 * 包含登录、注册、密码重置等页面
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* 左侧品牌展示区域 */}
        <div className="hidden items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 p-12 lg:flex lg:w-1/2">
          <div className="text-center text-white">
            <h1 className="mb-6 text-4xl font-bold">PraxisGrove</h1>
            <p className="mb-8 text-xl opacity-90">一所无需许可的学校</p>
            <div className="max-w-md space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>个性化AI学习助手</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>3D知识宇宙探索</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>全球学习者社区</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧认证表单区域 */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
