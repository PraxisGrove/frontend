import { Logo, BrandLogo, LoadingLogo } from '@/components/layout/logo';

export default function LogoTestPage() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-foreground text-4xl font-bold">Logo 测试页面</h1>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">基础 Logo 测试</h2>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Logo size="sm" variant="default" />
              <Logo size="md" variant="default" />
              <Logo size="lg" variant="default" />
              <Logo size="xl" variant="default" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Logo 变体测试</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <Logo size="lg" variant="icon-only" />
                <p className="mt-2 text-sm">仅图标</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Logo size="lg" variant="text-only" />
                <p className="mt-2 text-sm">仅文字</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Logo size="lg" variant="stacked" />
                <p className="mt-2 text-sm">垂直堆叠</p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <Logo size="lg" variant="horizontal" />
                <p className="mt-2 text-sm">水平排列</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">品牌 Logo 测试</h2>
            <div className="bg-muted rounded-lg border p-8">
              <BrandLogo size="xl" showTagline={true} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">加载 Logo 测试</h2>
            <div className="bg-muted rounded-lg border p-8 text-center">
              <LoadingLogo size="lg" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">深色模式测试</h2>
            <div className="rounded-lg border bg-gray-900 p-8 text-white">
              <div className="space-y-4">
                <Logo size="lg" variant="default" darkMode={true} />
                <BrandLogo size="lg" showTagline={true} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">动画测试</h2>
            <div className="rounded-lg border p-8 text-center">
              <Logo size="xl" variant="default" animated={true} />
              <p className="text-muted-foreground mt-4 text-sm">
                鼠标悬停查看动画效果
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
