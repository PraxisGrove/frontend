'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NotificationBadge } from '@/components/ui/enhanced-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Search,
  ChevronDown,
  Home,
  BookOpen,
  Globe,
  BarChart3,
} from 'lucide-react';

// 导航项类型
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}

// Header 属性
export interface HeaderProps {
  className?: string;
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  navigation?: NavItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications?: number;
  onThemeToggle?: () => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onUserMenuClick?: (action: string) => void;
  isDarkMode?: boolean;
}

// 默认导航项
const defaultNavigation: NavItem[] = [
  {
    title: '首页',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: '课程',
    href: '/courses',
    icon: <BookOpen className="h-4 w-4" />,
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
];

/**
 * Logo 组件
 */
function Logo({ logo }: { logo?: HeaderProps['logo'] }) {
  const defaultLogo = {
    src: '/logo/favicon-32x32.png',
    alt: 'PraxisGrove',
    width: 32,
    height: 32,
  };

  const logoConfig = logo || defaultLogo;

  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src={logoConfig.src}
        alt={logoConfig.alt}
        width={logoConfig.width}
        height={logoConfig.height}
        className="rounded"
      />
      <span className="text-xl font-bold text-foreground">PraxisGrove</span>
    </Link>
  );
}

/**
 * 导航菜单组件
 */
function NavigationMenu({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center space-x-1', className)}>
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + '/');

        if (item.children && item.children.length > 0) {
          return (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  {item.icon}
                  {item.title}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.href} asChild>
                    <Link href={child.href} className="flex items-center gap-2">
                      {child.icon}
                      {child.title}
                      {child.badge && (
                        <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                          {child.badge}
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Button
            key={item.href}
            variant={isActive ? 'default' : 'ghost'}
            asChild
            className="relative"
          >
            <Link href={item.href} className="flex items-center gap-2">
              {item.icon}
              {item.title}
              {item.badge && (
                <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

/**
 * 移动端导航菜单
 */
function MobileNavigationMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="mt-8 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-2">
            {items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'default' : 'ghost'}
                  asChild
                  className="justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    {item.icon}
                    {item.title}
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * 用户菜单组件
 */
function UserMenu({
  user,
  onUserMenuClick,
}: {
  user?: HeaderProps['user'];
  onUserMenuClick?: (action: string) => void;
}) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">登录</Link>
        </Button>
        <Button asChild>
          <Link href="/register">注册</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">{user.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onUserMenuClick?.('profile')}>
          <User className="mr-2 h-4 w-4" />
          个人资料
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUserMenuClick?.('settings')}>
          <Settings className="mr-2 h-4 w-4" />
          设置
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onUserMenuClick?.('logout')}>
          <LogOut className="mr-2 h-4 w-4" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Header 组件
 */
export function Header({
  className,
  logo,
  navigation = defaultNavigation,
  user,
  notifications = 0,
  onThemeToggle,
  onSearch,
  onNotificationClick,
  onUserMenuClick,
  isDarkMode = false,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 左侧：Logo + 导航 */}
          <div className="flex items-center gap-6">
            <Logo logo={logo} />
            <NavigationMenu items={navigation} className="hidden md:flex" />
          </div>

          {/* 中间：搜索框 */}
          {onSearch && (
            <form
              onSubmit={handleSearch}
              className="mx-6 hidden max-w-md flex-1 lg:flex"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </form>
          )}

          {/* 右侧：通知 + 主题切换 + 用户菜单 */}
          <div className="flex items-center gap-2">
            {/* 通知 */}
            {onNotificationClick && (
              <NotificationBadge count={notifications}>
                <Button variant="ghost" size="sm" onClick={onNotificationClick}>
                  <Bell className="h-4 w-4" />
                </Button>
              </NotificationBadge>
            )}

            {/* 主题切换 */}
            {onThemeToggle && (
              <Button variant="ghost" size="sm" onClick={onThemeToggle}>
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* 用户菜单 */}
            <UserMenu user={user} onUserMenuClick={onUserMenuClick} />

            {/* 移动端菜单 */}
            <MobileNavigationMenu items={navigation} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
