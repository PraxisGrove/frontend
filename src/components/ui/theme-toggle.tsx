'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'floating';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({
  className,
  variant = 'default',
  size = 'md',
}: ThemeToggleProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 避免 hydration 错误
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'relative rounded-full border border-white/30 bg-white/20 backdrop-blur-md dark:border-white/10 dark:bg-black/20',
          'hover:text-foreground hover:bg-white/30 dark:hover:bg-black/30',
          'hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
          'transition-all duration-300',
          size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-10 w-10' : 'h-9 w-9',
          variant === 'floating' && 'fixed right-4 top-4 z-50 shadow-lg',
          className
        )}
        disabled
      >
        <Sun
          className={
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          }
        />
        <span className="sr-only">切换主题</span>
      </Button>
    );
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const baseClasses = cn(
    'relative rounded-full border border-white/30 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md',
    'hover:bg-white/30 dark:hover:bg-black/30 hover:text-foreground',
    'hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    'transition-all duration-300',
    sizeClasses[size],
    className
  );

  const floatingClasses = cn('fixed top-4 right-4 z-50 shadow-lg', baseClasses);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={variant === 'floating' ? 'fixed right-4 top-4 z-50' : ''}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={variant === 'floating' ? floatingClasses : baseClasses}
        aria-label="切换主题"
      >
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 0 : 1,
            rotate: isDarkMode ? 90 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Sun className={iconSizes[size]} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDarkMode ? 1 : 0,
            rotate: isDarkMode ? 0 : -90,
          }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <Moon className={iconSizes[size]} />
        </motion.div>
        <span className="sr-only">切换主题</span>
      </Button>
    </motion.div>
  );
}

// 浮动主题切换按钮
export function FloatingThemeToggle({ className }: { className?: string }) {
  return <ThemeToggle variant="floating" className={className} />;
}

// 导航栏主题切换按钮
export function NavThemeToggle({ className }: { className?: string }) {
  return <ThemeToggle variant="default" size="sm" className={className} />;
}
