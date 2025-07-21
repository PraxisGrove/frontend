/**
 * API相关常量定义
 */

// API基础配置
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// API端点
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // 课程相关
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    CREATE: '/courses',
    UPDATE: '/courses/:id',
    DELETE: '/courses/:id',
    ENROLL: '/courses/:id/enroll',
  },
  
  // 用户相关
  USERS: {
    LIST: '/users',
    DETAIL: '/users/:id',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
} as const;

// HTTP状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// API响应消息
export const API_MESSAGES = {
  SUCCESS: '操作成功',
  ERROR: '操作失败',
  NETWORK_ERROR: '网络错误，请检查网络连接',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  UNAUTHORIZED: '未授权，请重新登录',
  FORBIDDEN: '权限不足',
  NOT_FOUND: '资源不存在',
  SERVER_ERROR: '服务器错误，请稍后重试',
} as const;
