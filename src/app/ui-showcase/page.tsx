'use client';

import React, { useState } from 'react';
import { AceternityThemeProvider } from '@/components/aceternity';
import {
  // shadcn/ui 基础组件
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Progress,
  Separator,

  // Aceternity UI 动画组件
  BackgroundBeams,
  AnimatedContainer,
  GlassCard,
  GradientText,
  PulseGlow,
  FloatingElement,
  CountUp,

  // ReactBit UI 高级动画组件
  ReactBitButton,
  ReactBitCard,
  ReactBitText,
  ReactBitSpinner,
  ReactBitInput,
} from '@/components/unified';

export default function UIShowcasePage() {
  const [activeTab, setActiveTab] = useState('shadcn');
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <AceternityThemeProvider>
      <div className="relative min-h-screen">
        {/* 背景效果 */}
        <BackgroundBeams className="absolute inset-0" />

        <div className="container relative z-10 mx-auto px-4 py-8">
          <AnimatedContainer animation="slideUp" className="mb-12 text-center">
            <GradientText className="mb-4 text-4xl font-bold">
              UI 组件库展示
            </GradientText>
            <p className="text-muted-foreground text-lg">
              shadcn/ui + Aceternity UI + ReactBit UI 完美集成
            </p>
          </AnimatedContainer>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shadcn">shadcn/ui</TabsTrigger>
              <TabsTrigger value="aceternity">Aceternity UI</TabsTrigger>
              <TabsTrigger value="reactbit">ReactBit UI</TabsTrigger>
            </TabsList>

            {/* shadcn/ui 展示 */}
            <TabsContent value="shadcn" className="space-y-6">
              <AnimatedContainer animation="fadeIn" delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      shadcn/ui 基础组件
                      <Badge variant="default">稳定</Badge>
                    </CardTitle>
                    <CardDescription>
                      提供可访问性优先的基础 UI 组件
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱地址</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="请输入邮箱"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="progress">进度条</Label>
                        <Progress value={75} className="w-full" />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">默认按钮</Button>
                      <Button variant="secondary">次要按钮</Button>
                      <Button variant="outline">轮廓按钮</Button>
                      <Button variant="ghost">幽灵按钮</Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </TabsContent>

            {/* Aceternity UI 展示 */}
            <TabsContent value="aceternity" className="space-y-6">
              <AnimatedContainer animation="slideLeft" delay={0.2}>
                <GlassCard className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <GradientText className="text-2xl font-bold">
                      Aceternity UI 动画组件
                    </GradientText>
                    <Badge variant="secondary">动画</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    提供现代化的动画效果和视觉特效
                  </p>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FloatingElement amplitude={5} frequency={3}>
                      <Card className="p-4 text-center">
                        <PulseGlow>
                          <div className="bg-primary mx-auto mb-2 h-12 w-12 rounded-full" />
                        </PulseGlow>
                        <p className="text-sm">浮动效果</p>
                      </Card>
                    </FloatingElement>

                    <Card className="p-4 text-center">
                      <CountUp
                        end={1234}
                        duration={2}
                        className="text-primary text-2xl font-bold"
                      />
                      <p className="mt-2 text-sm">数字动画</p>
                    </Card>

                    <Card className="p-4 text-center">
                      <GradientText className="text-xl font-bold">
                        渐变文字
                      </GradientText>
                      <p className="mt-2 text-sm">文字特效</p>
                    </Card>
                  </div>
                </GlassCard>
              </AnimatedContainer>
            </TabsContent>

            {/* ReactBit UI 展示 */}
            <TabsContent value="reactbit" className="space-y-6">
              <AnimatedContainer animation="slideRight" delay={0.2}>
                <ReactBitCard
                  variant="glass"
                  animation="tilt"
                  interactive={true}
                  className="p-6"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <ReactBitText
                      variant="gradient"
                      className="text-2xl font-bold"
                    >
                      ReactBit UI 高级动画
                    </ReactBitText>
                    <Badge variant="outline">高级</Badge>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    提供精确控制的动画组件和交互效果
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ReactBitInput
                        variant="outlined"
                        animation="glow"
                        label="动画输入框"
                        placeholder="输入时有发光效果"
                      />
                      <div className="flex items-center justify-center">
                        {loading ? (
                          <ReactBitSpinner
                            variant="wave"
                            size="md"
                            color="hsl(var(--primary))"
                          />
                        ) : (
                          <ReactBitText variant="typewriter" speed={100}>
                            打字机效果文本
                          </ReactBitText>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <ReactBitButton
                        animation="ripple"
                        variant="default"
                        onClick={handleAsyncAction}
                        loading={loading}
                      >
                        涟漪效果按钮
                      </ReactBitButton>
                      <ReactBitButton animation="magnetic" variant="outline">
                        磁性效果按钮
                      </ReactBitButton>
                      <ReactBitButton animation="glow" variant="secondary">
                        发光效果按钮
                      </ReactBitButton>
                    </div>
                  </div>
                </ReactBitCard>
              </AnimatedContainer>
            </TabsContent>
          </Tabs>

          {/* 组合使用示例 */}
          <AnimatedContainer animation="slideUp" delay={0.4} className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>组合使用示例</CardTitle>
                <CardDescription>
                  展示如何将三个组件库完美结合使用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* shadcn/ui 基础 + Aceternity UI 动画 */}
                  <AnimatedContainer animation="fadeIn" delay={0.1}>
                    <GlassCard className="p-4">
                      <h3 className="mb-2 font-semibold">基础 + 动画</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        shadcn/ui 基础组件配合 Aceternity UI 动画效果
                      </p>
                      <Button className="w-full">
                        <PulseGlow>动画按钮</PulseGlow>
                      </Button>
                    </GlassCard>
                  </AnimatedContainer>

                  {/* Aceternity UI 动画 + ReactBit UI 交互 */}
                  <AnimatedContainer animation="fadeIn" delay={0.2}>
                    <ReactBitCard
                      variant="elevated"
                      animation="hover"
                      className="p-4"
                    >
                      <h3 className="mb-2 font-semibold">动画 + 交互</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        Aceternity UI 视觉效果配合 ReactBit UI 交互动画
                      </p>
                      <GradientText className="text-center">
                        悬停查看效果
                      </GradientText>
                    </ReactBitCard>
                  </AnimatedContainer>

                  {/* 三库完美结合 */}
                  <AnimatedContainer animation="fadeIn" delay={0.3}>
                    <GlassCard className="p-4">
                      <h3 className="mb-2 font-semibold">完美结合</h3>
                      <p className="text-muted-foreground mb-4 text-sm">
                        三个组件库的优势完美结合
                      </p>
                      <ReactBitButton
                        animation="ripple"
                        variant="default"
                        className="w-full"
                      >
                        <GradientText>完美融合</GradientText>
                      </ReactBitButton>
                    </GlassCard>
                  </AnimatedContainer>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </AceternityThemeProvider>
  );
}
