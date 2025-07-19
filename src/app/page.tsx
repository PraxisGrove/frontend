import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
            欢迎来到
            <span className="text-blue-600 dark:text-blue-400">
              {' '}
              PraxisGrove
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            AI驱动的沉浸式在线教育平台，为您提供个性化学习体验和3D知识宇宙探索
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 py-3 text-lg">
              开始学习之旅
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              探索3D知识宇宙
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              🤖 AI智能助手
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              个性化AI导师，实时解答问题，提供定制化学习建议
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              🌌 3D知识宇宙
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              沉浸式3D环境，可视化知识结构，让学习更加直观有趣
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              👥 学习社区
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              与全球学习者交流互动，分享知识，共同成长
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
