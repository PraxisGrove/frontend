import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  BackgroundBeams,
  AnimatedContainer,
  GlassCard,
  GradientText,
  ReactBitButton,
  ReactBitCard,
  ReactBitText,
  ReactBitSpinner,
} from '@/components/unified';

const meta: Meta = {
  title: 'Unified Components/组件库集成展示',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '展示 shadcn/ui、Aceternity UI 和 ReactBit UI 三个组件库的完美集成',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// shadcn/ui 基础组件展示
export const ShadcnUIComponents: Story = {
  name: 'shadcn/ui 基础组件',
  render: () => (
    <div className="space-y-6 p-8">
      <h2 className="mb-4 text-2xl font-bold">shadcn/ui 基础组件</h2>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>登录表单</CardTitle>
          <CardDescription>使用 shadcn/ui 基础组件构建</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="请输入邮箱" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input id="password" type="password" placeholder="请输入密码" />
          </div>
          <Button className="w-full">登录</Button>
        </CardContent>
      </Card>
    </div>
  ),
};

// Aceternity UI 动画组件展示
export const AceternityUIComponents: Story = {
  name: 'Aceternity UI 动画组件',
  render: () => (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="relative z-10 space-y-6 p-8">
        <AnimatedContainer animation="slideUp">
          <GradientText className="mb-6 text-3xl font-bold">
            Aceternity UI 动画效果
          </GradientText>
        </AnimatedContainer>

        <AnimatedContainer animation="fadeIn" delay={0.2}>
          <GlassCard className="max-w-md p-6">
            <h3 className="mb-4 text-xl font-semibold">玻璃效果卡片</h3>
            <p className="text-muted-foreground mb-4">
              这是一个具有玻璃效果的卡片，背景有光束动画效果。
            </p>
            <Button>了解更多</Button>
          </GlassCard>
        </AnimatedContainer>
      </div>
    </div>
  ),
};

// ReactBit UI 高级动画展示
const ReactBitUIComponentsContent = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-6 p-8">
      <ReactBitText
        variant="typewriter"
        speed={100}
        className="text-2xl font-bold"
      >
        ReactBit UI 高级动画组件
      </ReactBitText>

      <ReactBitCard
        variant="glass"
        animation="tilt"
        interactive={true}
        className="max-w-md p-6"
      >
        <h3 className="mb-4 text-xl font-semibold">3D 倾斜卡片</h3>
        <p className="text-muted-foreground mb-4">
          鼠标悬停时会产生 3D 倾斜效果，提供沉浸式的交互体验。
        </p>

        <div className="space-y-4">
          <ReactBitButton
            animation="ripple"
            variant="default"
            onClick={handleClick}
            loading={loading}
            className="w-full"
          >
            {loading ? '加载中...' : '涟漪效果按钮'}
          </ReactBitButton>

          {loading && (
            <div className="flex justify-center">
              <ReactBitSpinner
                variant="wave"
                size="md"
                color="hsl(var(--primary))"
              />
            </div>
          )}
        </div>
      </ReactBitCard>
    </div>
  );
};

export const ReactBitUIComponents: Story = {
  name: 'ReactBit UI 高级动画',
  render: () => <ReactBitUIComponentsContent />,
};

// 组合使用展示
export const CombinedComponents: Story = {
  name: '组合使用展示',
  render: () => (
    <div className="relative min-h-screen">
      <BackgroundBeams />
      <div className="relative z-10 p-8">
        <AnimatedContainer animation="slideUp" className="mb-8 text-center">
          <GradientText className="mb-4 text-3xl font-bold">
            三库完美融合
          </GradientText>
          <p className="text-muted-foreground text-lg">
            shadcn/ui + Aceternity UI + ReactBit UI
          </p>
        </AnimatedContainer>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* shadcn/ui 基础 + Aceternity UI 动画 */}
          <AnimatedContainer animation="fadeIn" delay={0.1}>
            <GlassCard className="p-6">
              <h3 className="mb-3 text-lg font-semibold">基础 + 动画</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                shadcn/ui 的可访问性与 Aceternity UI 的视觉效果结合
              </p>
              <Card className="p-4">
                <Label htmlFor="demo1">示例输入</Label>
                <Input id="demo1" placeholder="输入内容" className="mt-2" />
                <Button className="mt-3 w-full">提交</Button>
              </Card>
            </GlassCard>
          </AnimatedContainer>

          {/* Aceternity UI + ReactBit UI */}
          <AnimatedContainer animation="fadeIn" delay={0.2}>
            <ReactBitCard variant="elevated" animation="hover" className="p-6">
              <h3 className="mb-3 text-lg font-semibold">动画 + 交互</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Aceternity UI 的视觉效果与 ReactBit UI 的交互动画
              </p>
              <GradientText className="text-center text-lg font-medium">
                悬停查看效果
              </GradientText>
            </ReactBitCard>
          </AnimatedContainer>

          {/* 三库完美结合 */}
          <AnimatedContainer animation="fadeIn" delay={0.3}>
            <GlassCard className="p-6">
              <h3 className="mb-3 text-lg font-semibold">完美融合</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                三个组件库的优势完美结合使用
              </p>
              <ReactBitButton
                animation="magnetic"
                variant="default"
                className="w-full"
              >
                <GradientText>磁性效果按钮</GradientText>
              </ReactBitButton>
            </GlassCard>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  ),
};

// 性能对比展示
const PerformanceComparisonContent = () => {
  const [animationEnabled, setAnimationEnabled] = React.useState(true);

  return (
    <div className="space-y-6 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">性能对比展示</h2>
        <div className="flex items-center space-x-2">
          <Label htmlFor="animation-toggle">启用动画</Label>
          <input
            id="animation-toggle"
            type="checkbox"
            checked={animationEnabled}
            onChange={(e) => setAnimationEnabled(e.target.checked)}
            className="h-4 w-4"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">静态组件 (高性能)</h3>
          <div className="space-y-3">
            <Button variant="default">普通按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">动画组件 (视觉效果)</h3>
          <div className="space-y-3">
            {animationEnabled ? (
              <>
                <ReactBitButton animation="ripple" variant="default">
                  涟漪按钮
                </ReactBitButton>
                <ReactBitButton animation="glow" variant="outline">
                  发光按钮
                </ReactBitButton>
                <ReactBitButton animation="magnetic" variant="ghost">
                  磁性按钮
                </ReactBitButton>
              </>
            ) : (
              <>
                <Button variant="default">涟漪按钮 (静态)</Button>
                <Button variant="outline">发光按钮 (静态)</Button>
                <Button variant="ghost">磁性按钮 (静态)</Button>
              </>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">性能建议</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>• 基础交互使用 shadcn/ui 组件，确保可访问性和性能</li>
          <li>• 需要视觉吸引力时添加 Aceternity UI 动画效果</li>
          <li>• 特殊交互需求使用 ReactBit UI 高级动画</li>
          <li>• 在低性能设备上自动禁用复杂动画</li>
          <li>• 遵循用户的减少动画偏好设置</li>
        </ul>
      </Card>
    </div>
  );
};

export const PerformanceComparison: Story = {
  name: '性能对比',
  render: () => <PerformanceComparisonContent />,
};
