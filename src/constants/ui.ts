/**
 * UI相关常量定义
 */

// 主题配置
export const THEME_CONFIG = {
  DEFAULT_THEME: 'system',
  THEMES: ['light', 'dark', 'system'] as const,
  STORAGE_KEY: 'praxisgrove-theme',
} as const;

// 响应式断点
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// 动画配置
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
} as const;

// 组件尺寸
export const COMPONENT_SIZES = {
  BUTTON: {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  },
  INPUT: {
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
  },
  AVATAR: {
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
  },
} as const;

// 颜色变体
export const COLOR_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

// Z-Index层级
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

// 布局常量
export const LAYOUT = {
  HEADER_HEIGHT: 64,
  SIDEBAR_WIDTH: 256,
  SIDEBAR_COLLAPSED_WIDTH: 64,
  FOOTER_HEIGHT: 48,
} as const;
