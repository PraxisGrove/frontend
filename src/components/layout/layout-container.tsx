'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 布局模式类型
export type LayoutMode =
  | 'default' // 标准布局
  | 'sidebar-left' // 左侧边栏布局
  | 'sidebar-right' // 右侧边栏布局
  | 'sidebar-both' // 双侧边栏布局
  | 'header-sidebar' // 头部+侧边栏布局
  | 'full-height' // 全高度布局
  | 'centered' // 居中布局
  | 'split' // 分屏布局
  | 'dashboard' // 仪表板布局
  | 'auth' // 认证页面布局
  | 'landing'; // 着陆页布局

// 容器尺寸类型
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

// 间距类型
export type SpacingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// 布局容器属性
export interface LayoutContainerProps {
  children: React.ReactNode;
  mode?: LayoutMode;
  size?: ContainerSize;
  padding?: SpacingSize;
  margin?: SpacingSize;
  className?: string;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  footer?: React.ReactNode;
  background?: 'default' | 'muted' | 'accent' | 'transparent' | 'gradient';
  animated?: boolean;
  fullHeight?: boolean;
  scrollable?: boolean;
  centered?: boolean;
}

// 尺寸样式映射
const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

// 间距样式映射
const paddingClasses: Record<SpacingSize, string> = {
  none: 'p-0',
  sm: 'p-2 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-12',
};

const marginClasses: Record<SpacingSize, string> = {
  none: 'm-0',
  sm: 'm-2 sm:m-4',
  md: 'm-4 sm:m-6',
  lg: 'm-6 sm:m-8',
  xl: 'm-8 sm:m-12',
};

// 背景样式映射
const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
  accent: 'bg-accent',
  transparent: 'bg-transparent',
  gradient: 'bg-gradient-to-br from-background to-muted',
};

// 布局模式样式映射
const layoutModeClasses: Record<LayoutMode, string> = {
  default: 'flex flex-col',
  'sidebar-left': 'flex flex-row',
  'sidebar-right': 'flex flex-row-reverse',
  'sidebar-both': 'grid grid-cols-[auto_1fr_auto]',
  'header-sidebar': 'flex flex-col',
  'full-height': 'flex flex-col min-h-screen',
  centered: 'flex items-center justify-center min-h-screen',
  split: 'grid grid-cols-1 lg:grid-cols-2',
  dashboard: 'grid grid-rows-[auto_1fr] min-h-screen',
  auth: 'flex min-h-screen',
  landing: 'flex flex-col',
};

/**
 * 基础布局容器组件
 */
export function LayoutContainer({
  children,
  mode = 'default',
  size = 'full',
  padding = 'md',
  margin = 'none',
  className,
  header,
  sidebar,
  rightSidebar,
  footer,
  background = 'default',
  animated = false,
  fullHeight = false,
  scrollable = true,
  centered = false,
}: LayoutContainerProps) {
  const containerClasses = cn(
    // 基础样式
    'relative w-full',

    // 布局模式
    layoutModeClasses[mode],

    // 尺寸
    size !== 'full' && sizeClasses[size],

    // 间距
    paddingClasses[padding],
    marginClasses[margin],

    // 背景
    backgroundClasses[background],

    // 高度
    fullHeight && 'min-h-screen',

    // 居中
    centered && 'mx-auto',

    // 滚动
    scrollable && 'overflow-auto',

    // 自定义类名
    className
  );

  const content = (
    <div className={containerClasses}>
      {/* 头部区域 */}
      {header && <header className="flex-shrink-0">{header}</header>}

      {/* 主内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 */}
        {sidebar &&
          (mode === 'sidebar-left' ||
            mode === 'sidebar-both' ||
            mode === 'header-sidebar') && (
            <aside className="flex-shrink-0">{sidebar}</aside>
          )}

        {/* 主内容 */}
        <main
          className={cn(
            'flex-1',
            scrollable && 'overflow-auto',
            (mode === 'sidebar-left' ||
              mode === 'sidebar-right' ||
              mode === 'sidebar-both') &&
              'min-w-0'
          )}
        >
          {children}
        </main>

        {/* 右侧边栏 */}
        {rightSidebar &&
          (mode === 'sidebar-right' || mode === 'sidebar-both') && (
            <aside className="flex-shrink-0">{rightSidebar}</aside>
          )}
      </div>

      {/* 底部区域 */}
      {footer && <footer className="flex-shrink-0">{footer}</footer>}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

/**
 * 页面容器组件
 * 专门用于页面级别的布局
 */
export function PageContainer({
  children,
  title,
  description,
  actions,
  breadcrumb,
  className,
  ...props
}: LayoutContainerProps & {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}) {
  return (
    <LayoutContainer
      className={cn('space-y-6', className)}
      padding="lg"
      {...props}
    >
      {/* 页面头部 */}
      {(title || description || actions || breadcrumb) && (
        <div className="space-y-4">
          {breadcrumb && (
            <div className="text-sm text-muted-foreground">{breadcrumb}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {title && (
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              )}
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2">{actions}</div>
            )}
          </div>
        </div>
      )}

      {/* 页面内容 */}
      <div className="flex-1">{children}</div>
    </LayoutContainer>
  );
}

/**
 * 卡片容器组件
 * 用于创建卡片式布局
 */
export function CardContainer({
  children,
  className,
  variant = 'default',
  ...props
}: LayoutContainerProps & {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
}) {
  const variantClasses = {
    default: 'bg-card border border-[hsl(var(--border))]',
    outlined: 'border-2 border-[hsl(var(--border))] bg-transparent',
    elevated: 'bg-card shadow-lg border border-[hsl(var(--border))]',
    glass: 'bg-card/50 backdrop-blur-sm border border-[hsl(var(--border))]',
  };

  return (
    <LayoutContainer
      className={cn('rounded-lg', variantClasses[variant], className)}
      padding="md"
      {...props}
    >
      {children}
    </LayoutContainer>
  );
}

// 默认导出
export default LayoutContainer;
