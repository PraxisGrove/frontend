'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { ReactBitProps } from './config';

interface AnimatedCardProps extends Omit<ReactBitProps, 'animation'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled' | 'glass';
  animation?: 'none' | 'hover' | 'tilt' | 'float' | 'glow' | 'scale' | 'rotate';
  interactive?: boolean;
  clickable?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  onClick?: () => void;
}

const cardVariants = {
  default: 'bg-card text-card-foreground border border-border',
  elevated: 'bg-card text-card-foreground shadow-lg border border-border',
  outlined: 'bg-transparent border-2 border-border',
  filled: 'bg-primary text-primary-foreground border border-primary',
  glass: 'bg-background/80 backdrop-blur-md border border-border/50',
};

export function AnimatedCard({
  children,
  variant = 'default',
  animation = 'hover',
  interactive = true,
  clickable = false,
  header,
  footer,
  image,
  imageAlt,
  className,
  onClick,
  ...props
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D倾斜效果的motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), {
    stiffness: 300,
    damping: 30,
  });

  // 背景渐变效果 - 简化版本
  const backgroundGradient =
    'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)';

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || animation !== 'tilt') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (animation === 'tilt') {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const getAnimationProps = () => {
    if (!reactBitUtils.shouldAnimate()) return {};

    switch (animation) {
      case 'hover':
        return {
          whileHover: {
            y: -5,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 },
          },
          whileTap: clickable ? { scale: 0.98 } : {},
        };
      case 'tilt':
        return {
          style: {
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d' as const,
          },
          whileTap: clickable ? { scale: 0.98 } : {},
        };
      case 'float':
        return {
          whileHover: {
            y: -8,
            transition: { duration: 0.3 },
          },
          whileTap: clickable ? { scale: 0.98 } : {},
        };
      case 'glow':
        return {
          whileHover: {
            boxShadow: '0 0 30px hsl(var(--primary) / 0.3)',
            borderColor: 'hsl(var(--primary) / 0.5)',
            transition: { duration: 0.3 },
          },
          whileTap: clickable ? { scale: 0.98 } : {},
        };
      case 'scale':
        return {
          whileHover: { scale: 1.03 },
          whileTap: clickable ? { scale: 0.97 } : {},
          transition: { duration: 0.2 },
        };
      case 'rotate':
        return {
          whileHover: {
            rotate: 1,
            transition: { duration: 0.3 },
          },
          whileTap: clickable ? { scale: 0.98, rotate: -1 } : {},
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'rounded-lg p-6 transition-colors',
        cardVariants[variant],
        {
          'cursor-pointer': clickable,
          'select-none': clickable,
        },
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...getAnimationProps()}
      {...props}
    >
      {/* 图片区域 */}
      {image && (
        <motion.div
          className="mb-4 overflow-hidden rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={image}
            alt={imageAlt || ''}
            className="h-48 w-full object-cover"
            whileHover={interactive ? { scale: 1.05 } : {}}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}

      {/* 头部区域 */}
      {header && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {header}
        </motion.div>
      )}

      {/* 主要内容 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      {/* 底部区域 */}
      {footer && (
        <motion.div
          className="border-border mt-4 border-t pt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {footer}
        </motion.div>
      )}

      {/* 悬停时的装饰效果 */}
      {animation === 'glow' && (
        <motion.div
          className="from-primary/5 to-secondary/5 pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* 3D倾斜效果的内部阴影 */}
      {animation === 'tilt' && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            background: backgroundGradient,
          }}
        />
      )}

      {/* 浮动效果的阴影 - 简化版本 */}
      {animation === 'float' && (
        <motion.div
          className="from-primary/20 to-secondary/20 absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r blur-sm"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
}
