'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Logo 尺寸类型
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Logo 变体类型
export type LogoVariant =
  | 'default'
  | 'icon-only'
  | 'text-only'
  | 'stacked'
  | 'horizontal';

// Logo 属性
export interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  href?: string;
  showText?: boolean;
  animated?: boolean;
  darkMode?: boolean;
  onClick?: () => void;
}

// 尺寸映射
const sizeMap: Record<
  LogoSize,
  { width: number; height: number; textSize: string }
> = {
  xs: { width: 16, height: 16, textSize: 'text-sm' },
  sm: { width: 24, height: 24, textSize: 'text-base' },
  md: { width: 32, height: 32, textSize: 'text-lg' },
  lg: { width: 40, height: 40, textSize: 'text-xl' },
  xl: { width: 48, height: 48, textSize: 'text-2xl' },
  '2xl': { width: 64, height: 64, textSize: 'text-3xl' },
};

/**
 * Logo 图标组件
 */
function LogoIcon({
  size = 'md',
  className,
  animated = false,
}: {
  size?: LogoSize;
  className?: string;
  animated?: boolean;
}) {
  const { width, height } = sizeMap[size];

  const iconContent = (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 font-bold text-white shadow-lg',
        className
      )}
      style={{ width, height }}
    >
      <span
        className={cn(
          'font-bold',
          size === 'xs' ? 'text-xs' : size === 'sm' ? 'text-sm' : 'text-lg'
        )}
      >
        P
      </span>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {iconContent}
      </motion.div>
    );
  }

  return iconContent;
}

/**
 * Logo 文本组件
 */
function LogoText({
  size = 'md',
  className,
  darkMode = false,
}: {
  size?: LogoSize;
  className?: string;
  darkMode?: boolean;
}) {
  const { textSize } = sizeMap[size];

  return (
    <span
      className={cn(
        'bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text font-bold text-transparent',
        textSize,
        darkMode && 'from-blue-400 to-purple-400',
        className
      )}
    >
      PraxisGrove
    </span>
  );
}

/**
 * 主 Logo 组件
 */
export function Logo({
  size = 'md',
  variant = 'default',
  className,
  href = '/',
  showText = true,
  animated = false,
  darkMode = false,
  onClick,
}: LogoProps) {
  const renderLogo = () => {
    switch (variant) {
      case 'icon-only':
        return (
          <LogoIcon size={size} animated={animated} className="flex-shrink-0" />
        );

      case 'text-only':
        return <LogoText size={size} darkMode={darkMode} />;

      case 'stacked':
        return (
          <div className="flex flex-col items-center gap-2">
            <LogoIcon size={size} animated={animated} />
            {showText && (
              <LogoText
                size={size === '2xl' ? 'lg' : size === 'xl' ? 'md' : 'sm'}
                darkMode={darkMode}
              />
            )}
          </div>
        );

      case 'horizontal':
      case 'default':
      default:
        return (
          <div className="flex items-center gap-3">
            <LogoIcon
              size={size}
              animated={animated}
              className="flex-shrink-0"
            />
            {showText && <LogoText size={size} darkMode={darkMode} />}
          </div>
        );
    }
  };

  const logoContent = (
    <div
      className={cn(
        'inline-flex items-center transition-opacity hover:opacity-80',
        className
      )}
      onClick={onClick}
    >
      {renderLogo()}
    </div>
  );

  if (href && !onClick) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

/**
 * Favicon 组件
 * 用于在页面头部设置 favicon
 */
export function FaviconLinks() {
  return (
    <>
      <link rel="icon" href="/logo/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/logo/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/logo/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/logo/apple-touch-icon.png"
      />
      <link rel="manifest" href="/logo/site.webmanifest" />
    </>
  );
}

/**
 * 品牌标识组件
 * 包含完整的品牌信息
 */
export function BrandLogo({
  size = 'lg',
  showTagline = true,
  className,
  animated = true,
}: {
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn('space-y-4 text-center', className)}>
      <Logo size={size} variant="stacked" animated={animated} showText={true} />
      {showTagline && (
        <p className="mx-auto max-w-md text-sm text-muted-foreground">
          AI驱动的沉浸式在线教育平台，重新定义学习体验
        </p>
      )}
    </div>
  );
}

/**
 * 加载状态 Logo 组件
 */
export function LoadingLogo({
  size = 'lg',
  className,
}: {
  size?: LogoSize;
  className?: string;
}) {
  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Logo size={size} variant="icon-only" animated={false} />
    </motion.div>
  );
}

// 默认导出
export default Logo;
