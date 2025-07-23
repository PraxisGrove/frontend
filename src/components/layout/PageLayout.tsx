'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FloatingNav } from '@/components/aceternity/floating-navbar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { globalNavItems } from '@/lib/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backgroundClass?: string;
  showFloatingNav?: boolean;
  showThemeToggle?: boolean;
}

/**
 * 统一的页面布局组件
 * 减少各页面间的重复代码
 */
export function PageLayout({
  children,
  title,
  subtitle,
  backgroundClass = 'min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900',
  showFloatingNav = true,
  showThemeToggle = true,
}: PageLayoutProps) {
  return (
    <div className={backgroundClass}>
      {/* 浮动导航栏 */}
      {showFloatingNav && <FloatingNav navItems={globalNavItems} />}

      {/* 主题切换按钮 */}
      {showThemeToggle && (
        <div className="fixed right-4 top-4 z-40">
          <ThemeToggle />
        </div>
      )}

      <div className="container mx-auto space-y-8 px-4 py-20">
        {/* 页面标题 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* 页面内容 */}
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
