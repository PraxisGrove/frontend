'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const FloatingNav = ({
  navItems,
  className,
  showLoginButton = true,
  loginText = '登录',
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  showLoginButton?: boolean;
  loginText?: string;
}) => {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  // 滚动检测
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 当滚动到顶部时总是显示
      if (currentScrollY < 50) {
        setVisible(true);
      } else {
        // 向上滚动时显示，向下滚动时隐藏
        setVisible(currentScrollY < lastScrollY);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 活跃区域检测
  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const sections = navItems.map((item) => item.link.replace('#', ''));

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'aceternity-floating-nav',
          'fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full py-2 pl-8 pr-2',
          className
        )}
      >
        {navItems.map((navItem, idx) => {
          const isActive = activeSection === navItem.link.replace('#', '');

          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            if (typeof window === 'undefined') return;

            const targetId = navItem.link.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          };

          return (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              onClick={handleClick}
              className={cn(
                'aceternity-floating-nav-item',
                'relative flex items-center space-x-1 rounded-full px-3 py-2 transition-all duration-200',
                'hover:bg-accent/10 hover:text-accent-foreground cursor-pointer',
                isActive && 'bg-primary/10 text-primary font-medium'
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden text-sm sm:block">{navItem.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="bg-primary/5 border-primary/20 absolute inset-0 rounded-full border"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
        {showLoginButton && (
          <button
            className={cn(
              'aceternity-floating-nav-button',
              'relative rounded-full text-sm font-medium'
            )}
          >
            <span>{loginText}</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-current to-transparent opacity-60" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
