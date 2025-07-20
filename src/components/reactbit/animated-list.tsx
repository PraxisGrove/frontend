'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { AnimatedListProps } from './types';

export function AnimatedList({
  items = [],
  animation = 'slideUp',
  stagger = 0.1,
  direction = 'vertical',
  interactive = true,
  className,
  ...props
}: AnimatedListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: animation === 'slideUp' ? 20 : animation === 'slideDown' ? -20 : 0,
      x: animation === 'slideLeft' ? 20 : animation === 'slideRight' ? -20 : 0,
      scale: animation === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (!reactBitUtils.shouldAnimate()) {
    return (
      <div
        className={cn(
          'space-y-2',
          {
            'flex space-x-2 space-y-0': direction === 'horizontal',
          },
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn('bg-card flex items-center rounded-lg border p-3', {
              'hover:bg-accent cursor-pointer': interactive && item.onClick,
              'cursor-not-allowed opacity-50': item.disabled,
            })}
            onClick={item.disabled ? undefined : item.onClick}
          >
            {item.icon && <div className="mr-3 flex-shrink-0">{item.icon}</div>}
            <div className="flex-1">{item.content}</div>
            {item.action && (
              <div className="ml-3 flex-shrink-0">{item.action}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'space-y-2',
        {
          'flex space-x-2 space-y-0': direction === 'horizontal',
        },
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className={cn(
            'bg-card flex items-center rounded-lg border p-3 transition-colors',
            {
              'hover:bg-accent cursor-pointer': interactive && item.onClick,
              'cursor-not-allowed opacity-50': item.disabled,
            }
          )}
          whileHover={
            interactive && item.onClick && !item.disabled
              ? { scale: 1.02, y: -2 }
              : {}
          }
          whileTap={
            interactive && item.onClick && !item.disabled ? { scale: 0.98 } : {}
          }
          onClick={item.disabled ? undefined : item.onClick}
        >
          {item.icon && (
            <motion.div
              className="mr-3 flex-shrink-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
          )}
          <div className="flex-1">{item.content}</div>
          {item.action && (
            <motion.div
              className="ml-3 flex-shrink-0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {item.action}
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
