'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Share2,
  Gift,
  Clock,
  Users,
  Award,
  Smartphone,
  Monitor,
  Download,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Separator,
  AnimatedContainer,
  GradientText,
} from '@/components/unified';
import { useAuth } from '@/hooks/useAuth';
// TODO: 临时移除 hooks 导入，使用内联 mock 函数
// import { useCart } from '@/hooks/useCart';
// import { useWishlist } from '@/hooks/useWishlist';
import type { Course } from '@/types/api';

interface CoursePurchaseProps {
  course: Course;
  userEnrollment?: {
    isEnrolled: boolean;
    progress: number;
    enrolledAt: string;
  };
  className?: string;
}

/**
 * 课程购买侧边栏组件
 * 包括价格展示、购买按钮、课程信息等
 */
export function CoursePurchase({
  course,
  userEnrollment,
  className = '',
}: CoursePurchaseProps) {
  const { isAuthenticated } = useAuth();

  // TODO: 临时 mock 函数，等待 hooks 正确加载
  const addToCart = async (courseId: string) => {
    console.log('Mock addToCart:', courseId);
  };
  const isInCart = (courseId: string) => {
    console.log('Mock isInCart:', courseId);
    return false;
  };
  const addToWishlist = async (courseId: string) => {
    console.log('Mock addToWishlist:', courseId);
  };
  const removeFromWishlist = (courseId: string) => {
    console.log('Mock removeFromWishlist:', courseId);
  };
  const isInWishlist = (courseId: string) => {
    console.log('Mock isInWishlist:', courseId);
    return false;
  };
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const {
    id,
    title,
    price,
    originalPrice,
    currency,
    duration,
    lessonsCount,
    studentsCount,
    certificate,
    language,
    lastUpdated,
  } = course;

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

  // 计算折扣百分比
  const getDiscountPercentage = () => {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // 处理添加到购物车
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // 跳转到登录页面
      window.location.href = '/auth/login';
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // 处理立即购买
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
    // 跳转到结算页面
    window.location.href = `/checkout?course=${id}`;
  };

  // 处理收藏
  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      if (isInWishlist(id)) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  // 处理分享
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `查看这个精彩的课程：${title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const discountPercentage = getDiscountPercentage();
  const inCart = isInCart(id);
  const inWishlist = isInWishlist(id);

  return (
    <div className={`space-y-6 ${className}`}>
      <AnimatedContainer animation="slideLeft" delay={0.1}>
        <Card className="sticky top-6">
          <CardHeader>
            <div className="space-y-4">
              {/* 价格信息 */}
              <div className="text-center">
                {price === 0 ? (
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    免费
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        <GradientText>{formatPrice(price)}</GradientText>
                      </span>
                      {originalPrice && originalPrice > price && (
                        <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                          {formatPrice(originalPrice)}
                        </span>
                      )}
                    </div>
                    {discountPercentage > 0 && (
                      <Badge className="bg-red-500 text-white">
                        限时优惠 {discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* 购买按钮 */}
              <div className="space-y-3">
                {userEnrollment?.isEnrolled ? (
                  <Button size="lg" className="w-full" asChild>
                    <a href={`/learn/${id}`}>
                      继续学习 ({userEnrollment.progress}%)
                    </a>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="w-full" onClick={handleBuyNow}>
                      {price === 0 ? '免费学习' : '立即购买'}
                    </Button>
                    {price > 0 && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={handleAddToCart}
                        disabled={isAddingToCart || inCart}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {inCart
                          ? '已在购物车'
                          : isAddingToCart
                            ? '添加中...'
                            : '加入购物车'}
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  {inWishlist ? '已收藏' : '收藏'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  分享
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Gift className="mr-2 h-4 w-4" />
                  赠送
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Separator />

            {/* 课程信息 */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                课程包含
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(duration)} 视频内容</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Monitor className="h-4 w-4" />
                  <span>{lessonsCount} 个课时</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Download className="h-4 w-4" />
                  <span>可下载资源</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Smartphone className="h-4 w-4" />
                  <span>手机和电脑访问</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4" />
                  <span>终身访问权限</span>
                </div>
                {certificate && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Award className="h-4 w-4" />
                    <span>完成证书</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* 课程统计 */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                课程详情
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">
                    学员数量
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {studentsCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">语言</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {language}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">
                    最后更新
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {new Date(lastUpdated).toLocaleDateString('zh-CN')}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">
                    课程级别
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {course.level === 'beginner'
                      ? '初级'
                      : course.level === 'intermediate'
                        ? '中级'
                        : '高级'}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 30天退款保证 */}
            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <div className="text-center text-sm text-green-700 dark:text-green-400">
                <div className="font-medium">30天退款保证</div>
                <div className="text-xs">不满意可申请全额退款</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
}

export default CoursePurchase;
