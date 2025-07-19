import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  // 在实际应用中，这里会根据 ID 获取课程信息
  return {
    title: `课程详情 - PraxisGrove`,
    description: '查看课程详细信息和学习内容',
  };
}

/**
 * 课程详情页面
 */
export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { id: courseId } = await params;

  // 模拟课程详情数据
  const course = {
    id: courseId,
    title: 'JavaScript 高级编程',
    description:
      '深入学习 JavaScript 的高级特性和最佳实践，包括闭包、原型链、异步编程、模块化等核心概念。',
    instructor: {
      name: '张老师',
      avatar: '/api/placeholder/64/64',
      bio: '资深前端工程师，拥有10年JavaScript开发经验',
      rating: 4.9,
    },
    duration: '40小时',
    level: '中级',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    students: 1234,
    lastUpdated: '2024-01-15',
    language: '中文',
    certificate: true,
    tags: ['JavaScript', '前端开发', '编程'],
    whatYouWillLearn: [
      '掌握 JavaScript 的高级语法特性',
      '理解闭包、原型链等核心概念',
      '学会异步编程和 Promise 处理',
      '掌握模块化开发最佳实践',
      '了解性能优化技巧',
      '学会调试和错误处理',
    ],
    curriculum: [
      {
        title: '第一章：JavaScript 基础回顾',
        lessons: [
          { title: '变量和数据类型', duration: '15分钟', preview: true },
          { title: '函数和作用域', duration: '20分钟', preview: false },
          { title: '对象和数组', duration: '18分钟', preview: false },
        ],
      },
      {
        title: '第二章：高级语法特性',
        lessons: [
          { title: '闭包深入理解', duration: '25分钟', preview: true },
          { title: '原型链和继承', duration: '30分钟', preview: false },
          { title: 'this 关键字详解', duration: '22分钟', preview: false },
        ],
      },
      {
        title: '第三章：异步编程',
        lessons: [
          { title: '回调函数和事件循环', duration: '28分钟', preview: false },
          {
            title: 'Promise 和 async/await',
            duration: '35分钟',
            preview: false,
          },
          { title: '错误处理最佳实践', duration: '20分钟', preview: false },
        ],
      },
    ],
    requirements: [
      '具备基础的 JavaScript 知识',
      '了解 HTML 和 CSS',
      '有一定的编程经验',
    ],
    reviews: [
      {
        user: '学员A',
        rating: 5,
        comment: '课程内容非常详细，老师讲解清晰，受益匪浅！',
        date: '2024-01-10',
      },
      {
        user: '学员B',
        rating: 4,
        comment: '很好的课程，帮助我理解了很多之前困惑的概念。',
        date: '2024-01-08',
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 主要内容区域 */}
        <div className="space-y-8 lg:col-span-2">
          {/* 课程标题和基本信息 */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {course.level}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="mr-1 h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {course.rating} ({course.students} 学员)
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>

            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>👨‍🏫 {course.instructor.name}</span>
              <span>⏱️ {course.duration}</span>
              <span>🌐 {course.language}</span>
              <span>📅 更新于 {course.lastUpdated}</span>
              {course.certificate && <span>🏆 提供证书</span>}
            </div>
          </div>

          {/* 您将学到什么 */}
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              您将学到什么
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 课程大纲 */}
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              课程大纲
            </h2>
            <div className="space-y-4">
              {course.curriculum.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-gray-50 p-4 dark:bg-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {chapter.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 18h6"
                            />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">
                            {lesson.title}
                          </span>
                          {lesson.preview && (
                            <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              预览
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 要求 */}
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              课程要求
            </h2>
            <ul className="space-y-2">
              {course.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
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
                  <span className="text-gray-700 dark:text-gray-300">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 学员评价 */}
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              学员评价
            </h2>
            <div className="space-y-4">
              {course.reviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700"
                >
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.user}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* 课程预览卡片 */}
            <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
              {/* 预览视频/图片 */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <div className="text-center text-white">
                  <svg
                    className="mx-auto mb-2 h-16 w-16"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">课程预览</p>
                </div>
              </div>

              <div className="p-6">
                {/* 价格 */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      ¥{course.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                      ¥{course.originalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    限时优惠，节省 ¥{course.originalPrice - course.price}
                  </p>
                </div>

                {/* 购买按钮 */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    立即购买
                  </Button>
                  <Button variant="outline" className="w-full">
                    加入购物车
                  </Button>
                </div>

                {/* 课程信息 */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      课程时长
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      难度级别
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      学员人数
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course.students}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      语言
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course.language}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      证书
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {course.certificate ? '✅ 提供' : '❌ 不提供'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 讲师信息 */}
            <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                讲师介绍
              </h3>
              <div className="flex items-start space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {course.instructor.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {course.instructor.name}
                  </h4>
                  <div className="mt-1 flex items-center">
                    <svg
                      className="mr-1 h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.instructor.rating} 讲师评分
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
