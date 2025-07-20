'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  speed?: number;
  size?: { min: number; max: number };
  interactive?: boolean;
  connectDistance?: number;
  fadeDistance?: number;
  children?: React.ReactNode;
}

export function ParticleBackground({
  className,
  particleCount = 50,
  colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'],
  speed = 0.5,
  size = { min: 1, max: 3 },
  interactive = true,
  connectDistance = 100,
  fadeDistance = 150,
  children,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // 检查用户是否偏好减少动画
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    setIsVisible(!prefersReducedMotion);
  }, []);

  // 初始化粒子
  const initParticles = React.useCallback(
    (canvas: HTMLCanvasElement) => {
      const particles: Particle[] = [];
      const adjustedCount =
        typeof window !== 'undefined' && window.innerWidth < 768
          ? Math.floor(particleCount / 2)
          : particleCount;

      for (let i = 0; i < adjustedCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * (size.max - size.min) + size.min,
          opacity: Math.random() * 0.5 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      particlesRef.current = particles;
    },
    [particleCount, speed, size.max, size.min, colors]
  );

  // 更新粒子位置
  const updateParticles = React.useCallback(
    (canvas: HTMLCanvasElement) => {
      particlesRef.current.forEach((particle) => {
        // 更新位置
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        // 确保粒子在画布内
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // 鼠标交互
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < fadeDistance) {
            const force = (fadeDistance - distance) / fadeDistance;
            particle.vx += dx * force * 0.001;
            particle.vy += dy * force * 0.001;
          }
        }
      });
    },
    [interactive, fadeDistance]
  );

  // 绘制粒子
  const drawParticles = React.useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }, []);

  // 绘制连接线
  const drawConnections = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle1 = particlesRef.current[i];
          const particle2 = particlesRef.current[j];

          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const opacity =
              ((connectDistance - distance) / connectDistance) * 0.3;

            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = particle1.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    },
    [connectDistance]
  );

  // 动画循环
  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制粒子
    updateParticles(canvas);
    drawConnections(ctx);
    drawParticles(ctx);

    animationRef.current = requestAnimationFrame(animate);
  }, [isVisible, updateParticles, drawConnections, drawParticles]);

  // 处理鼠标移动
  const handleMouseMove = React.useCallback(
    (event: MouseEvent) => {
      if (!interactive) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    [interactive]
  );

  // 处理窗口大小变化
  const handleResize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles(canvas);
  }, [initParticles]);

  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    // 设置画布大小
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 初始化粒子
    initParticles(canvas);

    // 开始动画
    animate();

    // 添加事件监听器
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [
    isVisible,
    particleCount,
    speed,
    interactive,
    animate,
    handleMouseMove,
    handleResize,
    initParticles,
  ]);

  if (!isVisible) {
    return <div className={cn('relative', className)}>{children}</div>;
  }

  return (
    <div className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ background: 'transparent' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 简化版粒子背景（性能优化）
export function SimpleParticleBackground({
  className,
  particleCount = 30,
  children,
}: {
  className?: string;
  particleCount?: number;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* 使用 CSS 动画的简单粒子 */}
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
