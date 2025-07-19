'use client';

import React from 'react';
import {
  LayoutContainer,
  PageContainer,
  CardContainer,
} from '@/components/layout/layout-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Layout,
  Grid,
  Sidebar,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';

export default function LayoutDemoPage() {
  const [currentLayout, setCurrentLayout] = React.useState<
    'default' | 'sidebar-left' | 'centered' | 'split'
  >('default');

  // 示例侧边栏内容
  const sampleSidebar = (
    <div className="h-full w-64 space-y-4 bg-muted p-4">
      <h3 className="font-semibold">侧边栏</h3>
      <nav className="space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          首页
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          用户
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          设置
        </Button>
      </nav>
    </div>
  );

  // 示例头部内容
  const sampleHeader = (
    <div className="bg-primary p-4 text-primary-foreground">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">应用头部</h2>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // 示例底部内容
  const sampleFooter = (
    <div className="bg-muted p-4 text-center text-sm text-muted-foreground">
      © 2024 PraxisGrove. All rights reserved.
    </div>
  );

  return (
    <PageContainer
      title="布局容器演示"
      description="展示各种布局容器组件的功能和用法"
      actions={
        <div className="flex gap-2">
          <Badge variant="secondary">演示模式</Badge>
          <Button variant="outline" size="sm">
            <Layout className="mr-2 h-4 w-4" />
            布局设置
          </Button>
        </div>
      }
      background="default"
      animated
    >
      <div className="space-y-8">
        {/* 布局切换控制 */}
        <CardContainer variant="outlined">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">布局模式切换</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={currentLayout === 'default' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLayout('default')}
              >
                <Monitor className="mr-2 h-4 w-4" />
                默认布局
              </Button>
              <Button
                variant={
                  currentLayout === 'sidebar-left' ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setCurrentLayout('sidebar-left')}
              >
                <Sidebar className="mr-2 h-4 w-4" />
                侧边栏布局
              </Button>
              <Button
                variant={currentLayout === 'centered' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLayout('centered')}
              >
                <Grid className="mr-2 h-4 w-4" />
                居中布局
              </Button>
              <Button
                variant={currentLayout === 'split' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentLayout('split')}
              >
                <Tablet className="mr-2 h-4 w-4" />
                分屏布局
              </Button>
            </div>
          </div>
        </CardContainer>

        {/* 布局演示区域 */}
        <Card>
          <CardHeader>
            <CardTitle>当前布局: {currentLayout}</CardTitle>
            <CardDescription>实时预览不同布局模式的效果</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="overflow-hidden rounded-lg border"
              style={{ height: '400px' }}
            >
              <LayoutContainer
                mode={currentLayout}
                fullHeight
                header={currentLayout !== 'centered' ? sampleHeader : undefined}
                sidebar={
                  currentLayout === 'sidebar-left' ? sampleSidebar : undefined
                }
                footer={currentLayout !== 'centered' ? sampleFooter : undefined}
                background="muted"
              >
                <div className="space-y-4 p-6">
                  <h4 className="text-lg font-medium">主内容区域</h4>
                  <p className="text-muted-foreground">
                    这里是主要内容区域。布局容器会根据选择的模式自动调整内容的排列方式。
                  </p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded border bg-background p-4">
                      <h5 className="mb-2 font-medium">内容块 1</h5>
                      <p className="text-sm text-muted-foreground">
                        这是一个示例内容块，展示在不同布局下的显示效果。
                      </p>
                    </div>
                    <div className="rounded border bg-background p-4">
                      <h5 className="mb-2 font-medium">内容块 2</h5>
                      <p className="text-sm text-muted-foreground">
                        布局容器支持响应式设计，在不同屏幕尺寸下自动适配。
                      </p>
                    </div>
                  </div>
                </div>
              </LayoutContainer>
            </div>
          </CardContent>
        </Card>

        {/* 功能特性展示 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardContainer variant="elevated">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Layout className="h-5 w-5 text-primary" />
                <h4 className="font-medium">多种布局模式</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                支持默认、侧边栏、居中、分屏等多种布局模式，满足不同场景需求。
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 标准布局</li>
                <li>• 侧边栏布局</li>
                <li>• 仪表板布局</li>
                <li>• 认证页面布局</li>
              </ul>
            </div>
          </CardContainer>

          <CardContainer variant="glass">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h4 className="font-medium">响应式设计</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                自动适配不同屏幕尺寸，提供一致的用户体验。
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 移动端优化</li>
                <li>• 平板端适配</li>
                <li>• 桌面端增强</li>
                <li>• 弹性布局</li>
              </ul>
            </div>
          </CardContainer>

          <CardContainer variant="outlined">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5 text-primary" />
                <h4 className="font-medium">灵活配置</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                丰富的配置选项，支持自定义样式和行为。
              </p>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 可配置间距</li>
                <li>• 多种背景样式</li>
                <li>• 动画效果</li>
                <li>• 滚动控制</li>
              </ul>
            </div>
          </CardContainer>
        </div>

        {/* 使用示例 */}
        <Card>
          <CardHeader>
            <CardTitle>使用示例</CardTitle>
            <CardDescription>常见的布局容器使用场景和代码示例</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">基础页面布局</h4>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<PageContainer
  title="页面标题"
  description="页面描述"
  actions={<Button>操作按钮</Button>}
>
  页面内容
</PageContainer>`}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">侧边栏布局</h4>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<LayoutContainer
  mode="sidebar-left"
  sidebar={<Sidebar />}
  header={<Header />}
  footer={<Footer />}
>
  主要内容
</LayoutContainer>`}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">卡片容器</h4>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<CardContainer
  variant="elevated"
  padding="lg"
  animated
>
  卡片内容
</CardContainer>`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
