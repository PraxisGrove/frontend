/**
 * 路由常量定义
 */

// 公共路由
export const PUBLIC_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// 受保护的路由
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

// 课程相关路由
export const COURSE_ROUTES = {
  LIST: '/courses',
  DETAIL: '/courses/[id]',
  CREATE: '/courses/create',
  EDIT: '/courses/[id]/edit',
} as const;

// 管理员路由
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  USERS: '/admin/users',
  COURSES: '/admin/courses',
  SETTINGS: '/admin/settings',
} as const;

// 特殊页面路由
export const SPECIAL_ROUTES = {
  KNOWLEDGE_UNIVERSE: '/knowledge-universe',
  NOT_FOUND: '/404',
  ERROR: '/500',
} as const;

// 所有路由集合
export const ALL_ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
  ...COURSE_ROUTES,
  ...ADMIN_ROUTES,
  ...SPECIAL_ROUTES,
} as const;

// 路由权限映射
export const ROUTE_PERMISSIONS = {
  [PROTECTED_ROUTES.DASHBOARD]: ['user', 'admin'],
  [PROTECTED_ROUTES.PROFILE]: ['user', 'admin'],
  [PROTECTED_ROUTES.SETTINGS]: ['user', 'admin'],
  [ADMIN_ROUTES.DASHBOARD]: ['admin'],
  [ADMIN_ROUTES.USERS]: ['admin'],
  [ADMIN_ROUTES.COURSES]: ['admin'],
  [ADMIN_ROUTES.SETTINGS]: ['admin'],
} as const;
