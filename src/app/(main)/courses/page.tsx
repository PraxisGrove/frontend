import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '课程中心 - PraxisGrove',
  description: '浏览和学习各种专业课程',
};

/**
 * 课程列表页面
 */
export default function CoursesPage() {
  // 模拟课程数据
  const courses = [
    {
      id: 1,
      title: 'JavaScript 高级编程',
      description: '深入学习 JavaScript 的高级特性和最佳实践',
      instructor: '张老师',
      duration: '40小时',
      level: '中级',
      price: '¥299',
      rating: 4.8,
      students: 1234,
      image: '/api/placeholder/300/200',
      tags: ['JavaScript', '前端开发', '编程'],
    },
    {
      id: 2,
      title: '机器学习基础',
      description: '从零开始学习机器学习的核心概念和算法',
      instructor: '李博士',
      duration: '60小时',
      level: '初级',
      price: '¥399',
      rating: 4.9,
      students: 2156,
      image: '/api/placeholder/300/200',
      tags: ['机器学习', 'AI', 'Python'],
    },
    {
      id: 3,
      title: 'Three.js 3D 开发',
      description: '使用 Three.js 创建令人惊叹的 3D Web 体验',
      instructor: '王工程师',
      duration: '35小时',
      level: '中级',
      price: '¥349',
      rating: 4.7,
      students: 856,
      image: '/api/placeholder/300/200',
      tags: ['Three.js', '3D', 'WebGL'],
    },
    {
      id: 4,
      title: 'React 高级模式',
      description: '掌握 React 的高级开发模式和性能优化技巧',
      instructor: '陈架构师',
      duration: '45小时',
      level: '高级',
      price: '¥449',
      rating: 4.9,
      students: 1567,
      image: '/api/placeholder/300/200',
      tags: ['React', '前端架构', '性能优化'],
    },
    {
      id: 5,
      title: '深度学习实战',
      description: '通过实际项目学习深度学习和神经网络',
      instructor: '刘研究员',
      duration: '80小时',
      level: '高级',
      price: '¥599',
      rating: 4.8,
      students: 934,
      image: '/api/placeholder/300/200',
      tags: ['深度学习', 'TensorFlow', 'PyTorch'],
    },
    {
      id: 6,
      title: 'WebGL 图形编程',
      description: '学习底层图形编程技术，创建高性能 Web 图形应用',
      instructor: '赵专家',
      duration: '50小时',
      level: '高级',
      price: '¥499',
      rating: 4.6,
      students: 567,
      image: '/api/placeholder/300/200',
      tags: ['WebGL', '图形编程', 'GLSL'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题和搜索 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            课程中心
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            发现适合您的专业课程，提升技能水平
          </p>
        </div>

        <div className="mt-4 flex space-x-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索课程..."
              className="w-64 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
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
          </div>
          <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <option>所有级别</option>
            <option>初级</option>
            <option>中级</option>
            <option>高级</option>
          </select>
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="flex flex-wrap gap-2">
        <button className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          全部
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          前端开发
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          人工智能
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          3D 开发
        </button>
        <button className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          数据科学
        </button>
      </div>

      {/* 课程网格 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800"
          >
            {/* 课程图片 */}
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <div className="text-center text-white">
                <div className="mb-2 text-4xl font-bold">
                  {course.title.charAt(0)}
                </div>
                <div className="text-sm opacity-90">{course.title}</div>
              </div>
            </div>

            {/* 课程信息 */}
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    course.level === '初级'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : course.level === '中级'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
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
                  {course.rating}
                </div>
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {course.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {course.description}
              </p>

              <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-4">👨‍🏫 {course.instructor}</span>
                <span className="mr-4">⏱️ {course.duration}</span>
                <span>👥 {course.students}</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-1">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {course.price}
                </span>
                <Link href={`/courses/${course.id}`}>
                  <Button size="sm">查看详情</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页 */}
      <div className="flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            上一页
          </button>
          <button className="rounded bg-blue-600 px-3 py-2 text-sm text-white">
            1
          </button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            2
          </button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            3
          </button>
          <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            下一页
          </button>
        </nav>
      </div>
    </div>
  );
}
