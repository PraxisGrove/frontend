'use client';

import React from 'react';
import { Star, Clock, Users, Globe, Calendar, Award, BookOpen } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Separator,
  AnimatedContainer,
  GradientText,
} from '@/components/unified';
import type { Course } from '@/types/api';

interface CourseInfoProps {
  course: Course;
  className?: string;
}

/**
 * 课程基本信息展示组件
 * 包括标题、描述、讲师信息等
 */
export function CourseInfo({ course, className = '' }: CourseInfoProps) {
  const {
    title,
    description,
    instructor,
    level,
    duration,
    rating,
    reviewsCount,
    studentsCount,
    language,
    lastUpdated,
    certificate,
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

  // 格式化时长
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${mins > 0 ? `${mins}分钟` : ''}`;
    }
    return `${mins}分钟`;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 课程标题和标签 */}
      <AnimatedContainer animation="slideDown" delay={0.1}>
        <div className="space-y-4">
          {/* 特色标签 */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getLevelColor(level)}>
              {getLevelText(level)}
            </Badge>
            {isPopular && (
              <Badge className="bg-orange-500 text-white">
                🔥 热门
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 text-white">
                ⭐ 精选
              </Badge>
            )}
            {certificate && (
              <Badge className="bg-blue-500 text-white">
                🏆 提供证书
              </Badge>
            )}
          </div>

          {/* 课程标题 */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            <GradientText>{title}</GradientText>
          </h1>

          {/* 评分和统计 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span>({reviewsCount} 评价)</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{studentsCount.toLocaleString()} 学员</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{language}</span>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* 课程描述 */}
      <AnimatedContainer animation="slideUp" delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              课程介绍
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* 讲师信息 */}
      <AnimatedContainer animation="slideUp" delay={0.3}>
        <Card>
          <CardHeader>
            <CardTitle>讲师介绍</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                  {instructor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {instructor.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {instructor.bio}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{instructor.rating} 讲师评分</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{instructor.studentsCount.toLocaleString()} 学员</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{instructor.coursesCount} 门课程</span>
                  </div>
                </div>
                {/* 专业领域 */}
                <div className="flex flex-wrap gap-1">
                  {instructor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>

      {/* 课程标签和更新信息 */}
      <AnimatedContainer animation="slideUp" delay={0.4}>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* 课程标签 */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  课程标签
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* 更新信息 */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>最后更新：{formatDate(lastUpdated)}</span>
                </div>
                {certificate && (
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>完成后可获得证书</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}

export default CourseInfo;
