'use client';

import React from 'react';
import { Sidebar, ResponsiveSidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Menu, Settings, LogOut } from 'lucide-react';

export default function SidebarDemoPage() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // 示例用户数据
  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    // avatar: '/logo/avatar-placeholder.png', // 暂时注释掉，使用默认图标
  };

  // 示例导航配置
  const navigation = [
    {
      title: '主要功能',
      items: [
        {
          title: '首页',
          href: '/',
          icon: <div className="h-4 w-4 rounded bg-blue-500" />,
        },
        {
          title: '课程管理',
          href: '/courses',
          icon: <div className="h-4 w-4 rounded bg-green-500" />,
          badge: 12,
          children: [
            { title: '所有课程', href: '/courses/all' },
            { title: '我的课程', href: '/courses/mine' },
            { title: '课程分析', href: '/courses/analytics' },
          ],
        },
        {
          title: '知识宇宙',
          href: '/knowledge-universe',
          icon: <div className="h-4 w-4 rounded bg-purple-500" />,
        },
        {
          title: '仪表板',
          href: '/dashboard',
          icon: <div className="h-4 w-4 rounded bg-orange-500" />,
          badge: 'NEW',
        },
      ],
    },
    {
      title: '工具与设置',
      items: [
        {
          title: '用户管理',
          href: '/users',
          icon: <div className="h-4 w-4 rounded bg-red-500" />,
          children: [
            { title: '用户列表', href: '/users/list' },
            { title: '权限管理', href: '/users/permissions' },
            { title: '角色设置', href: '/users/roles' },
          ],
        },
        {
          title: '系统设置',
          href: '/settings',
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];

  // 底部操作区域
  const footer = (
    <div className="space-y-2">
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <Settings className="mr-2 h-4 w-4" />
        设置
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-red-600"
      >
        <LogOut className="mr-2 h-4 w-4" />
        退出登录
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* 桌面端侧边栏 */}
        <div className="hidden md:block">
          <Sidebar
            isCollapsed={isCollapsed}
            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            user={user}
            navigation={navigation}
            footer={footer}
            variant="default"
            width="md"
            showToggle={true}
          />
        </div>

        {/* 移动端侧边栏 */}
        <ResponsiveSidebar
          isOpen={isMobileOpen}
          onOpenChange={setIsMobileOpen}
          user={user}
          navigation={navigation}
          footer={footer}
          variant="default"
          width="md"
        />

        {/* 主内容区域 */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 顶部栏 */}
          <header className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">侧边栏演示</h1>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">演示模式</Badge>
              </div>
            </div>
          </header>

          {/* 主内容 */}
          <main className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>侧边栏组件演示</CardTitle>
                  <CardDescription>
                    展示可折叠侧边栏组件的各种功能和状态
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-medium">桌面端功能</h3>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        <li>• 可折叠/展开侧边栏</li>
                        <li>• 多级导航菜单</li>
                        <li>• 用户信息显示</li>
                        <li>• 徽章和通知</li>
                        <li>• 自定义底部区域</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">移动端功能</h3>
                      <ul className="text-muted-foreground space-y-1 text-sm">
                        <li>• 响应式抽屉模式</li>
                        <li>• 触摸友好的交互</li>
                        <li>• 遮罩层背景</li>
                        <li>• 平滑动画效果</li>
                        <li>• 自动适配屏幕尺寸</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="mb-2 font-medium">控制按钮</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:inline-flex"
                      >
                        {isCollapsed ? '展开' : '折叠'} 侧边栏
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMobileOpen(true)}
                        className="md:hidden"
                      >
                        打开侧边栏
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>组件特性</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-600">✅ 已实现</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 可折叠侧边栏</li>
                        <li>• 多级导航菜单</li>
                        <li>• 响应式设计</li>
                        <li>• 用户信息展示</li>
                        <li>• 徽章和通知</li>
                        <li>• 自定义样式变体</li>
                        <li>• 状态持久化</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-600">🎨 样式特性</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 平滑动画过渡</li>
                        <li>• 深色模式支持</li>
                        <li>• 可自定义宽度</li>
                        <li>• 多种变体样式</li>
                        <li>• 图标和徽章</li>
                        <li>• 滚动区域</li>
                        <li>• 分组导航</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-purple-600">
                        ⚡ 交互特性
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 键盘导航支持</li>
                        <li>• 触摸手势</li>
                        <li>• 自动收起</li>
                        <li>• 路由高亮</li>
                        <li>• 点击外部关闭</li>
                        <li>• 可访问性支持</li>
                        <li>• 自定义事件</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
