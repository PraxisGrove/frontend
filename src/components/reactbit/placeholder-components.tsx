'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 这些是占位符组件，用于确保导出不会出错
// 在实际项目中，这些应该被完整的组件实现替换

export function GradientBackground({ className, children, ...props }: any) {
  return (
    <div className={cn('relative', className)} {...props}>
      <div className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-br" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function ParticleField({ className, children, ...props }: any) {
  return (
    <div className={cn('relative', className)} {...props}>
      <div className="absolute inset-0 opacity-30">
        {/* 简单的粒子效果占位符 */}
        <div className="bg-primary absolute left-1/4 top-1/4 h-1 w-1 animate-pulse rounded-full" />
        <div className="bg-secondary absolute left-1/2 top-1/2 h-1 w-1 animate-pulse rounded-full delay-100" />
        <div className="bg-accent absolute left-3/4 top-3/4 h-1 w-1 animate-pulse rounded-full delay-200" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function HoverCard({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('bg-card rounded-lg border p-4', className)}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ClickEffect({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollAnimation({ className, children, ...props }: any) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ProgressBar({
  value = 0,
  max = 100,
  className,
  ...props
}: any) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn('bg-muted h-2 w-full rounded-full', className)}
      {...props}
    >
      <motion.div
        className="bg-primary h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

export function SkeletonLoader({ className, ...props }: any) {
  return (
    <motion.div
      className={cn('bg-muted rounded', className)}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    />
  );
}

export function AnimatedNavbar({ className, children, ...props }: any) {
  return (
    <motion.nav
      className={cn(
        'bg-background/80 w-full border-b p-4 backdrop-blur-md',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.nav>
  );
}

export function SidebarMenu({ className, children, ...props }: any) {
  return (
    <motion.aside
      className={cn('bg-card h-full w-64 border-r p-4', className)}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.aside>
  );
}

export function TabNavigation({ className, children, ...props }: any) {
  return (
    <div className={cn('flex border-b', className)} {...props}>
      {children}
    </div>
  );
}

export function AnimatedSelect({ className, children, ...props }: any) {
  return (
    <motion.select
      className={cn('bg-background w-full rounded-md border p-2', className)}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.select>
  );
}

export function AnimatedCheckbox({ className, ...props }: any) {
  return (
    <motion.input
      type="checkbox"
      className={cn('h-4 w-4 rounded border', className)}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      {...props}
    />
  );
}

export function AnimatedToast({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('bg-card rounded-lg border p-4 shadow-lg', className)}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedModal({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      <motion.div
        className="bg-background mx-4 w-full max-w-md rounded-lg border p-6 shadow-lg"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function AnimatedAlert({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('bg-card rounded-lg border p-4', className)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedChart({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('bg-card rounded-lg border p-4', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTable({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('overflow-hidden rounded-lg border', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <table className="w-full">{children}</table>
    </motion.div>
  );
}

export function AnimatedTimeline({ className, children, ...props }: any) {
  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
