'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductIntroProps {
  className?: string;
}

interface IntroItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  video?: string;
}

const introItems: IntroItem[] = [
  {
    id: 'ai-learning',
    title: 'AI个性化学习',
    description:
      '基于先进的机器学习算法，为每位学习者量身定制学习路径和内容推荐。',
    features: [
      '智能学习路径规划',
      '个性化内容推荐',
      '实时学习进度分析',
      '自适应难度调整',
    ],
    image: '/images/ai-learning-demo.jpg',
    video: '/videos/ai-learning-demo.mp4',
  },
  {
    id: '3d-universe',
    title: '3D知识宇宙',
    description:
      '沉浸式3D环境让抽象概念变得具体可见，通过空间记忆增强学习效果。',
    features: [
      '3D知识图谱可视化',
      '沉浸式学习体验',
      '空间记忆增强',
      '交互式知识探索',
    ],
    image: '/images/3d-universe-demo.jpg',
    video: '/videos/3d-universe-demo.mp4',
  },
  {
    id: 'community',
    title: '智能学习社区',
    description: '连接全球学习者，通过协作学习和知识分享创造更好的学习体验。',
    features: [
      '全球学习者网络',
      '智能学习伙伴匹配',
      '协作学习项目',
      '知识分享平台',
    ],
    image: '/images/community-demo.jpg',
  },
];

export function ProductIntro({ className }: ProductIntroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % introItems.length);
  };

  const prevItem = () => {
    setActiveIndex(
      (prev) => (prev - 1 + introItems.length) % introItems.length
    );
  };

  const activeItem = introItems[activeIndex];

  return (
    <section
      className={cn(
        'relative overflow-hidden py-12',
        // 使用透明背景以不遮挡粒子效果
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
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            产品核心功能
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg md:text-xl">
            深入了解 PraxisGrove 如何革新您的学习体验
          </p>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* 左侧：文字内容 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
                  {activeItem.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  {activeItem.description}
                </p>

                {/* 功能特性列表 */}
                <ul className="mb-8 space-y-3">
                  {activeItem.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-muted-foreground flex items-center"
                    >
                      <div className="from-primary to-secondary mr-3 h-2 w-2 rounded-full bg-gradient-to-r" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* 导航控制 */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {introItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      'h-3 w-3 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'from-primary to-secondary scale-125 bg-gradient-to-r'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevItem}
                  className="p-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextItem}
                  className="p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 右侧：视觉演示 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/40 overflow-hidden border-none backdrop-blur-sm">
              <CardContent className="relative p-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="from-primary/10 to-secondary/10 relative aspect-video bg-gradient-to-br"
                  >
                    {/* 占位图片/视频区域 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="from-primary to-secondary mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br">
                          <Play className="text-primary-foreground h-12 w-12" />
                        </div>
                        <p className="text-muted-foreground">
                          {activeItem.title} 演示
                        </p>
                      </div>
                    </div>

                    {/* 播放控制 */}
                    {activeItem.video && (
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute bottom-4 right-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* 装饰性元素 */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
