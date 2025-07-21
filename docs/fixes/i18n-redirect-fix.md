# 国际化重定向问题修复

## 问题描述

当访问 `http://localhost:3000` 时，会自动跳转到 `http://localhost:3000/zh-CN`，这是由于中间件中的国际化配置导致的自动语言前缀重定向。

## 问题根源

在 `src/middleware.ts` 中，有以下配置：

```typescript
// 支持的语言列表
const locales = ['zh-CN', 'en-US'];

// 默认语言
const defaultLocale = 'zh-CN';

// 中间件会检查路径是否包含语言前缀
const pathnameIsMissingLocale = locales.every(
  locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
);

// 如果没有语言前缀，会自动重定向到带有默认语言的路径
if (pathnameIsMissingLocale) {
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}
```

这导致所有没有语言前缀的路径都会被重定向到带有 `/zh-CN` 前缀的路径。

## 解决方案

### 方案 1：完全禁用国际化重定向（已实施）

添加了一个配置开关来控制是否启用国际化重定向：

```typescript
/**
 * 是否启用国际化重定向
 * 设置为 false 可以禁用自动语言前缀重定向
 */
const enableI18nRedirect = false;

// 在中间件中使用条件判断
if (enableI18nRedirect) {
  // 国际化重定向逻辑
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }
}
```

### 方案 2：智能重定向（可选）

如果将来需要国际化功能，可以实现更智能的重定向逻辑：

```typescript
// 只对特定路径启用国际化重定向
const i18nEnabledPaths = ['/docs', '/help', '/support'];

const shouldEnableI18n = i18nEnabledPaths.some(path => 
  pathname.startsWith(path)
);

if (enableI18nRedirect && shouldEnableI18n) {
  // 执行国际化重定向逻辑
}
```

## 修复结果

✅ **修复前**: `http://localhost:3000` → 自动重定向到 `http://localhost:3000/zh-CN`

✅ **修复后**: `http://localhost:3000` → 直接访问，不会重定向

## 如何启用国际化功能

如果将来需要启用国际化功能，只需要：

1. 将 `enableI18nRedirect` 设置为 `true`
2. 确保您的页面结构支持语言前缀路由
3. 创建相应的语言版本页面

```typescript
// 启用国际化重定向
const enableI18nRedirect = true;
```

## 页面结构建议

如果启用国际化，建议的页面结构：

```
src/app/
├── page.tsx                    # 默认首页（会重定向到 /zh-CN）
├── [locale]/                   # 动态语言路由
│   ├── page.tsx               # /zh-CN 或 /en-US 首页
│   ├── about/
│   │   └── page.tsx           # /zh-CN/about 或 /en-US/about
│   └── contact/
│       └── page.tsx           # /zh-CN/contact 或 /en-US/contact
└── api/                       # API 路由（不受国际化影响）
```

## 测试验证

1. 启动开发服务器：`pnpm dev`
2. 访问 `http://localhost:3001`（或您的端口）
3. 确认不会自动重定向到 `/zh-CN`

## 相关文件

- `src/middleware.ts` - 中间件配置文件
- `next.config.js` - Next.js 配置文件

## 注意事项

1. 如果您的应用已经有基于语言前缀的路由结构，启用国际化重定向前请确保页面结构正确
2. 静态资源和 API 路由不受国际化重定向影响
3. 可以根据需要自定义哪些路径启用国际化重定向
