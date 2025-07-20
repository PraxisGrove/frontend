'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Search,
  User,
  BookOpen,
  Plus,
  X,
  Zap,
  Globe,
  Brain,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionsProps {
  className?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  href?: string;
  onClick?: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'ai-chat',
    label: 'AI 助手',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    onClick: () => console.log('打开 AI 助手'),
  },
  {
    id: 'search',
    label: '课程搜索',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    onClick: () => console.log('打开课程搜索'),
  },
  {
    id: 'login',
    label: '快速登录',
    icon: User,
    color: 'from-green-500 to-emerald-500',
    href: '/login',
  },
  {
    id: '3d-universe',
    label: '3D 宇宙',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    href: '/knowledge-universe',
  },
];

export function QuickActions({ className }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const fabVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 45,
      scale: 1.1,
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* 快速操作菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-3"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {quickActions.map((action) => (
              <QuickActionButton
                key={action.id}
                action={action}
                variants={itemVariants}
                onClose={() => setIsOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主 FAB 按钮 */}
      <motion.div
        className={cn(
          'relative h-14 w-14 cursor-pointer rounded-full shadow-lg',
          'bg-gradient-to-r from-purple-600 to-blue-600',
          'hover:from-purple-700 hover:to-blue-700',
          'flex items-center justify-center',
          'transition-all duration-200'
        )}
        variants={fabVariants}
        animate={isOpen ? 'open' : 'closed'}
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}

        {/* 脉冲动画 */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* 提示文本 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1 text-sm text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2 }}
          >
            快速操作
            <div className="absolute right-4 top-full h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface QuickActionButtonProps {
  action: QuickAction;
  variants: any;
  onClose: () => void;
}

function QuickActionButton({
  action,
  variants,
  onClose,
}: QuickActionButtonProps) {
  const Icon = action.icon;

  const handleClick = () => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      window.location.href = action.href;
    }
    onClose();
  };

  return (
    <motion.div className="flex items-center gap-3" variants={variants}>
      {/* 标签 */}
      <div className="whitespace-nowrap rounded-lg bg-black/80 px-3 py-2 text-sm text-white">
        {action.label}
      </div>

      {/* 按钮 */}
      <motion.button
        className={cn(
          'h-12 w-12 rounded-full shadow-lg',
          `bg-gradient-to-r ${action.color}`,
          'flex items-center justify-center',
          'transition-all duration-200'
        )}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="h-5 w-5 text-white" />
      </motion.button>
    </motion.div>
  );
}
