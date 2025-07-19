'use client';

import React from 'react';
import { toast, ExternalToast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './button';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  User,
  Calendar,
  Download,
  Upload,
  Trash2,
  Heart,
  Star,
  Gift,
} from 'lucide-react';

// Toast 类型
export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'
  | 'custom';

// Toast 位置
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// Toast 选项
export interface ToastOptions {
  type?: ToastType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick?: () => void;
  };
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  className?: string;
}

// 通知类型
export interface NotificationData {
  id: string;
  type: 'system' | 'user' | 'marketing' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

// 获取类型图标
const getTypeIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'loading':
      return (
        <motion.div
          className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      );
    default:
      return null;
  }
};

// 获取通知类型图标
const getNotificationIcon = (type: NotificationData['type']) => {
  switch (type) {
    case 'system':
      return <Settings className="h-5 w-5 text-blue-500" />;
    case 'user':
      return <User className="h-5 w-5 text-green-500" />;
    case 'marketing':
      return <Gift className="h-5 w-5 text-purple-500" />;
    case 'security':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

/**
 * 增强的 Toast 工具函数
 */
export const enhancedToast = {
  success: (message: string, options?: ExternalToast) => {
    return toast.success(message, {
      icon: getTypeIcon('success'),
      ...options,
    });
  },

  error: (message: string, options?: ExternalToast) => {
    return toast.error(message, {
      icon: getTypeIcon('error'),
      ...options,
    });
  },

  warning: (message: string, options?: ExternalToast) => {
    return toast.warning(message, {
      icon: getTypeIcon('warning'),
      ...options,
    });
  },

  info: (message: string, options?: ExternalToast) => {
    return toast.info(message, {
      icon: getTypeIcon('info'),
      ...options,
    });
  },

  loading: (message: string, options?: ExternalToast) => {
    return toast.loading(message, {
      icon: getTypeIcon('loading'),
      ...options,
    });
  },

  promise: <T,>(
    promise: Promise<T>,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
      ...options
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    } & ExternalToast
  ) => {
    return toast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
      ...options,
    });
  },

  dismiss: (toastId?: string | number) => {
    return toast.dismiss(toastId);
  },

  // 预设的常用通知
  presets: {
    saveSuccess: () => enhancedToast.success('保存成功'),
    saveError: () => enhancedToast.error('保存失败，请重试'),
    deleteSuccess: () => enhancedToast.success('删除成功'),
    deleteError: () => enhancedToast.error('删除失败，请重试'),
    copySuccess: () => enhancedToast.success('已复制到剪贴板'),
    uploadSuccess: () => enhancedToast.success('上传成功'),
    uploadError: () => enhancedToast.error('上传失败，请重试'),
    networkError: () => enhancedToast.error('网络连接失败，请检查网络'),
    permissionDenied: () => enhancedToast.error('权限不足，无法执行此操作'),
    loginSuccess: () => enhancedToast.success('登录成功'),
    logoutSuccess: () => enhancedToast.success('已安全退出'),
  },
};

// 通知中心属性
export interface NotificationCenterProps {
  notifications: NotificationData[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  className?: string;
}

/**
 * 通知中心组件
 */
export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClear,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPriorityColor = (priority: NotificationData['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={cn(
        'w-full max-w-md rounded-lg border bg-background shadow-lg',
        className
      )}
    >
      {/* 头部 */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="font-semibold">通知中心</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
              全部已读
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onClear}>
            清空
          </Button>
        </div>
      </div>

      {/* 通知列表 */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Bell className="mx-auto mb-2 h-12 w-12 opacity-50" />
              <p>暂无通知</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  'border-b border-l-4 p-4 transition-colors hover:bg-muted/50',
                  getPriorityColor(notification.priority),
                  !notification.read && 'bg-muted/30'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {notification.icon ||
                      getNotificationIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={cn(
                            'text-sm font-medium',
                            !notification.read && 'font-semibold'
                          )}
                        >
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      <div className="ml-2 flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(notification.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {notification.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={notification.action.onClick}
                        className="mt-2"
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 通知徽章属性
export interface NotificationBadgeProps {
  count: number;
  max?: number;
  showZero?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * 通知徽章组件
 */
export function NotificationBadge({
  count,
  max = 99,
  showZero = false,
  className,
  children,
}: NotificationBadgeProps) {
  const displayCount = count > max ? `${max}+` : count.toString();
  const shouldShow = count > 0 || showZero;

  return (
    <div className={cn('relative inline-block', className)}>
      {children}
      <AnimatePresence>
        {shouldShow && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-medium text-white"
          >
            {displayCount}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 自定义 Toast 组件
export interface CustomToastProps {
  title: string;
  description?: string;
  type?: ToastType;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

/**
 * 自定义 Toast 组件
 */
export function CustomToast({
  title,
  description,
  type = 'info',
  icon,
  action,
  onDismiss,
}: CustomToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="max-w-sm rounded-lg border bg-background p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icon || getTypeIcon(type)}</div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium">{title}</h4>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
          {action && (
            <Button
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="mt-2"
            >
              {action.label}
            </Button>
          )}
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-muted-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
