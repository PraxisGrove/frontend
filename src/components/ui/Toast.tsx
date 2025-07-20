'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    };

    setToasts((prev) => [...prev, newToast]);

    // 自动移除
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 w-full max-w-sm space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative rounded-lg border p-4 shadow-lg backdrop-blur-sm',
        colors[toast.type]
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon
          className={cn('mt-0.5 h-5 w-5 flex-shrink-0', iconColors[toast.type])}
        />

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-medium">{toast.title}</h4>
          {toast.description && (
            <p className="mt-1 text-sm opacity-90">{toast.description}</p>
          )}

          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={() => removeToast(toast.id)}
          className="flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// 便捷的 toast 函数 Hook
export function useToastHelpers() {
  const { addToast } = useToast();

  return React.useMemo(
    () => ({
      success: (
        title: string,
        description?: string,
        options?: Partial<Toast>
      ) => addToast({ type: 'success', title, description, ...options }),

      error: (title: string, description?: string, options?: Partial<Toast>) =>
        addToast({ type: 'error', title, description, ...options }),

      warning: (
        title: string,
        description?: string,
        options?: Partial<Toast>
      ) => addToast({ type: 'warning', title, description, ...options }),

      info: (title: string, description?: string, options?: Partial<Toast>) =>
        addToast({ type: 'info', title, description, ...options }),
    }),
    [addToast]
  );
}

// 全局 toast 函数（不需要 hook）
let globalToastFn: ((toast: Omit<Toast, 'id'>) => void) | null = null;

export function setGlobalToastFunction(
  fn: ((toast: Omit<Toast, 'id'>) => void) | null
) {
  globalToastFn = fn;
}

export const toast = {
  success: (title: string, description?: string, options?: Partial<Toast>) => {
    globalToastFn?.({ type: 'success', title, description, ...options });
  },

  error: (title: string, description?: string, options?: Partial<Toast>) => {
    globalToastFn?.({ type: 'error', title, description, ...options });
  },

  warning: (title: string, description?: string, options?: Partial<Toast>) => {
    globalToastFn?.({ type: 'warning', title, description, ...options });
  },

  info: (title: string, description?: string, options?: Partial<Toast>) => {
    globalToastFn?.({ type: 'info', title, description, ...options });
  },
};

// Toast 初始化组件
export function ToastInitializer() {
  const { addToast } = useToast();

  React.useEffect(() => {
    setGlobalToastFunction(addToast);

    return () => {
      setGlobalToastFunction(null);
    };
  }, [addToast]);

  return null;
}
