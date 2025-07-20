'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  className?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: '张明',
    role: '软件工程师',
    company: '腾讯',
    avatar: '/avatars/zhang-ming.jpg',
    rating: 5,
    content:
      'PraxisGrove 的 AI 学习助手真的很棒！它能够根据我的学习进度和偏好推荐最适合的内容，让我的学习效率提升了 300%。',
    highlight: '学习效率提升了 300%',
  },
  {
    id: '2',
    name: '李小雨',
    role: '产品经理',
    company: '字节跳动',
    avatar: '/avatars/li-xiaoyu.jpg',
    rating: 5,
    content:
      '3D 知识宇宙的体验太震撼了！复杂的概念通过 3D 可视化变得非常容易理解，这种学习方式前所未有。',
    highlight: '3D 可视化学习体验',
  },
  {
    id: '3',
    name: '王建华',
    role: '数据科学家',
    company: '阿里巴巴',
    avatar: '/avatars/wang-jianhua.jpg',
    rating: 5,
    content:
      '学习社区的质量很高，能够与全球的专家和学习者交流，获得了很多宝贵的见解和建议。',
    highlight: '全球专家交流',
  },
  {
    id: '4',
    name: '陈思思',
    role: '设计师',
    company: '美团',
    avatar: '/avatars/chen-sisi.jpg',
    rating: 5,
    content:
      '个性化的学习路径设计得很好，完全符合我的学习节奏和目标，每天都有新的收获。',
    highlight: '个性化学习路径',
  },
  {
    id: '5',
    name: '刘强',
    role: '创业者',
    company: '独立创业',
    avatar: '/avatars/liu-qiang.jpg',
    rating: 5,
    content:
      '作为创业者，时间很宝贵。PraxisGrove 的智能推荐帮我快速找到最需要的知识，节省了大量时间。',
    highlight: '智能推荐节省时间',
  },
  {
    id: '6',
    name: '赵美丽',
    role: '学生',
    company: '清华大学',
    avatar: '/avatars/zhao-meili.jpg',
    rating: 5,
    content:
      '平台的课程质量很高，老师讲解得很清楚，配合 AI 助手的答疑，学习效果比传统方式好太多了。',
    highlight: 'AI 助手答疑',
  },
];

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        'bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800',
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* 标题区域 */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            用户真实评价
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
            听听我们的用户如何评价 PraxisGrove 的学习体验
          </p>
        </motion.div>

        {/* 无限滚动卡片容器 */}
        <div className="relative overflow-hidden">
          <InfiniteMovingCards testimonials={testimonials} />
        </div>

        {/* 统计数据 */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl dark:text-purple-400">
              50K+
            </div>
            <div className="text-gray-600 dark:text-gray-300">活跃学习者</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl dark:text-blue-400">
              1000+
            </div>
            <div className="text-gray-600 dark:text-gray-300">优质课程</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-green-600 md:text-4xl dark:text-green-400">
              98%
            </div>
            <div className="text-gray-600 dark:text-gray-300">满意度</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600 md:text-4xl dark:text-orange-400">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-300">AI 支持</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 星级评分组件
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-4 w-4',
            star <= rating
              ? 'fill-current text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          )}
        />
      ))}
    </div>
  );
}

// 无限滚动卡片组件
function InfiniteMovingCards({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  // 复制数组以实现无限滚动效果
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="animate-scroll flex space-x-6">
      {duplicatedTestimonials.map((testimonial, index) => (
        <TestimonialCard
          key={`${testimonial.id}-${index}`}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

// 推荐卡片组件
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-64 w-80 flex-shrink-0 border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-slate-800/80">
      <CardContent className="flex h-full flex-col justify-between p-6">
        {/* 评分和内容 */}
        <div>
          <StarRating rating={testimonial.rating} />
          <p className="mt-4 line-clamp-4 leading-relaxed text-gray-700 dark:text-gray-300">
            &ldquo;{testimonial.content}&rdquo;
          </p>
        </div>

        {/* 用户信息 */}
        <div className="mt-4 flex items-center">
          <Avatar className="mr-4 h-12 w-12">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {testimonial.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role} · {testimonial.company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
