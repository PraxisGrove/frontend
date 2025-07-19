'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useUIStore, uiSelectors, type Theme } from '@/store/ui';

/**
 * 主题上下文接口
 */
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * 主题上下文
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题提供者组件
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore(uiSelectors.theme);
  const isDarkMode = useUIStore(uiSelectors.isDarkMode);
  const setTheme = useUIStore((state) => state.setTheme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  // 初始化主题
  useEffect(() => {
    const initializeTheme = () => {
      if (theme === 'system') {
        const systemDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        useUIStore.setState({ isDarkMode: systemDark });
      } else {
        useUIStore.setState({ isDarkMode: theme === 'dark' });
      }

      // 更新DOM类名
      const root = document.documentElement;
      if (useUIStore.getState().isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    initializeTheme();

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        useUIStore.setState({ isDarkMode: e.matches });

        const root = document.documentElement;
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // 监听主题变化，更新DOM
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const value: ThemeContextType = {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * 使用主题Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * 主题切换组件
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleThemeChange('light')}
        className={`rounded-md p-2 ${
          theme === 'light'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="浅色主题"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>

      <button
        onClick={() => handleThemeChange('dark')}
        className={`rounded-md p-2 ${
          theme === 'dark'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="深色主题"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      <button
        onClick={() => handleThemeChange('system')}
        className={`rounded-md p-2 ${
          theme === 'system'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
        title="跟随系统"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
}
