'use client';

import React from 'react';
import { useUIStore } from '@/store/ui';
import { EnhancedModal, EnhancedDrawer, ConfirmDialog } from './enhanced-modal';
import type { ModalSize, AnimationVariant } from './enhanced-modal';

// 重新导出组件
export { EnhancedModal, EnhancedDrawer, ConfirmDialog } from './enhanced-modal';
export type {
  ModalSize,
  AnimationVariant,
  EnhancedModalProps,
  EnhancedDrawerProps,
  ConfirmDialogProps,
} from './enhanced-modal';

// 扩展模态框类型定义
export interface ManagedModal {
  id: string;
  type: 'modal' | 'drawer' | 'confirm';
  isOpen: boolean;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  size?: ModalSize | 'sm' | 'md' | 'lg' | 'full';
  animation?: AnimationVariant;
  side?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'default' | 'destructive';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * 模态框管理器组件
 * 统一管理所有模态框、抽屉和确认对话框
 */
export function ModalManager() {
  const { modals, closeModal } = useUIStore();

  return (
    <>
      {modals.map((modal) => {
        const handleOpenChange = (open: boolean) => {
          if (!open) {
            closeModal(modal.id);
          }
        };

        // 渲染模态框
        if (modal.type === 'modal') {
          return (
            <EnhancedModal
              key={modal.id}
              open={modal.isOpen}
              onOpenChange={handleOpenChange}
              title={modal.title}
              description={modal.description}
              size={modal.size as ModalSize}
              animation={modal.animation}
              showCloseButton={modal.showCloseButton}
              closeOnOverlayClick={modal.closeOnOverlayClick}
              closeOnEscape={modal.closeOnEscape}
              className={modal.className}
              footer={modal.footer}
            >
              {modal.content}
            </EnhancedModal>
          );
        }

        // 渲染抽屉
        if (modal.type === 'drawer') {
          return (
            <EnhancedDrawer
              key={modal.id}
              open={modal.isOpen}
              onOpenChange={handleOpenChange}
              title={modal.title}
              description={modal.description}
              side={modal.side}
              size={modal.size as 'sm' | 'md' | 'lg' | 'full'}
              className={modal.className}
              footer={modal.footer}
            >
              {modal.content}
            </EnhancedDrawer>
          );
        }

        // 渲染确认对话框
        if (modal.type === 'confirm') {
          return (
            <ConfirmDialog
              key={modal.id}
              open={modal.isOpen}
              onOpenChange={handleOpenChange}
              title={modal.title}
              description={modal.description}
              confirmText={modal.confirmText}
              cancelText={modal.cancelText}
              variant={modal.variant}
              onConfirm={modal.onConfirm}
              onCancel={modal.onCancel}
            />
          );
        }

        return null;
      })}
    </>
  );
}

/**
 * 模态框工具函数
 */
export const modalUtils = {
  /**
   * 打开模态框
   */
  openModal: (
    modal: Omit<ManagedModal, 'isOpen' | 'type'> & { type?: 'modal' }
  ) => {
    const { openModal } = useUIStore.getState();
    openModal({
      ...modal,
      type: 'modal',
    });
  },

  /**
   * 打开抽屉
   */
  openDrawer: (
    drawer: Omit<ManagedModal, 'isOpen' | 'type'> & { type?: 'drawer' }
  ) => {
    const { openModal } = useUIStore.getState();
    openModal({
      ...drawer,
      type: 'drawer',
    });
  },

  /**
   * 打开确认对话框
   */
  openConfirm: (
    confirm: Omit<ManagedModal, 'isOpen' | 'type'> & { type?: 'confirm' }
  ) => {
    const { openModal } = useUIStore.getState();
    openModal({
      ...confirm,
      type: 'confirm',
    });
  },

  /**
   * 关闭模态框
   */
  closeModal: (id: string) => {
    const { closeModal } = useUIStore.getState();
    closeModal(id);
  },

  /**
   * 关闭所有模态框
   */
  closeAllModals: () => {
    const { closeAllModals } = useUIStore.getState();
    closeAllModals();
  },
};

/**
 * 使用模态框的 Hook
 */
export function useModal() {
  const { modals, openModal, closeModal, closeAllModals } = useUIStore();

  const openEnhancedModal = React.useCallback(
    (modal: Omit<ManagedModal, 'isOpen' | 'type'>) => {
      openModal({
        ...modal,
        type: 'modal',
      });
    },
    [openModal]
  );

  const openEnhancedDrawer = React.useCallback(
    (drawer: Omit<ManagedModal, 'isOpen' | 'type'>) => {
      openModal({
        ...drawer,
        type: 'drawer',
      });
    },
    [openModal]
  );

  const openConfirmDialog = React.useCallback(
    (confirm: Omit<ManagedModal, 'isOpen' | 'type'>) => {
      openModal({
        ...confirm,
        type: 'confirm',
      });
    },
    [openModal]
  );

  return {
    modals,
    openModal: openEnhancedModal,
    openDrawer: openEnhancedDrawer,
    openConfirm: openConfirmDialog,
    closeModal,
    closeAllModals,
  };
}

/**
 * 快捷模态框组件
 */
export interface QuickModalProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  size?: ModalSize;
  animation?: AnimationVariant;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * 快捷模态框组件
 * 不需要状态管理，直接使用
 */
export function QuickModal({
  trigger,
  title,
  description,
  size = 'md',
  animation = 'scale',
  children,
  footer,
}: QuickModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <EnhancedModal
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      size={size}
      animation={animation}
      trigger={trigger}
      footer={footer}
    >
      {children}
    </EnhancedModal>
  );
}

/**
 * 快捷抽屉组件
 */
export interface QuickDrawerProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * 快捷抽屉组件
 * 不需要状态管理，直接使用
 */
export function QuickDrawer({
  trigger,
  title,
  description,
  side = 'right',
  size = 'md',
  children,
  footer,
}: QuickDrawerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <EnhancedDrawer
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      side={side}
      size={size}
      trigger={trigger}
      footer={footer}
    >
      {children}
    </EnhancedDrawer>
  );
}

/**
 * 快捷确认对话框组件
 */
export interface QuickConfirmProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * 快捷确认对话框组件
 * 不需要状态管理，直接使用
 */
export function QuickConfirm({
  trigger,
  title,
  description,
  confirmText,
  cancelText,
  variant,
  onConfirm,
  onCancel,
}: QuickConfirmProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      confirmText={confirmText}
      cancelText={cancelText}
      variant={variant}
      trigger={trigger}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
