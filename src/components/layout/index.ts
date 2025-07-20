/**
 * 布局组件库统一导出
 */

// Header 组件
export { Header } from './header';
export type { HeaderProps, NavItem } from './header';

// Sidebar 组件
export { Sidebar, ResponsiveSidebar } from './sidebar';
export type {
  SidebarProps,
  SidebarNavItem,
  SidebarGroupProps,
} from './sidebar';

// Layout 容器组件
export {
  LayoutContainer,
  PageContainer,
  CardContainer,
} from './layout-container';
export type {
  LayoutContainerProps,
  LayoutMode,
  ContainerSize,
  SpacingSize,
} from './layout-container';

// 网格系统组件
export {
  Grid,
  GridItem,
  AutoGrid,
  MasonryGrid,
  FeatureGrid,
  DashboardGrid,
} from './grid-system';
export type {
  GridProps,
  GridItemProps,
  ResponsiveGridConfig,
  Breakpoint,
  GridCols,
  GridGap,
  GridAlign,
  GridJustify,
} from './grid-system';

// Logo 组件
export { Logo, BrandLogo, LoadingLogo, FaviconInfo } from './logo';
export { SvgLogo, DownloadableSvgLogo } from './svg-logo';
export type { LogoProps, LogoSize, LogoVariant } from './logo';
