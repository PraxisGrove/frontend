/**
 * Aceternity UI 组件库导出
 */

// 主题相关
export {
  AceternityThemeProvider,
  useAceternityTheme,
  ThemeToggle,
  ThemeSelector,
} from './theme-provider';

// 背景效果组件
export { BackgroundBeams } from './background-beams';

// 导航组件
export { FloatingNav } from './floating-navbar';

// 动画容器组件
export {
  AnimatedContainer,
  AnimatedItem,
  InViewAnimation,
  HoverAnimation,
  RippleEffect,
} from './animated-container';

// 特殊效果组件
export {
  BeamScan,
  PulseGlow,
  Floating,
  GradientShift,
  ParticleEffect,
  // Magnetic, // 暂时注释掉，避免与 advanced-animations 中的重复
  RippleWave,
} from './special-effects';

// 样式组件
export {
  GlassCard as AceternityGlassCard,
  GlowBorder,
  FloatingShadow,
  GradientText,
  EnhancedButton,
  EnhancedCard,
  EnhancedInput,
  EnhancedContainer,
  EnhancedDivider,
} from './styled-components';

// 扩展组件
export {
  HeroSection,
  FeatureCard,
  FeatureGrid,
  StatsCounter,
  StatsGrid,
  Timeline,
  InteractiveCard,
  ProgressIndicator,
  NotificationBanner,
} from './extended-components';

// 高级动画组件
export {
  Typewriter,
  CountUp,
  ParticleBackground,
  RippleEffect as AdvancedRippleEffect,
  Magnetic as AdvancedMagnetic,
  FlipCard,
} from './advanced-animations';

// 增强特效组件
export {
  Parallax,
  ScrollReveal,
  MouseFollower,
  TextSplit,
  LiquidButton,
  FloatingElement,
  AnimatedBorder,
  ParticleExplosion,
} from './enhanced-effects';

// 主题配置和工具
export { aceternityTheme, aceternityUtils } from '@/lib/aceternity-theme';
export type {
  AceternityTheme,
  AceternityColors,
  AceternityAnimations,
} from '@/lib/aceternity-theme';

// 动画配置和工具
export {
  animationPresets,
  commonVariants,
  containerVariants,
  specialEffects,
  animationUtils,
  performanceConfig,
} from '@/lib/aceternity-animations';
export type {
  AnimationPreset,
  ContainerAnimation,
  SpecialEffect,
} from '@/lib/aceternity-animations';
