'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { ReactBitProps } from './config';

interface AnimatedButtonProps extends Omit<ReactBitProps, 'animation'> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  animation?:
    | 'none'
    | 'hover'
    | 'pulse'
    | 'bounce'
    | 'glow'
    | 'ripple'
    | 'magnetic';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeVariants = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

export function AnimatedButton({
  children,
  variant = 'default',
  size = 'default',
  animation = 'hover',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // 触发点击动画
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    // 创建涟漪效果
    if (animation === 'ripple') {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }

    onClick?.();
  };

  const getAnimationProps = () => {
    if (!reactBitUtils.shouldAnimate()) return {};

    switch (animation) {
      case 'hover':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
        };
      case 'pulse':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
        };
      case 'bounce':
        return {
          whileHover: { y: -2 },
          whileTap: { scale: 0.95 },
        };
      case 'glow':
        return {
          whileHover: {
            boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
          },
          whileTap: { scale: 0.95 },
        };
      case 'magnetic':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
        };
      default:
        return {};
    }
  };

  const LoadingSpinner = () => (
    <motion.div
      className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
  );

  return (
    <motion.button
      className={cn(
        'ring-offset-background focus-visible:ring-ring relative inline-flex items-center justify-center overflow-hidden rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants[variant],
        sizeVariants[size],
        {
          'cursor-not-allowed': disabled,
          'cursor-wait': loading,
        },
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...getAnimationProps()}
      {...props}
    >
      {/* 涟漪效果 */}
      {animation === 'ripple' && (
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="pointer-events-none absolute rounded-full bg-white/30"
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{
                width: 400,
                height: 400,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* 按钮内容 */}
      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.span>
            )}

            {children && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {children}
              </motion.span>
            )}

            {icon && iconPosition === 'right' && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.span>
            )}
          </>
        )}
      </div>

      {/* 点击反馈效果 */}
      <AnimatePresence>
        {isClicked && animation !== 'ripple' && (
          <motion.div
            className="absolute inset-0 rounded-md bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* 发光效果背景 */}
      {animation === 'glow' && (
        <motion.div
          className="from-primary/20 to-secondary/20 absolute inset-0 rounded-md bg-gradient-to-r opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
