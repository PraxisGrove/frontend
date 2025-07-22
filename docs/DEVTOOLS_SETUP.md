# 开发工具集成指南

本文档介绍如何配置和使用项目中集成的开发工具。

## 🚀 已集成的工具

### 1. Swagger/OpenAPI 文档系统

**功能**: 交互式 API 文档，支持在线测试

**访问地址**: `/api-docs`

**配置文件**:

- `src/lib/swagger.ts` - OpenAPI 规范定义
- `src/app/api/swagger.json/route.ts` - JSON 端点
- `src/styles/swagger.css` - 自定义样式

**特性**:

- 基于 OpenAPI 3.0 规范
- 支持在线 API 测试
- 自动生成接口文档
- 响应式设计，适配移动端
- 与项目主题一致的样式

**使用方式**:

1. 访问 `/api-docs` 查看完整文档
2. 在 API 文件中添加 JSDoc 注释自动生成文档
3. 下载 OpenAPI 规范: `/api/swagger.json`

### 2. GitHub Actions CI/CD 流水线

**功能**: 自动化构建、测试、安全扫描和部署

**配置文件**: `.github/workflows/ci.yml`

**包含的步骤**:

- 代码质量检查 (TypeScript, ESLint, Prettier)
- 单元测试和覆盖率报告
- E2E 测试
- Snyk 安全扫描
- 自动部署到 Vercel

**设置步骤**:

1. 在 GitHub 仓库设置中添加以下 Secrets:

   ```
   VERCEL_TOKEN=你的Vercel令牌
   VERCEL_ORG_ID=你的Vercel组织ID
   VERCEL_PROJECT_ID=你的Vercel项目ID
   SNYK_TOKEN=你的Snyk令牌
   ```

2. 推送代码到 `main` 或 `develop` 分支即可触发流水线

### 2. Snyk 安全扫描

**功能**: 自动检测依赖漏洞和安全问题

**集成方式**:

- GitHub Actions 中自动运行
- 可手动运行: `npx snyk test`

**设置步骤**:

1. 注册 [Snyk 账号](https://snyk.io/)
2. 获取 API Token
3. 添加到 GitHub Secrets: `SNYK_TOKEN`

### 3. Sentry 错误监控

**功能**: 实时错误追踪、性能监控、用户会话回放

**配置文件**:

- `sentry.client.config.ts` - 客户端配置
- `sentry.server.config.ts` - 服务端配置
- `sentry.edge.config.ts` - Edge Runtime 配置

**设置步骤**:

1. 注册 [Sentry 账号](https://sentry.io/)
2. 创建新项目，获取 DSN
3. 在 `.env.local` 中设置:
   ```
   NEXT_PUBLIC_SENTRY_DSN=你的Sentry_DSN
   ```

**使用方式**:

```typescript
import * as Sentry from '@sentry/nextjs';

// 手动报告错误
Sentry.captureException(new Error('Something went wrong'));

// 添加用户上下文
Sentry.setUser({ id: '123', email: 'user@example.com' });

// 添加自定义标签
Sentry.setTag('component', 'UserProfile');
```

### 4. Lighthouse CI 性能监控

**功能**: 自动化性能、可访问性、SEO 检测

**配置文件**: `lighthouserc.js`

**触发条件**: Pull Request 时自动运行

**性能标准**:

- Performance: ≥ 80%
- Accessibility: ≥ 90%
- Best Practices: ≥ 80%
- SEO: ≥ 80%

## 📊 监控和报告

### 错误监控

- **Sentry Dashboard**: 实时错误追踪和性能监控
- **GitHub Security**: 依赖漏洞报告
- **Vercel Analytics**: 部署和运行时指标

### 性能监控

- **Lighthouse CI**: 自动化性能测试
- **Sentry Performance**: 真实用户性能数据
- **Vercel Speed Insights**: 实际用户体验指标

## 🔧 本地开发

### 运行安全扫描

```bash
# 检查依赖漏洞
npx snyk test

# 检查代码安全问题
npx snyk code test
```

### 运行性能测试

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start

# 在另一个终端运行 Lighthouse
npx lhci autorun
```

### 测试 Sentry 集成

```bash
# 开发环境测试错误上报
# 在代码中添加测试错误，查看 Sentry 控制台
```

## 🚨 故障排除

### CI/CD 流水线失败

1. 检查 GitHub Secrets 是否正确设置
2. 确认 Vercel 项目配置正确
3. 查看具体失败步骤的日志

### Sentry 错误上报不工作

1. 确认 DSN 配置正确
2. 检查网络连接
3. 验证环境变量设置

### 性能测试失败

1. 确认应用能正常启动
2. 检查 Lighthouse 配置
3. 验证性能标准是否过于严格

## 📈 最佳实践

1. **定期检查安全报告**: 每周查看 Snyk 和 GitHub Security 报告
2. **监控错误趋势**: 通过 Sentry 跟踪错误率变化
3. **性能预算管理**: 设置合理的 Lighthouse 性能标准
4. **及时修复问题**: 优先处理高危安全漏洞和性能问题

## 🔗 相关链接

- [Snyk 文档](https://docs.snyk.io/)
- [Sentry Next.js 文档](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Lighthouse CI 文档](https://github.com/GoogleChrome/lighthouse-ci)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
