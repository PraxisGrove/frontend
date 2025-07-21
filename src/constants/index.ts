/**
 * 常量统一导出
 */

// API相关常量
export {
  API_CONFIG,
  API_ENDPOINTS,
  HTTP_STATUS,
  API_MESSAGES,
} from './api';

// 路由相关常量
export {
  PUBLIC_ROUTES,
  PROTECTED_ROUTES,
  COURSE_ROUTES,
  ADMIN_ROUTES,
  SPECIAL_ROUTES,
  ALL_ROUTES,
  ROUTE_PERMISSIONS,
} from './routes';

// UI相关常量
export {
  THEME_CONFIG,
  BREAKPOINTS,
  ANIMATION_CONFIG,
  COMPONENT_SIZES,
  COLOR_VARIANTS,
  Z_INDEX,
  LAYOUT,
} from './ui';

// 应用配置常量
export const APP_CONFIG = {
  NAME: 'PraxisGrove',
  VERSION: '0.1.0',
  DESCRIPTION: 'PraxisGrove 前端应用',
  AUTHOR: 'PraxisGrove Team',
  REPOSITORY: 'https://github.com/PraxisGrove/frontend',
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'praxisgrove-auth-token',
  REFRESH_TOKEN: 'praxisgrove-refresh-token',
  USER_PREFERENCES: 'praxisgrove-user-preferences',
  THEME: 'praxisgrove-theme',
  LANGUAGE: 'praxisgrove-language',
} as const;

// 默认配置
export const DEFAULTS = {
  LANGUAGE: 'zh-CN',
  THEME: 'system',
  PAGE_SIZE: 20,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
} as const;
