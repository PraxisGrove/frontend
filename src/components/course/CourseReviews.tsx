'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter, ChevronDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Badge,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AnimatedContainer,
} from '@/components/unified';
import { CoursePagination } from './CoursePagination';
import { useAuth } from '@/hooks/useAuth';
import { coursesApi } from '@/api/courses';
import type { Course, PaginationResponse } from '@/types/api';

interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  helpful: number;
  isHelpful?: boolean;
  createdAt: string;
}

interface CourseReviewsProps {
  course: Course;
  className?: string;
}

/**
 * 课程评价和评论系统
 * 包括评分展示、评论列表、添加评论等
 */
export function CourseReviews({ course, className = '' }: CourseReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState<PaginationResponse>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // 获取评价列表
  const fetchReviews = React.useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        sort: sortBy === 'newest' ? 'created_at' : sortBy === 'oldest' ? 'created_at' : 'helpful',
        order: (sortBy === 'oldest' ? 'asc' : 'desc') as 'asc' | 'desc',
        ...(filterRating && { rating: filterRating }),
      };
      const response = await coursesApi.getReviews(course.id, params);
      setReviews(response.data.items);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [course.id, sortBy, filterRating, pagination.limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // 提交评价
  const handleSubmitReview = async () => {
    if (!isAuthenticated || !newReview.comment.trim()) return;

    try {
      setSubmitting(true);
      await coursesApi.addReview(course.id, {
        rating: newReview.rating,
        comment: newReview.comment.trim(),
      });
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
      fetchReviews(); // 重新获取评价列表
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // 标记评价有用
  const handleMarkHelpful = async (reviewId: string, helpful: boolean) => {
    if (!isAuthenticated) return;

    try {
      await coursesApi.markReviewHelpful(course.id, reviewId, helpful);
      setReviews(reviews.map(review =>
        review.id === reviewId
          ? {
            ...review,
            helpful: helpful ? review.helpful + 1 : review.helpful - 1,
            isHelpful: helpful,
          }
          : review
      ));
    } catch (error) {
      console.error('Failed to mark review helpful:', error);
    }
  };

  // 渲染星级评分
  const renderStars = (rating: number, size = 'sm', interactive = false, onChange?: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onChange?.(i)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          disabled={!interactive}
        >
          <Star
            className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
          />
        </button>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 计算评分分布
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className={`space-y-6 ${className}`}>
      <AnimatedContainer animation="slideUp" delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              学员评价
              <Badge variant="secondary" className="ml-2">
                {course.reviewsCount} 条评价
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 评分概览 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {course.rating}
                </div>
                <div className="mt-1">
                  {renderStars(course.rating)}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  基于 {course.reviewsCount} 条评价
                </div>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                  const percentage = course.reviewsCount > 0 ? (count / course.reviewsCount) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-2 text-sm">
                      <span className="w-8">{rating}星</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-gray-600 dark:text-gray-300">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 筛选和排序 */}
            <div className="flex flex-wrap items-center gap-4">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新发布</SelectItem>
                  <SelectItem value="oldest">最早发布</SelectItem>
                  <SelectItem value="helpful">最有帮助</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterRating?.toString() || ''}
                onValueChange={(value) => setFilterRating(value ? parseInt(value) : null)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="筛选评分" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部评分</SelectItem>
                  <SelectItem value="5">5星</SelectItem>
                  <SelectItem value="4">4星</SelectItem>
                  <SelectItem value="3">3星</SelectItem>
                  <SelectItem value="2">2星</SelectItem>
                  <SelectItem value="1">1星</SelectItem>
                </SelectContent>
              </Select>

              {isAuthenticated && (
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="ml-auto"
                >
                  写评价
                </Button>
              )}
            </div>

            {/* 写评价表单 */}
            {showReviewForm && isAuthenticated && (
              <AnimatedContainer animation="slideDown" delay={0.1}>
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          评分
                        </label>
                        {renderStars(newReview.rating, 'md', true, (rating) =>
                          setNewReview({ ...newReview, rating })
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          评价内容
                        </label>
                        <Textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          placeholder="分享您的学习体验..."
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSubmitReview}
                          disabled={submitting || !newReview.comment.trim()}
                        >
                          {submitting ? '提交中...' : '提交评价'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                        >
                          取消
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            )}

            {/* 评价列表 */}
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 bg-gray-200 rounded dark:bg-gray-700" />
                          <div className="h-4 w-full bg-gray-200 rounded dark:bg-gray-700" />
                          <div className="h-4 w-3/4 bg-gray-200 rounded dark:bg-gray-700" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <AnimatedContainer key={review.id} animation="slideUp" delay={0.1 * index}>
                    <div className="border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>
                            {review.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.user.name}
                            </span>
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleMarkHelpful(review.id, !review.isHelpful)}
                              className={`flex items-center gap-1 text-sm transition-colors ${review.isHelpful
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
                                }`}
                              disabled={!isAuthenticated}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>有帮助 ({review.helpful})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedContainer>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  暂无评价，成为第一个评价的人吧！
                </div>
              )}
            </div>

            {/* 分页 */}
            {!loading && reviews.length > 0 && (
              <CoursePagination
                pagination={pagination}
                onPageChange={fetchReviews}
                variant="simple"
                showInfo={false}
              />
            )}
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}

export default CourseReviews;
