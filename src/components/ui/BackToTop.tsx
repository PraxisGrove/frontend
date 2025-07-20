'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  className?: string;
  threshold?: number;
  smooth?: boolean;
  showProgress?: boolean;
}

export function BackToTop({
  className,
  threshold = 300,
  smooth = true,
  showProgress = true,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsVisible(scrollTop > threshold);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;

    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const circumference = 2 * Math.PI * 20; // 半径为 20 的圆周长
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={cn(
            'fixed bottom-6 left-6 z-40',
            'h-12 w-12 rounded-full',
            'bg-gradient-to-r from-purple-600 to-blue-600',
            'hover:from-purple-700 hover:to-blue-700',
            'text-white shadow-lg',
            'flex items-center justify-center',
            'transition-all duration-200',
            'group',
            className
          )}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {/* 进度圆环 */}
          {showProgress && (
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 0.1s ease-out',
                }}
              />
            </svg>
          )}

          {/* 箭头图标 */}
          <ArrowUp className="relative z-10 h-5 w-5 group-hover:animate-bounce" />

          {/* 悬停提示 */}
          <div className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="whitespace-nowrap rounded bg-black/80 px-2 py-1 text-sm text-white">
              返回顶部
              <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
