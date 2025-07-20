'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { AnimatedIconProps } from './types';

const sizeVariants = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export function AnimatedIcon({
  icon,
  animation = 'none',
  size = 'md',
  color = 'currentColor',
  spin = false,
  pulse = false,
  bounce = false,
  className,
  ...props
}: AnimatedIconProps) {
  const getAnimationProps = () => {
    if (!reactBitUtils.shouldAnimate()) return {};

    const animations: any = {};

    if (spin) {
      animations.animate = {
        rotate: 360,
        transition: {
          duration: 2,
          repeat: Infinity,
        },
      };
    }

    if (pulse) {
      animations.animate = {
        ...animations.animate,
        scale: [1, 1.1, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
        },
      };
    }

    if (bounce) {
      animations.animate = {
        ...animations.animate,
        y: [0, -4, 0],
        transition: {
          duration: 0.6,
          repeat: Infinity,
        },
      };
    }

    switch (animation) {
      case 'hover':
        return {
          ...animations,
          whileHover: { scale: 1.2 },
          whileTap: { scale: 0.9 },
        };
      case 'rotate':
        return {
          ...animations,
          whileHover: { rotate: 180 },
        };
      case 'bounce':
        return {
          ...animations,
          whileHover: {
            y: [0, -8, 0],
            transition: { duration: 0.3 },
          },
        };
      default:
        return animations;
    }
  };

  return (
    <motion.div
      className={cn(
        'inline-flex items-center justify-center',
        sizeVariants[size],
        className
      )}
      style={{ color }}
      {...getAnimationProps()}
      {...props}
    >
      {icon}
    </motion.div>
  );
}
