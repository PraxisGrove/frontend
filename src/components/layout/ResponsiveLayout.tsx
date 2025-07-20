'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive, useDeviceType } from '@/hooks/useResponsive';
import { usePerformanceConfig } from '@/components/ui/PerformanceOptimizer';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  enableAnimations?: boolean;
  mobileFirst?: boolean;
}

export function ResponsiveLayout({
  children,
  className,
  enableAnimations = true,
  mobileFirst = true,
}: ResponsiveLayoutProps) {
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();
  const { deviceType, orientation, touchDevice } = useDeviceType();
  const { config } = usePerformanceConfig();

  const shouldAnimate = enableAnimations && config.enableAnimations;

  const layoutVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const layoutTransition = {
    duration: config.animationDuration,
    ease: 'easeOut' as const,
  };

  const containerClasses = cn(
    'w-full',
    // 基础间距
    mobileFirst ? 'px-4 sm:px-6 lg:px-8' : 'px-8 lg:px-6 sm:px-4',
    // 最大宽度
    'max-w-7xl mx-auto',
    // 触摸设备优化
    touchDevice && 'touch-manipulation',
    // 设备特定样式
    isMobile && 'mobile-layout',
    isTablet && 'tablet-layout',
    isDesktop && 'desktop-layout',
    className
  );

  const LayoutComponent = shouldAnimate ? motion.div : 'div';
  const layoutProps = shouldAnimate
    ? {
        variants: layoutVariants,
        initial: 'hidden',
        animate: 'visible',
        transition: layoutTransition,
      }
    : {};

  return (
    <LayoutComponent className={containerClasses} {...layoutProps}>
      {children}
    </LayoutComponent>
  );
}

// 响应式网格组件
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  autoFit?: boolean;
  minItemWidth?: string;
}

export function ResponsiveGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'gap-6',
  autoFit = false,
  minItemWidth = '300px',
}: ResponsiveGridProps) {
  const { isMobile, isTablet } = useResponsive();

  const gridClasses = cn(
    'grid',
    gap,
    autoFit
      ? `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`
      : [
          `grid-cols-${columns.sm || 1}`,
          columns.md && `md:grid-cols-${columns.md}`,
          columns.lg && `lg:grid-cols-${columns.lg}`,
          columns.xl && `xl:grid-cols-${columns.xl}`,
        ]
          .filter(Boolean)
          .join(' '),
    className
  );

  return <div className={gridClasses}>{children}</div>;
}

// 响应式容器组件
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  size = 'lg',
  padding = true,
  center = true,
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const containerClasses = cn(
    'w-full',
    sizeClasses[size],
    center && 'mx-auto',
    padding && 'px-4 sm:px-6 lg:px-8',
    className
  );

  return <div className={containerClasses}>{children}</div>;
}

// 响应式文本组件
interface ResponsiveTextProps {
  children: React.ReactNode;
  className?: string;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  responsive?: boolean;
}

export function ResponsiveText({
  children,
  className,
  size = 'base',
  responsive = true,
}: ResponsiveTextProps) {
  const { isMobile } = useResponsive();

  const responsiveSizes = {
    xs: responsive ? 'text-xs sm:text-sm' : 'text-xs',
    sm: responsive ? 'text-sm sm:text-base' : 'text-sm',
    base: responsive ? 'text-base sm:text-lg' : 'text-base',
    lg: responsive ? 'text-lg sm:text-xl' : 'text-lg',
    xl: responsive ? 'text-xl sm:text-2xl' : 'text-xl',
    '2xl': responsive ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl',
    '3xl': responsive ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl',
    '4xl': responsive ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl',
    '5xl': responsive ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-5xl',
    '6xl': responsive ? 'text-5xl sm:text-6xl md:text-7xl' : 'text-6xl',
  };

  const textClasses = cn(
    responsiveSizes[size],
    // 移动端优化
    isMobile && 'leading-tight',
    className
  );

  return <div className={textClasses}>{children}</div>;
}

// 响应式间距组件
interface ResponsiveSpacingProps {
  children: React.ReactNode;
  className?: string;
  y?: string;
  x?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export function ResponsiveSpacing({
  children,
  className,
  y,
  x,
  top,
  bottom,
  left,
  right,
}: ResponsiveSpacingProps) {
  const spacingClasses = cn(
    y && `py-${y}`,
    x && `px-${x}`,
    top && `pt-${top}`,
    bottom && `pb-${bottom}`,
    left && `pl-${left}`,
    right && `pr-${right}`,
    className
  );

  return <div className={spacingClasses}>{children}</div>;
}

// 响应式显示组件
interface ResponsiveShowProps {
  children: React.ReactNode;
  on?: ('mobile' | 'tablet' | 'desktop')[];
  hide?: ('mobile' | 'tablet' | 'desktop')[];
}

export function ResponsiveShow({ children, on, hide }: ResponsiveShowProps) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const shouldShow = () => {
    if (on) {
      return (
        (on.includes('mobile') && isMobile) ||
        (on.includes('tablet') && isTablet) ||
        (on.includes('desktop') && isDesktop)
      );
    }

    if (hide) {
      return !(
        (hide.includes('mobile') && isMobile) ||
        (hide.includes('tablet') && isTablet) ||
        (hide.includes('desktop') && isDesktop)
      );
    }

    return true;
  };

  return shouldShow() ? <>{children}</> : null;
}
