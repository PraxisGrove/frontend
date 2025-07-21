import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PraxisGrove - 一所无需许可的学校',
  description: '基于AI技术的创新在线教育平台，提供个性化学习体验和3D知识宇宙',
};

/**
 * 主应用布局组件
 * 包含导航栏、侧边栏、主内容区域等
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  PraxisGrove
                </h1>
              </div>
            </div>

            {/* 导航菜单 */}
            <nav className="hidden space-x-8 md:flex">
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                仪表板
              </Link>
              <Link
                href="/courses"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                课程
              </Link>
              <Link
                href="/knowledge-universe"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                知识宇宙
              </Link>
              <Link
                href="/ai-assistant"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                AI助手
              </Link>
              <Link
                href="/community"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                社区
              </Link>
            </nav>

            {/* 用户菜单 */}
            <div className="flex items-center space-x-4">
              {/* 搜索按钮 */}
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* 通知按钮 */}
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10.5 3.5L6 8v13h4v-6h4v6h4V8l-4.5-4.5z"
                  />
                </svg>
              </button>

              {/* 用户头像 */}
              <div className="relative">
                <button className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="mt-auto border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                PraxisGrove
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                一所无需许可的学校
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                产品
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="/courses" className="hover:text-blue-600">
                    课程中心
                  </Link>
                </li>
                <li>
                  <Link
                    href="/knowledge-universe"
                    className="hover:text-blue-600"
                  >
                    知识宇宙
                  </Link>
                </li>
                <li>
                  <Link href="/ai-assistant" className="hover:text-blue-600">
                    AI助手
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                社区
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="/community" className="hover:text-blue-600">
                    学习社区
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-blue-600">
                    帮助中心
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-blue-600">
                    意见反馈
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                关于
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    服务条款
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              © 2025 PraxisGrove. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
