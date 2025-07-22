'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CourseInfo,
  CourseSyllabus,
  CourseReviews,
  CoursePurchase,
} from '@/components/course';
import { AnimatedContainer } from '@/components/unified';
import { coursesApi } from '@/api/courses';
import type { Course } from '@/types/api';

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 注意：由于使用了 'use client'，metadata 需要在其他地方定义
// export async function generateMetadata({
//   params,
// }: CourseDetailPageProps): Promise<Metadata> {
//   return {
//     title: `课程详情 - PraxisGrove`,
//     description: '查看课程详细信息和学习内容',
//   };
// }

/**
 * 课程详情页面
 */
export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEnrollment, setUserEnrollment] = useState<{
    isEnrolled: boolean;
    progress: number;
    enrolledAt: string;
  } | null>(null);

  // 获取课程 ID
  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    const getCourseId = async () => {
      const resolvedParams = await params;
      setCourseId(resolvedParams.id);
    };
    getCourseId();
  }, [params]);

  // 模拟课程详情数据
  const mockCourse = React.useMemo(
    (): Course => ({
      id: courseId || '1',
      title: 'JavaScript 高级编程',
      description:
        '深入学习 JavaScript 的高级特性和最佳实践，包括闭包、原型链、异步编程、模块化等核心概念。',
      shortDescription: '深入学习 JavaScript 的高级特性和最佳实践',
      instructor: {
        id: '1',
        name: '张老师',
        avatar: '',
        bio: '资深前端工程师，拥有10年JavaScript开发经验',
        rating: 4.9,
        studentsCount: 5000,
        coursesCount: 8,
        specialties: ['JavaScript', '前端开发', 'React'],
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
      thumbnail: '/images/courses/javascript-advanced.jpg',
      certificate: true,
      requirements: ['基础的 HTML、CSS、JavaScript 知识'],
      whatYouWillLearn: [
        '掌握 JavaScript 高级特性',
        '理解闭包和原型链',
        '学会异步编程',
        '掌握模块化开发',
      ],
      curriculum: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    }),
    [courseId]
  );

  // 获取课程详情
  const fetchCourseDetail = React.useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await coursesApi.getCourse(id);
        setCourse(response);

        // 获取用户注册信息（如果已登录）
        // TODO: 实现 getUserEnrollment API
        // try {
        //   const enrollmentResponse = await coursesApi.getUserEnrollment(id);
        //   setUserEnrollment(enrollmentResponse);
        // } catch (enrollmentError) {
        //   setUserEnrollment(null);
        // }
        setUserEnrollment(null);
      } catch (err) {
        setError('获取课程详情失败，请稍后重试');
        console.error('Failed to fetch course detail:', err);
        // 使用模拟数据作为后备
        setCourse(mockCourse);
      } finally {
        setLoading(false);
      }
    },
    [mockCourse]
  );

  useEffect(() => {
    if (courseId) {
      fetchCourseDetail(courseId);
    }
  }, [courseId, fetchCourseDetail]);

  // 处理课时点击
  const handleLessonClick = (lessonId: string) => {
    // 跳转到学习页面
    window.location.href = `/learn/${courseId}?lesson=${lessonId}`;
  };

  // 加载状态
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error && !course) {
    return (
      <div className="mx-auto max-w-7xl">
        <AnimatedContainer animation="fadeIn" delay={0.1}>
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <svg
                className="h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              课程加载失败
            </h3>
            <p className="text-gray-500 dark:text-gray-400">{error}</p>
          </div>
        </AnimatedContainer>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 主要内容区域 */}
        <div className="space-y-8 lg:col-span-2">
          {/* 课程基本信息 */}
          <CourseInfo course={course} />

          {/* 选项卡内容 */}
          <AnimatedContainer animation="slideUp" delay={0.4}>
            <Tabs defaultValue="syllabus" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="syllabus">课程大纲</TabsTrigger>
                <TabsTrigger value="reviews">学员评价</TabsTrigger>
                <TabsTrigger value="instructor">讲师介绍</TabsTrigger>
              </TabsList>
              <TabsContent value="syllabus" className="mt-6">
                <CourseSyllabus
                  course={course}
                  userProgress={
                    userEnrollment
                      ? {
                          completedLessons: [],
                          currentLesson: undefined,
                        }
                      : undefined
                  }
                  onLessonClick={handleLessonClick}
                />
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <CourseReviews course={course} />
              </TabsContent>
              <TabsContent value="instructor" className="mt-6">
                <CourseInfo course={course} />
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
        </div>

        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          <CoursePurchase
            course={course}
            userEnrollment={userEnrollment || undefined}
          />
        </div>
      </div>
    </div>
  );
}
