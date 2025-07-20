'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// 视差滚动效果组件
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// 滚动触发动画组件
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2'],
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, x: 0 };
      case 'down':
        return { y: -50, x: 0 };
      case 'left':
        return { y: 0, x: 50 };
      case 'right':
        return { y: 0, x: -50 };
      default:
        return { y: 50, x: 0 };
    }
  };

  const initial = getInitialPosition();
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [initial.y, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, x, y }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}

// 鼠标跟随光标效果
interface MouseFollowerProps {
  size?: number;
  color?: string;
  blur?: number;
  className?: string;
}

export function MouseFollower({
  size = 20,
  color = 'rgba(59, 130, 246, 0.5)',
  blur = 10,
  className,
}: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  return (
    <motion.div
      className={cn('pointer-events-none fixed z-50', className)}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}

// 文字分割动画组件
interface TextSplitProps {
  text: string;
  animation?: 'fadeIn' | 'slideUp' | 'scale' | 'rotate';
  stagger?: number;
  className?: string;
}

export function TextSplit({
  text,
  animation = 'fadeIn',
  stagger = 0.05,
  className,
}: TextSplitProps) {
  const letters = text.split('');

  const getVariants = () => {
    switch (animation) {
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
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { opacity: 1, rotateY: 0 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: stagger }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={variants}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// 液体按钮效果组件
interface LiquidButtonProps {
  children: React.ReactNode;
  color?: string;
  hoverColor?: string;
  className?: string;
  onClick?: () => void;
}

export function LiquidButton({
  children,
  color = '#3b82f6',
  hoverColor = '#1d4ed8',
  className,
  onClick,
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-lg px-6 py-3 font-medium text-white',
        className
      )}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: hoverColor }}
        initial={{ scale: 0, borderRadius: '50%' }}
        animate={{
          scale: isHovered ? 2 : 0,
          borderRadius: isHovered ? '0%' : '50%',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// 浮动元素组件
interface FloatingElementProps {
  children: React.ReactNode;
  amplitude?: number;
  frequency?: number;
  className?: string;
}

export function FloatingElement({
  children,
  amplitude = 10,
  frequency = 2,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration: frequency,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// 渐变边框动画组件
interface AnimatedBorderProps {
  children: React.ReactNode;
  colors?: string[];
  speed?: number;
  borderWidth?: number;
  className?: string;
}

export function AnimatedBorder({
  children,
  colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981'],
  speed = 3,
  borderWidth = 2,
  className,
}: AnimatedBorderProps) {
  return (
    <div className={cn('relative', className)}>
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          padding: borderWidth,
        }}
        animate={{
          background: [
            `linear-gradient(0deg, ${colors.join(', ')})`,
            `linear-gradient(90deg, ${colors.join(', ')})`,
            `linear-gradient(180deg, ${colors.join(', ')})`,
            `linear-gradient(270deg, ${colors.join(', ')})`,
            `linear-gradient(360deg, ${colors.join(', ')})`,
          ],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="bg-background h-full w-full rounded-lg">{children}</div>
      </motion.div>
    </div>
  );
}

// 粒子爆炸效果组件
interface ParticleExplosionProps {
  trigger: boolean;
  particleCount?: number;
  colors?: string[];
  className?: string;
}

export function ParticleExplosion({
  trigger,
  particleCount = 20,
  colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#10b981'],
  className,
}: ParticleExplosionProps) {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: (360 / particleCount) * i,
    distance: Math.random() * 100 + 50,
  }));

  return (
    <div className={cn('relative', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={
            trigger
              ? {
                  scale: [0, 1, 0],
                  x:
                    Math.cos((particle.angle * Math.PI) / 180) *
                    particle.distance,
                  y:
                    Math.sin((particle.angle * Math.PI) / 180) *
                    particle.distance,
                }
              : { scale: 0, x: 0, y: 0 }
          }
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}
