/**
 * ReactBit UI 配置文件
 * 统一管理动画配置、主题设置和性能选项
 */

export interface ReactBitTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  animations: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      bounce: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface AnimationConfig {
  enabled: boolean;
  reducedMotion: boolean;
  performance: 'low' | 'medium' | 'high';
  prefersReducedMotion: boolean;
}

export interface ReactBitProps {
  theme?: Partial<ReactBitTheme>;
  animation?: Partial<AnimationConfig>;
  className?: string;
  children?: React.ReactNode;
}

// 默认主题配置
export const defaultTheme: ReactBitTheme = {
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted))',
    border: 'hsl(var(--border))',
  },
  animations: {
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.5,
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

// 默认动画配置
export const defaultAnimationConfig: AnimationConfig = {
  enabled: true,
  reducedMotion: false,
  performance: 'medium',
  prefersReducedMotion: false,
};

// ReactBit 配置对象
export const reactBitConfig = {
  theme: defaultTheme,
  animation: defaultAnimationConfig,

  // 性能优化配置
  performance: {
    enableGPUAcceleration: true,
    enableWillChange: true,
    enableTransform3d: true,
    maxConcurrentAnimations: 10,
  },

  // 响应式断点
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // 动画预设
  presets: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 10 },
    },
    bounce: {
      initial: { opacity: 0, scale: 0.3 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', bounce: 0.5 },
      },
      exit: { opacity: 0, scale: 0.3 },
    },
  },

  // 特效配置
  effects: {
    glow: {
      enabled: true,
      intensity: 0.5,
      color: 'hsl(var(--primary))',
    },
    blur: {
      enabled: true,
      intensity: 4,
    },
    shadow: {
      enabled: true,
      intensity: 0.3,
    },
    gradient: {
      enabled: true,
      colors: [
        'hsl(var(--primary))',
        'hsl(var(--secondary))',
        'hsl(var(--accent))',
      ],
    },
  },

  // 可访问性配置
  accessibility: {
    respectReducedMotion: true,
    enableKeyboardNavigation: true,
    enableScreenReaderSupport: true,
    enableHighContrast: false,
  },

  // 调试配置
  debug: {
    enabled: process.env.NODE_ENV === 'development',
    showAnimationBounds: false,
    logPerformance: false,
    showFPS: false,
  },
};

// 获取当前主题
export const getCurrentTheme = (): ReactBitTheme => {
  // 这里可以从 localStorage 或 context 获取用户自定义主题
  return defaultTheme;
};

// 获取当前动画配置
export const getCurrentAnimationConfig = (): AnimationConfig => {
  // 检查用户是否偏好减少动画
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return {
    ...defaultAnimationConfig,
    prefersReducedMotion,
    reducedMotion: prefersReducedMotion,
  };
};

// 更新配置
export const updateReactBitConfig = (
  newConfig: Partial<typeof reactBitConfig>
) => {
  Object.assign(reactBitConfig, newConfig);
};

// 重置配置
export const resetReactBitConfig = () => {
  Object.assign(reactBitConfig, {
    theme: defaultTheme,
    animation: defaultAnimationConfig,
  });
};
