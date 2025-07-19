import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 课程查询参数验证schema
const coursesQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 12)),
  search: z.string().optional(),
  category: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  sort: z
    .enum(['newest', 'popular', 'rating', 'price'])
    .optional()
    .default('newest'),
});

/**
 * 获取课程列表API
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 验证查询参数
    const queryParams = coursesQuerySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      search: searchParams.get('search'),
      category: searchParams.get('category'),
      level: searchParams.get('level'),
      sort: searchParams.get('sort'),
    });

    // 模拟课程数据
    const mockCourses = [
      {
        id: '1',
        title: 'JavaScript 高级编程',
        description: '深入学习 JavaScript 的高级特性和最佳实践',
        instructor: {
          id: '1',
          name: '张老师',
          avatar: '/api/placeholder/64/64',
          rating: 4.9,
        },
        duration: 40,
        level: 'intermediate',
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        studentsCount: 1234,
        lessonsCount: 25,
        lastUpdated: '2024-01-15',
        language: 'zh-CN',
        certificate: true,
        category: 'frontend',
        tags: ['JavaScript', '前端开发', '编程'],
        thumbnail: '/api/placeholder/300/200',
        isPopular: true,
        isFeatured: false,
        createdAt: '2023-12-01',
      },
      {
        id: '2',
        title: '机器学习基础',
        description: '从零开始学习机器学习的核心概念和算法',
        instructor: {
          id: '2',
          name: '李博士',
          avatar: '/api/placeholder/64/64',
          rating: 4.9,
        },
        duration: 60,
        level: 'beginner',
        price: 399,
        originalPrice: 499,
        rating: 4.9,
        studentsCount: 2156,
        lessonsCount: 35,
        lastUpdated: '2024-01-10',
        language: 'zh-CN',
        certificate: true,
        category: 'ai',
        tags: ['机器学习', 'AI', 'Python'],
        thumbnail: '/api/placeholder/300/200',
        isPopular: true,
        isFeatured: true,
        createdAt: '2023-11-15',
      },
      {
        id: '3',
        title: 'Three.js 3D 开发',
        description: '使用 Three.js 创建令人惊叹的 3D Web 体验',
        instructor: {
          id: '3',
          name: '王工程师',
          avatar: '/api/placeholder/64/64',
          rating: 4.7,
        },
        duration: 35,
        level: 'intermediate',
        price: 349,
        originalPrice: 449,
        rating: 4.7,
        studentsCount: 856,
        lessonsCount: 20,
        lastUpdated: '2024-01-08',
        language: 'zh-CN',
        certificate: true,
        category: '3d',
        tags: ['Three.js', '3D', 'WebGL'],
        thumbnail: '/api/placeholder/300/200',
        isPopular: false,
        isFeatured: false,
        createdAt: '2023-12-20',
      },
      {
        id: '4',
        title: 'React 高级模式',
        description: '掌握 React 的高级开发模式和性能优化技巧',
        instructor: {
          id: '4',
          name: '陈架构师',
          avatar: '/api/placeholder/64/64',
          rating: 4.9,
        },
        duration: 45,
        level: 'advanced',
        price: 449,
        originalPrice: 599,
        rating: 4.9,
        studentsCount: 1567,
        lessonsCount: 30,
        lastUpdated: '2024-01-12',
        language: 'zh-CN',
        certificate: true,
        category: 'frontend',
        tags: ['React', '前端架构', '性能优化'],
        thumbnail: '/api/placeholder/300/200',
        isPopular: true,
        isFeatured: true,
        createdAt: '2023-11-30',
      },
    ];

    // 应用筛选条件
    let filteredCourses = [...mockCourses];

    // 搜索过滤
    if (queryParams.search) {
      const searchTerm = queryParams.search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // 分类过滤
    if (queryParams.category) {
      filteredCourses = filteredCourses.filter(
        (course) => course.category === queryParams.category
      );
    }

    // 级别过滤
    if (queryParams.level) {
      filteredCourses = filteredCourses.filter(
        (course) => course.level === queryParams.level
      );
    }

    // 排序
    switch (queryParams.sort) {
      case 'popular':
        filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'rating':
        filteredCourses.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        filteredCourses.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
      default:
        filteredCourses.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    // 分页
    const total = filteredCourses.length;
    const totalPages = Math.ceil(total / queryParams.limit);
    const startIndex = (queryParams.page - 1) * queryParams.limit;
    const endIndex = startIndex + queryParams.limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    // 返回响应
    return NextResponse.json({
      success: true,
      data: {
        courses: paginatedCourses,
        pagination: {
          page: queryParams.page,
          limit: queryParams.limit,
          total,
          totalPages,
          hasNext: queryParams.page < totalPages,
          hasPrev: queryParams.page > 1,
        },
        filters: {
          search: queryParams.search,
          category: queryParams.category,
          level: queryParams.level,
          sort: queryParams.sort,
        },
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: '查询参数格式错误',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        message: '服务器内部错误',
      },
      { status: 500 }
    );
  }
}
