'use client';

import React from 'react';
import {
  AceternityThemeProvider,
  BackgroundBeams,
  FloatingNav,
  ThemeToggle,
  ThemeSelector,
} from '@/components/aceternity';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 示例导航项
const navItems = [
  { name: '首页', link: '/' },
  { name: '课程', link: '/courses' },
  { name: '知识宇宙', link: '/knowledge-universe' },
  { name: '仪表板', link: '/dashboard' },
];

export default function AceternityDemoPage() {
  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen overflow-hidden">
        {/* 背景光束效果 */}
        <BackgroundBeams className="opacity-30" />

        {/* 浮动导航栏 */}
        <FloatingNav navItems={navItems} />

        {/* 主要内容 */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            {/* 标题 */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Aceternity UI 主题系统
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                集成 Aceternity UI 组件库与 Tailwind CSS 主题系统的演示页面
              </p>
            </div>

            {/* 主题控制 */}
            <Card className="mx-auto max-w-md bg-background/80 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">主题控制</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">暗色模式切换</span>
                  <ThemeToggle />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">主题选择</label>
                  <ThemeSelector className="w-full" />
                </div>
              </div>
            </Card>

            {/* 组件展示 */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 按钮展示 */}
              <Card className="bg-background/80 p-6 backdrop-blur-sm">
                <h4 className="mb-4 text-lg font-semibold">按钮组件</h4>
                <div className="space-y-3">
                  <Button className="w-full">主要按钮</Button>
                  <Button variant="secondary" className="w-full">
                    次要按钮
                  </Button>
                  <Button variant="outline" className="w-full">
                    轮廓按钮
                  </Button>
                </div>
              </Card>

              {/* 动画效果展示 */}
              <Card className="bg-background/80 p-6 backdrop-blur-sm">
                <h4 className="mb-4 text-lg font-semibold">动画效果</h4>
                <div className="space-y-3">
                  <div className="h-12 w-full animate-pulse-glow rounded bg-gradient-to-r from-primary/20 to-accent/20"></div>
                  <div className="h-12 w-full animate-gradient-shift rounded bg-gradient-to-r from-secondary to-muted bg-[length:200%_200%]"></div>
                  <div className="h-12 w-full animate-float rounded bg-primary/10"></div>
                </div>
              </Card>

              {/* 颜色展示 */}
              <Card className="bg-background/80 p-6 backdrop-blur-sm">
                <h4 className="mb-4 text-lg font-semibold">主题颜色</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 rounded bg-primary"></div>
                  <div className="h-8 rounded bg-secondary"></div>
                  <div className="h-8 rounded bg-accent"></div>
                  <div className="h-8 rounded bg-muted"></div>
                </div>
              </Card>
            </div>

            {/* 特性说明 */}
            <Card className="mx-auto max-w-2xl bg-background/80 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold">主题系统特性</h3>
              <div className="grid gap-4 text-left md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-primary">🎨 主题集成</h4>
                  <p className="text-sm text-muted-foreground">
                    Aceternity UI 与 Tailwind CSS 主题系统深度集成
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">🌙 暗色模式</h4>
                  <p className="text-sm text-muted-foreground">
                    支持浅色、暗色和跟随系统主题
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">✨ 动画效果</h4>
                  <p className="text-sm text-muted-foreground">
                    内置多种 Framer Motion 动画效果
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">🔧 可定制</h4>
                  <p className="text-sm text-muted-foreground">
                    通过 CSS 变量轻松定制主题颜色和动画
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AceternityThemeProvider>
  );
}
