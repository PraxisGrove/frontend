'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface AnimatedTextProps {
  text: string;
  variant?:
    | 'typewriter'
    | 'fadeIn'
    | 'slideUp'
    | 'scale'
    | 'rotate'
    | 'wave'
    | 'glitch';
  speed?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  onComplete?: () => void;
  triggerOnView?: boolean;
  repeat?: boolean;
  cursor?: boolean;
}

export function AnimatedText({
  text,
  variant = 'fadeIn',
  speed = 50,
  delay = 0,
  stagger = 0.05,
  className,
  onComplete,
  triggerOnView = true,
  repeat = false,
  cursor = true,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: !repeat });

  const shouldAnimate = triggerOnView ? inView : true;

  // 打字机效果
  useEffect(() => {
    if (variant === 'typewriter' && shouldAnimate && text) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(
          () => {
            setDisplayText((prev) => prev + text[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          },
          currentIndex === 0 ? delay : speed
        );

        return () => clearTimeout(timeout);
      } else if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [
    currentIndex,
    text,
    speed,
    delay,
    variant,
    shouldAnimate,
    onComplete,
    isComplete,
  ]);

  // 重置动画
  useEffect(() => {
    if (repeat && !shouldAnimate) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [shouldAnimate, repeat]);

  const getVariants = () => {
    switch (variant) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 },
        };
      case 'wave':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case 'glitch':
        return {
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const getTransition = (index: number = 0) => {
    const baseTransition = {
      duration: 0.6,
      delay: delay + index * stagger,
    };

    switch (variant) {
      case 'wave':
        return {
          ...baseTransition,
          type: 'spring' as const,
          stiffness: 100,
          damping: 10,
        };
      case 'glitch':
        return {
          ...baseTransition,
          type: 'tween' as const,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        };
      default:
        return baseTransition;
    }
  };

  // 打字机效果渲染
  if (variant === 'typewriter') {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={cn('inline-block', className)}
      >
        {displayText}
        {cursor && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="ml-1 inline-block h-5 w-0.5 bg-current"
          />
        )}
      </span>
    );
  }

  // 其他动画效果
  const words = text.split(' ');
  const letters = text.split('');

  if (variant === 'wave' || variant === 'glitch') {
    // 逐字母动画
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={cn('inline-block', className)}
      >
        <AnimatePresence>
          {shouldAnimate &&
            letters.map((letter, index) => (
              <motion.span
                key={index}
                variants={getVariants()}
                initial="hidden"
                animate="visible"
                transition={getTransition(index)}
                className="inline-block"
                style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
              >
                {letter}
              </motion.span>
            ))}
        </AnimatePresence>
      </span>
    );
  }

  // 逐词动画
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn('inline-block', className)}
    >
      <AnimatePresence>
        {shouldAnimate &&
          words.map((word, index) => (
            <motion.span
              key={index}
              variants={getVariants()}
              initial="hidden"
              animate="visible"
              transition={getTransition(index)}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
      </AnimatePresence>
    </span>
  );
}

// 文字生成效果组件
export function TextGenerateEffect({
  text,
  className,
  filter = true,
  duration = 0.5,
}: {
  text: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const words = text.split(' ');
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('font-bold', className)}
    >
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.2 }}
      >
        {words.map((word, idx) => (
          <motion.span
            key={word + idx}
            variants={{
              hidden: {
                opacity: 0,
                filter: filter ? 'blur(10px)' : 'none',
              },
              visible: {
                opacity: 1,
                filter: filter ? 'blur(0px)' : 'none',
              },
            }}
            transition={{
              duration,
              ease: 'easeInOut',
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

// 文字悬停效果组件
export function TextHoverEffect({
  text,
  className,
  duration = 0.3,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const letters = text.split('');

  return (
    <span className={cn('inline-block', className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-pointer"
          whileHover={{
            scale: 1.2,
            color: '#8b5cf6',
            transition: { duration },
          }}
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}
