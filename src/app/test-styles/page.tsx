import { Button } from '@/components/ui/button';

export default function TestStylesPage() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="container mx-auto space-y-8">
        <h1 className="text-foreground text-4xl font-bold">样式测试页面</h1>

        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">按钮测试</h2>
          <div className="flex gap-4">
            <Button variant="default">默认按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="destructive">危险按钮</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">颜色测试</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-primary text-primary-foreground rounded-lg p-4">
              Primary
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
              Secondary
            </div>
            <div className="bg-accent text-accent-foreground rounded-lg p-4">
              Accent
            </div>
            <div className="bg-muted text-muted-foreground rounded-lg p-4">
              Muted
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">卡片测试</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-card text-card-foreground border-border rounded-lg border p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">卡片标题</h3>
              <p className="text-muted-foreground">
                这是一个测试卡片，用于验证样式是否正常工作。
              </p>
            </div>
            <div className="bg-popover text-popover-foreground border-border rounded-lg border p-6 shadow-md">
              <h3 className="mb-2 text-lg font-semibold">弹出框样式</h3>
              <p className="text-muted-foreground">
                这是另一个测试卡片，使用弹出框样式。
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-foreground text-2xl font-semibold">表单测试</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                输入框
              </label>
              <input
                type="text"
                placeholder="请输入内容..."
                className="bg-background border-input focus:ring-ring w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              />
            </div>
            <div>
              <label className="text-foreground mb-2 block text-sm font-medium">
                文本域
              </label>
              <textarea
                placeholder="请输入多行内容..."
                rows={3}
                className="bg-background border-input focus:ring-ring w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
