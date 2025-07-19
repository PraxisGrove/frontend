/**
 * API相关的TypeScript类型定义
 */

// ============= 通用类型 =============

/**
 * 分页参数
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * 分页响应
 */
export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 基础响应接口
 */
export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

/**
 * 列表响应接口
 */
export interface ListResponse<T> extends BaseResponse {
  data: {
    items: T[];
    pagination: PaginationResponse;
  };
}

// ============= 认证相关类型 =============

/**
 * 用户信息
 */
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string | null;
  role: 'user' | 'admin' | 'instructor';
  isEmailVerified: boolean;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

/**
 * 用户偏好设置
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'zh-CN' | 'en-US';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisible: boolean;
    progressVisible: boolean;
  };
}

/**
 * 登录请求
 */
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * 注册请求
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
}

/**
 * 注册响应
 */
export interface RegisterResponse extends LoginResponse {}

// ============= 课程相关类型 =============

/**
 * 课程信息
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  instructor: Instructor;
  category: CourseCategory;
  level: CourseLevel;
  duration: number; // 分钟
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  lessonsCount: number;
  language: string;
  lastUpdated: string;
  isPublished: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  tags: string[];
  thumbnail: string;
  previewVideo?: string;
  certificate: boolean;
  requirements: string[];
  whatYouWillLearn: string[];
  curriculum: CourseChapter[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 讲师信息
 */
export interface Instructor {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  specialties: string[];
}

/**
 * 课程分类
 */
export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
}

/**
 * 课程级别
 */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * 课程章节
 */
export interface CourseChapter {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
}

/**
 * 课程课时
 */
export interface CourseLesson {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number; // 分钟
  order: number;
  isPreview: boolean;
  content?: string;
  videoUrl?: string;
  resources?: LessonResource[];
}

/**
 * 课时资源
 */
export interface LessonResource {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'code' | 'link';
  url: string;
  size?: number;
}

/**
 * 课程查询参数
 */
export interface CoursesQueryParams extends PaginationParams {
  search?: string;
  category?: string;
  level?: CourseLevel;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  language?: string;
  instructor?: string;
  tags?: string[];
  featured?: boolean;
  popular?: boolean;
}

/**
 * 课程进度
 */
export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  currentLesson?: string;
  progressPercentage: number;
  timeSpent: number; // 分钟
  lastAccessedAt: string;
  completedAt?: string;
  certificate?: {
    id: string;
    issuedAt: string;
    certificateUrl: string;
  };
}

// ============= 知识图谱相关类型 =============

/**
 * 知识节点
 */
export interface KnowledgeNode {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'skill' | 'topic' | 'course';
  category: string;
  level: CourseLevel;
  position: {
    x: number;
    y: number;
    z: number;
  };
  connections: KnowledgeConnection[];
  metadata: {
    difficulty: number;
    importance: number;
    prerequisites: string[];
    learningTime: number;
  };
  resources: {
    courses: string[];
    articles: string[];
    videos: string[];
  };
  userProgress?: {
    isLearned: boolean;
    masteryLevel: number;
    lastAccessedAt?: string;
  };
}

/**
 * 知识连接
 */
export interface KnowledgeConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  type: 'prerequisite' | 'related' | 'builds_on' | 'similar';
  strength: number; // 0-1
  metadata?: {
    description?: string;
    examples?: string[];
  };
}

/**
 * 知识图谱查询参数
 */
export interface KnowledgeGraphParams {
  category?: string;
  level?: CourseLevel;
  center?: string; // 中心节点ID
  radius?: number; // 显示半径
  includeUserProgress?: boolean;
}

// ============= AI助手相关类型 =============

/**
 * AI对话消息
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: {
    tokens?: number;
    model?: string;
    context?: string[];
  };
}

/**
 * AI对话会话
 */
export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  context: {
    courseId?: string;
    topicId?: string;
    userLevel?: CourseLevel;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * AI推荐
 */
export interface AIRecommendation {
  id: string;
  type: 'course' | 'topic' | 'resource';
  targetId: string;
  title: string;
  description: string;
  reason: string;
  confidence: number; // 0-1
  metadata: {
    basedOn: string[];
    tags: string[];
  };
  createdAt: string;
}

// ============= 社区相关类型 =============

/**
 * 社区帖子
 */
export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  type: 'discussion' | 'question' | 'showcase' | 'announcement';
  author: User;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  replies: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  attachments?: PostAttachment[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 帖子附件
 */
export interface PostAttachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'code';
  url: string;
  size: number;
}

/**
 * 评论
 */
export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

// ============= 错误类型 =============

/**
 * API错误
 */
export interface APIError {
  error: string;
  message: string;
  details?: any;
  status?: number;
  timestamp?: string;
  path?: string;
}

/**
 * 验证错误详情
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}
