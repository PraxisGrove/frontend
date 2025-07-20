'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Loader,
  SpinnerLoader,
  DotsLoader,
  PulseLoader,
  BarsLoader,
  RingLoader,
  WaveLoader,
  ProgressBar,
  TextSkeleton,
  CardSkeleton,
  ListSkeleton,
  TableSkeleton,
  LoadingOverlay,
} from '@/components/ui/enhanced-loading';
import {
  AceternityThemeProvider,
  EnhancedContainer,
  AnimatedContainer,
  AnimatedItem,
} from '@/components/aceternity';

export default function LoadingDemoPage() {
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  // 模拟进度条
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // 模拟加载
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <AceternityThemeProvider>
      <div className="bg-background min-h-screen">
        <EnhancedContainer className="space-y-16 py-16">
          {/* 标题 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-4 text-center"
          >
            <h1 className="text-foreground text-4xl font-bold md:text-5xl">
              Loading/Skeleton 组件演示
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              展示多种加载状态组件，包括加载动画、骨架屏和进度条
            </p>
          </AnimatedContainer>

          {/* 加载器类型 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">加载器类型</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">旋转加载器</h3>
                <div className="flex justify-center space-x-4">
                  <SpinnerLoader size="sm" />
                  <SpinnerLoader size="md" />
                  <SpinnerLoader size="lg" />
                  <SpinnerLoader size="xl" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">点状加载器</h3>
                <div className="flex justify-center space-x-4">
                  <DotsLoader size="sm" />
                  <DotsLoader size="md" />
                  <DotsLoader size="lg" />
                  <DotsLoader size="xl" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">脉冲加载器</h3>
                <div className="flex justify-center space-x-4">
                  <PulseLoader size="sm" />
                  <PulseLoader size="md" />
                  <PulseLoader size="lg" />
                  <PulseLoader size="xl" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">条状加载器</h3>
                <div className="flex justify-center space-x-4">
                  <BarsLoader size="sm" />
                  <BarsLoader size="md" />
                  <BarsLoader size="lg" />
                  <BarsLoader size="xl" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">环形加载器</h3>
                <div className="flex justify-center space-x-4">
                  <RingLoader size="sm" />
                  <RingLoader size="md" />
                  <RingLoader size="lg" />
                  <RingLoader size="xl" />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">波浪加载器</h3>
                <div className="flex justify-center space-x-4">
                  <WaveLoader size="sm" />
                  <WaveLoader size="md" />
                  <WaveLoader size="lg" />
                  <WaveLoader size="xl" />
                </div>
              </Card>
            </div>
          </section>

          {/* 带文字的加载器 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">带文字的加载器</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex justify-center">
                  <Loader type="spinner" size="lg" text="加载中..." />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex justify-center">
                  <Loader type="dots" size="lg" text="请稍候..." />
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex justify-center">
                  <Loader type="pulse" size="lg" text="处理中..." />
                </div>
              </Card>
            </div>
          </section>

          {/* 进度条 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">进度条</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">不同尺寸</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">小尺寸</p>
                    <ProgressBar value={progress} size="sm" showValue />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">
                      中等尺寸
                    </p>
                    <ProgressBar value={progress} size="md" showValue />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">大尺寸</p>
                    <ProgressBar value={progress} size="lg" showValue />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">不同状态</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">默认</p>
                    <ProgressBar value={75} variant="default" showValue />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">成功</p>
                    <ProgressBar value={100} variant="success" showValue />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">警告</p>
                    <ProgressBar value={60} variant="warning" showValue />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2 text-sm">错误</p>
                    <ProgressBar value={30} variant="error" showValue />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 骨架屏 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">骨架屏</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">文本骨架屏</h3>
                <TextSkeleton />
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">卡片骨架屏</h3>
                <CardSkeleton />
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">列表骨架屏</h3>
                <ListSkeleton items={3} />
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">表格骨架屏</h3>
                <TableSkeleton rows={4} columns={3} />
              </Card>
            </div>
          </section>

          {/* 自定义骨架屏 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">自定义骨架屏</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">用户资料</h3>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">文章预览</h3>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="mt-4 flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">统计卡片</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-6 rounded" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </Card>
            </div>
          </section>

          {/* 加载覆盖层 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">加载覆盖层</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">基础覆盖层</h3>
                <LoadingOverlay loading={isLoading}>
                  <div className="bg-muted flex h-32 items-center justify-center rounded-lg">
                    <p className="text-muted-foreground">内容区域</p>
                  </div>
                </LoadingOverlay>
                <Button onClick={handleLoadingDemo} className="mt-4 w-full">
                  {isLoading ? '加载中...' : '开始加载'}
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">自定义加载器</h3>
                <LoadingOverlay
                  loading={isLoading}
                  loader={
                    <Loader type="dots" size="xl" text="正在处理数据..." />
                  }
                >
                  <div className="bg-muted flex h-32 items-center justify-center rounded-lg">
                    <p className="text-muted-foreground">内容区域</p>
                  </div>
                </LoadingOverlay>
              </Card>
            </div>
          </section>

          {/* 特性说明 */}
          <section className="space-y-8">
            <Card className="bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-xl font-bold">Loading 组件特性</h2>
              <div className="mx-auto grid max-w-4xl gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-primary font-medium">🎨 多种样式</h4>
                  <p className="text-muted-foreground text-sm">
                    6种不同的加载器类型和多种尺寸
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">⚡ 高性能</h4>
                  <p className="text-muted-foreground text-sm">
                    基于 Framer Motion 的流畅动画
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🔧 易于使用</h4>
                  <p className="text-muted-foreground text-sm">
                    简单的 API 和预设的骨架屏组件
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">📊 进度显示</h4>
                  <p className="text-muted-foreground text-sm">
                    支持进度条和百分比显示
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🎭 覆盖层</h4>
                  <p className="text-muted-foreground text-sm">
                    支持加载覆盖层和自定义加载器
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🎯 类型安全</h4>
                  <p className="text-muted-foreground text-sm">
                    完整的 TypeScript 类型定义
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </EnhancedContainer>
      </div>
    </AceternityThemeProvider>
  );
}
