'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { AnimatedContainer } from '@/components/unified';
import type { PaginationResponse } from '@/types/api';

interface CoursePaginationProps {
  pagination: PaginationResponse;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'simple' | 'compact';
  showInfo?: boolean;
  className?: string;
}

/**
 * 课程专用分页组件
 * 基于 shadcn/ui Pagination 组件构建
 */
export function CoursePagination({
  pagination,
  onPageChange,
  variant = 'default',
  showInfo = true,
  className = '',
}: CoursePaginationProps) {
  const { page, totalPages, total, limit, hasNext, hasPrev } = pagination;

  // 生成页码数组
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // 如果总页数小于等于最大显示页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 复杂分页逻辑
      if (page <= 4) {
        // 当前页在前面
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        // 当前页在后面
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // 计算显示的条目范围
  const getItemRange = () => {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    return { start, end };
  };

  const { start, end } = getItemRange();
  const pageNumbers = generatePageNumbers();

  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  // 简单分页样式
  if (variant === 'simple') {
    return (
      <AnimatedContainer animation="slideUp" delay={0.1}>
        <div className={`flex items-center justify-between ${className}`}>
          {showInfo && (
            <div className="text-sm text-gray-700 dark:text-gray-300">
              显示第 <span className="font-medium">{start}</span> 到{' '}
              <span className="font-medium">{end}</span> 条，共{' '}
              <span className="font-medium">{total}</span> 条结果
            </div>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev) onPageChange(page - 1);
                  }}
                  className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNext) onPageChange(page + 1);
                  }}
                  className={!hasNext ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AnimatedContainer>
    );
  }

  // 紧凑分页样式
  if (variant === 'compact') {
    return (
      <AnimatedContainer animation="slideUp" delay={0.1}>
        <div className={`flex items-center justify-center ${className}`}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev) onPageChange(page - 1);
                  }}
                  className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="flex h-9 items-center px-3 text-sm text-gray-700 dark:text-gray-300">
                  {page} / {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNext) onPageChange(page + 1);
                  }}
                  className={!hasNext ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AnimatedContainer>
    );
  }

  // 默认分页样式
  return (
    <AnimatedContainer animation="slideUp" delay={0.1}>
      <div className={`space-y-4 ${className}`}>
        {/* 信息显示 */}
        {showInfo && (
          <div className="text-center text-sm text-gray-700 dark:text-gray-300">
            显示第 <span className="font-medium">{start}</span> 到{' '}
            <span className="font-medium">{end}</span> 条，共{' '}
            <span className="font-medium">{total}</span> 条结果
          </div>
        )}

        {/* 分页控件 */}
        <Pagination>
          <PaginationContent>
            {/* 上一页按钮 */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasPrev) onPageChange(page - 1);
                }}
                className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* 页码按钮 */}
            {pageNumbers.map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              const pageNumber = pageNum as number;
              const isCurrentPage = pageNumber === page;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNumber);
                    }}
                    isActive={isCurrentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* 下一页按钮 */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasNext) onPageChange(page + 1);
                }}
                className={!hasNext ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* 快速跳转 */}
        {totalPages > 10 && (
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-gray-700 dark:text-gray-300">跳转到</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder={page.toString()}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  const pageNum = parseInt(target.value);
                  if (
                    pageNum >= 1 &&
                    pageNum <= totalPages &&
                    pageNum !== page
                  ) {
                    onPageChange(pageNum);
                    target.value = '';
                  }
                }
              }}
            />
            <span className="text-gray-700 dark:text-gray-300">页</span>
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
}

export default CoursePagination;
