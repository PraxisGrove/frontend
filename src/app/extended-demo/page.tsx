'use client';

import React from 'react';
import {
  AceternityThemeProvider,
  HeroSection,
  FeatureGrid,
  StatsGrid,
  Timeline,
  InteractiveCard,
  ProgressIndicator,
  NotificationBanner,
  EnhancedContainer,
} from '@/components/aceternity';

export default function ExtendedDemoPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [showNotification, setShowNotification] = React.useState(true);

  // 特性数据
  const features = [
    {
      icon: <span className="text-2xl">🚀</span>,
      title: '高性能',
      description: '基于 Framer Motion 的 GPU 加速动画，确保流畅的用户体验',
      highlight: true,
    },
    {
      icon: <span className="text-2xl">🎨</span>,
      title: '美观设计',
      description: '现代化的设计语言，支持深色和浅色主题',
    },
    {
      icon: <span className="text-2xl">📱</span>,
      title: '响应式',
      description: '完美适配各种设备尺寸，从手机到桌面',
    },
    {
      icon: <span className="text-2xl">🔧</span>,
      title: '可定制',
      description: '丰富的配置选项，满足不同项目需求',
    },
    {
      icon: <span className="text-2xl">⚡</span>,
      title: '易于使用',
      description: '简洁的 API 设计，快速上手和集成',
    },
    {
      icon: <span className="text-2xl">🛡️</span>,
      title: '类型安全',
      description: '完整的 TypeScript 支持，减少运行时错误',
    },
  ];

  // 统计数据
  const stats = [
    { value: 50, label: '组件数量', suffix: '+' },
    { value: 99, label: '性能评分', suffix: '%' },
    { value: 1000, label: '活跃用户', suffix: '+' },
    { value: 24, label: '技术支持', suffix: '/7' },
  ];

  // 时间线数据
  const timelineItems = [
    {
      title: '项目启动',
      description: '开始 PraxisGrove 前端项目的开发',
      date: '2024年1月',
      highlight: true,
    },
    {
      title: '基础架构',
      description: '完成 Next.js 15 + TypeScript 基础架构搭建',
      date: '2024年2月',
    },
    {
      title: 'UI 组件库',
      description: '集成 Aceternity UI 和 shadcn/ui 组件库',
      date: '2024年3月',
    },
    {
      title: '动画系统',
      description: '实现基于 Framer Motion 的动画系统',
      date: '2024年4月',
    },
    {
      title: '主题系统',
      description: '完成深色/浅色主题和响应式设计',
      date: '2024年5月',
    },
  ];

  // 进度步骤
  const progressSteps = [
    { title: '需求分析', description: '分析项目需求和技术选型' },
    { title: '架构设计', description: '设计系统架构和组件结构' },
    { title: '开发实现', description: '编码实现各个功能模块' },
    { title: '测试验证', description: '进行功能测试和性能优化' },
    { title: '部署上线', description: '部署到生产环境并监控' },
  ];

  return (
    <AceternityThemeProvider>
      <div className="min-h-screen">
        {/* 通知横幅 */}
        {showNotification && (
          <div className="p-4">
            <NotificationBanner
              type="info"
              title="欢迎体验扩展组件"
              message="这里展示了 Aceternity UI 的扩展组件功能"
              action={{
                text: '了解更多',
                onClick: () => console.log('了解更多'),
              }}
              onDismiss={() => setShowNotification(false)}
            />
          </div>
        )}

        {/* 英雄区域 */}
        <HeroSection
          subtitle="Aceternity UI"
          title="扩展组件演示"
          description="探索基于 Aceternity UI 构建的高级组件，为您的项目提供更丰富的交互体验"
          primaryAction={{
            text: '开始探索',
            onClick: () => console.log('开始探索'),
          }}
          secondaryAction={{
            text: '查看文档',
            onClick: () => console.log('查看文档'),
          }}
          backgroundVariant="beams"
          className="h-screen"
        />

        <EnhancedContainer className="space-y-24 py-16">
          {/* 特性展示 */}
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                核心特性
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Aceternity UI 扩展组件提供的强大功能
              </p>
            </div>
            <FeatureGrid features={features} columns={3} />
          </section>

          {/* 统计数据 */}
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                项目数据
              </h2>
              <p className="text-lg text-muted-foreground">
                一些令人印象深刻的数字
              </p>
            </div>
            <StatsGrid stats={stats} />
          </section>

          {/* 交互式卡片 */}
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                交互式卡片
              </h2>
              <p className="text-lg text-muted-foreground">
                不同变体的交互式卡片组件
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <InteractiveCard
                title="默认卡片"
                description="标准的交互式卡片，带有悬停效果"
                variant="default"
                action={{
                  text: '查看详情',
                  onClick: () => console.log('默认卡片'),
                }}
              />
              <InteractiveCard
                title="悬停提升"
                description="悬停时会向上提升的卡片效果"
                variant="hover-lift"
                action={{
                  text: '体验效果',
                  onClick: () => console.log('悬停提升'),
                }}
              />
              <InteractiveCard
                title="倾斜效果"
                description="悬停时带有 3D 倾斜效果的卡片"
                variant="tilt"
                action={{
                  text: '试试看',
                  onClick: () => console.log('倾斜效果'),
                }}
              />
              <InteractiveCard
                title="发光卡片"
                description="带有发光边框和缩放效果的卡片"
                variant="glow"
                action={{
                  text: '了解更多',
                  onClick: () => console.log('发光卡片'),
                }}
              />
            </div>
          </section>

          {/* 进度指示器 */}
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                进度指示器
              </h2>
              <p className="text-lg text-muted-foreground">
                展示项目或流程的进度状态
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  className="rounded-lg bg-secondary px-4 py-2 text-secondary-foreground"
                  disabled={currentStep === 0}
                >
                  上一步
                </button>
                <button
                  onClick={() =>
                    setCurrentStep(
                      Math.min(progressSteps.length - 1, currentStep + 1)
                    )
                  }
                  className="rounded-lg bg-primary px-4 py-2 text-primary-foreground"
                  disabled={currentStep === progressSteps.length - 1}
                >
                  下一步
                </button>
              </div>
              <ProgressIndicator
                steps={progressSteps}
                currentStep={currentStep}
                orientation="horizontal"
              />
            </div>
          </section>

          {/* 时间线 */}
          <section className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                项目时间线
              </h2>
              <p className="text-lg text-muted-foreground">
                PraxisGrove 项目的发展历程
              </p>
            </div>
            <Timeline items={timelineItems} />
          </section>

          {/* 总结 */}
          <section className="space-y-8 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              开始使用扩展组件
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              这些扩展组件为您的项目提供了更丰富的交互体验和视觉效果。
              每个组件都经过精心设计，确保在各种设备上都能完美运行。
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                查看源码
              </button>
              <button className="rounded-lg border border-border px-8 py-3 text-lg font-medium text-foreground transition-colors hover:bg-accent">
                阅读文档
              </button>
            </div>
          </section>
        </EnhancedContainer>
      </div>
    </AceternityThemeProvider>
  );
}
