'use client';

import React from 'react';
import {
  AceternityThemeProvider,
  BackgroundBeams,
  FloatingNav,
  GlassCard,
  GlowBorder,
  FloatingShadow,
  GradientText,
  EnhancedButton,
  EnhancedCard,
  EnhancedInput,
  EnhancedContainer,
  EnhancedDivider,
  PulseGlow,
  Magnetic,
  AnimatedContainer,
  AnimatedItem,
} from '@/components/aceternity';

// 示例导航项
const navItems = [
  { name: '首页', link: '/' },
  { name: '演示中心', link: '/demos' },
  { name: '样式演示', link: '/demos/styles' },
  { name: '动画演示', link: '/demos/animations' },
  { name: 'Aceternity', link: '/demos/aceternity' },
];

export default function StylesDemoPage() {
  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen">
        {/* 背景光束效果 */}
        <BackgroundBeams className="opacity-20" />

        {/* 浮动导航栏 */}
        <FloatingNav navItems={navItems} />

        <EnhancedContainer variant="full-height" className="space-y-16 py-16">
          {/* 标题区域 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-6 text-center"
          >
            <GradientText as="h1" className="text-4xl font-bold md:text-6xl">
              Aceternity 样式系统
            </GradientText>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              自定义样式覆盖和增强组件演示
            </p>
          </AnimatedContainer>

          {/* 按钮样式演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">增强按钮组件</h2>
            <AnimatedContainer
              containerAnimation="staggerSlideUp"
              className="flex flex-wrap justify-center gap-4"
            >
              <AnimatedItem>
                <EnhancedButton variant="primary" size="sm">
                  主要按钮 (小)
                </EnhancedButton>
              </AnimatedItem>
              <AnimatedItem>
                <EnhancedButton variant="secondary" size="md">
                  次要按钮 (中)
                </EnhancedButton>
              </AnimatedItem>
              <AnimatedItem>
                <EnhancedButton variant="ghost" size="lg">
                  幽灵按钮 (大)
                </EnhancedButton>
              </AnimatedItem>
              <AnimatedItem>
                <EnhancedButton variant="glow" size="md">
                  发光按钮
                </EnhancedButton>
              </AnimatedItem>
            </AnimatedContainer>
          </section>

          {/* 卡片样式演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">增强卡片组件</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <EnhancedCard variant="default">
                <h3 className="mb-2 font-semibold">默认卡片</h3>
                <p className="text-muted-foreground text-sm">
                  标准的卡片样式，带有边框和背景
                </p>
              </EnhancedCard>

              <EnhancedCard variant="glass">
                <h3 className="mb-2 font-semibold">玻璃卡片</h3>
                <p className="text-muted-foreground text-sm">
                  半透明玻璃效果，带有模糊背景
                </p>
              </EnhancedCard>

              <EnhancedCard variant="glow">
                <h3 className="mb-2 font-semibold">发光卡片</h3>
                <p className="text-muted-foreground text-sm">
                  带有发光边框效果的卡片
                </p>
              </EnhancedCard>

              <EnhancedCard variant="floating">
                <h3 className="mb-2 font-semibold">浮动卡片</h3>
                <p className="text-muted-foreground text-sm">
                  带有浮动阴影效果的卡片
                </p>
              </EnhancedCard>
            </div>
          </section>

          {/* 特殊效果组件演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">特殊效果组件</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* 玻璃效果 */}
              <GlassCard>
                <h3 className="mb-4 font-semibold">玻璃效果</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  半透明背景，模糊效果
                </p>
                <EnhancedButton variant="ghost" size="sm">
                  了解更多
                </EnhancedButton>
              </GlassCard>

              {/* 发光边框 */}
              <GlowBorder>
                <h3 className="mb-4 font-semibold">发光边框</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  动态发光边框效果
                </p>
                <EnhancedButton variant="primary" size="sm">
                  体验效果
                </EnhancedButton>
              </GlowBorder>

              {/* 浮动阴影 */}
              <FloatingShadow>
                <h3 className="mb-4 font-semibold">浮动阴影</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  立体浮动阴影效果
                </p>
                <EnhancedButton variant="secondary" size="sm">
                  查看详情
                </EnhancedButton>
              </FloatingShadow>
            </div>
          </section>

          {/* 交互效果演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">交互效果</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* 脉冲发光 */}
              <EnhancedCard variant="default">
                <h3 className="mb-4 font-semibold">脉冲发光效果</h3>
                <div className="flex justify-center">
                  <PulseGlow intensity="high" speed="normal">
                    <div className="bg-primary text-primary-foreground rounded-lg px-6 py-3">
                      发光元素
                    </div>
                  </PulseGlow>
                </div>
              </EnhancedCard>

              {/* 磁场效果 */}
              <EnhancedCard variant="default">
                <h3 className="mb-4 font-semibold">磁场效果</h3>
                <div className="flex justify-center">
                  <Magnetic strength={0.4}>
                    <EnhancedButton variant="glow" size="lg">
                      磁场按钮
                    </EnhancedButton>
                  </Magnetic>
                </div>
              </EnhancedCard>
            </div>
          </section>

          {/* 表单组件演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">表单组件</h2>
            <div className="mx-auto max-w-md space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  默认输入框
                </label>
                <EnhancedInput variant="default" placeholder="请输入内容..." />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  玻璃效果输入框
                </label>
                <EnhancedInput
                  variant="glass"
                  placeholder="玻璃效果输入框..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  发光输入框
                </label>
                <EnhancedInput variant="glow" placeholder="发光效果输入框..." />
              </div>
            </div>
          </section>

          {/* 分隔线演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">分隔线组件</h2>
            <div className="space-y-8">
              <div>
                <p className="text-muted-foreground mb-4 text-center text-sm">
                  默认分隔线
                </p>
                <EnhancedDivider variant="default" />
              </div>

              <div>
                <p className="text-muted-foreground mb-4 text-center text-sm">
                  渐变分隔线
                </p>
                <EnhancedDivider variant="gradient" />
              </div>

              <div>
                <p className="text-muted-foreground mb-4 text-center text-sm">
                  发光分隔线
                </p>
                <EnhancedDivider variant="glow" />
              </div>
            </div>
          </section>

          {/* 文字效果演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">文字效果</h2>
            <div className="space-y-4 text-center">
              <GradientText as="h3" className="text-3xl font-bold">
                渐变文字效果
              </GradientText>
              <GradientText as="p" className="text-lg">
                这是一段带有渐变效果的文字
              </GradientText>
            </div>
          </section>

          {/* 响应式说明 */}
          <section className="space-y-8">
            <EnhancedCard variant="glass" className="text-center">
              <h2 className="mb-4 text-xl font-bold">响应式设计</h2>
              <div className="mx-auto grid max-w-2xl gap-4 text-left md:grid-cols-2">
                <div>
                  <h4 className="text-primary font-medium">📱 移动端优化</h4>
                  <p className="text-muted-foreground text-sm">
                    针对移动设备优化的样式和交互
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">💻 桌面端增强</h4>
                  <p className="text-muted-foreground text-sm">
                    桌面端的增强视觉效果和动画
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🌙 主题适配</h4>
                  <p className="text-muted-foreground text-sm">
                    深色和浅色主题的完美适配
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">♿ 无障碍支持</h4>
                  <p className="text-muted-foreground text-sm">
                    支持高对比度和减少动画模式
                  </p>
                </div>
              </div>
            </EnhancedCard>
          </section>
        </EnhancedContainer>
      </div>
    </AceternityThemeProvider>
  );
}
