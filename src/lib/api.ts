import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from 'axios';
import { env } from './env';
import { notificationHelpers } from '@/store/ui';

/**
 * API响应接口
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
}

/**
 * API错误接口
 */
export interface ApiError {
  error: string;
  message: string;
  details?: any;
  status?: number;
}

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorNotification?: boolean;
  skipLoadingIndicator?: boolean;
}

/**
 * 扩展的 Axios 请求配置
 */
interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorNotification?: boolean;
  skipLoadingIndicator?: boolean;
}

/**
 * 创建API客户端实例
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: env.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // 包含cookies
  });

  return client;
};

/**
 * API客户端实例
 */
export const apiClient = createApiClient();

/**
 * 请求拦截器
 */
apiClient.interceptors.request.use(
  (config) => {
    // 确保 headers 存在
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // 添加认证token
    const token = getAuthToken();
    const extendedConfig = config as ExtendedAxiosRequestConfig;
    if (token && !extendedConfig.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加请求ID用于追踪
    config.headers['X-Request-ID'] = generateRequestId();

    // 添加时间戳
    config.headers['X-Request-Time'] = Date.now().toString();

    // 日志记录（开发环境）
    if (env.APP_ENV === 'development') {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          headers: config.headers,
          data: config.data,
          params: config.params,
        }
      );
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 日志记录（开发环境）
    if (env.APP_ENV === 'development') {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        }
      );
    }

    return response;
  },
  (error: AxiosError) => {
    const config = error.config as ExtendedAxiosRequestConfig;

    // 日志记录
    console.error(
      `❌ API Error: ${config?.method?.toUpperCase()} ${config?.url}`,
      {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      }
    );

    // 处理不同类型的错误
    handleApiError(error, config);

    return Promise.reject(error);
  }
);

/**
 * 获取认证token
 */
function getAuthToken(): string | null {
  // 从localStorage或cookie中获取token
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token') || null;
  }
  return null;
}

/**
 * 生成请求ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 处理API错误
 */
function handleApiError(
  error: AxiosError,
  config?: ExtendedAxiosRequestConfig
) {
  const status = error.response?.status;
  const data = error.response?.data as ApiError;

  // 跳过错误通知的请求
  if (config?.skipErrorNotification) {
    return;
  }

  switch (status) {
    case 401:
      // 未授权 - 清除认证信息并重定向到登录页
      handleUnauthorized();
      break;

    case 403:
      // 禁止访问
      notificationHelpers.error('访问被拒绝', '您没有权限执行此操作');
      break;

    case 404:
      // 资源不存在
      notificationHelpers.error('资源不存在', '请求的资源未找到');
      break;

    case 422:
      // 验证错误
      const validationMessage =
        data?.details?.map((d: any) => d.message).join(', ') || '数据验证失败';
      notificationHelpers.error('数据验证失败', validationMessage);
      break;

    case 429:
      // 请求过于频繁
      notificationHelpers.warning('请求过于频繁', '请稍后再试');
      break;

    case 500:
    case 502:
    case 503:
    case 504:
      // 服务器错误
      notificationHelpers.error('服务器错误', '服务暂时不可用，请稍后重试');
      break;

    default:
      // 其他错误
      const errorMessage =
        data?.message || error.message || '网络错误，请检查网络连接';
      notificationHelpers.error('请求失败', errorMessage);
  }
}

/**
 * 处理未授权错误
 */
function handleUnauthorized() {
  // 清除认证信息
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-info');
  }

  // 显示错误通知
  notificationHelpers.error('登录已过期', '请重新登录');

  // 重定向到登录页
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
    window.location.href = loginUrl;
  }
}

/**
 * API请求方法封装
 */
export const api = {
  /**
   * GET请求
   */
  get: async <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return (response.data.data || response.data) as T;
  },

  /**
   * POST请求
   */
  post: async <T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return (response.data.data || response.data) as T;
  },

  /**
   * PUT请求
   */
  put: async <T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return (response.data.data || response.data) as T;
  },

  /**
   * PATCH请求
   */
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return (response.data.data || response.data) as T;
  },

  /**
   * DELETE请求
   */
  delete: async <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return (response.data.data || response.data) as T;
  },

  /**
   * 上传文件
   */
  upload: async <T = any>(
    url: string,
    file: File,
    config?: RequestConfig
  ): Promise<T> => {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: RequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    const response = await apiClient.post<ApiResponse<T>>(
      url,
      formData,
      uploadConfig
    );
    return (response.data.data || response.data) as T;
  },

  /**
   * 下载文件
   */
  download: async (
    url: string,
    filename?: string,
    config?: RequestConfig
  ): Promise<void> => {
    const response = await apiClient.get(url, {
      ...config,
      responseType: 'blob',
    });

    // 创建下载链接
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },
};

/**
 * 创建带有特定配置的API实例
 */
export const createApiInstance = (baseConfig: RequestConfig) => {
  return {
    get: <T = any>(url: string, config?: RequestConfig) =>
      api.get<T>(url, { ...baseConfig, ...config }),
    post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      api.post<T>(url, data, { ...baseConfig, ...config }),
    put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      api.put<T>(url, data, { ...baseConfig, ...config }),
    patch: <T = any>(url: string, data?: any, config?: RequestConfig) =>
      api.patch<T>(url, data, { ...baseConfig, ...config }),
    delete: <T = any>(url: string, config?: RequestConfig) =>
      api.delete<T>(url, { ...baseConfig, ...config }),
  };
};

/**
 * 无认证API实例（用于公开接口）
 */
export const publicApi = createApiInstance({ skipAuth: true });

/**
 * 静默API实例（不显示错误通知）
 */
export const silentApi = createApiInstance({ skipErrorNotification: true });
