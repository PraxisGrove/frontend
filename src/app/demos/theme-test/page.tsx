'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  AceternityThemeProvider,
  BackgroundBeams,
  FloatingNav,
  GlassCard,
  GlowBorder,
  EnhancedButton,
  EnhancedCard,
  ThemeToggle,
} from '@/components/aceternity';

const navItems = [
  { name: '首页', link: '/' },
  { name: '演示中心', link: '/demos' },
  { name: '主题测试', link: '/demos/theme-test' },
];

export default function ThemeTestPage() {
  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen">
        {/* 背景光束效果 */}
        <BackgroundBeams className="opacity-20" />

        {/* 浮动导航栏 */}
        <FloatingNav navItems={navItems} />

        <div className="container mx-auto space-y-12 px-4 py-16">
          {/* 标题区域 */}
          <div className="space-y-6 text-center">
            <h1 className="from-primary via-secondary to-accent bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              TweakCN Soft Pop 主题测试
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              测试 Soft Pop 主题的颜色方案、字体和组件样式
            </p>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>

          {/* 颜色测试 */}
          <section className="space-y-6">
            <h2 className="text-center text-2xl font-bold">颜色系统测试</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              <Card className="p-4 text-center">
                <div className="bg-primary mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Primary</p>
                <Badge variant="secondary" className="text-xs">
                  主色调
                </Badge>
              </Card>
              <Card className="p-4 text-center">
                <div className="bg-secondary mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Secondary</p>
                <Badge variant="secondary" className="text-xs">
                  次要色
                </Badge>
              </Card>
              <Card className="p-4 text-center">
                <div className="bg-accent mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Accent</p>
                <Badge variant="secondary" className="text-xs">
                  强调色
                </Badge>
              </Card>
              <Card className="p-4 text-center">
                <div className="bg-muted mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Muted</p>
                <Badge variant="secondary" className="text-xs">
                  柔和色
                </Badge>
              </Card>
              <Card className="p-4 text-center">
                <div className="bg-destructive mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Destructive</p>
                <Badge variant="destructive" className="text-xs">
                  警告色
                </Badge>
              </Card>
              <Card className="p-4 text-center">
                <div className="bg-border mb-2 h-16 w-full rounded-lg"></div>
                <p className="text-sm font-medium">Border</p>
                <Badge variant="outline" className="text-xs">
                  边框色
                </Badge>
              </Card>
            </div>
          </section>

          {/* 按钮测试 */}
          <section className="space-y-6">
            <h2 className="text-center text-2xl font-bold">按钮组件测试</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="default">默认按钮</Button>
              <Button variant="secondary">次要按钮</Button>
              <Button variant="outline">轮廓按钮</Button>
              <Button variant="ghost">幽灵按钮</Button>
              <Button variant="destructive">危险按钮</Button>
              <EnhancedButton variant="glow">发光按钮</EnhancedButton>
            </div>
          </section>

          {/* 卡片测试 */}
          <section className="space-y-6">
            <h2 className="text-center text-2xl font-bold">卡片组件测试</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>标准卡片</CardTitle>
                  <CardDescription>使用默认样式的卡片组件</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    这是一个标准的卡片组件，展示了新主题的基础样式。
                  </p>
                </CardContent>
              </Card>

              <GlassCard>
                <CardHeader>
                  <CardTitle>玻璃卡片</CardTitle>
                  <CardDescription>带有玻璃效果的卡片</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    这是一个玻璃效果卡片，展示了 Aceternity UI 的特殊效果。
                  </p>
                </CardContent>
              </GlassCard>

              <GlowBorder>
                <Card>
                  <CardHeader>
                    <CardTitle>发光边框卡片</CardTitle>
                    <CardDescription>带有发光边框效果</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      这是一个带有发光边框的卡片，展示了动态效果。
                    </p>
                  </CardContent>
                </Card>
              </GlowBorder>
            </div>
          </section>

          {/* 表单测试 */}
          <section className="space-y-6">
            <h2 className="text-center text-2xl font-bold">表单组件测试</h2>
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>表单样式测试</CardTitle>
                <CardDescription>测试输入框和表单控件的样式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    邮箱地址
                  </label>
                  <Input id="email" type="email" placeholder="请输入邮箱地址" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    密码
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="请输入密码"
                  />
                </div>
                <Button className="w-full">提交表单</Button>
              </CardContent>
            </Card>
          </section>

          {/* 字体测试 */}
          <section className="space-y-6">
            <h2 className="text-center text-2xl font-bold">字体系统测试</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  DM Sans (Sans-serif)
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Bold Text 粗体文字</p>
                  <p className="text-lg font-semibold">Semibold Text 半粗体</p>
                  <p className="text-base font-medium">Medium Text 中等字重</p>
                  <p className="text-sm">Regular Text 常规文字</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Space Mono (Monospace)
                </h3>
                <div className="space-y-2 font-mono">
                  <p className="text-lg font-bold">Bold Code 粗体代码</p>
                  <p className="text-base">Regular Code 常规代码</p>
                  <code className="bg-muted rounded px-2 py-1 text-sm">
                    console.log(&apos;Hello World&apos;);
                  </code>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold">阴影系统</h3>
                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-3 shadow-sm">
                    shadow-sm
                  </div>
                  <div className="bg-card rounded-lg p-3 shadow-md">
                    shadow-md
                  </div>
                  <div className="bg-card rounded-lg p-3 shadow-lg">
                    shadow-lg
                  </div>
                  <div className="bg-card rounded-lg p-3 shadow-xl">
                    shadow-xl
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 主题信息 */}
          <section className="space-y-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle className="text-center">
                  🎨 TweakCN Soft Pop 主题
                </CardTitle>
                <CardDescription className="text-center">
                  现代化的柔和弹出式设计主题
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>主色调:</strong> 蓝紫色 (#6366f1)
                  </div>
                  <div>
                    <strong>次要色:</strong> 青绿色 (#06b6d4)
                  </div>
                  <div>
                    <strong>强调色:</strong> 橙黄色 (#f59e0b)
                  </div>
                  <div>
                    <strong>字体:</strong> DM Sans + Space Mono
                  </div>
                  <div>
                    <strong>圆角:</strong> 1rem (16px)
                  </div>
                  <div>
                    <strong>阴影:</strong> 柔和多层阴影
                  </div>
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                  <Button asChild>
                    <Link href="/demos">返回演示中心</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/demos/styles">查看样式演示</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </AceternityThemeProvider>
  );
}
