'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAceternityTheme } from './theme-provider';

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
  const { utils } = useAceternityTheme();
  const [visible, setVisible] = useState(true);

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
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              'aceternity-floating-nav-item',
              'relative flex items-center space-x-1'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden text-sm sm:block">{navItem.name}</span>
          </a>
        ))}
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
