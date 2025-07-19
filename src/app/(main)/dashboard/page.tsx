import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学习仪表板 - PraxisGrove',
  description: '查看您的学习进度、成就和推荐内容',
};

/**
 * 用户学习仪表板页面
 */
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          学习仪表板
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          欢迎回来！查看您的学习进度和最新推荐
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                正在学习的课程
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                5
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 dark:bg-green-900">
                <svg
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                已完成课程
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-100 dark:bg-yellow-900">
                <svg
                  className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                学习时长
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                48h
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900">
                <svg
                  className="h-5 w-5 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                获得成就
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                8
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 学习进度和推荐内容 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 最近学习 */}
        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              最近学习
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    JS
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    JavaScript 高级编程
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    进度: 75%
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    AI
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    机器学习基础
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    进度: 45%
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-green-600"
                      style={{ width: '45%' }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    3D
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Three.js 3D 开发
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    进度: 30%
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-purple-600"
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI 推荐 */}
        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
          <div className="border-b border-gray-200 p-6 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI 为您推荐
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  React 高级模式
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  基于您对 JavaScript 的学习进度，推荐学习 React 高级开发模式。
                </p>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    匹配度: 95%
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    查看详情
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  深度学习实战
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  继续您的 AI 学习之旅，深入了解神经网络和深度学习算法。
                </p>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-600 dark:bg-green-900 dark:text-green-400">
                    匹配度: 88%
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    查看详情
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  WebGL 图形编程
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  结合您的 3D 开发兴趣，学习底层图形编程技术。
                </p>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-600 dark:bg-purple-900 dark:text-purple-400">
                    匹配度: 82%
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
