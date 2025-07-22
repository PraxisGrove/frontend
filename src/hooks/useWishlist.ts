// TODO: 临时 mock，等待 zustand store 正确加载
// import { useWishlistStore, wishlistSelectors, type WishlistItem } from '@/store/wishlist';

// 临时类型定义
export interface WishlistItem {
  id: string;
  courseId: string;
  title: string;
  price: number;
  originalPrice?: number;
  thumbnail?: string;
  instructor: string;
  rating: number;
  level: string;
  addedAt: string;
}

/**
 * 收藏夹Hook接口
 */
export interface UseWishlistReturn {
  // 状态
  items: WishlistItem[];
  totalItems: number;
  isLoading: boolean;
  error: string | null;

  // 操作方法
  addToWishlist: (courseId: string) => Promise<void>;
  removeFromWishlist: (courseId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (courseId: string) => boolean;
  clearError: () => void;

  // 批量操作
  addMultipleToWishlist: (courseIds: string[]) => Promise<void>;
  removeMultipleFromWishlist: (courseIds: string[]) => void;

  // 排序和过滤
  sortWishlist: (sortBy: 'addedAt' | 'title' | 'price' | 'rating') => void;
  filterWishlist: (filter: {
    level?: string;
    priceRange?: [number, number];
  }) => WishlistItem[];

  // 便利方法
  getWishlistItem: (courseId: string) => WishlistItem | undefined;
  isEmpty: boolean;
  toggleWishlist: (courseId: string) => Promise<void>;
}

/**
 * 收藏夹Hook
 * 提供简化的收藏夹状态访问接口
 * TODO: 临时 mock 实现，等待 zustand store 正确加载
 */
export function useWishlist(): UseWishlistReturn {
  // TODO: 临时 mock 状态
  const items: WishlistItem[] = [];
  const totalItems = 0;
  const isLoading = false;
  const error: string | null = null;

  // TODO: 临时 mock 操作方法
  const addToWishlist = async (courseId: string) => {
    console.log('Mock addToWishlist:', courseId);
  };
  const removeFromWishlist = (courseId: string) => {
    console.log('Mock removeFromWishlist:', courseId);
  };
  const clearWishlist = () => {
    console.log('Mock clearWishlist');
  };
  const isInWishlist = (courseId: string) => {
    console.log('Mock isInWishlist:', courseId);
    return false;
  };
  const clearError = () => {
    console.log('Mock clearError');
  };
  const addMultipleToWishlist = async (courseIds: string[]) => {
    console.log('Mock addMultipleToWishlist:', courseIds);
  };
  const removeMultipleFromWishlist = (courseIds: string[]) => {
    console.log('Mock removeMultipleFromWishlist:', courseIds);
  };
  const sortWishlist = (sortBy: 'addedAt' | 'title' | 'price' | 'rating') => {
    console.log('Mock sortWishlist:', sortBy);
  };
  const filterWishlist = (filter: {
    level?: string;
    priceRange?: [number, number];
  }) => {
    console.log('Mock filterWishlist:', filter);
    return [];
  };

  /**
   * 获取收藏夹中的特定商品
   */
  const getWishlistItem = (courseId: string): WishlistItem | undefined => {
    return items.find((item) => item.courseId === courseId);
  };

  /**
   * 检查收藏夹是否为空
   */
  const isEmpty = items.length === 0;

  /**
   * 切换收藏状态（如果已收藏则移除，否则添加）
   */
  const toggleWishlist = async (courseId: string): Promise<void> => {
    if (isInWishlist(courseId)) {
      removeFromWishlist(courseId);
    } else {
      await addToWishlist(courseId);
    }
  };

  return {
    // 状态
    items,
    totalItems,
    isLoading,
    error,

    // 操作方法
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    clearError,

    // 批量操作
    addMultipleToWishlist,
    removeMultipleFromWishlist,

    // 排序和过滤
    sortWishlist,
    filterWishlist,

    // 便利方法
    getWishlistItem,
    isEmpty,
    toggleWishlist,
  };
}

export default useWishlist;
