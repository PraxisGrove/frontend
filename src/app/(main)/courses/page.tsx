'use client';

import React, { useState, useEffect } from 'react';
import {
  CourseCard,
  CourseFilter,
  CoursePagination,
} from '@/components/course';
import { AnimatedContainer } from '@/components/unified';
// import { ApiStatusIndicator } from '@/components/common/ApiStatusIndicator';
import type { Course, CoursesQueryParams } from '@/types/api';
import { coursesApi } from '@/api/courses';

// 注意：由于使用了 'use client'，metadata 需要在其他地方定义
// export const metadata: Metadata = {
//   title: '课程中心 - PraxisGrove',
//   description: '浏览和学习各种专业课程',
// };

/**
 * 课程列表页面
 */
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CoursesQueryParams>({
    page: 1,
    limit: 12,
    sort: 'created_at',
    order: 'desc',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [categories, setCategories] = useState<
    Array<{
      id: string;
      name: string;
      slug: string;
      coursesCount: number;
    }>
  >([]);

  // 获取课程数据
  const fetchCourses = React.useCallback(
    async (queryParams: CoursesQueryParams) => {
      try {
        setLoading(true);
        setError(null);
        const response = await coursesApi.getCourses(queryParams);
        setCourses(response.data.items);
        setPagination(response.data.pagination);
      } catch (err) {
        setError('获取课程数据失败，请稍后重试');
        console.error('Failed to fetch courses:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 获取分类数据
  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await coursesApi.getCategories();
      setCategories(response);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // 初始化数据
  useEffect(() => {
    fetchCourses(filters);
    fetchCategories();
  }, [filters, fetchCourses, fetchCategories]);

  // 处理过滤器变化
  const handleFilterChange = React.useCallback(
    (newFilters: CoursesQueryParams) => {
      const updatedFilters = { ...filters, ...newFilters, page: 1 };
      setFilters(updatedFilters);
      fetchCourses(updatedFilters);
    },
    [filters, fetchCourses]
  );

  // 处理分页变化
  const handlePageChange = React.useCallback(
    (page: number) => {
      const updatedFilters = { ...filters, page };
      setFilters(updatedFilters);
      fetchCourses(updatedFilters);
    },
    [filters, fetchCourses]
  );

  // 模拟课程数据（作为后备）
  const mockCourses = React.useMemo(
    (): Course[] => [
      {
        id: '1',
        title: 'JavaScript 高级编程',
        description: '深入学习 JavaScript 的高级特性和最佳实践',
        shortDescription: '深入学习 JavaScript 的高级特性和最佳实践',
        instructor: {
          id: '1',
          name: '张老师',
          avatar: '',
          bio: '资深前端工程师',
          rating: 4.9,
          studentsCount: 1000,
          coursesCount: 5,
          specialties: ['JavaScript', '前端开发'],
        },
        category: {
          id: '1',
          name: '前端开发',
          slug: 'frontend',
          description: '前端开发相关课程',
        },
        level: 'intermediate',
        duration: 2400, // 40小时 = 2400分钟
        price: 299,
        originalPrice: 399,
        currency: 'CNY',
        rating: 4.8,
        reviewsCount: 156,
        studentsCount: 1234,
        lessonsCount: 45,
        language: '中文',
        lastUpdated: '2024-01-15',
        isPublished: true,
        isFeatured: true,
        isPopular: true,
        tags: ['JavaScript', '前端开发', '编程'],
        thumbnail: '',
        certificate: true,
        requirements: ['具备基础的 JavaScript 知识'],
        whatYouWillLearn: ['掌握 JavaScript 的高级语法特性'],
        curriculum: [],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
      },
    ],
    []
  );

  // 如果 API 失败，使用模拟数据
  useEffect(() => {
    if (error && courses.length === 0) {
      setCourses(mockCourses);
      setPagination({
        page: 1,
        limit: 12,
        total: mockCourses.length,
        totalPages: Math.ceil(mockCourses.length / 12),
        hasNext: false,
        hasPrev: false,
      });
      setLoading(false);
    }
  }, [error, courses.length, mockCourses]);

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <AnimatedContainer animation="slideDown" delay={0.1}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            课程中心
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            发现适合您的专业课程，提升技能水平
          </p>
        </div>
      </AnimatedContainer>

      {/* 搜索和过滤器 */}
      <CourseFilter
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        categories={categories}
      />

      {/* API 状态指示器 */}
      {/* <ApiStatusIndicator className="mb-6" showDetails={false} /> */}

      {/* 错误提示 */}
      {error && (
        <AnimatedContainer animation="slideDown" delay={0.2}>
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        </AnimatedContainer>
      )}

      {/* 加载状态 */}
      {loading && (
        <AnimatedContainer animation="fadeIn" delay={0.2}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </AnimatedContainer>
      )}

      {/* 课程网格 */}
      {!loading && courses.length > 0 && (
        <AnimatedContainer animation="slideUp" delay={0.3}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                variant={index % 3 === 0 ? 'animated' : 'default'}
              />
            ))}
          </div>
        </AnimatedContainer>
      )}

      {/* 空状态 */}
      {!loading && courses.length === 0 && !error && (
        <AnimatedContainer animation="fadeIn" delay={0.3}>
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg
                className="h-12 w-12 text-gray-400"
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
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              暂无课程
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              没有找到符合条件的课程，请尝试调整搜索条件
            </p>
          </div>
        </AnimatedContainer>
      )}

      {/* 分页 */}
      {!loading && courses.length > 0 && (
        <CoursePagination
          pagination={pagination}
          onPageChange={handlePageChange}
          variant="default"
          showInfo={true}
        />
      )}
    </div>
  );
}
