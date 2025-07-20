'use client';

import { SvgLogo, DownloadableSvgLogo } from '@/components/layout/svg-logo';

export default function SvgTestPage() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-foreground text-4xl font-bold">
          SVG Logo 水合测试
        </h1>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">多个 SVG Logo 实例测试</h2>
            <p className="text-muted-foreground">
              测试多个 SVG Logo 组件是否会产生 ID 冲突和水合不匹配错误
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-4 text-center">
                <SvgLogo variant="icon" size="lg" />
                <p className="mt-2 text-sm">图标 1</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <SvgLogo variant="icon" size="lg" />
                <p className="mt-2 text-sm">图标 2</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <SvgLogo variant="text" size="md" />
                <p className="mt-2 text-sm">文字 1</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <SvgLogo variant="text" size="md" />
                <p className="mt-2 text-sm">文字 2</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">完整 Logo 测试</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-6 text-center">
                <SvgLogo variant="full" size="lg" />
                <p className="mt-4 text-sm">完整 Logo 1</p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <SvgLogo variant="full" size="lg" />
                <p className="mt-4 text-sm">完整 Logo 2</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">下载功能测试</h2>
            <p className="text-muted-foreground">
              测试下载功能是否正常工作，不会产生水合错误
            </p>
            <DownloadableSvgLogo size="md" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">颜色变体测试</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border bg-white p-4 text-center">
                <SvgLogo variant="icon" size="lg" color="primary" />
                <p className="mt-2 text-sm">主色调</p>
              </div>
              <div className="rounded-lg border bg-gray-900 p-4 text-center">
                <SvgLogo variant="icon" size="lg" color="white" />
                <p className="mt-2 text-sm text-white">白色</p>
              </div>
              <div className="rounded-lg border bg-gray-100 p-4 text-center">
                <SvgLogo variant="icon" size="lg" color="black" />
                <p className="mt-2 text-sm">黑色</p>
              </div>
              <div className="bg-muted/50 rounded-lg border p-4 text-center">
                <SvgLogo
                  variant="icon"
                  size="lg"
                  color="custom"
                  customColor="#10b981"
                />
                <p className="mt-2 text-sm">自定义绿色</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="mb-2 font-medium text-green-800">✅ 修复说明</h3>
            <ul className="space-y-1 text-sm text-green-700">
              <li>
                • 使用 React 18 的 useId() 钩子生成唯一
                ID，确保服务端和客户端一致
              </li>
              <li>• 移除了嵌套 SVG 结构，避免无效的 DOM 结构</li>
              <li>• 使用纯函数生成 SVG 字符串，避免 DOM 查询</li>
              <li>• 添加客户端检查，确保下载功能只在浏览器中执行</li>
              <li>• 为每个 SVG 渐变定义唯一 ID，避免 ID 冲突</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
