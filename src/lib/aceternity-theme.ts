/**
 * Aceternity UI 主题配置
 * 集成 Aceternity UI 组件的主题变量与 Tailwind CSS 主题系统
 */

// Aceternity UI 主题变量
export const aceternityTheme = {
  // 颜色配置
  colors: {
    // 主色调 - 与 Tailwind 主题保持一致
    primary: {
      50: 'hsl(var(--primary) / 0.05)',
      100: 'hsl(var(--primary) / 0.1)',
      200: 'hsl(var(--primary) / 0.2)',
      300: 'hsl(var(--primary) / 0.3)',
      400: 'hsl(var(--primary) / 0.4)',
      500: 'hsl(var(--primary))',
      600: 'hsl(var(--primary) / 0.8)',
      700: 'hsl(var(--primary) / 0.7)',
      800: 'hsl(var(--primary) / 0.6)',
      900: 'hsl(var(--primary) / 0.5)',
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },

    // 背景渐变色
    gradient: {
      from: 'hsl(var(--background))',
      via: 'hsl(var(--muted))',
      to: 'hsl(var(--background))',
    },

    // 光束效果颜色
    beam: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--accent))',
      glow: 'hsl(var(--ring))',
    },

    // 浮动导航栏颜色
    navbar: {
      background: 'hsl(var(--background) / 0.8)',
      border: 'hsl(var(--border) / 0.2)',
      shadow: 'hsl(var(--foreground) / 0.1)',
    },

    // 玻璃态效果
    glass: {
      background: 'hsl(var(--background) / 0.1)',
      border: 'hsl(var(--border) / 0.2)',
      backdrop: 'blur(12px)',
    },
  },

  // 动画配置
  animations: {
    // 光束动画
    beam: {
      duration: 3,
      delay: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },

    // 浮动动画
    float: {
      duration: 0.2,
      ease: 'easeOut',
    },

    // 渐变动画
    gradient: {
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
    },

    // 脉冲动画
    pulse: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  // 阴影配置
  shadows: {
    // 浮动阴影
    float:
      '0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)',

    // 发光阴影
    glow: '0 0 20px hsl(var(--primary) / 0.3)',

    // 深度阴影
    depth: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

    // 内阴影
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // 边框半径
  borderRadius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    full: '9999px',
  },

  // 间距配置
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // 字体配置
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
  },
} as const;

// 主题工具函数
export const aceternityUtils = {
  /**
   * 获取主题颜色
   */
  getColor: (colorPath: string) => {
    const paths = colorPath.split('.');
    let current: any = aceternityTheme.colors;

    for (const path of paths) {
      current = current[path];
      if (!current) return undefined;
    }

    return current;
  },

  /**
   * 生成渐变背景类名
   */
  gradientBg: (from: string, via?: string, to?: string) => {
    const baseClass = 'bg-gradient-to-br';
    const fromClass = `from-${from}`;
    const toClass = `to-${to || from}`;
    const viaClass = via ? `via-${via}` : '';

    return [baseClass, fromClass, viaClass, toClass].filter(Boolean).join(' ');
  },

  /**
   * 生成玻璃态效果类名
   */
  glassEffect: (opacity = 0.1) => {
    return `bg-white/[${opacity}] backdrop-blur-md border border-white/[0.2]`;
  },

  /**
   * 生成发光效果类名
   */
  glowEffect: (color = 'primary') => {
    return `shadow-[0_0_20px_hsl(var(--${color})/0.3)]`;
  },

  /**
   * 生成浮动动画类名
   */
  floatAnimation: () => {
    return 'animate-pulse hover:animate-none transition-all duration-200';
  },
};

// 导出类型
export type AceternityTheme = typeof aceternityTheme;
export type AceternityColors = typeof aceternityTheme.colors;
export type AceternityAnimations = typeof aceternityTheme.animations;
