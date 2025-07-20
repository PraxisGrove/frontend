/**
 * ReactBit UI 类型定义
 */

import { ReactNode } from 'react';

// 基础主题类型
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

// 动画配置类型
export interface AnimationConfig {
  enabled: boolean;
  reducedMotion: boolean;
  performance: 'low' | 'medium' | 'high';
  prefersReducedMotion: boolean;
}

// 基础组件属性
export interface ReactBitProps {
  theme?: Partial<ReactBitTheme>;
  animation?: Partial<AnimationConfig>;
  className?: string;
  children?: ReactNode;
}

// 动画类型
export type AnimationType =
  | 'none'
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'rotate'
  | 'bounce'
  | 'pulse'
  | 'glow'
  | 'float'
  | 'tilt'
  | 'magnetic'
  | 'ripple'
  | 'hover';

// 尺寸类型
export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 变体类型
export type VariantType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link';

// 位置类型
export type PositionType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

// 方向类型
export type DirectionType = 'horizontal' | 'vertical';

// 对齐类型
export type AlignType = 'start' | 'center' | 'end' | 'stretch';

// 按钮组件属性
export interface AnimatedButtonProps extends Omit<ReactBitProps, 'animation'> {
  variant?: VariantType;
  size?: SizeType;
  animation?: AnimationType;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

// 卡片组件属性
export interface AnimatedCardProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass';
  animation?: AnimationType;
  interactive?: boolean;
  clickable?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  image?: string;
  imageAlt?: string;
  onClick?: () => void;
}

// 文本组件属性
export interface AnimatedTextProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'typewriter' | 'split' | 'gradient' | 'glow';
  animation?: AnimationType;
  speed?: number;
  delay?: number;
  stagger?: number;
  gradient?: string[];
  onComplete?: () => void;
}

// 输入框组件属性
export interface AnimatedInputProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'outlined' | 'filled' | 'underlined';
  animation?: AnimationType;
  label?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// 模态框组件属性
export interface AnimatedModalProps extends Omit<ReactBitProps, 'animation'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animation?: AnimationType;
  size?: SizeType;
  position?: PositionType;
  backdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  title?: string;
  description?: string;
  footer?: ReactNode;
}

// 导航栏组件属性
export interface AnimatedNavbarProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'floating' | 'sticky' | 'transparent';
  animation?: AnimationType;
  position?: 'top' | 'bottom';
  items?: NavItem[];
  logo?: ReactNode;
  actions?: ReactNode;
}

// 导航项类型
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
  onClick?: () => void;
}

// 加载器组件属性
export interface LoadingSpinnerProps extends ReactBitProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring' | 'wave';
  size?: SizeType;
  color?: string;
  speed?: number;
}

// 进度条组件属性
export interface ProgressBarProps extends ReactBitProps {
  value?: number;
  max?: number;
  variant?: 'default' | 'gradient' | 'striped' | 'animated';
  size?: SizeType;
  showValue?: boolean;
  label?: string;
}

// 背景效果组件属性
export interface AnimatedBackgroundProps extends ReactBitProps {
  variant?: 'particles' | 'waves' | 'gradient' | 'mesh' | 'dots';
  speed?: number;
  density?: number;
  colors?: string[];
  interactive?: boolean;
}

// 图表组件属性
export interface AnimatedChartProps extends Omit<ReactBitProps, 'animation'> {
  type?: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  data?: any[];
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  interactive?: boolean;
}

// 时间轴组件属性
export interface AnimatedTimelineProps
  extends Omit<ReactBitProps, 'animation'> {
  items?: TimelineItem[];
  variant?: 'default' | 'alternate' | 'left' | 'right';
  animation?: AnimationType;
  interactive?: boolean;
}

// 时间轴项类型
export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: ReactNode;
  color?: string;
  completed?: boolean;
}

// 表格组件属性
export interface AnimatedTableProps extends Omit<ReactBitProps, 'animation'> {
  data?: any[];
  columns?: TableColumn[];
  animation?: AnimationType;
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  pageSize?: number;
}

// 表格列类型
export interface TableColumn {
  key: string;
  title: string;
  width?: string | number;
  align?: AlignType;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: any, index: number) => ReactNode;
}

// 通知组件属性
export interface AnimatedToastProps extends ReactBitProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  position?: PositionType;
  duration?: number;
  closable?: boolean;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

// 警告组件属性
export interface AnimatedAlertProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  animation?: AnimationType;
  closable?: boolean;
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

// 选择框组件属性
export interface AnimatedSelectProps extends ReactBitProps {
  options?: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
}

// 选择项类型
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
}

// 复选框组件属性
export interface AnimatedCheckboxProps
  extends Omit<ReactBitProps, 'animation'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  animation?: AnimationType;
}

// 图标组件属性
export interface AnimatedIconProps extends Omit<ReactBitProps, 'animation'> {
  icon?: ReactNode;
  animation?: AnimationType;
  size?: SizeType;
  color?: string;
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
}

// 列表组件属性
export interface AnimatedListProps extends Omit<ReactBitProps, 'animation'> {
  items?: ListItem[];
  animation?: AnimationType;
  stagger?: number;
  direction?: DirectionType;
  interactive?: boolean;
}

// 列表项类型
export interface ListItem {
  id: string;
  content: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

// 事件处理器类型
export type EventHandler<T = void> = (event?: any) => T;
export type ChangeHandler<T> = (value: T) => void;
export type ClickHandler = EventHandler<void>;
export type HoverHandler = EventHandler<void>;
export type FocusHandler = EventHandler<void>;
