'use client';

import React, { useState, useCallback } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import {
  Input,
  Button,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  AnimatedContainer,
} from '@/components/unified';
import type { CoursesQueryParams, CourseLevel } from '@/types/api';

interface CourseFilterProps {
  onFilterChange: (filters: CoursesQueryParams) => void;
  initialFilters?: CoursesQueryParams;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
    coursesCount: number;
  }>;
  className?: string;
}

/**
 * 课程搜索和过滤组件
 * 支持关键词搜索、分类过滤、级别筛选等功能
 */
export function CourseFilter({
  onFilterChange,
  initialFilters = {},
  categories = [],
  className = '',
}: CourseFilterProps) {
  const [filters, setFilters] = useState<CoursesQueryParams>(initialFilters);
  const [searchValue, setSearchValue] = useState(initialFilters.search || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 级别选项
  const levelOptions: Array<{ value: CourseLevel; label: string }> = [
    { value: 'beginner', label: '初级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' },
  ];

  // 排序选项
  const sortOptions = [
    { value: 'created_at', label: '最新发布' },
    { value: 'rating', label: '评分最高' },
    { value: 'students_count', label: '学员最多' },
    { value: 'price', label: '价格最低' },
    { value: 'title', label: '按标题' },
  ];

  // 价格范围选项
  const priceRanges = [
    { label: '免费', min: 0, max: 0 },
    { label: '¥1-99', min: 1, max: 99 },
    { label: '¥100-299', min: 100, max: 299 },
    { label: '¥300-599', min: 300, max: 599 },
    { label: '¥600以上', min: 600, max: undefined },
  ];

  // 更新过滤器
  const updateFilters = useCallback((newFilters: Partial<CoursesQueryParams>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  // 处理搜索
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    updateFilters({ search: value || undefined });
  }, [updateFilters]);

  // 处理搜索提交
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  // 清除搜索
  const clearSearch = () => {
    setSearchValue('');
    updateFilters({ search: undefined });
  };

  // 处理分类选择
  const handleCategoryChange = (categorySlug: string) => {
    updateFilters({ category: categorySlug || undefined });
  };

  // 处理级别选择
  const handleLevelChange = (level: CourseLevel) => {
    updateFilters({ level: level || undefined });
  };

  // 处理排序选择
  const handleSortChange = (sort: string) => {
    updateFilters({ sort: sort || undefined });
  };

  // 处理价格范围选择
  const handlePriceRangeChange = (range: { min: number; max?: number }) => {
    updateFilters({
      minPrice: range.min || undefined,
      maxPrice: range.max || undefined,
    });
  };

  // 清除所有过滤器
  const clearAllFilters = () => {
    setSearchValue('');
    setFilters({});
    onFilterChange({});
  };

  // 获取活跃过滤器数量
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category) count++;
    if (filters.level) count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 搜索栏 */}
      <AnimatedContainer animation="slideDown" delay={0.1}>
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索课程、讲师或关键词..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </form>
      </AnimatedContainer>

      {/* 过滤器栏 */}
      <AnimatedContainer animation="slideDown" delay={0.2}>
        <div className="flex flex-wrap items-center gap-4">
          {/* 分类选择 */}
          <Select value={filters.category || ''} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择分类" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">所有分类</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name} ({category.coursesCount})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 级别选择 */}
          <Select value={filters.level || ''} onValueChange={handleLevelChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="难度级别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">所有级别</SelectItem>
              {levelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 排序选择 */}
          <Select value={filters.sort || ''} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 高级过滤器 */}
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                高级筛选
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">高级筛选</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-auto p-0 text-sm text-gray-500"
                    >
                      清除全部
                    </Button>
                  )}
                </div>

                <Separator />

                {/* 价格范围 */}
                <div>
                  <label className="mb-2 block text-sm font-medium">价格范围</label>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => handlePriceRangeChange(range)}
                        className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          filters.minPrice === range.min && filters.maxPrice === range.max
                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* 其他筛选选项 */}
                <div>
                  <label className="mb-2 block text-sm font-medium">课程特色</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.featured || false}
                        onChange={(e) => updateFilters({ featured: e.target.checked || undefined })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">精选课程</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.popular || false}
                        onChange={(e) => updateFilters({ popular: e.target.checked || undefined })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">热门课程</span>
                    </label>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 清除过滤器按钮 */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500"
            >
              清除筛选 ({activeFiltersCount})
            </Button>
          )}
        </div>
      </AnimatedContainer>

      {/* 活跃过滤器标签 */}
      {activeFiltersCount > 0 && (
        <AnimatedContainer animation="slideDown" delay={0.3}>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="flex items-center gap-1">
                搜索: {filters.search}
                <button
                  onClick={() => updateFilters({ search: undefined })}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                分类: {categories.find(c => c.slug === filters.category)?.name || filters.category}
                <button
                  onClick={() => updateFilters({ category: undefined })}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.level && (
              <Badge variant="secondary" className="flex items-center gap-1">
                级别: {levelOptions.find(l => l.value === filters.level)?.label || filters.level}
                <button
                  onClick={() => updateFilters({ level: undefined })}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                价格: ¥{filters.minPrice || 0}-{filters.maxPrice || '∞'}
                <button
                  onClick={() => updateFilters({ minPrice: undefined, maxPrice: undefined })}
                  className="ml-1 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </AnimatedContainer>
      )}
    </div>
  );
}

export default CourseFilter;
