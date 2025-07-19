/**
 * UI 组件库统一导出
 */

// 基础组件
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

export { Input } from './input';
export type { InputProps } from './input';

export { Badge, badgeVariants } from './badge';

export { Skeleton } from './skeleton';

export { Toaster } from './sonner';

export { Separator } from './separator';

export { ScrollArea, ScrollBar } from './scroll-area';

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './collapsible';

export { RadioGroup, RadioGroupItem } from './radio-group';

export { Switch } from './switch';

export { Checkbox } from './checkbox';

export { Textarea } from './textarea';
export type { TextareaProps } from './textarea';

export { Progress } from './progress';

// Table 组件
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

// Select 组件
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './select';

// 增强表格组件
export { EnhancedTable } from './enhanced-table';
export type {
  ColumnDef,
  SortDirection,
  Filter,
  PaginationState,
  TableState,
  EnhancedTableProps,
} from './enhanced-table';

// 增强加载组件
export {
  Loader,
  SpinnerLoader,
  DotsLoader,
  PulseLoader,
  BarsLoader,
  RingLoader,
  WaveLoader,
  ProgressBar,
  TextSkeleton,
  CardSkeleton,
  ListSkeleton,
  TableSkeleton,
  LoadingOverlay,
} from './enhanced-loading';
export type {
  LoaderType,
  LoaderSize,
  LoaderProps,
  ProgressBarProps,
  SkeletonPresetProps,
  LoadingOverlayProps,
} from './enhanced-loading';

// 增强通知组件
export {
  enhancedToast,
  NotificationCenter,
  NotificationBadge,
  CustomToast,
} from './enhanced-toast';
export type {
  ToastType,
  ToastPosition,
  ToastOptions,
  NotificationData,
  NotificationCenterProps,
  NotificationBadgeProps,
  CustomToastProps,
} from './enhanced-toast';

// Dialog 组件
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './dialog';

// Sheet 组件
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './sheet';

// 增强模态框组件
export { EnhancedModal, EnhancedDrawer, ConfirmDialog } from './enhanced-modal';
export type {
  ModalSize,
  AnimationVariant,
  EnhancedModalProps,
  EnhancedDrawerProps,
  ConfirmDialogProps,
} from './enhanced-modal';

// 模态框管理器
export {
  ModalManager,
  modalUtils,
  useModal,
  QuickModal,
  QuickDrawer,
  QuickConfirm,
} from './modal-manager';
export type {
  ManagedModal,
  QuickModalProps,
  QuickDrawerProps,
  QuickConfirmProps,
} from './modal-manager';
