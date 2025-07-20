'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function ThemeTestPage() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Soft-Pop 主题测试
          </h1>
          <p className="text-muted-foreground text-lg">
            验证所有组件都正确应用了 soft-pop 主题样式
          </p>
        </div>

        {/* 颜色测试 */}
        <Card>
          <CardHeader>
            <CardTitle>颜色系统</CardTitle>
            <CardDescription>主题颜色变量测试</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center">
                Primary
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-4 text-center">
                Secondary
              </div>
              <div className="bg-accent text-accent-foreground rounded-lg p-4 text-center">
                Accent
              </div>
              <div className="bg-muted text-muted-foreground rounded-lg p-4 text-center">
                Muted
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 按钮测试 */}
        <Card>
          <CardHeader>
            <CardTitle>按钮组件</CardTitle>
            <CardDescription>不同变体的按钮样式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </CardContent>
        </Card>

        {/* 表单测试 */}
        <Card>
          <CardHeader>
            <CardTitle>表单组件</CardTitle>
            <CardDescription>输入框和标签样式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">邮箱地址</Label>
                <Input id="email" type="email" placeholder="请输入邮箱" />
              </div>
              <div>
                <Label htmlFor="password">密码</Label>
                <Input id="password" type="password" placeholder="请输入密码" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badge 测试 */}
        <Card>
          <CardHeader>
            <CardTitle>徽章组件</CardTitle>
            <CardDescription>不同状态的徽章样式</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 渐变测试 */}
        <Card>
          <CardHeader>
            <CardTitle>渐变效果</CardTitle>
            <CardDescription>主题渐变色组合</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="from-primary to-secondary flex h-20 items-center justify-center rounded-lg bg-gradient-to-r font-semibold text-white">
                Primary to Secondary
              </div>
              <div className="from-primary to-accent flex h-20 items-center justify-center rounded-lg bg-gradient-to-r font-semibold text-white">
                Primary to Accent
              </div>
              <div className="from-secondary to-accent flex h-20 items-center justify-center rounded-lg bg-gradient-to-r font-semibold text-white">
                Secondary to Accent
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 圆角测试 */}
        <Card>
          <CardHeader>
            <CardTitle>圆角系统</CardTitle>
            <CardDescription>Soft-Pop 主题的大圆角特性</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-card rounded-sm border p-4 text-center">
                rounded-sm
              </div>
              <div className="bg-card rounded-md border p-4 text-center">
                rounded-md
              </div>
              <div className="bg-card rounded-lg border p-4 text-center">
                rounded-lg
              </div>
              <div className="bg-card rounded-xl border p-4 text-center">
                rounded-xl
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
