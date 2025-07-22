/**
 * Winston + Elasticsearch 日志系统
 * 支持结构化日志记录和多种传输方式
 */
import winston from 'winston';
import { createHttpLogSender } from './transports/http-transport';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}

/**
 * 日志上下文接口
 */
export interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  ip?: string;
  userAgent?: string;
  url?: string;
  method?: string;
  statusCode?: number;
  responseTime?: number;
  type?: string;
  performanceName?: string;
  duration?: number;
  event?: string;
  metadata?: Record<string, any>;
}

/**
 * 日志格式化器
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta,
    });
  })
);

// 全局 HTTP 日志发送器
let globalHttpLogSender: any = null;

/**
 * 创建 Winston Logger 实例
 */
function createLogger() {
  const transports: winston.transport[] = [];

  // 控制台输出 (开发环境)
  if (process.env.NODE_ENV === 'development') {
    transports.push(
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            const metaStr = Object.keys(meta).length
              ? JSON.stringify(meta, null, 2)
              : '';
            return `${timestamp} [${level}]: ${message} ${metaStr}`;
          })
        ),
      })
    );
  }

  // 文件输出 (仅服务端)
  if (typeof window === 'undefined') {
    transports.push(
      // 错误日志文件
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: logFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      // 组合日志文件
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: logFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
  }

  // HTTP 日志发送器 (发送到 Logstash)
  if (process.env.LOGSTASH_HOST && !globalHttpLogSender) {
    globalHttpLogSender = createHttpLogSender({
      host: process.env.LOGSTASH_HOST,
      port: parseInt(process.env.LOGSTASH_PORT || '5000'),
      timeout: 5000,
      retries: 3,
    });
  }

  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: {
      service: 'praxisgrove-frontend',
      environment: process.env.NODE_ENV || 'development',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    },
    transports,
    // 异常处理 (仅服务端)
    ...(typeof window === 'undefined' && {
      exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' }),
      ],
    }),
  });
}

/**
 * Logger 实例
 */
export const logger = createLogger();

/**
 * 日志记录器类
 */
export class Logger {
  private static instance: Logger;
  private winston: winston.Logger;

  private constructor() {
    this.winston = logger;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * 记录错误日志
   */
  error(message: string, context?: LogContext, error?: Error): void {
    const logData = {
      level: 'error',
      message,
      ...context,
      stack: error?.stack,
      errorMessage: error?.message,
      timestamp: new Date().toISOString(),
    };

    this.winston.error(message, logData);

    // 发送到 HTTP 端点
    this.sendToHttp(logData);
  }

  /**
   * 记录警告日志
   */
  warn(message: string, context?: LogContext): void {
    this.winston.warn(message, context);
  }

  /**
   * 记录信息日志
   */
  info(message: string, context?: LogContext): void {
    this.winston.info(message, context);
  }

  /**
   * 记录HTTP请求日志
   */
  http(message: string, context?: LogContext): void {
    this.winston.http(message, context);
  }

  /**
   * 记录调试日志
   */
  debug(message: string, context?: LogContext): void {
    this.winston.debug(message, context);
  }

  /**
   * 记录API请求
   */
  apiRequest(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    context?: LogContext
  ): void {
    this.http(`API ${method} ${url} - ${statusCode} (${responseTime}ms)`, {
      ...context,
      method,
      url,
      statusCode,
      responseTime,
      type: 'api_request',
    });
  }

  /**
   * 记录用户行为
   */
  userAction(action: string, context?: LogContext): void {
    this.info(`User Action: ${action}`, {
      ...context,
      action,
      type: 'user_action',
    });
  }

  /**
   * 记录性能指标
   */
  performance(name: string, duration: number, context?: LogContext): void {
    this.info(`Performance: ${name} took ${duration}ms`, {
      ...context,
      performanceName: name,
      duration,
      type: 'performance',
    });
  }

  /**
   * 记录业务事件
   */
  business(event: string, context?: LogContext): void {
    this.info(`Business Event: ${event}`, {
      ...context,
      event,
      type: 'business',
    });
  }

  /**
   * 发送日志到 HTTP 端点
   */
  private sendToHttp(logData: any): void {
    if (
      globalHttpLogSender &&
      (process.env.NODE_ENV === 'production' ||
        process.env.ENABLE_HTTP_LOGGING === 'true')
    ) {
      globalHttpLogSender.sendLog(logData).catch((error: any) => {
        console.error('Failed to send log via HTTP:', error);
      });
    }
  }
}

/**
 * 默认日志实例
 */
export const log = Logger.getInstance();

/**
 * 便捷的日志函数
 */
export const logError = (
  message: string,
  context?: LogContext,
  error?: Error
) => log.error(message, context, error);

export const logWarn = (message: string, context?: LogContext) =>
  log.warn(message, context);

export const logInfo = (message: string, context?: LogContext) =>
  log.info(message, context);

export const logDebug = (message: string, context?: LogContext) =>
  log.debug(message, context);

export const logApiRequest = (
  method: string,
  url: string,
  statusCode: number,
  responseTime: number,
  context?: LogContext
) => log.apiRequest(method, url, statusCode, responseTime, context);

export const logUserAction = (action: string, context?: LogContext) =>
  log.userAction(action, context);

export const logPerformance = (
  name: string,
  duration: number,
  context?: LogContext
) => log.performance(name, duration, context);

export const logBusiness = (event: string, context?: LogContext) =>
  log.business(event, context);

// React Hook for logging
export function useLogger() {
  return log;
}
