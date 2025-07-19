import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D知识宇宙 - PraxisGrove',
  description: '探索沉浸式3D知识图谱，可视化学习路径',
};

/**
 * 3D知识宇宙页面
 */
export default function KnowledgeUniversePage() {
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          3D知识宇宙
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          在三维空间中探索知识的无限可能，发现概念之间的深层联系
        </p>
      </div>

      {/* 控制面板 */}
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                知识领域
              </label>
              <select className="rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option>全部领域</option>
                <option>前端开发</option>
                <option>人工智能</option>
                <option>数据科学</option>
                <option>3D图形</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                难度级别
              </label>
              <select className="rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                <option>所有级别</option>
                <option>初级</option>
                <option>中级</option>
                <option>高级</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              重置视角
            </button>
            <button className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              全屏模式
            </button>
          </div>
        </div>
      </div>

      {/* 3D 渲染区域 */}
      <div className="relative">
        <div
          className="overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          style={{ height: '600px' }}
        >
          {/* 3D Canvas 占位符 */}
          <div className="flex h-full w-full items-center justify-center text-white">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                <svg
                  className="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                3D知识图谱加载中...
              </h3>
              <p className="text-white/70">正在构建您的个性化知识宇宙</p>
              <div className="mx-auto mt-4 h-2 w-48 rounded-full bg-white/20">
                <div
                  className="h-2 animate-pulse rounded-full bg-white"
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* 浮动控制器 */}
          <div className="absolute right-4 top-4 rounded-lg bg-black/20 p-3 backdrop-blur-sm">
            <div className="space-y-2">
              <button className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-colors hover:bg-white/30">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-colors hover:bg-white/30">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white transition-colors hover:bg-white/30">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 信息面板 */}
          <div className="absolute bottom-4 left-4 max-w-sm rounded-lg bg-black/20 p-4 backdrop-blur-sm">
            <h4 className="mb-2 font-semibold text-white">
              JavaScript 核心概念
            </h4>
            <p className="mb-3 text-sm text-white/80">
              探索 JavaScript 的核心概念，包括变量、函数、对象等基础知识点。
            </p>
            <div className="flex items-center space-x-2">
              <span className="rounded bg-blue-500/30 px-2 py-1 text-xs text-blue-200">
                初级
              </span>
              <span className="rounded bg-green-500/30 px-2 py-1 text-xs text-green-200">
                已学习
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 导航和统计 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 学习路径 */}
        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            推荐学习路径
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  JavaScript 基础
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  变量、函数、对象
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  DOM 操作
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  元素选择、事件处理
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-sm font-semibold text-white">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  异步编程
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Promise、async/await
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 知识统计 */}
        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            知识统计
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  已掌握概念
                </span>
                <span className="text-gray-900 dark:text-white">24/50</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '48%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  学习进度
                </span>
                <span className="text-gray-900 dark:text-white">68%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: '68%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  连接强度
                </span>
                <span className="text-gray-900 dark:text-white">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-purple-600"
                  style={{ width: '85%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近探索 */}
        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            最近探索
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  JS
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  闭包概念
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2分钟前
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                  AI
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  神经网络
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  15分钟前
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  3D
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  材质系统
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1小时前
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h3 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
          如何使用3D知识宇宙
        </h3>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div className="flex items-start space-x-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              1
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                探索节点
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                点击知识节点查看详细信息和相关内容
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              2
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                导航空间
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                使用鼠标拖拽旋转，滚轮缩放视角
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              3
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                跟踪进度
              </p>
              <p className="text-blue-700 dark:text-blue-200">
                查看学习路径和知识连接强度
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
