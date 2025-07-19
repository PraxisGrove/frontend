'use client';

import React from 'react';
import {
  Grid,
  GridItem,
  AutoGrid,
  MasonryGrid,
  FeatureGrid,
  DashboardGrid,
} from '@/components/layout/grid-system';
import { PageContainer } from '@/components/layout/layout-container';
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
  Grid3X3,
  Layout,
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Shield,
  Palette,
  Code,
  Layers,
  Settings,
} from 'lucide-react';

export default function GridDemoPage() {
  const [currentDemo, setCurrentDemo] = React.useState<
    'basic' | 'responsive' | 'auto' | 'masonry' | 'feature' | 'dashboard'
  >('basic');

  // 示例卡片数据
  const sampleCards = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `卡片 ${i + 1}`,
    description: `这是第 ${i + 1} 个示例卡片，用于展示网格布局效果。`,
    height: Math.floor(Math.random() * 200) + 150, // 随机高度用于瀑布流
  }));

  // 特性数据
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: '高性能',
      description: '基于现代技术栈，提供极致的性能体验。',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: '安全可靠',
      description: '企业级安全保障，数据传输加密处理。',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: '美观设计',
      description: '精心设计的界面，提供优雅的用户体验。',
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: '开发友好',
      description: '完善的 API 文档，简化开发流程。',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: '模块化',
      description: '组件化架构，支持灵活的功能扩展。',
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: '易于配置',
      description: '丰富的配置选项，满足不同业务需求。',
    },
  ];

  // 仪表板数据
  const dashboardItems = [
    { title: '总用户数', value: '12,345', change: '+12%' },
    { title: '活跃用户', value: '8,901', change: '+8%' },
    { title: '收入', value: '¥234,567', change: '+15%' },
    { title: '转化率', value: '3.2%', change: '+0.5%' },
    { title: '页面浏览量', value: '456,789', change: '+22%' },
    { title: '平均停留时间', value: '2m 34s', change: '+18%' },
  ];

  return (
    <PageContainer
      title="响应式网格系统演示"
      description="展示灵活的响应式网格布局组件功能"
      actions={
        <div className="flex gap-2">
          <Badge variant="secondary">演示模式</Badge>
          <Button variant="outline" size="sm">
            <Grid3X3 className="mr-2 h-4 w-4" />
            网格设置
          </Button>
        </div>
      }
      animated
    >
      <div className="space-y-8">
        {/* 演示类型切换 */}
        <Card>
          <CardHeader>
            <CardTitle>网格类型演示</CardTitle>
            <CardDescription>选择不同的网格类型查看效果</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={currentDemo === 'basic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('basic')}
              >
                <Layout className="mr-2 h-4 w-4" />
                基础网格
              </Button>
              <Button
                variant={currentDemo === 'responsive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('responsive')}
              >
                <Smartphone className="mr-2 h-4 w-4" />
                响应式网格
              </Button>
              <Button
                variant={currentDemo === 'auto' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('auto')}
              >
                <Monitor className="mr-2 h-4 w-4" />
                自动网格
              </Button>
              <Button
                variant={currentDemo === 'masonry' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('masonry')}
              >
                <Layers className="mr-2 h-4 w-4" />
                瀑布流网格
              </Button>
              <Button
                variant={currentDemo === 'feature' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('feature')}
              >
                <Zap className="mr-2 h-4 w-4" />
                特性网格
              </Button>
              <Button
                variant={currentDemo === 'dashboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentDemo('dashboard')}
              >
                <Settings className="mr-2 h-4 w-4" />
                仪表板网格
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 网格演示区域 */}
        <Card>
          <CardHeader>
            <CardTitle>当前演示: {currentDemo}</CardTitle>
            <CardDescription>实时预览不同网格布局的效果</CardDescription>
          </CardHeader>
          <CardContent>
            {/* 基础网格 */}
            {currentDemo === 'basic' && (
              <Grid cols={4} gap="md" animated>
                {sampleCards.slice(0, 8).map((card) => (
                  <GridItem key={card.id} animated>
                    <Card className="h-32">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{card.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            )}

            {/* 响应式网格 */}
            {currentDemo === 'responsive' && (
              <Grid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="lg" animated>
                {sampleCards.slice(0, 8).map((card) => (
                  <GridItem key={card.id} animated>
                    <Card className="h-40">
                      <CardContent className="p-4">
                        <h4 className="font-medium">{card.title}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {card.description}
                        </p>
                        <div className="mt-4 flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-primary opacity-20 sm:opacity-40 md:opacity-60 lg:opacity-80" />
                          <div className="h-2 w-2 rounded-full bg-primary opacity-0 sm:opacity-20 md:opacity-40 lg:opacity-60" />
                          <div className="h-2 w-2 rounded-full bg-primary opacity-0 md:opacity-20 lg:opacity-40" />
                          <div className="h-2 w-2 rounded-full bg-primary opacity-0 lg:opacity-20" />
                        </div>
                      </CardContent>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            )}

            {/* 自动网格 */}
            {currentDemo === 'auto' && (
              <AutoGrid minItemWidth="200px" maxCols={4} gap="md" animated>
                {sampleCards.slice(0, 6).map((card) => (
                  <Card key={card.id} className="h-36">
                    <CardContent className="p-4">
                      <h4 className="font-medium">{card.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        自动适应宽度
                      </p>
                      <Badge variant="outline" className="mt-2">
                        Auto Fit
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </AutoGrid>
            )}

            {/* 瀑布流网格 */}
            {currentDemo === 'masonry' && (
              <MasonryGrid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="md">
                {sampleCards.map((card) => (
                  <Card key={card.id} style={{ height: `${card.height}px` }}>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{card.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {card.description}
                      </p>
                      <div className="mt-4">
                        <Badge variant="secondary">高度: {card.height}px</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </MasonryGrid>
            )}

            {/* 特性网格 */}
            {currentDemo === 'feature' && (
              <FeatureGrid columns={3} gap="lg">
                {features.map((feature, index) => (
                  <Card key={index} className="h-48">
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          {feature.icon}
                        </div>
                        <h4 className="font-medium">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </FeatureGrid>
            )}

            {/* 仪表板网格 */}
            {currentDemo === 'dashboard' && (
              <DashboardGrid>
                {dashboardItems.map((item, index) => (
                  <Card key={index} className="h-32">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          {item.title}
                        </h4>
                        <Badge
                          variant={
                            item.change.startsWith('+')
                              ? 'default'
                              : 'destructive'
                          }
                          className="text-xs"
                        >
                          {item.change}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">{item.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </DashboardGrid>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
