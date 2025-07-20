/**
 * UI 组件库统一导出
 */

// 基础组件
export { Button, buttonVariants } from './button';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

export { Input } from './input';

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

// 新增的shadcn/ui组件
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

export { Alert, AlertDescription, AlertTitle } from './alert';

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

export { AspectRatio } from './aspect-ratio';

export { Avatar, AvatarFallback, AvatarImage } from './avatar';

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

export { Calendar } from './calendar';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from './chart';

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

// 表单组件
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

export { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './input-otp';

export { Label } from './label';

// 菜单组件
export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar';

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './navigation-menu';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

export { Popover, PopoverContent, PopoverTrigger } from './popover';

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './sidebar';

export { Slider } from './slider';

export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

export { Toggle, toggleVariants } from './toggle';

export { ToggleGroup, ToggleGroupItem } from './toggle-group';

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export { RadioGroup, RadioGroupItem } from './radio-group';

export { Switch } from './switch';

export { Checkbox } from './checkbox';

export { Textarea } from './textarea';

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

// Dropdown Menu 组件
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';

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
