import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AppProviders } from '@/contexts/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PraxisGrove - AI驱动的沉浸式在线教育平台',
  description: '基于AI技术的创新在线教育平台，提供个性化学习体验和3D知识宇宙',
  keywords: ['在线教育', 'AI学习', '3D知识图谱', '个性化教育'],
  authors: [{ name: 'PraxisGrove Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo/favicon.ico',
    apple: '/logo/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <div id="root">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
