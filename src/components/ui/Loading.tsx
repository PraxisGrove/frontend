'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Zap, Brain, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave' | 'brand';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export function Loading({
  size = 'md',
  variant = 'spinner',
  text,
  className,
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen &&
      'fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50',
    className
  );

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <Loader2
            className={cn(
              'animate-spin text-purple-600 dark:text-purple-400',
              sizeClasses[size]
            )}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-purple-600 dark:bg-purple-400',
              sizeClasses[size]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        );

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-purple-600 dark:bg-purple-400"
                style={{
                  height:
                    size === 'sm'
                      ? '16px'
                      : size === 'md'
                        ? '24px'
                        : size === 'lg'
                          ? '32px'
                          : '40px',
                }}
                animate={{
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        );

      case 'brand':
        return (
          <div className="relative">
            <motion.div
              className="flex items-center space-x-2"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Brain className={cn('text-purple-600', sizeClasses[size])} />
              <Globe className={cn('text-blue-600', sizeClasses[size])} />
              <Zap className={cn('text-yellow-600', sizeClasses[size])} />
            </motion.div>
          </div>
        );

      default:
        return (
          <Loader2
            className={cn(
              'animate-spin text-purple-600 dark:text-purple-400',
              sizeClasses[size]
            )}
          />
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-3">
        {renderLoader()}
        {text && (
          <motion.p
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
}

// 页面加载组件
export function PageLoading({ message = '正在加载...' }: { message?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <Loading variant="brand" size="xl" />
        <motion.h2
          className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          PraxisGrove
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}

// 骨架屏组件
export function Skeleton({
  className,
  variant = 'rectangular',
  animation = 'pulse',
  ...props
}: {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
} & React.HTMLAttributes<HTMLDivElement>) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: '',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      {...props}
    />
  );
}

// 卡片骨架屏
export function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-4/6" />
      </div>
      <Skeleton variant="rectangular" className="h-32 w-full" />
    </div>
  );
}

// 列表骨架屏
export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4">
          <Skeleton variant="circular" className="h-10 w-10" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
          <Skeleton variant="rectangular" className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

// 加载状态管理 Hook
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);
  const [error, setError] = React.useState<Error | null>(null);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const setLoadingError = React.useCallback((error: Error) => {
    setIsLoading(false);
    setError(error);
  }, []);

  const withLoading = React.useCallback(
    async (asyncFn: () => Promise<any>): Promise<any> => {
      try {
        startLoading();
        const result = await asyncFn();
        stopLoading();
        return result;
      } catch (err) {
        setLoadingError(err instanceof Error ? err : new Error(String(err)));
        return null;
      }
    },
    [startLoading, stopLoading, setLoadingError]
  );

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setLoadingError,
    withLoading,
  };
}

// 延迟加载组件
export function LazyLoader({
  children,
  fallback = <Loading />,
  delay = 200,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}) {
  const [showFallback, setShowFallback] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence mode="wait">
      {showFallback ? (
        <motion.div
          key="fallback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {fallback}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
