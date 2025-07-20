'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TextGenerateEffect, AnimatedText } from '@/components/ui/AnimatedText';
import { usePerformanceConfig } from '@/components/ui/PerformanceOptimizer';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const { config } = usePerformanceConfig();

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const heroTransition = {
    duration: config.animationDuration * 1.3,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    staggerChildren: 0.2,
  };

  const itemTransition = {
    duration: config.animationDuration,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };

  return (
    <div
      className={cn(
        'relative flex min-h-screen items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* 主要内容 */}
      <motion.div
        className="container relative z-10 mx-auto px-4 py-16 text-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        transition={heroTransition}
      >
        {/* 主标题 - 使用 TextGenerateEffect */}
        <motion.div
          variants={itemVariants}
          transition={itemTransition}
          className="mb-6"
        >
          <h1 id="hero-title" className="sr-only">
            PraxisGrove - AI驱动的沉浸式在线教育平台
          </h1>
          <TextGenerateEffect
            text="欢迎来到 PraxisGrove"
            className="text-foreground mb-4 text-4xl font-bold md:text-6xl lg:text-7xl"
          />
          <AnimatedText
            text="AI驱动的沉浸式在线教育平台"
            variant="typewriter"
            className="text-primary text-2xl font-light md:text-4xl lg:text-5xl"
            speed={100}
            delay={1000}
          />
        </motion.div>

        {/* 副标题 */}
        <motion.p
          variants={itemVariants}
          transition={itemTransition}
          className="text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed md:text-xl"
        >
          通过人工智能技术和3D知识宇宙，为您提供个性化学习体验。
          探索知识的无限可能，开启智慧学习新时代。
        </motion.p>

        {/* CTA 按钮组 */}
        <motion.div
          variants={itemVariants}
          transition={itemTransition}
          className="mb-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className={cn(
              'px-8 py-4 text-lg font-semibold',
              'bg-primary text-primary-foreground',
              'hover:bg-primary/90',
              'transform transition-all duration-200 hover:scale-105'
            )}
          >
            开始学习之旅
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              'px-8 py-4 text-lg font-semibold',
              'border-secondary text-secondary',
              'hover:bg-secondary/10 hover:border-secondary/80',
              'transform transition-all duration-200 hover:scale-105'
            )}
          >
            探索3D知识宇宙
          </Button>
        </motion.div>

        {/* 滚动指示器 */}
        <motion.div
          variants={itemVariants}
          transition={itemTransition}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="border-accent flex h-10 w-6 justify-center rounded-full border-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-accent mt-2 h-3 w-1 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
