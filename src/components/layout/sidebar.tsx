'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Globe,
  BarChart3,
  Settings,
  User,
  Bell,
  Search,
  FileText,
  Calendar,
  MessageSquare,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

// 侧边栏导航项类型
export interface SidebarNavItem {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: number | string;
  children?: SidebarNavItem[];
  isActive?: boolean;
  onClick?: () => void;
}

// 侧边栏组属性
export interface SidebarGroupProps {
  title?: string;
  items: SidebarNavItem[];
  className?: string;
}

// 侧边栏属性
export interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  navigation?: SidebarGroupProps[];
  footer?: React.ReactNode;
  variant?: 'default' | 'floating' | 'minimal';
  position?: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg';
  showToggle?: boolean;
  persistent?: boolean;
}

// 默认导航配置
const defaultNavigation: SidebarGroupProps[] = [
  {
    title: '主要功能',
    items: [
      {
        title: '首页',
        href: '/',
        icon: <Home className="h-4 w-4" />,
      },
      {
        title: '课程',
        href: '/courses',
        icon: <BookOpen className="h-4 w-4" />,
        badge: 3,
      },
      {
        title: '知识宇宙',
        href: '/knowledge-universe',
        icon: <Globe className="h-4 w-4" />,
      },
      {
        title: '仪表板',
        href: '/dashboard',
        icon: <BarChart3 className="h-4 w-4" />,
      },
    ],
  },
  {
    title: '工具',
    items: [
      {
        title: '搜索',
        href: '/search',
        icon: <Search className="h-4 w-4" />,
      },
      {
        title: '日历',
        href: '/calendar',
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        title: '消息',
        href: '/messages',
        icon: <MessageSquare className="h-4 w-4" />,
        badge: 5,
      },
      {
        title: '文档',
        href: '/docs',
        icon: <FileText className="h-4 w-4" />,
      },
    ],
  },
  {
    title: '设置',
    items: [
      {
        title: '个人设置',
        href: '/settings/profile',
        icon: <User className="h-4 w-4" />,
      },
      {
        title: '通知设置',
        href: '/settings/notifications',
        icon: <Bell className="h-4 w-4" />,
      },
      {
        title: '系统设置',
        href: '/settings/system',
        icon: <Settings className="h-4 w-4" />,
      },
      {
        title: '帮助中心',
        href: '/help',
        icon: <HelpCircle className="h-4 w-4" />,
      },
    ],
  },
];

// 宽度样式映射
const widthClasses = {
  sm: 'w-56',
  md: 'w-64',
  lg: 'w-72',
};

const collapsedWidthClasses = {
  sm: 'w-16',
  md: 'w-16',
  lg: 'w-20',
};

/**
 * 侧边栏导航项组件
 */
function SidebarNavItem({
  item,
  isCollapsed = false,
  level = 0,
}: {
  item: SidebarNavItem;
  isCollapsed?: boolean;
  level?: number;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href ? pathname === item.href : false;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    item.onClick?.();
  };

  const itemContent = (
    <div
      className={cn(
        'hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all',
        isActive && 'bg-accent text-accent-foreground',
        level > 0 && 'ml-4',
        isCollapsed && 'justify-center px-2'
      )}
    >
      {item.icon && (
        <span className={cn('flex-shrink-0', isCollapsed && 'mx-auto')}>
          {item.icon}
        </span>
      )}
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180'
              )}
            />
          )}
        </>
      )}
    </div>
  );

  if (item.href && !hasChildren) {
    return (
      <Link href={item.href} className="block">
        {itemContent}
      </Link>
    );
  }

  if (hasChildren && !isCollapsed) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full" onClick={handleClick}>
            {itemContent}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.children?.map((child, index) => (
            <SidebarNavItem
              key={child.href || index}
              item={child}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <button className="w-full" onClick={handleClick}>
      {itemContent}
    </button>
  );
}

/**
 * 侧边栏导航组组件
 */
function SidebarNavGroup({
  title,
  items,
  isCollapsed = false,
  className,
}: SidebarGroupProps & { isCollapsed?: boolean }) {
  if (!items.length) return null;

  return (
    <div className={cn('space-y-1', className)}>
      {title && !isCollapsed && (
        <h4 className="text-muted-foreground mb-2 px-3 text-xs font-semibold uppercase tracking-wider">
          {title}
        </h4>
      )}
      <nav className="space-y-1">
        {items.map((item, index) => (
          <SidebarNavItem
            key={item.href || index}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );
}

/**
 * 侧边栏用户信息组件
 */
function SidebarUserInfo({
  user,
  isCollapsed = false,
}: {
  user?: SidebarProps['user'];
  isCollapsed?: boolean;
}) {
  if (!user) return null;

  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hover:bg-accent flex items-center gap-3 rounded-lg p-3">
      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 truncate">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>
        {user.role && (
          <p className="text-muted-foreground text-xs">{user.role}</p>
        )}
      </div>
    </div>
  );
}

/**
 * 侧边栏Logo组件
 */
function SidebarLogo({
  logo,
  isCollapsed = false,
}: {
  logo?: SidebarProps['logo'];
  isCollapsed?: boolean;
}) {
  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded font-bold">
          P
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-4">
      {logo ? (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width || 32}
          height={logo.height || 32}
          className="flex-shrink-0"
        />
      ) : (
        <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded font-bold">
          P
        </div>
      )}
      <h2 className="text-lg font-semibold">PraxisGrove</h2>
    </div>
  );
}

/**
 * 侧边栏切换按钮
 */
function SidebarToggle({
  isCollapsed,
  onToggle,
  position = 'left',
}: {
  isCollapsed: boolean;
  onToggle: () => void;
  position?: 'left' | 'right';
}) {
  const Icon = isCollapsed ? ChevronRight : ChevronLeft;

  if (position === 'right') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="bg-background absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border p-0 shadow-md"
      >
        <Icon className="h-3 w-3" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="bg-background absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border p-0 shadow-md"
    >
      <Icon className="h-3 w-3" />
    </Button>
  );
}

/**
 * 主侧边栏组件
 */
export function Sidebar({
  className,
  isCollapsed = false,
  onToggleCollapse,
  logo,
  user,
  navigation = defaultNavigation,
  footer,
  variant = 'default',
  position = 'left',
  width = 'md',
  showToggle = true,
  persistent = false,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(isCollapsed);

  // 使用内部状态或外部控制
  const collapsed = onToggleCollapse ? isCollapsed : internalCollapsed;
  const handleToggle =
    onToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  // 变体样式
  const variantClasses = {
    default: 'border-r bg-background',
    floating: 'mx-2 my-2 rounded-lg border bg-card shadow-sm',
    minimal: 'bg-background/50 backdrop-blur-sm',
  };

  // 位置样式
  const positionClasses = {
    left: 'left-0',
    right: 'right-0 border-l border-r-0',
  };

  return (
    <motion.aside
      initial={false}
      animate={{
        width: collapsed ? collapsedWidthClasses[width] : widthClasses[width],
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'relative flex h-full flex-col',
        variantClasses[variant],
        positionClasses[position],
        className
      )}
    >
      {/* 切换按钮 */}
      {showToggle && onToggleCollapse && (
        <SidebarToggle
          isCollapsed={collapsed}
          onToggle={handleToggle}
          position={position}
        />
      )}

      {/* Logo 区域 */}
      <SidebarLogo logo={logo} isCollapsed={collapsed} />

      {/* 用户信息 */}
      {user && (
        <>
          <SidebarUserInfo user={user} isCollapsed={collapsed} />
          <Separator className="mx-3" />
        </>
      )}

      {/* 导航区域 */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {navigation.map((group, index) => (
            <SidebarNavGroup
              key={group.title || index}
              title={group.title}
              items={group.items}
              isCollapsed={collapsed}
              className={group.className}
            />
          ))}
        </div>
      </ScrollArea>

      {/* 底部区域 */}
      {footer && (
        <>
          <Separator className="mx-3" />
          <div className="p-3">{footer}</div>
        </>
      )}
    </motion.aside>
  );
}

/**
 * 响应式侧边栏组件
 * 在移动端自动转换为抽屉模式
 */
export function ResponsiveSidebar({
  isOpen,
  onOpenChange,
  ...props
}: SidebarProps & {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => onOpenChange?.(false)}
            />

            {/* 侧边栏 */}
            <motion.div
              initial={{ x: props.position === 'right' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: props.position === 'right' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 z-50 w-64"
              style={{
                [props.position === 'right' ? 'right' : 'left']: 0,
              }}
            >
              <Sidebar {...props} className="h-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return <Sidebar {...props} />;
}

// 默认导出
export default Sidebar;
