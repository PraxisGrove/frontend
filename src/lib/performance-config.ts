/**
 * 性能优化配置
 * 用于优化组件库的性能表现
 */

import React from 'react';

// 性能配置接口
interface PerformanceConfig {
  // 动画配置
  animation: {
    enabled: boolean;
    maxConcurrent: number;
    complexityLevel: 'low' | 'medium' | 'high';
    respectReducedMotion: boolean;
  };

  // 渲染配置
  rendering: {
    enableVirtualization: boolean;
    batchUpdates: boolean;
    lazyLoadThreshold: number;
    maxComponentsPerPage: number;
  };

  // 内存配置
  memory: {
    enableGarbageCollection: boolean;
    maxMemoryUsage: number; // MB
    cleanupInterval: number; // ms
  };

  // 网络配置
  network: {
    enableCodeSplitting: boolean;
    preloadCriticalComponents: boolean;
    enableServiceWorker: boolean;
  };
}

// 默认性能配置
const defaultConfig: PerformanceConfig = {
  animation: {
    enabled: true,
    maxConcurrent: 5,
    complexityLevel: 'medium',
    respectReducedMotion: true,
  },
  rendering: {
    enableVirtualization: true,
    batchUpdates: true,
    lazyLoadThreshold: 100,
    maxComponentsPerPage: 50,
  },
  memory: {
    enableGarbageCollection: true,
    maxMemoryUsage: 100,
    cleanupInterval: 30000,
  },
  network: {
    enableCodeSplitting: true,
    preloadCriticalComponents: true,
    enableServiceWorker: false,
  },
};

// 性能配置管理器
class PerformanceConfigManager {
  private config: PerformanceConfig;
  private listeners: Array<(config: PerformanceConfig) => void> = [];

  constructor(initialConfig: PerformanceConfig = defaultConfig) {
    this.config = { ...initialConfig };
    this.initializeAutoOptimization();
  }

  // 获取当前配置
  getConfig(): PerformanceConfig {
    return { ...this.config };
  }

  // 更新配置
  updateConfig(updates: Partial<PerformanceConfig>) {
    this.config = {
      ...this.config,
      ...updates,
      animation: { ...this.config.animation, ...updates.animation },
      rendering: { ...this.config.rendering, ...updates.rendering },
      memory: { ...this.config.memory, ...updates.memory },
      network: { ...this.config.network, ...updates.network },
    };

    this.notifyListeners();
  }

  // 添加配置变更监听器
  addListener(listener: (config: PerformanceConfig) => void) {
    this.listeners.push(listener);
  }

  // 移除配置变更监听器
  removeListener(listener: (config: PerformanceConfig) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  // 通知所有监听器
  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.config));
  }

  // 初始化自动优化
  private initializeAutoOptimization() {
    if (typeof window === 'undefined') return;

    // 监听用户偏好变化
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      this.updateConfig({
        animation: {
          ...this.config.animation,
          enabled: !e.matches,
        },
      });
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);

    // 监听网络状态变化
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const handleConnectionChange = () => {
        const isSlowConnection =
          connection.effectiveType === 'slow-2g' ||
          connection.effectiveType === '2g';

        if (isSlowConnection) {
          this.updateConfig({
            animation: {
              ...this.config.animation,
              complexityLevel: 'low',
              maxConcurrent: 2,
            },
            rendering: {
              ...this.config.rendering,
              maxComponentsPerPage: 20,
            },
          });
        }
      };

      connection.addEventListener('change', handleConnectionChange);
    }

    // 监听内存压力
    if ('memory' in performance) {
      const checkMemoryUsage = () => {
        const memory = (performance as any).memory;
        const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        if (usageRatio > 0.8) {
          this.updateConfig({
            animation: {
              ...this.config.animation,
              complexityLevel: 'low',
              maxConcurrent: 1,
            },
            memory: {
              ...this.config.memory,
              enableGarbageCollection: true,
              cleanupInterval: 10000,
            },
          });
        }
      };

      setInterval(checkMemoryUsage, 30000);
    }
  }

  // 根据设备性能自动调整配置
  autoOptimizeForDevice() {
    if (typeof window === 'undefined') return;

    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    let performanceLevel: 'low' | 'medium' | 'high' = 'medium';

    if (deviceMemory >= 8 && hardwareConcurrency >= 8) {
      performanceLevel = 'high';
    } else if (deviceMemory >= 4 && hardwareConcurrency >= 4) {
      performanceLevel = 'medium';
    } else {
      performanceLevel = 'low';
    }

    const optimizedConfig: Partial<PerformanceConfig> = {
      animation: {
        ...this.config.animation,
        complexityLevel: performanceLevel,
        maxConcurrent:
          performanceLevel === 'high'
            ? 10
            : performanceLevel === 'medium'
              ? 5
              : 2,
      },
      rendering: {
        ...this.config.rendering,
        maxComponentsPerPage:
          performanceLevel === 'high'
            ? 100
            : performanceLevel === 'medium'
              ? 50
              : 25,
      },
    };

    this.updateConfig(optimizedConfig);
  }

  // 重置为默认配置
  reset() {
    this.config = { ...defaultConfig };
    this.notifyListeners();
  }
}

// 创建全局配置管理器实例
export const performanceConfig = new PerformanceConfigManager();

// 性能优化工具函数
export const performanceUtils = {
  // 检查是否应该启用动画
  shouldEnableAnimation(): boolean {
    const config = performanceConfig.getConfig();
    return config.animation.enabled;
  },

  // 获取动画复杂度级别
  getAnimationComplexity(): 'low' | 'medium' | 'high' {
    const config = performanceConfig.getConfig();
    return config.animation.complexityLevel;
  },

  // 检查是否应该使用虚拟化
  shouldUseVirtualization(itemCount: number): boolean {
    const config = performanceConfig.getConfig();
    return (
      config.rendering.enableVirtualization &&
      itemCount > config.rendering.lazyLoadThreshold
    );
  },

  // 获取最大并发动画数量
  getMaxConcurrentAnimations(): number {
    const config = performanceConfig.getConfig();
    return config.animation.maxConcurrent;
  },

  // 检查是否需要内存清理
  shouldCleanupMemory(): boolean {
    const config = performanceConfig.getConfig();

    if (!config.memory.enableGarbageCollection) return false;

    if (typeof window === 'undefined') return false;

    const memory = (performance as any).memory;
    if (!memory) return false;

    const usageMB = memory.usedJSHeapSize / 1024 / 1024;
    return usageMB > config.memory.maxMemoryUsage;
  },

  // 执行内存清理
  performMemoryCleanup() {
    if (typeof window === 'undefined') return;

    // 强制垃圾回收（如果支持）
    if ('gc' in window) {
      (window as any).gc();
    }

    // 清理未使用的事件监听器
    // 这里可以添加具体的清理逻辑
    console.log('🧹 执行内存清理');
  },

  // 获取推荐的组件数量限制
  getRecommendedComponentLimit(): number {
    const config = performanceConfig.getConfig();
    return config.rendering.maxComponentsPerPage;
  },
};

// React Hook 用于使用性能配置
export function usePerformanceConfig() {
  const [config, setConfig] = React.useState(performanceConfig.getConfig());

  React.useEffect(() => {
    const handleConfigChange = (newConfig: PerformanceConfig) => {
      setConfig(newConfig);
    };

    performanceConfig.addListener(handleConfigChange);

    return () => {
      performanceConfig.removeListener(handleConfigChange);
    };
  }, []);

  return {
    config,
    updateConfig: (updates: Partial<PerformanceConfig>) =>
      performanceConfig.updateConfig(updates),
    autoOptimize: () => performanceConfig.autoOptimizeForDevice(),
    reset: () => performanceConfig.reset(),
  };
}

// 性能监控 Hook
export function usePerformanceMonitoring(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // 如果渲染时间过长，记录警告
      if (renderTime > 16) {
        console.warn(
          `⚠️ ${componentName} 渲染时间过长: ${renderTime.toFixed(2)}ms`
        );
      }
    };
  }, [componentName]);
}

// 自动优化 Hook
export function useAutoOptimization() {
  React.useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    // 页面加载完成后自动优化
    const handleLoad = () => {
      performanceConfig.autoOptimizeForDevice();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
}

// 导出类型和默认配置
export type { PerformanceConfig };
export { defaultConfig };
