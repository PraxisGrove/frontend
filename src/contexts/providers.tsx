'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createQueryClient } from '@/lib/query-client';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { NotificationProvider } from './notification-provider';

/**
 * 查询客户端实例
 */
let queryClient: QueryClient | undefined = undefined;

/**
 * 获取查询客户端
 */
function getQueryClient() {
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  return queryClient;
}

/**
 * 应用程序提供者组件
 * 包装所有必要的Context Provider
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </AuthProvider>
      </ThemeProvider>

      {/* 开发环境显示React Query开发工具 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}

/**
 * 服务端渲染提供者
 * 用于服务端渲染时的数据预取
 */
export function SSRProvider({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: any;
}) {
  const [client] = React.useState(() => createQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
