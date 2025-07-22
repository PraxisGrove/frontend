import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PraxisGrove - 一所无需许可的学校',
  description: '基于AI技术的创新在线教育平台，提供个性化学习体验和3D知识宇宙',
};

/**
 * 主应用布局组件
 * 包含导航栏、侧边栏、主内容区域等
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 主内容区域 */}
      <main className="w-full">{children}</main>
    </div>
  );
}
