'use client';

import React from 'react';
import { Logo, BrandLogo, LoadingLogo } from '@/components/layout/logo';
import { PageContainer } from '@/components/layout/layout-container';
import { Grid, GridItem } from '@/components/layout/grid-system';
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
  Palette,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Download,
  Copy,
  Check,
} from 'lucide-react';

export default function LogoDemoPage() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const logoSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
  const logoVariants = [
    'default',
    'icon-only',
    'text-only',
    'stacked',
    'horizontal',
  ] as const;

  return (
    <PageContainer
      title="Logo 组件演示"
      description="展示 PraxisGrove 品牌 Logo 的各种变体和使用方式"
      actions={
        <div className="flex gap-2">
          <Badge variant="secondary">品牌资源</Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            {darkMode ? '浅色模式' : '深色模式'}
          </Button>
        </div>
      }
      className={darkMode ? 'dark' : ''}
      animated
    >
      <div className="space-y-8">
        {/* 主品牌展示 */}
        <Card>
          <CardHeader>
            <CardTitle>主品牌标识</CardTitle>
            <CardDescription>
              PraxisGrove 的主要品牌标识，包含完整的品牌信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 py-12 dark:from-gray-900 dark:to-gray-800">
              <BrandLogo size="2xl" showTagline={true} animated={true} />
            </div>
          </CardContent>
        </Card>

        {/* Logo 尺寸展示 */}
        <Card>
          <CardHeader>
            <CardTitle>Logo 尺寸</CardTitle>
            <CardDescription>
              不同尺寸的 Logo 展示，适用于各种使用场景
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid
              cols={{ xs: 2, sm: 3, md: 6 }}
              gap="lg"
              className="items-center"
            >
              {logoSizes.map((size) => (
                <GridItem key={size}>
                  <div className="space-y-3 rounded-lg border p-4 text-center">
                    <Logo
                      size={size}
                      variant="default"
                      animated={true}
                      darkMode={darkMode}
                    />
                    <div className="text-sm">
                      <div className="font-medium">{size.toUpperCase()}</div>
                      <div className="text-xs text-muted-foreground">
                        {size === 'xs' && '16x16'}
                        {size === 'sm' && '24x24'}
                        {size === 'md' && '32x32'}
                        {size === 'lg' && '40x40'}
                        {size === 'xl' && '48x48'}
                        {size === '2xl' && '64x64'}
                      </div>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Logo 变体展示 */}
        <Card>
          <CardHeader>
            <CardTitle>Logo 变体</CardTitle>
            <CardDescription>
              不同样式的 Logo 变体，适用于不同的布局需求
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Grid cols={{ xs: 1, sm: 2, lg: 3 }} gap="lg">
              {logoVariants.map((variant) => (
                <GridItem key={variant}>
                  <div className="space-y-4 rounded-lg border p-6 text-center">
                    <div className="flex h-20 items-center justify-center">
                      <Logo
                        size="lg"
                        variant={variant}
                        animated={true}
                        darkMode={darkMode}
                        showText={variant !== 'icon-only'}
                      />
                    </div>
                    <div>
                      <div className="font-medium capitalize">
                        {variant.replace('-', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {variant === 'default' && '默认水平布局'}
                        {variant === 'icon-only' && '仅图标'}
                        {variant === 'text-only' && '仅文字'}
                        {variant === 'stacked' && '垂直堆叠'}
                        {variant === 'horizontal' && '水平排列'}
                      </div>
                    </div>
                  </div>
                </GridItem>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* 使用场景展示 */}
        <Card>
          <CardHeader>
            <CardTitle>使用场景</CardTitle>
            <CardDescription>在不同场景下的 Logo 使用示例</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 导航栏场景 */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium">
                <Monitor className="h-4 w-4" />
                导航栏
              </h4>
              <div className="rounded-lg border bg-background p-4">
                <div className="flex items-center justify-between">
                  <Logo
                    size="md"
                    variant="horizontal"
                    animated={true}
                    darkMode={darkMode}
                  />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      首页
                    </Button>
                    <Button variant="ghost" size="sm">
                      课程
                    </Button>
                    <Button variant="ghost" size="sm">
                      关于
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* 移动端场景 */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium">
                <Smartphone className="h-4 w-4" />
                移动端头部
              </h4>
              <div className="mx-auto max-w-sm rounded-lg border bg-background p-4">
                <div className="flex items-center justify-between">
                  <Logo size="sm" variant="icon-only" animated={true} />
                  <Button variant="ghost" size="sm">
                    菜单
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* 加载状态场景 */}
            <div className="space-y-3">
              <h4 className="font-medium">加载状态</h4>
              <div className="rounded-lg bg-muted p-8">
                <LoadingLogo size="xl" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 代码示例 */}
        <Card>
          <CardHeader>
            <CardTitle>使用示例</CardTitle>
            <CardDescription>Logo 组件的代码使用示例</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">基础 Logo</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopy('<Logo size="md" variant="default" />', 'basic')
                  }
                >
                  {copiedText === 'basic' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<Logo size="md" variant="default" />`}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">品牌标识</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopy(
                      '<BrandLogo size="lg" showTagline={true} />',
                      'brand'
                    )
                  }
                >
                  {copiedText === 'brand' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<BrandLogo size="lg" showTagline={true} />`}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">加载 Logo</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopy('<LoadingLogo size="lg" />', 'loading')
                  }
                >
                  {copiedText === 'loading' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="rounded bg-muted p-4 font-mono text-sm">
                {`<LoadingLogo size="lg" />`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 品牌指南 */}
        <Card>
          <CardHeader>
            <CardTitle>品牌使用指南</CardTitle>
            <CardDescription>Logo 使用的最佳实践和注意事项</CardDescription>
          </CardHeader>
          <CardContent>
            <Grid cols={{ xs: 1, md: 2 }} gap="lg">
              <div className="space-y-4">
                <h4 className="font-medium text-green-600">✅ 推荐做法</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 保持 Logo 周围有足够的留白空间</li>
                  <li>• 在深色背景上使用浅色版本</li>
                  <li>• 根据使用场景选择合适的尺寸</li>
                  <li>• 保持 Logo 的比例不变</li>
                  <li>• 使用官方提供的颜色</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-red-600">❌ 避免做法</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 不要拉伸或压缩 Logo</li>
                  <li>• 不要改变 Logo 的颜色</li>
                  <li>• 不要在复杂背景上使用</li>
                  <li>• 不要添加阴影或特效</li>
                  <li>• 不要将 Logo 放置得过小</li>
                </ul>
              </div>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
