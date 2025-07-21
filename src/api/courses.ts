import { api, publicApi } from '@/lib/api';
import {
  ApiFallbackHandler,
  mockCategories,
  mockCourses,
  createMockListResponse
} from '@/lib/api-fallback';
import type {
  Course,
  CoursesQueryParams,
  CourseProgress,
  ListResponse,
  PaginationParams,
} from '@/types/api';

/**
 * 课程相关API服务
 */
export const coursesApi = {
  /**
   * 获取课程列表
   */
  getCourses: async (
    params?: CoursesQueryParams
  ): Promise<ListResponse<Course>> => {
    try {
      // 检查 API 是否可用
      const isHealthy = await ApiFallbackHandler.isApiHealthy();

      if (isHealthy) {
        return await publicApi.get<ListResponse<Course>>('/courses', { params });
      } else {
        console.warn('API unavailable, using mock data for courses');
        // 使用模拟数据
        const page = params?.page || 1;
        const limit = params?.limit || 12;
        return createMockListResponse(mockCourses, page, limit);
      }
    } catch (error) {
      console.error('Failed to fetch courses, falling back to mock data:', error);
      // API 调用失败，使用模拟数据
      const page = params?.page || 1;
      const limit = params?.limit || 12;
      return createMockListResponse(mockCourses, page, limit);
    }
  },

  /**
   * 获取课程详情
   */
  getCourse: async (id: string): Promise<Course> => {
    try {
      // 检查 API 是否可用
      const isHealthy = await ApiFallbackHandler.isApiHealthy();

      if (isHealthy) {
        return await publicApi.get<Course>(`/courses/${id}`);
      } else {
        console.warn('API unavailable, using mock data for course details');
        // 从模拟数据中查找课程
        const course = mockCourses.find(c => c.id === id);
        if (!course) {
          throw new Error(`Course with id ${id} not found`);
        }
        return course;
      }
    } catch (error) {
      console.error('Failed to fetch course details, falling back to mock data:', error);
      // 从模拟数据中查找课程
      const course = mockCourses.find(c => c.id === id);
      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }
      return course;
    }
  },

  /**
   * 获取推荐课程
   */
  getRecommendedCourses: async (limit = 6): Promise<Course[]> => {
    return api.get<Course[]>('/courses/recommended', { params: { limit } });
  },

  /**
   * 获取热门课程
   */
  getPopularCourses: async (limit = 10): Promise<Course[]> => {
    return publicApi.get<Course[]>('/courses/popular', { params: { limit } });
  },

  /**
   * 获取最新课程
   */
  getLatestCourses: async (limit = 10): Promise<Course[]> => {
    return publicApi.get<Course[]>('/courses/latest', { params: { limit } });
  },

  /**
   * 获取精选课程
   */
  getFeaturedCourses: async (): Promise<Course[]> => {
    return publicApi.get<Course[]>('/courses/featured');
  },

  /**
   * 搜索课程
   */
  searchCourses: async (
    query: string,
    params?: Omit<CoursesQueryParams, 'search'>
  ): Promise<ListResponse<Course>> => {
    return publicApi.get<ListResponse<Course>>('/courses/search', {
      params: { search: query, ...params },
    });
  },

  /**
   * 获取课程分类
   */
  getCategories: async (): Promise<
    Array<{
      id: string;
      name: string;
      slug: string;
      description?: string;
      icon?: string;
      coursesCount: number;
      children?: Array<{
        id: string;
        name: string;
        slug: string;
        coursesCount: number;
      }>;
    }>
  > => {
    try {
      // 检查 API 是否可用
      const isHealthy = await ApiFallbackHandler.isApiHealthy();

      if (isHealthy) {
        return await publicApi.get('/courses/categories');
      } else {
        console.warn('API unavailable, using mock data for categories');
        return mockCategories;
      }
    } catch (error) {
      console.error('Failed to fetch categories, falling back to mock data:', error);
      return mockCategories;
    }
  },

  /**
   * 获取讲师信息
   */
  getInstructor: async (
    id: string
  ): Promise<{
    id: string;
    name: string;
    avatar?: string;
    bio: string;
    rating: number;
    studentsCount: number;
    coursesCount: number;
    specialties: string[];
    courses: Course[];
    socialLinks?: {
      website?: string;
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
  }> => {
    return publicApi.get(`/instructors/${id}`);
  },

  /**
   * 报名课程
   */
  enrollCourse: async (
    courseId: string
  ): Promise<{
    enrollmentId: string;
    courseId: string;
    enrolledAt: string;
  }> => {
    return api.post(`/courses/${courseId}/enroll`);
  },

  /**
   * 取消报名
   */
  unenrollCourse: async (courseId: string): Promise<void> => {
    return api.delete(`/courses/${courseId}/enroll`);
  },

  /**
   * 检查是否已报名
   */
  checkEnrollment: async (
    courseId: string
  ): Promise<{
    isEnrolled: boolean;
    enrolledAt?: string;
    progress?: CourseProgress;
  }> => {
    return api.get(`/courses/${courseId}/enrollment`);
  },

  /**
   * 获取我的课程
   */
  getMyCourses: async (params?: {
    status?: 'enrolled' | 'completed' | 'in_progress';
    page?: number;
    limit?: number;
  }): Promise<ListResponse<Course & { progress: CourseProgress }>> => {
    return api.get('/courses/my-courses', { params });
  },

  /**
   * 获取课程进度
   */
  getCourseProgress: async (courseId: string): Promise<CourseProgress> => {
    return api.get(`/courses/${courseId}/progress`);
  },

  /**
   * 更新课程进度
   */
  updateProgress: async (
    courseId: string,
    lessonId: string,
    data: {
      completed: boolean;
      timeSpent?: number;
      notes?: string;
    }
  ): Promise<CourseProgress> => {
    return api.post(`/courses/${courseId}/lessons/${lessonId}/progress`, data);
  },

  /**
   * 标记课程完成
   */
  completeCourse: async (
    courseId: string
  ): Promise<{
    completedAt: string;
    certificate?: {
      id: string;
      certificateUrl: string;
    };
  }> => {
    return api.post(`/courses/${courseId}/complete`);
  },

  /**
   * 获取课程证书
   */
  getCertificate: async (
    courseId: string
  ): Promise<{
    id: string;
    courseId: string;
    userId: string;
    issuedAt: string;
    certificateUrl: string;
    verificationCode: string;
  }> => {
    return api.get(`/courses/${courseId}/certificate`);
  },

  /**
   * 下载证书
   */
  downloadCertificate: async (courseId: string): Promise<void> => {
    return api.download(
      `/courses/${courseId}/certificate/download`,
      `certificate-${courseId}.pdf`
    );
  },

  /**
   * 获取课程评价
   */
  getReviews: async (
    courseId: string,
    params?: PaginationParams
  ): Promise<
    ListResponse<{
      id: string;
      user: {
        id: string;
        name: string;
        avatar?: string;
      };
      rating: number;
      comment: string;
      helpful: number;
      isHelpful?: boolean;
      createdAt: string;
    }>
  > => {
    return publicApi.get(`/courses/${courseId}/reviews`, { params });
  },

  /**
   * 添加课程评价
   */
  addReview: async (
    courseId: string,
    data: {
      rating: number;
      comment: string;
    }
  ): Promise<void> => {
    return api.post(`/courses/${courseId}/reviews`, data);
  },

  /**
   * 更新课程评价
   */
  updateReview: async (
    courseId: string,
    reviewId: string,
    data: {
      rating: number;
      comment: string;
    }
  ): Promise<void> => {
    return api.put(`/courses/${courseId}/reviews/${reviewId}`, data);
  },

  /**
   * 删除课程评价
   */
  deleteReview: async (courseId: string, reviewId: string): Promise<void> => {
    return api.delete(`/courses/${courseId}/reviews/${reviewId}`);
  },

  /**
   * 标记评价有用
   */
  markReviewHelpful: async (
    courseId: string,
    reviewId: string,
    helpful: boolean
  ): Promise<void> => {
    return api.post(`/courses/${courseId}/reviews/${reviewId}/helpful`, {
      helpful,
    });
  },

  /**
   * 收藏课程
   */
  bookmarkCourse: async (courseId: string): Promise<void> => {
    return api.post(`/courses/${courseId}/bookmark`);
  },

  /**
   * 取消收藏
   */
  unbookmarkCourse: async (courseId: string): Promise<void> => {
    return api.delete(`/courses/${courseId}/bookmark`);
  },

  /**
   * 获取收藏的课程
   */
  getBookmarkedCourses: async (
    params?: PaginationParams
  ): Promise<ListResponse<Course>> => {
    return api.get('/courses/bookmarks', { params });
  },

  /**
   * 获取学习统计
   */
  getLearningStats: async (): Promise<{
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLearningTime: number;
    currentStreak: number;
    longestStreak: number;
    achievements: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      unlockedAt: string;
    }>;
  }> => {
    return api.get('/courses/stats');
  },

  /**
   * 获取学习日历
   */
  getLearningCalendar: async (
    year: number,
    month: number
  ): Promise<
    Array<{
      date: string;
      minutes: number;
      courses: string[];
    }>
  > => {
    return api.get('/courses/calendar', { params: { year, month } });
  },

  /**
   * 获取课程笔记
   */
  getNotes: async (
    courseId: string
  ): Promise<
    Array<{
      id: string;
      lessonId: string;
      content: string;
      timestamp?: number;
      createdAt: string;
      updatedAt: string;
    }>
  > => {
    return api.get(`/courses/${courseId}/notes`);
  },

  /**
   * 添加课程笔记
   */
  addNote: async (
    courseId: string,
    data: {
      lessonId: string;
      content: string;
      timestamp?: number;
    }
  ): Promise<void> => {
    return api.post(`/courses/${courseId}/notes`, data);
  },

  /**
   * 更新课程笔记
   */
  updateNote: async (
    courseId: string,
    noteId: string,
    data: {
      content: string;
    }
  ): Promise<void> => {
    return api.put(`/courses/${courseId}/notes/${noteId}`, data);
  },

  /**
   * 删除课程笔记
   */
  deleteNote: async (courseId: string, noteId: string): Promise<void> => {
    return api.delete(`/courses/${courseId}/notes/${noteId}`);
  },
};
