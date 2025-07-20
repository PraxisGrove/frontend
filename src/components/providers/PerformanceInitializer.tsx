'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring } from '@/utils/performance';

export function PerformanceInitializer() {
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    // 初始化性能监控
    const monitor = initializePerformanceMonitoring();

    // 页面加载完成后发送初始指标
    const handleLoad = () => {
      setTimeout(() => {
        monitor?.sendMetrics();
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}
