/**
 * 本地存储工具类
 * 提供统一的本地存储接口，支持localStorage、sessionStorage和cookie
 */

/**
 * 存储类型
 */
export type StorageType = 'localStorage' | 'sessionStorage' | 'cookie';

/**
 * 存储选项
 */
export interface StorageOptions {
  type?: StorageType;
  expires?: number; // 过期时间（毫秒）
  domain?: string; // cookie域名
  path?: string; // cookie路径
  secure?: boolean; // cookie安全标志
  sameSite?: 'strict' | 'lax' | 'none'; // cookie SameSite属性
}

/**
 * 存储项接口
 */
interface StorageItem<T = any> {
  value: T;
  expires?: number;
  timestamp: number;
}

/**
 * 本地存储管理器
 */
class StorageManager {
  /**
   * 检查存储是否可用
   */
  private isStorageAvailable(type: StorageType): boolean {
    if (typeof window === 'undefined') return false;

    try {
      if (type === 'cookie') return true;

      const storage = window[type];
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 设置存储项
   */
  setItem<T>(key: string, value: T, options: StorageOptions = {}): boolean {
    const {
      type = 'localStorage',
      expires,
      domain,
      path = '/',
      secure = false,
      sameSite = 'lax',
    } = options;

    if (!this.isStorageAvailable(type)) {
      console.warn(`Storage type ${type} is not available`);
      return false;
    }

    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expires: expires ? Date.now() + expires : undefined,
      };

      if (type === 'cookie') {
        this.setCookie(key, JSON.stringify(item), {
          expires: expires ? new Date(Date.now() + expires) : undefined,
          domain,
          path,
          secure,
          sameSite,
        });
      } else {
        window[type].setItem(key, JSON.stringify(item));
      }

      return true;
    } catch (error) {
      console.error(`Failed to set ${type} item:`, error);
      return false;
    }
  }

  /**
   * 获取存储项
   */
  getItem<T>(key: string, type: StorageType = 'localStorage'): T | null {
    if (!this.isStorageAvailable(type)) {
      return null;
    }

    try {
      let itemStr: string | null = null;

      if (type === 'cookie') {
        itemStr = this.getCookie(key);
      } else {
        itemStr = window[type].getItem(key);
      }

      if (!itemStr) return null;

      const item: StorageItem<T> = JSON.parse(itemStr);

      // 检查是否过期
      if (item.expires && Date.now() > item.expires) {
        this.removeItem(key, type);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error(`Failed to get ${type} item:`, error);
      return null;
    }
  }

  /**
   * 移除存储项
   */
  removeItem(key: string, type: StorageType = 'localStorage'): boolean {
    if (!this.isStorageAvailable(type)) {
      return false;
    }

    try {
      if (type === 'cookie') {
        this.setCookie(key, '', { expires: new Date(0) });
      } else {
        window[type].removeItem(key);
      }
      return true;
    } catch (error) {
      console.error(`Failed to remove ${type} item:`, error);
      return false;
    }
  }

  /**
   * 清空存储
   */
  clear(type: StorageType = 'localStorage'): boolean {
    if (!this.isStorageAvailable(type)) {
      return false;
    }

    try {
      if (type === 'cookie') {
        // 清空所有cookie（仅限当前域名）
        document.cookie.split(';').forEach((cookie) => {
          const eqPos = cookie.indexOf('=');
          const name =
            eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          this.setCookie(name, '', { expires: new Date(0) });
        });
      } else {
        window[type].clear();
      }
      return true;
    } catch (error) {
      console.error(`Failed to clear ${type}:`, error);
      return false;
    }
  }

  /**
   * 获取所有键
   */
  getKeys(type: StorageType = 'localStorage'): string[] {
    if (!this.isStorageAvailable(type)) {
      return [];
    }

    try {
      if (type === 'cookie') {
        return document.cookie
          .split(';')
          .map((cookie) => cookie.split('=')[0].trim())
          .filter(Boolean);
      } else {
        return Object.keys(window[type]);
      }
    } catch (error) {
      console.error(`Failed to get ${type} keys:`, error);
      return [];
    }
  }

  /**
   * 检查键是否存在
   */
  hasItem(key: string, type: StorageType = 'localStorage'): boolean {
    return this.getItem(key, type) !== null;
  }

  /**
   * 获取存储大小（字节）
   */
  getSize(type: StorageType = 'localStorage'): number {
    if (!this.isStorageAvailable(type)) {
      return 0;
    }

    try {
      let size = 0;

      if (type === 'cookie') {
        size = document.cookie.length;
      } else {
        const storage = window[type];
        for (const key in storage) {
          if (storage.hasOwnProperty(key)) {
            size += storage[key].length + key.length;
          }
        }
      }

      return size;
    } catch (error) {
      console.error(`Failed to get ${type} size:`, error);
      return 0;
    }
  }

  /**
   * 设置Cookie
   */
  private setCookie(
    name: string,
    value: string,
    options: {
      expires?: Date;
      domain?: string;
      path?: string;
      secure?: boolean;
      sameSite?: 'strict' | 'lax' | 'none';
    } = {}
  ): void {
    const {
      expires,
      domain,
      path = '/',
      secure = false,
      sameSite = 'lax',
    } = options;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      cookieStr += `; expires=${expires.toUTCString()}`;
    }

    if (domain) {
      cookieStr += `; domain=${domain}`;
    }

    cookieStr += `; path=${path}`;

    if (secure) {
      cookieStr += '; secure';
    }

    cookieStr += `; samesite=${sameSite}`;

    document.cookie = cookieStr;
  }

  /**
   * 获取Cookie
   */
  private getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }
}

/**
 * 存储管理器实例
 */
export const storage = new StorageManager();

/**
 * 预定义的存储键
 */
export const STORAGE_KEYS = {
  // 认证相关
  AUTH_TOKEN: 'auth-token',
  USER_INFO: 'user-info',
  REFRESH_TOKEN: 'refresh-token',

  // 用户偏好
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',

  // 应用状态
  LAST_ROUTE: 'last-route',
  SEARCH_HISTORY: 'search-history',
  RECENT_COURSES: 'recent-courses',

  // 缓存
  COURSE_CACHE: 'course-cache',
  USER_PROGRESS: 'user-progress',

  // 临时数据
  FORM_DRAFT: 'form-draft',
  TEMP_DATA: 'temp-data',
} as const;

/**
 * 便捷方法
 */
export const storageHelpers = {
  // 认证相关
  setAuthToken: (token: string, remember = false) => {
    const type = remember ? 'localStorage' : 'sessionStorage';
    return storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token, { type });
  },

  getAuthToken: () => {
    return (
      storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN) ||
      storage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN, 'sessionStorage')
    );
  },

  removeAuthToken: () => {
    storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    storage.removeItem(STORAGE_KEYS.AUTH_TOKEN, 'sessionStorage');
  },

  // 用户偏好
  setUserPreference: <T>(key: string, value: T) => {
    return storage.setItem(key, value, { type: 'localStorage' });
  },

  getUserPreference: <T>(key: string): T | null => {
    return storage.getItem<T>(key, 'localStorage');
  },

  // 临时数据
  setTempData: <T>(key: string, value: T, expires = 60 * 60 * 1000) => {
    return storage.setItem(key, value, {
      type: 'sessionStorage',
      expires,
    });
  },

  getTempData: <T>(key: string): T | null => {
    return storage.getItem<T>(key, 'sessionStorage');
  },

  // 缓存数据
  setCache: <T>(key: string, value: T, expires = 5 * 60 * 1000) => {
    return storage.setItem(key, value, {
      type: 'localStorage',
      expires,
    });
  },

  getCache: <T>(key: string): T | null => {
    return storage.getItem<T>(key, 'localStorage');
  },
};
