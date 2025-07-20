'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { LoadingSpinnerProps } from './types';

const sizeVariants = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export function LoadingSpinner({
  variant = 'spinner',
  size = 'md',
  color = 'currentColor',
  speed = 1,
  className,
  ...props
}: LoadingSpinnerProps) {
  const duration = reactBitUtils.getDuration('normal') / speed;

  const SpinnerVariant = () => (
    <motion.div
      className={cn(
        'rounded-full border-2 border-current border-t-transparent',
        sizeVariants[size],
        className
      )}
      style={{ color }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
      }}
      {...props}
    />
  );

  const DotsVariant = () => (
    <div className={cn('flex space-x-1', className)} {...props}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full bg-current', {
            'h-1 w-1': size === 'xs',
            'h-1.5 w-1.5': size === 'sm',
            'h-2 w-2': size === 'md',
            'h-3 w-3': size === 'lg',
            'h-4 w-4': size === 'xl',
          })}
          style={{ color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: duration * 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );

  const PulseVariant = () => (
    <motion.div
      className={cn('rounded-full bg-current', sizeVariants[size], className)}
      style={{ color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: duration * 2,
        repeat: Infinity,
      }}
      {...props}
    />
  );

  const BarsVariant = () => (
    <div className={cn('flex space-x-1', className)} {...props}>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={cn('bg-current', {
            'h-3 w-0.5': size === 'xs',
            'h-4 w-0.5': size === 'sm',
            'h-6 w-1': size === 'md',
            'h-8 w-1': size === 'lg',
            'h-12 w-1.5': size === 'xl',
          })}
          style={{ color }}
          animate={{
            scaleY: [1, 2, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );

  const RingVariant = () => (
    <div className={cn('relative', sizeVariants[size], className)} {...props}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-current border-t-transparent"
        style={{ color }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-current border-b-transparent"
        style={{ color, opacity: 0.6 }}
        animate={{ rotate: -360 }}
        transition={{
          duration: duration * 1.5,
          repeat: Infinity,
        }}
      />
    </div>
  );

  const WaveVariant = () => (
    <div className={cn('flex space-x-1', className)} {...props}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full bg-current', {
            'h-1 w-1': size === 'xs',
            'h-1.5 w-1.5': size === 'sm',
            'h-2 w-2': size === 'md',
            'h-3 w-3': size === 'lg',
            'h-4 w-4': size === 'xl',
          })}
          style={{ color }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );

  if (!reactBitUtils.shouldAnimate()) {
    return (
      <div
        className={cn('rounded-full bg-current', sizeVariants[size], className)}
        style={{ color }}
        {...props}
      />
    );
  }

  switch (variant) {
    case 'dots':
      return <DotsVariant />;
    case 'pulse':
      return <PulseVariant />;
    case 'bars':
      return <BarsVariant />;
    case 'ring':
      return <RingVariant />;
    case 'wave':
      return <WaveVariant />;
    default:
      return <SpinnerVariant />;
  }
}
