'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import {
  enhancedToast,
  NotificationCenter,
  NotificationBadge,
  NotificationData,
} from '@/components/ui/enhanced-toast';
import {
  AceternityThemeProvider,
  EnhancedContainer,
  AnimatedContainer,
  AnimatedItem,
} from '@/components/aceternity';
import {
  Bell,
  Mail,
  MessageSquare,
  Settings,
  User,
  Gift,
  Download,
  Upload,
  Heart,
  Star,
} from 'lucide-react';

export default function ToastDemoPage() {
  const [notifications, setNotifications] = React.useState<NotificationData[]>([
    {
      id: '1',
      type: 'system',
      title: '系统更新',
      message: '新版本 v2.1.0 已发布，包含多项性能优化和新功能。',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前
      read: false,
      priority: 'high',
      action: {
        label: '立即更新',
        onClick: () => enhancedToast.info('开始更新...'),
      },
    },
    {
      id: '2',
      type: 'user',
      title: '新用户注册',
      message: '用户 "张三" 刚刚注册了账户。',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15分钟前
      read: false,
      priority: 'medium',
    },
    {
      id: '3',
      type: 'marketing',
      title: '限时优惠',
      message: '双十一活动开始！全场商品8折优惠，仅限今日。',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
      read: true,
      priority: 'low',
      action: {
        label: '查看详情',
        onClick: () => enhancedToast.success('跳转到活动页面'),
      },
    },
    {
      id: '4',
      type: 'security',
      title: '安全警告',
      message: '检测到异常登录尝试，请确认是否为本人操作。',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
      read: true,
      priority: 'urgent',
      action: {
        label: '查看详情',
        onClick: () => enhancedToast.warning('请注意账户安全'),
      },
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 处理通知操作
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    enhancedToast.success('标记为已读');
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    enhancedToast.success('全部标记为已读');
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    enhancedToast.success('通知已删除');
  };

  const handleClear = () => {
    setNotifications([]);
    enhancedToast.success('通知已清空');
  };

  // 模拟异步操作
  const simulateAsyncOperation = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('操作成功') : reject('操作失败');
      }, 2000);
    });

    enhancedToast.promise(promise, {
      loading: '正在处理...',
      success: '操作完成！',
      error: '操作失败，请重试',
    });
  };

  // 添加新通知
  const addNotification = () => {
    const newNotification: NotificationData = {
      id: Date.now().toString(),
      type: 'user',
      title: '新消息',
      message: '您有一条新的私信消息。',
      timestamp: new Date(),
      read: false,
      priority: 'medium',
    };
    setNotifications((prev) => [newNotification, ...prev]);
    enhancedToast.info('收到新通知');
  };

  return (
    <AceternityThemeProvider>
      <div className="bg-background min-h-screen">
        <Toaster />

        <EnhancedContainer className="space-y-16 py-16">
          {/* 标题 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-4 text-center"
          >
            <h1 className="text-foreground text-4xl font-bold md:text-5xl">
              Toast/Notification 组件演示
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              展示现代化的通知系统，包括 Toast 消息、通知中心和徽章组件
            </p>
          </AnimatedContainer>

          {/* 基础 Toast */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">基础 Toast 消息</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">成功消息</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => enhancedToast.success('操作成功！')}
                    className="w-full"
                    variant="outline"
                  >
                    成功提示
                  </Button>
                  <Button
                    onClick={() => enhancedToast.presets.saveSuccess()}
                    className="w-full"
                    variant="outline"
                  >
                    保存成功
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">错误消息</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => enhancedToast.error('操作失败！')}
                    className="w-full"
                    variant="outline"
                  >
                    错误提示
                  </Button>
                  <Button
                    onClick={() => enhancedToast.presets.networkError()}
                    className="w-full"
                    variant="outline"
                  >
                    网络错误
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">警告消息</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => enhancedToast.warning('请注意！')}
                    className="w-full"
                    variant="outline"
                  >
                    警告提示
                  </Button>
                  <Button
                    onClick={() => enhancedToast.presets.permissionDenied()}
                    className="w-full"
                    variant="outline"
                  >
                    权限不足
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 text-center font-semibold">信息消息</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => enhancedToast.info('这是一条信息')}
                    className="w-full"
                    variant="outline"
                  >
                    信息提示
                  </Button>
                  <Button
                    onClick={() =>
                      enhancedToast.loading('加载中...', { duration: 2000 })
                    }
                    className="w-full"
                    variant="outline"
                  >
                    加载提示
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* 高级 Toast */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">高级 Toast 功能</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">带操作按钮</h3>
                <Button
                  onClick={() =>
                    enhancedToast.success('文件已保存', {
                      action: {
                        label: '查看',
                        onClick: () => enhancedToast.info('打开文件'),
                      },
                    })
                  }
                  className="w-full"
                  variant="outline"
                >
                  带操作的提示
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">Promise Toast</h3>
                <Button
                  onClick={simulateAsyncOperation}
                  className="w-full"
                  variant="outline"
                >
                  异步操作
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">自定义图标</h3>
                <Button
                  onClick={() =>
                    enhancedToast.info('这是带自定义图标的消息', {
                      icon: <Heart className="h-5 w-5 text-red-500" />,
                    })
                  }
                  className="w-full"
                  variant="outline"
                >
                  自定义图标
                </Button>
              </Card>
            </div>
          </section>

          {/* 通知徽章 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">通知徽章</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="space-y-2 text-center">
                <NotificationBadge count={unreadCount}>
                  <Button variant="outline" size="lg">
                    <Bell className="mr-2 h-5 w-5" />
                    通知
                  </Button>
                </NotificationBadge>
                <p className="text-muted-foreground text-sm">通知图标</p>
              </div>

              <div className="space-y-2 text-center">
                <NotificationBadge count={5}>
                  <Button variant="outline" size="lg">
                    <Mail className="mr-2 h-5 w-5" />
                    邮件
                  </Button>
                </NotificationBadge>
                <p className="text-muted-foreground text-sm">邮件图标</p>
              </div>

              <div className="space-y-2 text-center">
                <NotificationBadge count={99}>
                  <Button variant="outline" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    消息
                  </Button>
                </NotificationBadge>
                <p className="text-muted-foreground text-sm">消息图标</p>
              </div>

              <div className="space-y-2 text-center">
                <NotificationBadge count={150} max={99}>
                  <Button variant="outline" size="lg">
                    <Star className="mr-2 h-5 w-5" />
                    收藏
                  </Button>
                </NotificationBadge>
                <p className="text-muted-foreground text-sm">超过最大值</p>
              </div>
            </div>
          </section>

          {/* 通知中心 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">通知中心</h2>
            <div className="flex flex-col items-start gap-8 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <Button onClick={addNotification} variant="outline">
                    添加通知
                  </Button>
                  <Button
                    onClick={() =>
                      enhancedToast.info(`当前有 ${unreadCount} 条未读通知`)
                    }
                    variant="outline"
                  >
                    查看未读数量
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  通知中心展示了不同类型的通知消息，支持标记已读、删除和批量操作。
                </p>
              </div>

              <div className="w-full lg:w-auto">
                <NotificationCenter
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onDelete={handleDelete}
                  onClear={handleClear}
                />
              </div>
            </div>
          </section>

          {/* 特性说明 */}
          <section className="space-y-8">
            <Card className="bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-xl font-bold">
                Toast/Notification 组件特性
              </h2>
              <div className="mx-auto grid max-w-4xl gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-primary font-medium">🎨 多种类型</h4>
                  <p className="text-muted-foreground text-sm">
                    支持成功、错误、警告、信息等多种消息类型
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">⚡ 现代化</h4>
                  <p className="text-muted-foreground text-sm">
                    基于 Sonner 的现代化 Toast 库
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🔧 易于使用</h4>
                  <p className="text-muted-foreground text-sm">
                    简单的 API 和预设的常用消息
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🎭 动画效果</h4>
                  <p className="text-muted-foreground text-sm">
                    流畅的进入和退出动画效果
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">📱 响应式</h4>
                  <p className="text-muted-foreground text-sm">
                    完美适配移动端和桌面端
                  </p>
                </div>
                <div>
                  <h4 className="text-primary font-medium">🔔 通知中心</h4>
                  <p className="text-muted-foreground text-sm">
                    完整的通知管理系统
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </EnhancedContainer>
      </div>
    </AceternityThemeProvider>
  );
}
