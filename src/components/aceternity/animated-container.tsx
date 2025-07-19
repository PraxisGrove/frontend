'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  commonVariants,
  containerVariants,
  AnimationPreset,
  ContainerAnimation,
} from '@/lib/aceternity-animations';

// 动画容器组件属性
interface AnimatedContainerProps
  extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  animation?: AnimationPreset;
  containerAnimation?: ContainerAnimation;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * 动画容器组件
 * 提供预设的动画效果和交错动画支持
 */
export function AnimatedContainer({
  animation = 'fadeIn',
  containerAnimation,
  delay = 0,
  duration,
  staggerChildren,
  delayChildren,
  className,
  children,
  ...props
}: AnimatedContainerProps) {
  // 选择动画变体
  const variants = containerAnimation
    ? containerVariants[containerAnimation]
    : commonVariants[animation];

  // 自定义过渡配置
  const customTransition = {
    ...(duration && { duration }),
    ...(delay && { delay }),
    ...(staggerChildren && { staggerChildren }),
    ...(delayChildren && { delayChildren }),
  };

  return (
    <motion.div
      className={cn('aceternity-animated-container', className)}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={
        Object.keys(customTransition).length > 0 ? customTransition : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 动画项目组件（用于交错动画中的子元素）
interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  animation?: AnimationPreset;
  className?: string;
  children: React.ReactNode;
}

/**
 * 动画项目组件
 * 用于交错动画容器中的子元素
 */
export function AnimatedItem({
  animation = 'slideUp',
  className,
  children,
  ...props
}: AnimatedItemProps) {
  const variants = commonVariants[animation];

  return (
    <motion.div className={cn('', className)} variants={variants} {...props}>
      {children}
    </motion.div>
  );
}

// 视口进入动画组件
interface InViewAnimationProps extends AnimatedContainerProps {
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * 视口进入动画组件
 * 当元素进入视口时触发动画
 */
export function InViewAnimation({
  threshold = 0.1,
  triggerOnce = true,
  ...props
}: InViewAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, once: triggerOnce }}
    >
      <AnimatedContainer {...props} />
    </motion.div>
  );
}

// 悬停动画组件
interface HoverAnimationProps
  extends Omit<HTMLMotionProps<'div'>, 'whileHover'> {
  hoverScale?: number;
  hoverRotate?: number;
  hoverY?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * 悬停动画组件
 * 提供悬停时的动画效果
 */
export function HoverAnimation({
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverY = -5,
  className,
  children,
  ...props
}: HoverAnimationProps) {
  return (
    <motion.div
      className={cn('aceternity-hover-animation cursor-pointer', className)}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        y: hoverY,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1, ease: 'easeOut' },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// 点击波纹效果组件
interface RippleEffectProps extends HTMLMotionProps<'div'> {
  className?: string;
  children: React.ReactNode;
}

/**
 * 点击波纹效果组件
 */
export function RippleEffect({
  className,
  children,
  ...props
}: RippleEffectProps) {
  const [ripples, setRipples] = React.useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // 移除波纹
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  );
}

// 文字打字机效果组件
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * 文字打字机效果组件
 */
export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        currentIndex === 0 ? delay : speed
      );

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, delay, onComplete]);

  return (
    <motion.span
      className={cn('', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      <motion.span
        className="ml-1 inline-block h-5 w-0.5 bg-current"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.span>
  );
}
