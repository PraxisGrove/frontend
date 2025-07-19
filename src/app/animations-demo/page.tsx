'use client';

import React from 'react';
import {
  AceternityThemeProvider,
  AnimatedContainer,
  AnimatedItem,
  InViewAnimation,
  HoverAnimation,
  PulseGlow,
  Floating,
  GradientShift,
  Magnetic,
  Typewriter,
  BeamScan,
  ParticleEffect,
} from '@/components/aceternity';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AnimationsDemoPage() {
  const [showTypewriter, setShowTypewriter] = React.useState(false);

  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen bg-background">
        {/* 粒子背景效果 */}
        <ParticleEffect className="opacity-20" particleCount={30} />

        {/* 光束扫描效果 */}
        <BeamScan className="opacity-30" />

        <div className="container relative z-10 mx-auto space-y-16 px-4 py-16">
          {/* 标题区域 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-6 text-center"
          >
            <h1 className="text-4xl font-bold text-foreground md:text-6xl">
              Aceternity 动画系统
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              基于 Framer Motion 的高性能动画组件库演示
            </p>
          </AnimatedContainer>

          {/* 基础动画演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">基础动画效果</h2>
            <AnimatedContainer
              containerAnimation="staggerSlideUp"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatedItem animation="fadeIn">
                <Card className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">淡入效果</h3>
                  <p className="text-sm text-muted-foreground">fadeIn</p>
                </Card>
              </AnimatedItem>

              <AnimatedItem animation="slideUp">
                <Card className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">上滑进入</h3>
                  <p className="text-sm text-muted-foreground">slideUp</p>
                </Card>
              </AnimatedItem>

              <AnimatedItem animation="scaleIn">
                <Card className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">缩放进入</h3>
                  <p className="text-sm text-muted-foreground">scaleIn</p>
                </Card>
              </AnimatedItem>

              <AnimatedItem animation="bounceIn">
                <Card className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">弹跳进入</h3>
                  <p className="text-sm text-muted-foreground">bounceIn</p>
                </Card>
              </AnimatedItem>
            </AnimatedContainer>
          </section>

          {/* 交互动画演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">交互动画效果</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* 悬停动画 */}
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">悬停动画</h3>
                <HoverAnimation hoverScale={1.1} hoverY={-10}>
                  <div className="rounded-lg bg-primary/10 p-4 text-center">
                    <p className="text-sm">鼠标悬停试试</p>
                  </div>
                </HoverAnimation>
              </Card>

              {/* 磁场效果 */}
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">磁场效果</h3>
                <div className="flex justify-center">
                  <Magnetic strength={0.5}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                      <span className="text-xs">磁场</span>
                    </div>
                  </Magnetic>
                </div>
              </Card>

              {/* 脉冲发光 */}
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">脉冲发光</h3>
                <div className="flex justify-center">
                  <PulseGlow intensity="medium" speed="normal">
                    <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                      发光效果
                    </div>
                  </PulseGlow>
                </div>
              </Card>
            </div>
          </section>

          {/* 特殊效果演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">特殊效果</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* 浮动效果 */}
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">浮动效果</h3>
                <div className="flex justify-center">
                  <Floating amplitude={15} duration={2}>
                    <div className="rounded-lg bg-secondary p-4">
                      <span className="text-sm">浮动元素</span>
                    </div>
                  </Floating>
                </div>
              </Card>

              {/* 渐变移动背景 */}
              <Card className="relative overflow-hidden p-6">
                <GradientShift
                  colors={[
                    'hsl(var(--primary))',
                    'hsl(var(--secondary))',
                    'hsl(var(--accent))',
                  ]}
                  direction="diagonal"
                  speed="normal"
                />
                <div className="relative z-10">
                  <h3 className="mb-4 font-semibold text-white">渐变背景</h3>
                  <p className="text-sm text-white/80">动态渐变背景效果</p>
                </div>
              </Card>
            </div>
          </section>

          {/* 打字机效果演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">打字机效果</h2>
            <Card className="p-8 text-center">
              <div className="space-y-4">
                <Button
                  onClick={() => setShowTypewriter(!showTypewriter)}
                  variant="outline"
                >
                  {showTypewriter ? '重置' : '开始'} 打字机效果
                </Button>
                {showTypewriter && (
                  <div className="text-lg">
                    <Typewriter
                      text="欢迎使用 Aceternity UI 动画系统！这是一个功能强大的动画组件库。"
                      speed={80}
                      delay={500}
                      onComplete={() => console.log('打字机效果完成')}
                    />
                  </div>
                )}
              </div>
            </Card>
          </section>

          {/* 视口进入动画演示 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">视口进入动画</h2>
            <div className="space-y-8">
              {Array.from({ length: 3 }, (_, i) => (
                <InViewAnimation
                  key={i}
                  animation="slideLeft"
                  threshold={0.3}
                  delay={i * 0.2}
                >
                  <Card className="p-6">
                    <h3 className="mb-2 font-semibold">视口动画 {i + 1}</h3>
                    <p className="text-muted-foreground">
                      当这个卡片进入视口时会触发动画效果
                    </p>
                  </Card>
                </InViewAnimation>
              ))}
            </div>
          </section>

          {/* 性能说明 */}
          <section className="space-y-8">
            <AnimatedContainer animation="fadeIn" delay={0.5}>
              <Card className="bg-muted/50 p-8 text-center">
                <h2 className="mb-4 text-xl font-bold">性能优化</h2>
                <div className="mx-auto grid max-w-2xl gap-4 text-left md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-primary">🚀 GPU 加速</h4>
                    <p className="text-sm text-muted-foreground">
                      使用 transform 和 opacity 属性确保 GPU 加速
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">⚡ 智能优化</h4>
                    <p className="text-sm text-muted-foreground">
                      自动检测设备性能，调整动画复杂度
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">🎯 按需加载</h4>
                    <p className="text-sm text-muted-foreground">
                      组件化设计，只加载需要的动画效果
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary">🔧 可配置</h4>
                    <p className="text-sm text-muted-foreground">
                      支持自定义动画参数和性能配置
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedContainer>
          </section>
        </div>
      </div>
    </AceternityThemeProvider>
  );
}
