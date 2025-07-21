/**
 * API 回退机制和模拟数据
 * 当真实 API 不可用时提供模拟数据
 */

import type { Course, ListResponse } from '@/types/api';

/**
 * 检查 API 是否可用
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    // 首先尝试直接连接后端 API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);
      if (response.ok) {
        return true;
      }
    } catch (directError) {
      console.warn('Direct API health check failed:', directError);
    }

    // 如果直接连接失败，尝试通过本地 API 路由检查
    try {
      const localResponse = await fetch('/api/health', {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (localResponse.ok) {
        const data = await localResponse.json();
        return data.services?.backend?.status === 'healthy';
      }
    } catch (localError) {
      console.warn('Local health check failed:', localError);
    }

    return false;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
}

/**
 * 模拟课程分类数据
 */
export const mockCategories = [
  {
    id: '1',
    name: '前端开发',
    slug: 'frontend',
    description: '现代前端开发技术',
    icon: '💻',
    coursesCount: 25,
    children: [
      { id: '1-1', name: 'React', slug: 'react', coursesCount: 8 },
      { id: '1-2', name: 'Vue.js', slug: 'vue', coursesCount: 6 },
      { id: '1-3', name: 'Angular', slug: 'angular', coursesCount: 4 },
      { id: '1-4', name: 'JavaScript', slug: 'javascript', coursesCount: 7 },
    ],
  },
  {
    id: '2',
    name: '后端开发',
    slug: 'backend',
    description: '服务器端开发技术',
    icon: '⚙️',
    coursesCount: 20,
    children: [
      { id: '2-1', name: 'Node.js', slug: 'nodejs', coursesCount: 6 },
      { id: '2-2', name: 'Python', slug: 'python', coursesCount: 8 },
      { id: '2-3', name: 'Java', slug: 'java', coursesCount: 4 },
      { id: '2-4', name: 'Go', slug: 'go', coursesCount: 2 },
    ],
  },
  {
    id: '3',
    name: '人工智能',
    slug: 'ai',
    description: '机器学习和深度学习',
    icon: '🤖',
    coursesCount: 15,
    children: [
      { id: '3-1', name: '机器学习', slug: 'machine-learning', coursesCount: 6 },
      { id: '3-2', name: '深度学习', slug: 'deep-learning', coursesCount: 4 },
      { id: '3-3', name: '自然语言处理', slug: 'nlp', coursesCount: 3 },
      { id: '3-4', name: '计算机视觉', slug: 'computer-vision', coursesCount: 2 },
    ],
  },
  {
    id: '4',
    name: '数据科学',
    slug: 'data-science',
    description: '数据分析和可视化',
    icon: '📊',
    coursesCount: 12,
    children: [
      { id: '4-1', name: '数据分析', slug: 'data-analysis', coursesCount: 5 },
      { id: '4-2', name: '数据可视化', slug: 'data-visualization', coursesCount: 3 },
      { id: '4-3', name: '统计学', slug: 'statistics', coursesCount: 4 },
    ],
  },
  {
    id: '5',
    name: '移动开发',
    slug: 'mobile',
    description: '移动应用开发',
    icon: '📱',
    coursesCount: 10,
    children: [
      { id: '5-1', name: 'React Native', slug: 'react-native', coursesCount: 4 },
      { id: '5-2', name: 'Flutter', slug: 'flutter', coursesCount: 3 },
      { id: '5-3', name: 'iOS', slug: 'ios', coursesCount: 2 },
      { id: '5-4', name: 'Android', slug: 'android', coursesCount: 1 },
    ],
  },
];

/**
 * 模拟课程数据
 */
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React 18 完整指南',
    description: '从零开始学习 React 18 的所有新特性，包括并发特性、Suspense、Server Components 等。',
    shortDescription: '全面掌握 React 18 新特性',
    instructor: {
      id: 'instructor-1',
      name: '张老师',
      avatar: '/images/instructors/zhang.jpg',
      bio: '前端架构师，拥有10年React开发经验',
      rating: 4.9,
      studentsCount: 15000,
      coursesCount: 12,
      specialties: ['React', 'JavaScript', 'TypeScript'],
    },
    category: {
      id: '1-1',
      name: 'React',
      slug: 'react',
      description: 'React 开发课程',
    },
    level: 'intermediate',
    duration: 1200, // 20小时
    price: 299,
    originalPrice: 399,
    currency: 'CNY',
    rating: 4.8,
    reviewsCount: 1250,
    studentsCount: 8500,
    lessonsCount: 45,
    language: '中文',
    lastUpdated: '2024-01-15',
    isPublished: true,
    isFeatured: true,
    isPopular: true,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    thumbnail: '/images/courses/react-18.jpg',
    certificate: true,
    requirements: [
      '基础的 HTML、CSS、JavaScript 知识',
      '了解 ES6+ 语法',
      '有一定的编程基础',
    ],
    whatYouWillLearn: [
      '掌握 React 18 的所有新特性',
      '理解并发渲染和 Suspense',
      '学会使用 Server Components',
      '构建现代化的 React 应用',
      '性能优化最佳实践',
    ],
    curriculum: [
      {
        id: 'chapter-1',
        title: 'React 基础',
        description: 'React 核心概念和基础知识',
        order: 1,
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'React 简介',
            duration: 15,
            type: 'video',
            order: 1,
            isPreview: true,
          },
          {
            id: 'lesson-1-2',
            title: '组件和 JSX',
            duration: 25,
            type: 'video',
            order: 2,
            isPreview: false,
          },
        ],
      },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Python 机器学习实战',
    description: '使用 Python 和 scikit-learn 构建机器学习模型，从数据预处理到模型部署的完整流程。',
    shortDescription: 'Python 机器学习从入门到实战',
    instructor: {
      id: 'instructor-2',
      name: '李博士',
      avatar: '/images/instructors/li.jpg',
      bio: '机器学习专家，AI 研究员',
      rating: 4.9,
      studentsCount: 12000,
      coursesCount: 8,
      specialties: ['Python', 'Machine Learning', 'Data Science'],
    },
    category: {
      id: '3-1',
      name: '机器学习',
      slug: 'machine-learning',
      description: '机器学习课程',
    },
    level: 'beginner',
    duration: 1800, // 30小时
    price: 399,
    originalPrice: 599,
    currency: 'CNY',
    rating: 4.9,
    reviewsCount: 890,
    studentsCount: 6200,
    lessonsCount: 60,
    language: '中文',
    lastUpdated: '2024-01-10',
    isPublished: true,
    isFeatured: true,
    isPopular: true,
    tags: ['Python', 'Machine Learning', 'Data Science', 'AI'],
    thumbnail: '/images/courses/python-ml.jpg',
    certificate: true,
    requirements: [
      '基础的 Python 编程知识',
      '高中数学基础',
      '对数据分析有兴趣',
    ],
    whatYouWillLearn: [
      '掌握机器学习核心算法',
      '使用 Python 进行数据分析',
      '构建和评估机器学习模型',
      '实际项目经验',
    ],
    curriculum: [
      {
        id: 'chapter-2-1',
        title: '机器学习基础',
        description: '机器学习的基本概念和原理',
        order: 1,
        lessons: [
          {
            id: 'lesson-2-1-1',
            title: '什么是机器学习',
            duration: 20,
            type: 'video',
            order: 1,
            isPreview: true,
          },
        ],
      },
    ],
    createdAt: '2023-12-15',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Vue.js 3 企业级开发',
    description: '学习 Vue.js 3 的组合式 API、TypeScript 集成、状态管理等企业级开发技能。',
    shortDescription: 'Vue.js 3 企业级应用开发',
    instructor: {
      id: 'instructor-3',
      name: '王工程师',
      avatar: '/images/instructors/wang.jpg',
      bio: '全栈开发工程师，Vue.js 核心贡献者',
      rating: 4.8,
      studentsCount: 9500,
      coursesCount: 6,
      specialties: ['Vue.js', 'JavaScript', 'TypeScript'],
    },
    category: {
      id: '1-2',
      name: 'Vue.js',
      slug: 'vue',
      description: 'Vue.js 开发课程',
    },
    level: 'advanced',
    duration: 1500, // 25小时
    price: 349,
    originalPrice: 499,
    currency: 'CNY',
    rating: 4.7,
    reviewsCount: 650,
    studentsCount: 4800,
    lessonsCount: 50,
    language: '中文',
    lastUpdated: '2024-01-08',
    isPublished: true,
    isFeatured: false,
    isPopular: true,
    tags: ['Vue.js', 'JavaScript', 'TypeScript', 'Frontend'],
    thumbnail: '/images/courses/vue3.jpg',
    certificate: true,
    requirements: [
      '熟悉 JavaScript ES6+',
      '了解 Vue.js 2 基础',
      '有前端开发经验',
    ],
    whatYouWillLearn: [
      '掌握 Vue.js 3 组合式 API',
      'TypeScript 在 Vue 中的应用',
      '企业级项目架构设计',
      '性能优化技巧',
    ],
    curriculum: [
      {
        id: 'chapter-3-1',
        title: 'Vue.js 3 新特性',
        description: 'Vue.js 3 的新特性和改进',
        order: 1,
        lessons: [
          {
            id: 'lesson-3-1-1',
            title: 'Composition API 介绍',
            duration: 30,
            type: 'video',
            order: 1,
            isPreview: true,
          },
        ],
      },
    ],
    createdAt: '2023-12-01',
    updatedAt: '2024-01-08',
  },
];

/**
 * 创建模拟的分页响应
 */
export function createMockListResponse<T>(
  items: T[],
  page: number = 1,
  limit: number = 12
): ListResponse<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / limit);

  return {
    success: true,
    data: {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total: items.length,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    },
  };
}

/**
 * API 回退处理器
 */
export class ApiFallbackHandler {
  private static apiHealthy: boolean | null = null;
  private static lastHealthCheck: number = 0;
  private static readonly HEALTH_CHECK_INTERVAL = 30000; // 30秒

  /**
   * 检查 API 健康状态（带缓存）
   */
  static async isApiHealthy(): Promise<boolean> {
    const now = Date.now();

    // 如果最近检查过且在缓存时间内，直接返回缓存结果
    if (
      this.apiHealthy !== null &&
      now - this.lastHealthCheck < this.HEALTH_CHECK_INTERVAL
    ) {
      return this.apiHealthy;
    }

    // 执行健康检查
    this.apiHealthy = await checkApiHealth();
    this.lastHealthCheck = now;

    console.log(`API Health Check: ${this.apiHealthy ? '✅ Healthy' : '❌ Unhealthy'}`);

    return this.apiHealthy;
  }

  /**
   * 重置健康检查缓存
   */
  static resetHealthCheck(): void {
    this.apiHealthy = null;
    this.lastHealthCheck = 0;
  }
}
