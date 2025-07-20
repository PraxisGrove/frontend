'use client';

import React from 'react';
import {
  Logo,
  BrandLogo,
  LoadingLogo,
  FaviconInfo,
} from '@/components/layout/logo';
import { SvgLogo, DownloadableSvgLogo } from '@/components/layout/svg-logo';
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
import { Smartphone, Monitor, Sun, Moon, Copy, Check } from 'lucide-react';

export default function LogoDemoPage() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);
  const { faviconFiles } = FaviconInfo();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const logoSizes = [
    { name: 'sm', label: '小号', description: '适用于导航栏、按钮等' },
    { name: 'md', label: '中号', description: '适用于卡片、列表项等' },
    { name: 'lg', label: '大号', description: '适用于页面标题、横幅等' },
    { name: 'xl', label: '超大', description: '适用于首页、品牌展示等' },
  ] as const;

  const logoVariants = [
    { name: 'default', label: '默认', description: '图标 + 文字的标准组合' },
    { name: 'icon-only', label: '仅图标', description: '只显示图标部分' },
    { name: 'text-only', label: '仅文字', description: '只显示文字部分' },
    { name: 'stacked', label: '垂直', description: '图标在上，文字在下' },
    { name: 'horizontal', label: '水平', description: '图标在左，文字在右' },
  ] as const;

  const codeExamples = {
    basic: `<Logo size="lg" variant="default" />`,
    brand: `<BrandLogo size="xl" showTagline={true} />`,
    loading: `<LoadingLogo size="md" />`,
    svg: `<SvgLogo variant="full" size="lg" color="primary" />`,
  };

  return (
    <PageContainer>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'dark bg-gray-900' : 'bg-background'
        }`}
      >
        <div className="container mx-auto space-y-8 px-4 py-8">
          {/* 页面标题 */}
          <div className="space-y-4 text-center">
            <h1 className="text-foreground text-4xl font-bold">
              Logo 组件演示
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              展示 PraxisGrove 品牌 Logo 的各种变体、尺寸和使用场景。 包括 CSS
              渐变 Logo、SVG 矢量 Logo 和 Favicon 资源。
            </p>

            {/* 主题切换 */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {darkMode ? '浅色模式' : '深色模式'}
              </Button>
            </div>
          </div>

          {/* Logo 尺寸演示 */}
          <Card>
            <CardHeader>
              <CardTitle>Logo 尺寸</CardTitle>
              <CardDescription>
                Logo 组件支持多种预设尺寸，适用于不同的使用场景
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={{ xs: 1, sm: 2, lg: 4 }} gap="lg">
                {logoSizes.map((size) => (
                  <GridItem key={size.name}>
                    <div className="space-y-4 rounded-lg border p-6 text-center">
                      <Logo size={size.name} variant="default" />
                      <div>
                        <Badge variant="secondary">{size.label}</Badge>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {size.description}
                        </p>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Logo 变体演示 */}
          <Card>
            <CardHeader>
              <CardTitle>Logo 变体</CardTitle>
              <CardDescription>
                不同的 Logo 变体适用于不同的布局和空间限制
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Grid cols={{ xs: 1, md: 2, lg: 3 }} gap="lg">
                {logoVariants.map((variant) => (
                  <GridItem key={variant.name}>
                    <div className="space-y-4 rounded-lg border p-6 text-center">
                      <div className="flex h-16 items-center justify-center">
                        <Logo size="lg" variant={variant.name} />
                      </div>
                      <div>
                        <Badge variant="outline">{variant.label}</Badge>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {variant.description}
                        </p>
                      </div>
                    </div>
                  </GridItem>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* 品牌 Logo */}
          <Card>
            <CardHeader>
              <CardTitle>品牌 Logo</CardTitle>
              <CardDescription>
                用于品牌展示的完整 Logo，包含标语和描述信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center dark:from-blue-950/20 dark:to-purple-950/20">
                  <BrandLogo size="xl" showTagline={true} />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border p-6 text-center">
                    <BrandLogo size="lg" showTagline={false} />
                    <p className="text-muted-foreground mt-4 text-sm">
                      不带标语的品牌 Logo
                    </p>
                  </div>
                  <div className="rounded-lg border p-6 text-center">
                    <LoadingLogo size="lg" />
                    <p className="text-muted-foreground mt-4 text-sm">
                      带动画效果的加载 Logo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 设备适配演示 */}
          <Card>
            <CardHeader>
              <CardTitle>设备适配</CardTitle>
              <CardDescription>
                Logo 在不同设备和屏幕尺寸下的显示效果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">桌面端</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg border p-6">
                      <Logo size="xl" variant="horizontal" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <span className="font-medium">移动端</span>
                    </div>
                    <div className="bg-muted/50 rounded-lg border p-6">
                      <Logo size="md" variant="stacked" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SVG Logo 组件 */}
          <Card>
            <CardHeader>
              <CardTitle>SVG Logo 组件</CardTitle>
              <CardDescription>
                矢量图形 Logo，支持无损缩放和自定义颜色
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* SVG Logo 变体展示 */}
                <div className="space-y-4">
                  <h4 className="font-medium">Logo 变体</h4>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2 text-center">
                      <div className="bg-muted/50 rounded-lg border p-6">
                        <SvgLogo variant="icon" size="xl" />
                      </div>
                      <Badge variant="secondary">图标模式</Badge>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="bg-muted/50 rounded-lg border p-6">
                        <SvgLogo variant="text" size="lg" />
                      </div>
                      <Badge variant="secondary">文字模式</Badge>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="bg-muted/50 rounded-lg border p-6">
                        <SvgLogo variant="full" size="md" />
                      </div>
                      <Badge variant="secondary">完整模式</Badge>
                    </div>
                  </div>
                </div>

                {/* 颜色变体 */}
                <div className="space-y-4">
                  <h4 className="font-medium">颜色变体</h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="space-y-2 text-center">
                      <div className="rounded-lg border bg-white p-4">
                        <SvgLogo variant="icon" size="lg" color="primary" />
                      </div>
                      <span className="text-xs">主色调</span>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="rounded-lg border bg-gray-900 p-4">
                        <SvgLogo variant="icon" size="lg" color="white" />
                      </div>
                      <span className="text-xs">白色</span>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="rounded-lg border bg-gray-100 p-4">
                        <SvgLogo variant="icon" size="lg" color="black" />
                      </div>
                      <span className="text-xs">黑色</span>
                    </div>
                    <div className="space-y-2 text-center">
                      <div className="bg-muted/50 rounded-lg border p-4">
                        <SvgLogo
                          variant="icon"
                          size="lg"
                          color="custom"
                          customColor="#10b981"
                        />
                      </div>
                      <span className="text-xs">自定义</span>
                    </div>
                  </div>
                </div>

                {/* 下载功能 */}
                <div className="space-y-4">
                  <h4 className="font-medium">下载 SVG 文件</h4>
                  <DownloadableSvgLogo size="md" />
                  <div className="text-muted-foreground text-sm">
                    点击按钮下载对应的 SVG 文件，可用于印刷品、网站或应用开发。
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favicon 和图标资源 */}
          <Card>
            <CardHeader>
              <CardTitle>Favicon 和图标资源</CardTitle>
              <CardDescription>
                网站图标和应用图标文件，用于浏览器标签页、书签、移动设备等
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {faviconFiles.map((file) => (
                  <div
                    key={file.name}
                    className="space-y-3 rounded-lg border p-4"
                  >
                    <div className="bg-muted flex h-16 items-center justify-center rounded">
                      {file.path.endsWith('.png') ||
                      file.path.endsWith('.ico') ? (
                        <img
                          src={file.path}
                          alt={file.name}
                          className="max-h-12 max-w-12"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              'none';
                          }}
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs">
                          JSON
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {file.description}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => window.open(file.path, '_blank')}
                      >
                        查看文件
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
                <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-100">
                  📝 技术说明
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  这些 favicon 文件通过 Next.js 的 metadata API 在{' '}
                  <code>layout.tsx</code> 中配置， 无需手动添加 &lt;link&gt;
                  标签。Web App Manifest 支持 PWA 功能。
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 代码示例 */}
          <Card>
            <CardHeader>
              <CardTitle>代码示例</CardTitle>
              <CardDescription>
                常用的 Logo 组件使用方法和代码示例
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(codeExamples).map(([key, code]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium capitalize">{key} Logo</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(code, key)}
                        className="h-8 px-2"
                      >
                        {copiedText === key ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <pre className="bg-muted overflow-x-auto rounded p-3 text-sm">
                      <code>{code}</code>
                    </pre>
                  </div>
                ))}
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
      </div>
    </PageContainer>
  );
}
