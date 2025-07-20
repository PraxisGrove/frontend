import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Layout,
  Loader,
  Upload,
  Table,
  PanelLeft as Sidebar,
  Grid3X3,
  FileText,
  Sparkles,
  TestTube,
  Zap,
  Coffee,
  Square as Modal,
} from 'lucide-react';

export default function DemosIndexPage() {
  const demoCategories = [
    {
      title: 'UI 组件演示',
      description: '展示各种 UI 组件的功能和样式',
      demos: [
        {
          name: '样式系统',
          path: '/demos/styles',
          description: '展示 Tailwind CSS 和主题系统',
          icon: Palette,
          tags: ['CSS', 'Tailwind', '主题'],
        },
        {
          name: 'Logo 组件',
          path: '/demos/logo',
          description: '品牌 Logo 组件的各种变体和用法',
          icon: Sparkles,
          tags: ['Logo', 'SVG', '品牌'],
        },
        {
          name: '布局系统',
          path: '/demos/layout',
          description: '响应式布局和网格系统演示',
          icon: Layout,
          tags: ['布局', '响应式', '网格'],
        },
        {
          name: '网格系统',
          path: '/demos/grid',
          description: '灵活的网格布局组件',
          icon: Grid3X3,
          tags: ['网格', '布局', '响应式'],
        },
        {
          name: '侧边栏',
          path: '/demos/sidebar',
          description: '可折叠的侧边栏导航组件',
          icon: Sidebar,
          tags: ['导航', '侧边栏', '交互'],
        },
      ],
    },
    {
      title: '交互组件演示',
      description: '展示具有交互功能的组件',
      demos: [
        {
          name: '表单组件',
          path: '/demos/form',
          description: '各种表单控件和验证功能',
          icon: FileText,
          tags: ['表单', '验证', '输入'],
        },
        {
          name: '表格组件',
          path: '/demos/table',
          description: '数据表格的排序、筛选和分页',
          icon: Table,
          tags: ['表格', '数据', '分页'],
        },
        {
          name: '模态框',
          path: '/demos/modal',
          description: '各种模态框和对话框组件',
          icon: Modal,
          tags: ['模态框', '对话框', '弹窗'],
        },
        {
          name: '文件上传',
          path: '/demos/upload',
          description: '文件上传和拖拽功能',
          icon: Upload,
          tags: ['上传', '文件', '拖拽'],
        },
        {
          name: '消息提示',
          path: '/demos/toast',
          description: 'Toast 消息和通知组件',
          icon: Coffee,
          tags: ['消息', '通知', 'Toast'],
        },
      ],
    },
    {
      title: '动画和效果',
      description: '展示动画效果和视觉增强',
      demos: [
        {
          name: '加载动画',
          path: '/demos/loading',
          description: '各种加载状态和动画效果',
          icon: Loader,
          tags: ['加载', '动画', '状态'],
        },
        {
          name: '动画演示',
          path: '/demos/animations',
          description: '页面过渡和交互动画',
          icon: Zap,
          tags: ['动画', '过渡', '交互'],
        },
        {
          name: 'Aceternity UI',
          path: '/demos/aceternity',
          description: 'Aceternity UI 组件库演示',
          icon: Sparkles,
          tags: ['Aceternity', 'UI库', '特效'],
        },
        {
          name: '扩展组件',
          path: '/demos/extended',
          description: '扩展和自定义组件演示',
          icon: Zap,
          tags: ['扩展', '自定义', '组件'],
        },
      ],
    },
    {
      title: '测试页面',
      description: '用于开发和测试的页面',
      demos: [
        {
          name: '主题测试',
          path: '/demos/theme-test',
          description: 'TweakCN Soft Pop 主题完整测试',
          icon: Palette,
          tags: ['主题', 'TweakCN', 'Soft Pop'],
        },
        {
          name: 'Logo 测试',
          path: '/demos/logo-test',
          description: 'Logo 组件的功能测试',
          icon: TestTube,
          tags: ['测试', 'Logo', '功能'],
        },
        {
          name: 'SVG 测试',
          path: '/demos/svg-test',
          description: 'SVG 组件的水合测试',
          icon: TestTube,
          tags: ['测试', 'SVG', '水合'],
        },
        {
          name: '样式测试',
          path: '/demos/test-styles',
          description: '样式系统的兼容性测试',
          icon: TestTube,
          tags: ['测试', '样式', '兼容性'],
        },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            组件演示中心
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            这里展示了 PraxisGrove 项目中所有 UI
            组件、交互功能和动画效果的演示页面。
            您可以浏览各种组件的实际效果，了解它们的功能和使用方法。
          </p>
        </div>

        <div className="space-y-8">
          {demoCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div>
                <h2 className="text-foreground mb-2 text-2xl font-semibold">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.demos.map((demo) => {
                  const IconComponent = demo.icon;
                  return (
                    <Card
                      key={demo.name}
                      className="transition-shadow hover:shadow-md"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-lg p-2">
                            <IconComponent className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {demo.name}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {demo.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-4 flex flex-wrap gap-1">
                          {demo.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild className="w-full">
                          <Link href={demo.path}>查看演示</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 mt-12 rounded-lg p-6">
          <h3 className="mb-2 text-lg font-semibold">开发说明</h3>
          <p className="text-muted-foreground text-sm">
            这些演示页面用于展示组件功能、测试新特性和验证样式系统。
            如果您是开发者，可以参考这些页面的实现来了解组件的使用方法。
          </p>
        </div>
      </div>
    </div>
  );
}
