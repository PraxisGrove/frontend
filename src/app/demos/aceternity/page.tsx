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
  { name: '演示中心', link: '/demos' },
  { name: 'Aceternity', link: '/demos/aceternity' },
  { name: '样式演示', link: '/demos/styles' },
];

export default function AceternityDemoPage() {
  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen">
        {/* 背景光束效果 */}
        <BackgroundBeams />

        {/* 浮动导航栏 */}
        <FloatingNav navItems={navItems} />

        <div className="container mx-auto px-4 py-16">
          <div className="space-y-16">
            {/* 标题区域 */}
            <div className="space-y-6 text-center">
              <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Aceternity UI 演示
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
                体验 Aceternity UI 组件库的强大功能和精美效果
              </p>
            </div>

            {/* 主题控制 */}
            <div className="flex justify-center space-x-4">
              <ThemeToggle />
              <ThemeSelector />
            </div>

            {/* 功能展示 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">背景光束</h3>
                <p className="text-muted-foreground">
                  动态背景光束效果，为页面增添科技感
                </p>
                <Button variant="outline">查看效果</Button>
              </Card>

              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">浮动导航</h3>
                <p className="text-muted-foreground">
                  智能浮动导航栏，支持滚动隐藏和显示
                </p>
                <Button variant="outline">体验导航</Button>
              </Card>

              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">主题系统</h3>
                <p className="text-muted-foreground">
                  完整的主题切换系统，支持深色和浅色模式
                </p>
                <Button variant="outline">切换主题</Button>
              </Card>

              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">玻璃效果</h3>
                <p className="text-muted-foreground">
                  现代化的玻璃拟态效果，提升视觉层次
                </p>
                <Button variant="outline">查看详情</Button>
              </Card>

              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">动画系统</h3>
                <p className="text-muted-foreground">
                  流畅的动画过渡效果，提升用户体验
                </p>
                <Button variant="outline">体验动画</Button>
              </Card>

              <Card className="space-y-4 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold">响应式设计</h3>
                <p className="text-muted-foreground">
                  完美适配各种设备尺寸的响应式布局
                </p>
                <Button variant="outline">测试响应</Button>
              </Card>
            </div>

            {/* 技术特性 */}
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold">技术特性</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="text-2xl">⚡</div>
                  <h4 className="font-semibold">高性能</h4>
                  <p className="text-muted-foreground text-sm">
                    优化的渲染性能
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">🎨</div>
                  <h4 className="font-semibold">现代设计</h4>
                  <p className="text-muted-foreground text-sm">
                    前沿的视觉设计
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">📱</div>
                  <h4 className="font-semibold">响应式</h4>
                  <p className="text-muted-foreground text-sm">
                    完美的移动适配
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl">♿</div>
                  <h4 className="font-semibold">无障碍</h4>
                  <p className="text-muted-foreground text-sm">
                    完整的无障碍支持
                  </p>
                </div>
              </div>
            </div>

            {/* 使用说明 */}
            <Card className="border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold">开始使用</h3>
                <p className="text-muted-foreground mx-auto max-w-2xl">
                  Aceternity UI
                  提供了丰富的组件和效果，帮助您快速构建现代化的用户界面。
                  所有组件都经过精心设计，确保在各种设备上都能提供最佳的用户体验。
                </p>
                <div className="flex justify-center space-x-4">
                  <Button>查看文档</Button>
                  <Button variant="outline">GitHub</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AceternityThemeProvider>
  );
}
