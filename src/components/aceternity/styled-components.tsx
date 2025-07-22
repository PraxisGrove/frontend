'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// 玻璃效果组件
interface GlassCardProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

/**
 * 玻璃效果卡片组件
 */
export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn('aceternity-glass-effect rounded-lg p-6', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 发光边框组件
interface GlowBorderProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

/**
 * 发光边框组件
 */
export function GlowBorder({ className, children, ...props }: GlowBorderProps) {
  return (
    <motion.div
      className={cn('aceternity-glow-border rounded-lg p-4', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 浮动阴影组件
interface FloatingShadowProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

/**
 * 浮动阴影组件
 */
export function FloatingShadow({
  className,
  children,
  ...props
}: FloatingShadowProps) {
  return (
    <motion.div
      className={cn('aceternity-floating-shadow rounded-lg', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 渐变文字组件
interface GradientTextProps {
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

/**
 * 渐变文字组件
 */
export function GradientText({
  className,
  children,
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component className={cn('aceternity-gradient-text', className)}>
      {children}
    </Component>
  );
}

// 增强按钮组件
interface EnhancedButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

/**
 * 增强按钮组件
 */
export function EnhancedButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: EnhancedButtonProps) {
  const variantClasses = {
    primary:
      'bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.9)]',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-[hsl(var(--secondary)/0.9)]',
    ghost: 'bg-transparent border border-[hsl(var(--border))] hover:bg-accent',
    glow: 'aceternity-glow-border bg-primary text-primary-foreground',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      className={cn(
        'aceternity-hover-animation rounded-lg font-medium transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// 增强卡片组件
interface EnhancedCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'glow' | 'floating';
  className?: string;
  children: React.ReactNode;
}

/**
 * 增强卡片组件
 */
export function EnhancedCard({
  variant = 'default',
  className,
  children,
  ...props
}: EnhancedCardProps) {
  const variantClasses = {
    default: 'bg-card border border-[hsl(var(--border))]',
    glass: 'aceternity-glass-effect',
    glow: 'aceternity-glow-border bg-card',
    floating:
      'aceternity-floating-shadow bg-card border border-[hsl(var(--border))]',
  };

  return (
    <motion.div
      className={cn('rounded-lg p-6', variantClasses[variant], className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 增强输入框组件
interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'glow';
  className?: string;
}

/**
 * 增强输入框组件
 */
export function EnhancedInput({
  variant = 'default',
  className,
  ...props
}: EnhancedInputProps) {
  const variantClasses = {
    default: 'bg-background border border-input',
    glass: 'aceternity-glass-effect border-0',
    glow: 'aceternity-glow-border bg-background',
  };

  return (
    <input
      className={cn(
        'w-full rounded-lg px-3 py-2 text-sm transition-all duration-200',
        'focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2',
        'placeholder:text-muted-foreground',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

// 增强容器组件
interface EnhancedContainerProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'centered' | 'full-height';
  className?: string;
  children: React.ReactNode;
}

/**
 * 增强容器组件
 */
export function EnhancedContainer({
  variant = 'default',
  className,
  children,
  ...props
}: EnhancedContainerProps) {
  const variantClasses = {
    default: 'container mx-auto px-4',
    centered: 'container mx-auto px-4 flex items-center justify-center',
    'full-height': 'container mx-auto px-4 min-h-screen flex flex-col',
  };

  return (
    <motion.div
      className={cn(variantClasses[variant], className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 增强分隔线组件
interface EnhancedDividerProps {
  variant?: 'default' | 'gradient' | 'glow';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * 增强分隔线组件
 */
export function EnhancedDivider({
  variant = 'default',
  orientation = 'horizontal',
  className,
}: EnhancedDividerProps) {
  const variantClasses = {
    default: 'bg-border',
    gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
    glow: 'bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]',
  };

  const orientationClasses = {
    horizontal: 'h-px w-full',
    vertical: 'w-px h-full',
  };

  return (
    <motion.div
      className={cn(
        variantClasses[variant],
        orientationClasses[orientation],
        className
      )}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  );
}
