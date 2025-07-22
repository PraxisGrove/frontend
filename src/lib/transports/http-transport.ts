/**
 * HTTP 传输器配置
 */
interface HttpTransportOptions {
  host?: string;
  port?: number;
  path?: string;
  ssl?: boolean;
  auth?: {
    username: string;
    password: string;
  };
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

/**
 * HTTP 日志发送器
 * 将日志通过 HTTP 发送到 Logstash 或其他日志收集器
 */
export class HttpLogSender {
  private options: HttpTransportOptions;
  private url: string;

  constructor(options: HttpTransportOptions = {}) {
    this.options = {
      host: options.host || 'localhost',
      port: options.port || 5000,
      path: options.path || '/',
      ssl: options.ssl || false,
      timeout: options.timeout || 5000,
      retries: options.retries || 3,
      ...options,
    };

    const protocol = this.options.ssl ? 'https' : 'http';
    this.url = `${protocol}://${this.options.host}:${this.options.port}${this.options.path}`;
  }

  async sendLog(logData: any, attempt: number = 1): Promise<void> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...this.options.headers,
      };

      // 添加认证头
      if (this.options.auth) {
        const credentials = btoa(
          `${this.options.auth.username}:${this.options.auth.password}`
        );
        headers['Authorization'] = `Basic ${credentials}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.options.timeout
      );

      const response = await fetch(this.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(logData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      // 重试机制
      if (attempt < (this.options.retries || 3)) {
        const delay = Math.pow(2, attempt) * 1000; // 指数退避
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.sendLog(logData, attempt + 1);
      }

      // 最终失败，记录到控制台
      console.error('Failed to send log to HTTP endpoint:', error);
      throw error;
    }
  }
}

/**
 * 创建 HTTP 日志发送器实例
 */
export function createHttpLogSender(
  options?: HttpTransportOptions
): HttpLogSender {
  return new HttpLogSender(options);
}
