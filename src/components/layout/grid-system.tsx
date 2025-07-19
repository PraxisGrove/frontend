'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 响应式断点类型
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 网格列数类型
export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// 间距类型
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 对齐方式类型
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

// 响应式网格配置
export interface ResponsiveGridConfig {
  xs?: GridCols;
  sm?: GridCols;
  md?: GridCols;
  lg?: GridCols;
  xl?: GridCols;
  '2xl'?: GridCols;
}

// 网格容器属性
export interface GridProps {
  children: React.ReactNode;
  cols?: GridCols | ResponsiveGridConfig;
  gap?: GridGap;
  align?: GridAlign;
  justify?: GridJustify;
  className?: string;
  animated?: boolean;
  staggerChildren?: number;
  autoFit?: boolean;
  minItemWidth?: string;
}

// 网格项属性
export interface GridItemProps {
  children: React.ReactNode;
  span?: GridCols | ResponsiveGridConfig;
  start?: GridCols;
  end?: GridCols;
  className?: string;
  animated?: boolean;
  delay?: number;
}

// 网格列数样式映射
const colsClasses: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

// 响应式网格列数样式映射
const responsiveColsClasses = {
  xs: (cols: GridCols) => colsClasses[cols],
  sm: (cols: GridCols) => `sm:grid-cols-${cols}`,
  md: (cols: GridCols) => `md:grid-cols-${cols}`,
  lg: (cols: GridCols) => `lg:grid-cols-${cols}`,
  xl: (cols: GridCols) => `xl:grid-cols-${cols}`,
  '2xl': (cols: GridCols) => `2xl:grid-cols-${cols}`,
};

// 间距样式映射
const gapClasses: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

// 对齐样式映射
const alignClasses: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<GridJustify, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// 网格项跨度样式映射
const spanClasses: Record<GridCols, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

// 响应式跨度样式映射
const responsiveSpanClasses = {
  xs: (span: GridCols) => spanClasses[span],
  sm: (span: GridCols) => `sm:col-span-${span}`,
  md: (span: GridCols) => `md:col-span-${span}`,
  lg: (span: GridCols) => `lg:col-span-${span}`,
  xl: (span: GridCols) => `xl:col-span-${span}`,
  '2xl': (span: GridCols) => `2xl:col-span-${span}`,
};

/**
 * 生成响应式网格类名
 */
function generateResponsiveClasses(
  config: GridCols | ResponsiveGridConfig,
  classMap: typeof responsiveColsClasses
): string[] {
  if (typeof config === 'number') {
    return [colsClasses[config]];
  }

  const classes: string[] = [];
  Object.entries(config).forEach(([breakpoint, value]) => {
    if (value && classMap[breakpoint as Breakpoint]) {
      classes.push(classMap[breakpoint as Breakpoint](value));
    }
  });

  return classes;
}

/**
 * 响应式网格容器组件
 */
export function Grid({
  children,
  cols = 12,
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  className,
  animated = false,
  staggerChildren = 0.1,
  autoFit = false,
  minItemWidth = '250px',
}: GridProps) {
  const gridClasses = cn(
    'grid',

    // 自动适应网格
    autoFit
      ? `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`
      : generateResponsiveClasses(cols, responsiveColsClasses),

    // 间距
    gapClasses[gap],

    // 对齐
    alignClasses[align],
    justifyClasses[justify],

    // 自定义类名
    className
  );

  if (animated) {
    return (
      <motion.div
        className={gridClasses}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={gridClasses}>{children}</div>;
}

/**
 * 网格项组件
 */
export function GridItem({
  children,
  span = 1,
  start,
  end,
  className,
  animated = false,
  delay = 0,
}: GridItemProps) {
  const itemClasses = cn(
    // 跨度
    generateResponsiveClasses(span, responsiveSpanClasses),

    // 起始位置
    start && `col-start-${start}`,

    // 结束位置
    end && `col-end-${end}`,

    // 自定义类名
    className
  );

  if (animated) {
    return (
      <motion.div
        className={itemClasses}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={itemClasses}>{children}</div>;
}

/**
 * 自动网格组件
 * 根据内容自动调整列数
 */
export function AutoGrid({
  children,
  minItemWidth = '250px',
  maxCols = 4,
  gap = 'md',
  className,
  ...props
}: Omit<GridProps, 'cols'> & {
  minItemWidth?: string;
  maxCols?: GridCols;
}) {
  return (
    <Grid
      cols={{
        xs: 1,
        sm: Math.min(2, maxCols) as GridCols,
        md: Math.min(3, maxCols) as GridCols,
        lg: maxCols,
      }}
      gap={gap}
      className={cn(
        `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`,
        className
      )}
      {...props}
    >
      {children}
    </Grid>
  );
}

/**
 * 砌体网格组件
 * 类似 Pinterest 的瀑布流布局
 */
export function MasonryGrid({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'md',
  className,
}: {
  children: React.ReactNode;
  cols?: ResponsiveGridConfig;
  gap?: GridGap;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'columns-1 sm:columns-2 md:columns-3 lg:columns-4',
        gapClasses[gap],
        className
      )}
      style={{
        columnGap: gapClasses[gap].replace('gap-', ''),
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            'mb-4 break-inside-avoid',
            gapClasses[gap].replace('gap-', 'mb-')
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * 特性网格组件
 * 专门用于展示特性卡片
 */
export function FeatureGrid({
  children,
  columns = 3,
  gap = 'lg',
  className,
  animated = true,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: GridGap;
  className?: string;
  animated?: boolean;
}) {
  const responsiveCols: ResponsiveGridConfig = {
    xs: 1,
    sm: Math.min(2, columns) as GridCols,
    md: Math.min(3, columns) as GridCols,
    lg: columns as GridCols,
  };

  return (
    <Grid
      cols={responsiveCols}
      gap={gap}
      className={className}
      animated={animated}
      staggerChildren={0.1}
    >
      {children}
    </Grid>
  );
}

/**
 * 仪表板网格组件
 * 专门用于仪表板布局
 */
export function DashboardGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Grid
      cols={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
      gap="lg"
      className={className}
      animated
    >
      {children}
    </Grid>
  );
}

// 默认导出
export default Grid;
