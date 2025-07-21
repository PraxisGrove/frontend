/**
 * 静态资源统一导出
 */

// 图标资源
export const ICONS = {
  // 可以在这里导出SVG图标
  // LOGO: require('./icons/logo.svg'),
  // ARROW: require('./icons/arrow.svg'),
} as const;

// 图片资源
export const IMAGES = {
  LOGO: {
    FAVICON_16: '/logo/favicon-16x16.png',
    FAVICON_32: '/logo/favicon-32x32.png',
    FAVICON_ICO: '/logo/favicon.ico',
    APPLE_TOUCH: '/logo/apple-touch-icon.png',
    ANDROID_192: '/logo/android-chrome-192x192.png',
    ANDROID_512: '/logo/android-chrome-512x512.png',
  },
} as const;

// 字体资源
export const FONTS = {
  // 可以在这里定义字体路径
  // PRIMARY: '/fonts/primary.woff2',
  // SECONDARY: '/fonts/secondary.woff2',
} as const;

// 资源路径辅助函数
export const getAssetPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '' : '';
  return `${basePath}${path}`;
};

// 图片优化辅助函数
export const getOptimizedImagePath = (
  path: string,
  width?: number,
  quality?: number
) => {
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (quality) params.set('q', quality.toString());
  
  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};
