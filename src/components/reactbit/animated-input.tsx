'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { reactBitUtils } from './utils';
import type { AnimatedInputProps } from './types';

export function AnimatedInput({
  variant = 'default',
  animation = 'none',
  label,
  placeholder,
  error,
  success,
  disabled = false,
  required = false,
  type = 'text',
  value,
  onChange,
  className,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHasValue(!!newValue);
    onChange?.(newValue);
  };

  const getVariantStyles = () => {
    const baseStyles = 'w-full px-3 py-2 text-sm transition-colors';

    switch (variant) {
      case 'outlined':
        return cn(baseStyles, 'border-2 rounded-md bg-transparent', {
          'border-border': !isFocused && !error && !success,
          'border-primary': isFocused && !error && !success,
          'border-destructive': error,
          'border-green-500': success,
          'opacity-50 cursor-not-allowed': disabled,
        });
      case 'filled':
        return cn(baseStyles, 'border-0 rounded-md bg-muted', {
          'bg-muted': !isFocused,
          'bg-background': isFocused,
          'bg-destructive/10': error,
          'bg-green-50': success,
          'opacity-50 cursor-not-allowed': disabled,
        });
      case 'underlined':
        return cn(
          baseStyles,
          'border-0 border-b-2 rounded-none bg-transparent px-0',
          {
            'border-border': !isFocused && !error && !success,
            'border-primary': isFocused && !error && !success,
            'border-destructive': error,
            'border-green-500': success,
            'opacity-50 cursor-not-allowed': disabled,
          }
        );
      default:
        return cn(baseStyles, 'border rounded-md bg-background', {
          'border-border': !isFocused && !error && !success,
          'border-primary': isFocused && !error && !success,
          'border-destructive': error,
          'border-green-500': success,
          'opacity-50 cursor-not-allowed': disabled,
        });
    }
  };

  const getAnimationProps = () => {
    if (!reactBitUtils.shouldAnimate()) return {};

    switch (animation) {
      case 'glow':
        return {
          whileFocus: {
            boxShadow: '0 0 0 3px hsl(var(--primary) / 0.2)',
            transition: { duration: 0.2 },
          },
        };
      case 'scale':
        return {
          whileFocus: {
            scale: 1.02,
            transition: { duration: 0.2 },
          },
        };
      case 'float':
        return {
          whileFocus: {
            y: -2,
            transition: { duration: 0.2 },
          },
        };
      default:
        return {};
    }
  };

  const getLabelAnimation = () => {
    if (variant === 'outlined' || variant === 'filled') {
      return {
        initial: { y: 0, scale: 1 },
        animate: {
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
        },
        transition: { duration: 0.2 },
      };
    }
    return {};
  };

  return (
    <div className={cn('relative', className)}>
      {/* 标签 */}
      {label && (
        <motion.label
          className={cn('pointer-events-none absolute left-3 z-10 text-sm', {
            'text-primary': isFocused && !error,
            'text-destructive': error,
            'text-green-500': success,
            'text-muted-foreground': !isFocused && !error && !success,
            'bg-background px-1':
              variant === 'outlined' && (isFocused || hasValue),
          })}
          {...getLabelAnimation()}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      )}

      {/* 输入框 */}
      <motion.input
        ref={inputRef}
        type={type}
        value={value}
        placeholder={
          !label || (variant !== 'outlined' && variant !== 'filled')
            ? placeholder
            : ''
        }
        disabled={disabled}
        className={cn(getVariantStyles(), 'focus:outline-none', {
          'pt-6': label && variant === 'filled',
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...getAnimationProps()}
        {...props}
      />

      {/* 底部装饰线（用于 underlined 变体） */}
      {variant === 'underlined' && (
        <motion.div
          className="bg-primary absolute bottom-0 left-0 h-0.5"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* 错误和成功消息 */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn('mt-1 text-xs', {
              'text-destructive': error,
              'text-green-500': success,
            })}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 发光效果背景 */}
      {animation === 'glow' && isFocused && (
        <motion.div
          className="bg-primary/5 pointer-events-none absolute inset-0 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}
