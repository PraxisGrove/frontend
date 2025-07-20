'use client';

import React from 'react';
import { Header } from './header';
import { useTheme } from 'next-themes';

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function MainLayout({ children, showHeader = true }: MainLayoutProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (query: string) => {
    console.log('搜索:', query);
    // 这里可以实现搜索逻辑
  };

  const handleNotificationClick = () => {
    console.log('通知点击');
    // 这里可以实现通知逻辑
  };

  const handleUserMenuClick = (action: string) => {
    console.log('用户菜单操作:', action);
    // 这里可以实现用户菜单逻辑
  };

  return (
    <div className="bg-background min-h-screen">
      {showHeader && (
        <Header
          onThemeToggle={handleThemeToggle}
          onSearch={handleSearch}
          onNotificationClick={handleNotificationClick}
          onUserMenuClick={handleUserMenuClick}
          isDarkMode={theme === 'dark'}
          notifications={3}
          // user={{
          //   name: '用户名',
          //   email: 'user@example.com',
          //   avatar: '/avatars/user.jpg'
          // }}
        />
      )}
      <main className={showHeader ? 'pt-0' : ''}>{children}</main>
    </div>
  );
}
