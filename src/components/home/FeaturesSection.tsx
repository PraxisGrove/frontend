'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Brain, Globe, Users, Zap, BookOpen, Target } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface FeaturesSectionProps {
  className?: string;
}

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: 'AI智能助手',
    description: '个性化AI导师，实时解答问题，提供定制化学习建议和智能推荐',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: '3D知识宇宙',
    description: '沉浸式3D环境，可视化知识结构，让学习更加直观有趣',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: '学习社区',
    description: '与全球学习者交流互动，分享知识，共同成长进步',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: '智能推荐',
    description: '基于学习行为和偏好，智能推荐最适合的学习内容和路径',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BookOpen,
    title: '丰富课程',
    description: '涵盖多个领域的高质量课程，满足不同学习需求和兴趣',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Target,
    title: '学习追踪',
    description: '详细的学习进度追踪和分析，帮助您更好地规划学习目标',
    gradient: 'from-red-500 to-pink-500',
  },
];

export function FeaturesSection({ className }: FeaturesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className={cn(
        'relative overflow-hidden py-12',
        // 移除实体背景，使用透明背景以不遮挡粒子效果
        'bg-transparent',
        className
      )}
    >
      {/* 完全透明背景，让粒子效果完全展示 */}

      <div className="container relative z-10 mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            id="features-title"
            className="text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            强大功能特性
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
            探索 PraxisGrove 的核心功能，体验前所未有的学习方式
          </p>
        </motion.div>

        {/* 功能卡片网格 */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  variants: any;
}

function FeatureCard({ feature, variants }: Omit<FeatureCardProps, 'index'>) {
  const Icon = feature.icon;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={variants}
      className="group"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <Card
        className={cn(
          'h-full transition-all duration-300',
          // 使用主题变量，增强透明度以更好地展示背景粒子效果
          'bg-card/40 border-0 backdrop-blur-sm',
          'hover:-translate-y-1 hover:scale-105',
          'relative overflow-hidden',
          // 移除边框以减少视觉分割
          'border-none'
        )}
      >
        {/* 悬停时的背景渐变 */}
        <div
          className={cn(
            'absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10',
            `bg-gradient-to-br ${feature.gradient}`
          )}
        />

        <CardHeader className="relative z-10">
          {/* 图标容器 */}
          <div
            className={cn(
              'mb-4 flex h-16 w-16 items-center justify-center rounded-full',
              `bg-gradient-to-br ${feature.gradient}`,
              'transition-transform duration-300 group-hover:scale-110'
            )}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>

          <CardTitle className="text-card-foreground text-xl font-semibold">
            {feature.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <CardDescription className="text-muted-foreground leading-relaxed">
            {feature.description}
          </CardDescription>
        </CardContent>

        {/* 装饰性元素 */}
        <div className="absolute right-0 top-0 h-20 w-20 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
          <div
            className={cn(
              'h-full w-full rounded-full',
              `bg-gradient-to-br ${feature.gradient}`
            )}
          />
        </div>
      </Card>
    </motion.div>
  );
}
