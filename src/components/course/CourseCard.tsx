'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  Badge,
  Button,
  AnimatedContainer,
  GlassCard,
} from '@/components/unified';
import type { Course } from '@/types/api';

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'glass' | 'animated';
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

/**
 * 课程卡片组件
 * 支持多种样式变体和动画效果
 */
export function CourseCard({
  course,
  variant = 'default',
  showProgress = false,
  progress = 0,
  className = '',
}: CourseCardProps) {
  const {
    id,
    title,
    shortDescription,
    instructor,
    level,
    duration,
    price,
    originalPrice,
    rating,
    studentsCount,
    thumbnail,
    tags,
    isPopular,
    isFeatured,
  } = course;

  // 级别颜色映射
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // 级别文本映射
  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return '初级';
      case 'intermediate':
        return '中级';
      case 'advanced':
        return '高级';
      default:
        return level;
    }
  };

  // 格式化价格
  const formatPrice = (price: number) => {
    return `¥${price}`;
  };

  // 格式化时长
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins > 0 ? `${mins}分钟` : ''}`;
    }
    return `${mins}分钟`;
  };

  // 课程缩略图组件
  const CourseThumbnail = () => (
    <div className="relative h-48 overflow-hidden">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
          <div className="text-center text-white">
            <div className="mb-2 text-4xl font-bold">{title.charAt(0)}</div>
            <div className="text-sm opacity-90">{title}</div>
          </div>
        </div>
      )}

      {/* 特色标签 */}
      {(isPopular || isFeatured) && (
        <div className="absolute left-3 top-3 flex gap-2">
          {isPopular && (
            <Badge className="bg-orange-500 text-white">热门</Badge>
          )}
          {isFeatured && (
            <Badge className="bg-purple-500 text-white">精选</Badge>
          )}
        </div>
      )}
    </div>
  );

  // 课程信息组件
  const CourseInfo = () => (
    <CardContent className="flex-1 p-6">
      {/* 级别和评分 */}
      <div className="mb-3 flex items-center justify-between">
        <Badge className={getLevelColor(level)}>{getLevelText(level)}</Badge>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>

      {/* 标题 */}
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      {/* 描述 */}
      <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
        {shortDescription || course.description}
      </p>

      {/* 讲师和统计信息 */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <span className="mr-1">👨‍🏫</span>
          <span>{instructor.name}</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          <span>{formatDuration(duration)}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-1 h-4 w-4" />
          <span>{studentsCount}</span>
        </div>
      </div>

      {/* 标签 */}
      <div className="mb-4 flex flex-wrap gap-1">
        {tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{tags.length - 3}
          </Badge>
        )}
      </div>

      {/* 学习进度 */}
      {showProgress && (
        <div className="mb-4">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">学习进度</span>
            <span className="text-gray-900 dark:text-white">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </CardContent>
  );

  // 课程底部组件
  const CourseFooter = () => (
    <CardFooter className="flex items-center justify-between p-6 pt-0">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {formatPrice(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-lg text-gray-500 line-through dark:text-gray-400">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>
      <Link href={`/courses/${id}`}>
        <Button size="sm" className="min-w-[80px]">
          查看详情
        </Button>
      </Link>
    </CardFooter>
  );

  // 根据变体渲染不同样式的卡片
  const renderCard = () => {
    const cardContent = (
      <>
        <CourseThumbnail />
        <CourseInfo />
        <CourseFooter />
      </>
    );

    switch (variant) {
      case 'glass':
        return (
          <GlassCard
            className={`group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
          >
            {cardContent}
          </GlassCard>
        );

      case 'animated':
        return (
          <AnimatedContainer animation="slideUp" delay={0.1}>
            <Card
              className={`group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
            >
              {cardContent}
            </Card>
          </AnimatedContainer>
        );

      default:
        return (
          <Card
            className={`group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
          >
            {cardContent}
          </Card>
        );
    }
  };

  return renderCard();
}

export default CourseCard;
