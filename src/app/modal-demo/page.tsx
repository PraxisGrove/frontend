'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  EnhancedModal,
  EnhancedDrawer,
  ConfirmDialog,
} from '@/components/ui/enhanced-modal';
import {
  QuickModal,
  QuickDrawer,
  QuickConfirm,
  ModalManager,
  useModal,
} from '@/components/ui/modal-manager';
import {
  AceternityThemeProvider,
  EnhancedContainer,
  AnimatedContainer,
  AnimatedItem,
} from '@/components/aceternity';
import { Settings, Menu, Trash2, Edit, Plus } from 'lucide-react';

export default function ModalDemoPage() {
  const { openModal, openDrawer, openConfirm } = useModal();

  // 示例表单内容
  const FormContent = () => (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">用户名</label>
        <Input placeholder="请输入用户名" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">邮箱</label>
        <Input type="email" placeholder="请输入邮箱" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">密码</label>
        <Input type="password" placeholder="请输入密码" />
      </div>
    </div>
  );

  // 示例设置内容
  const SettingsContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">通用设置</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>启用通知</span>
            <Button variant="outline" size="sm">
              开启
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>自动保存</span>
            <Button variant="outline" size="sm">
              开启
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">外观设置</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>深色模式</span>
            <Button variant="outline" size="sm">
              切换
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span>紧凑布局</span>
            <Button variant="outline" size="sm">
              关闭
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AceternityThemeProvider>
      <div className="min-h-screen bg-background">
        <ModalManager />

        <EnhancedContainer className="space-y-16 py-16">
          {/* 标题 */}
          <AnimatedContainer
            animation="slideDown"
            className="space-y-4 text-center"
          >
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              Modal/Dialog/Drawer 组件演示
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              展示增强的模态框、对话框和抽屉组件，集成 Aceternity UI 动画效果
            </p>
          </AnimatedContainer>

          {/* 基础模态框 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">基础模态框</h2>
            <AnimatedContainer
              containerAnimation="staggerSlideUp"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatedItem>
                <Card className="p-6">
                  <h3 className="mb-4 font-semibold">不同尺寸</h3>
                  <div className="space-y-3">
                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          小尺寸模态框
                        </Button>
                      }
                      title="小尺寸模态框"
                      description="这是一个小尺寸的模态框示例"
                      size="sm"
                    >
                      <p className="text-muted-foreground">
                        这是小尺寸模态框的内容区域。
                      </p>
                    </QuickModal>

                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          中等尺寸模态框
                        </Button>
                      }
                      title="中等尺寸模态框"
                      description="这是一个中等尺寸的模态框示例"
                      size="md"
                    >
                      <FormContent />
                    </QuickModal>

                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          大尺寸模态框
                        </Button>
                      }
                      title="大尺寸模态框"
                      description="这是一个大尺寸的模态框示例"
                      size="lg"
                    >
                      <SettingsContent />
                    </QuickModal>
                  </div>
                </Card>
              </AnimatedItem>

              <AnimatedItem>
                <Card className="p-6">
                  <h3 className="mb-4 font-semibold">动画效果</h3>
                  <div className="space-y-3">
                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          淡入效果
                        </Button>
                      }
                      title="淡入动画"
                      animation="fade"
                    >
                      <p className="text-muted-foreground">
                        使用淡入淡出动画效果。
                      </p>
                    </QuickModal>

                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          缩放效果
                        </Button>
                      }
                      title="缩放动画"
                      animation="scale"
                    >
                      <p className="text-muted-foreground">
                        使用缩放动画效果。
                      </p>
                    </QuickModal>

                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          弹跳效果
                        </Button>
                      }
                      title="弹跳动画"
                      animation="bounce"
                    >
                      <p className="text-muted-foreground">
                        使用弹跳动画效果。
                      </p>
                    </QuickModal>
                  </div>
                </Card>
              </AnimatedItem>

              <AnimatedItem>
                <Card className="p-6">
                  <h3 className="mb-4 font-semibold">带操作按钮</h3>
                  <div className="space-y-3">
                    <QuickModal
                      trigger={
                        <Button variant="outline" className="w-full">
                          用户注册
                        </Button>
                      }
                      title="用户注册"
                      description="请填写以下信息完成注册"
                      footer={
                        <div className="flex justify-end gap-3">
                          <Button variant="outline">取消</Button>
                          <Button>注册</Button>
                        </div>
                      }
                    >
                      <FormContent />
                    </QuickModal>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        openModal({
                          id: 'managed-modal',
                          title: '状态管理模态框',
                          description: '这个模态框通过状态管理器控制',
                          content: (
                            <p className="text-muted-foreground">
                              这是通过状态管理器打开的模态框。
                            </p>
                          ),
                          size: 'md',
                          animation: 'slide-up',
                        })
                      }
                    >
                      状态管理模态框
                    </Button>
                  </div>
                </Card>
              </AnimatedItem>
            </AnimatedContainer>
          </section>

          {/* 抽屉组件 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">抽屉组件</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <h3 className="mb-4 font-semibold">右侧抽屉</h3>
                <QuickDrawer
                  trigger={
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                    </Button>
                  }
                  title="系统设置"
                  description="管理您的系统偏好设置"
                  side="right"
                  size="md"
                  footer={
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        重置
                      </Button>
                      <Button className="flex-1">保存</Button>
                    </div>
                  }
                >
                  <SettingsContent />
                </QuickDrawer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">左侧抽屉</h3>
                <QuickDrawer
                  trigger={
                    <Button variant="outline" className="w-full">
                      <Menu className="mr-2 h-4 w-4" />
                      菜单
                    </Button>
                  }
                  title="导航菜单"
                  side="left"
                  size="sm"
                >
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      首页
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      课程
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      知识宇宙
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      仪表板
                    </Button>
                  </div>
                </QuickDrawer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">顶部抽屉</h3>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    openDrawer({
                      id: 'top-drawer',
                      title: '通知中心',
                      description: '查看最新的系统通知',
                      side: 'top',
                      size: 'md',
                      content: (
                        <div className="space-y-3">
                          <div className="rounded-lg border p-3">
                            <p className="font-medium">系统更新</p>
                            <p className="text-sm text-muted-foreground">
                              新版本已发布
                            </p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <p className="font-medium">新消息</p>
                            <p className="text-sm text-muted-foreground">
                              您有3条未读消息
                            </p>
                          </div>
                        </div>
                      ),
                    })
                  }
                >
                  通知中心
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold">底部抽屉</h3>
                <QuickDrawer
                  trigger={
                    <Button variant="outline" className="w-full">
                      操作面板
                    </Button>
                  }
                  title="快速操作"
                  side="bottom"
                  size="sm"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1 h-4 w-4" />
                      新建
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-4 w-4" />
                      编辑
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="mr-1 h-4 w-4" />
                      删除
                    </Button>
                  </div>
                </QuickDrawer>
              </Card>
            </div>
          </section>

          {/* 确认对话框 */}
          <section className="space-y-8">
            <h2 className="text-center text-2xl font-bold">确认对话框</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <QuickConfirm
                trigger={<Button variant="outline">普通确认</Button>}
                title="确认操作"
                description="您确定要执行此操作吗？"
                onConfirm={() => console.log('确认操作')}
              />

              <QuickConfirm
                trigger={<Button variant="destructive">删除确认</Button>}
                title="删除确认"
                description="此操作不可撤销，您确定要删除吗？"
                variant="destructive"
                confirmText="删除"
                onConfirm={() => console.log('删除操作')}
              />

              <Button
                variant="outline"
                onClick={() =>
                  openConfirm({
                    id: 'custom-confirm',
                    title: '自定义确认',
                    description: '这是一个通过状态管理器打开的确认对话框',
                    confirmText: '继续',
                    cancelText: '取消',
                    onConfirm: () => console.log('自定义确认'),
                  })
                }
              >
                状态管理确认
              </Button>
            </div>
          </section>

          {/* 特性说明 */}
          <section className="space-y-8">
            <Card className="bg-muted/50 p-8 text-center">
              <h2 className="mb-4 text-xl font-bold">组件特性</h2>
              <div className="mx-auto grid max-w-4xl gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="font-medium text-primary">🎨 多种样式</h4>
                  <p className="text-sm text-muted-foreground">
                    支持多种尺寸、动画效果和布局方向
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">⚡ 高性能</h4>
                  <p className="text-sm text-muted-foreground">
                    基于 Framer Motion 的流畅动画效果
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">🔧 易于使用</h4>
                  <p className="text-sm text-muted-foreground">
                    提供快捷组件和状态管理两种使用方式
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">♿ 无障碍</h4>
                  <p className="text-sm text-muted-foreground">
                    完整的键盘导航和屏幕阅读器支持
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">📱 响应式</h4>
                  <p className="text-sm text-muted-foreground">
                    完美适配移动端和桌面端设备
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">🎯 类型安全</h4>
                  <p className="text-sm text-muted-foreground">
                    完整的 TypeScript 类型定义
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
