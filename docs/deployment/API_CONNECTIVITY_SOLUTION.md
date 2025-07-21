# 🔧 API 连接问题解决方案

## 🎯 问题分析

### 根本原因
1. **后端 API 服务器未运行** - 配置指向 `http://localhost:8000/api`，但该服务不可用
2. **缺少错误回退机制** - 当 API 不可用时，应用程序崩溃
3. **没有用户友好的错误提示** - 用户不知道发生了什么

### 错误表现
- `GET /courses/categories {}` - API 端点无响应
- `AxiosError` - 网络连接完全失败
- 控制台错误影响用户体验

## ✅ 完整解决方案

### 1. API 回退机制 (`src/lib/api-fallback.ts`)

**功能特性:**
- ✅ 自动检测 API 健康状态
- ✅ 智能回退到模拟数据
- ✅ 缓存健康检查结果（30秒）
- ✅ 完整的模拟数据集

**核心组件:**
```typescript
// 健康检查
export async function checkApiHealth(): Promise<boolean>

// 模拟数据
export const mockCategories = [...]
export const mockCourses: Course[] = [...]

// 回退处理器
export class ApiFallbackHandler
```

### 2. 增强的 API 服务 (`src/api/courses.ts`)

**更新的方法:**
- ✅ `getCourses()` - 支持回退到模拟数据
- ✅ `getCategories()` - 支持回退到模拟分类
- ✅ `getCourse(id)` - 支持回退到模拟课程详情

**回退逻辑:**
```typescript
try {
  const isHealthy = await ApiFallbackHandler.isApiHealthy();
  if (isHealthy) {
    return await publicApi.get('/courses');
  } else {
    return mockData; // 回退到模拟数据
  }
} catch (error) {
  return mockData; // 错误时也回退
}
```

### 3. API 状态指示器 (`src/components/common/ApiStatusIndicator.tsx`)

**功能特性:**
- ✅ 实时显示 API 连接状态
- ✅ 用户友好的状态提示
- ✅ 自动重新检查功能
- ✅ 离线模式提示

**状态类型:**
- 🟢 **API 连接正常** - 所有功能正常运行
- 🟡 **离线模式** - 使用模拟数据
- ⚪ **检查中** - 正在检查连接状态

### 4. 健康检查 API (`src/app/api/health/route.ts`)

**端点:** `GET /api/health`

**响应示例:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "services": {
    "frontend": "healthy",
    "backend": {
      "status": "unreachable",
      "url": "http://localhost:8000/api",
      "error": "Connection refused"
    }
  }
}
```

### 5. 模拟 API 服务器 (`scripts/start-mock-api.js`)

**功能:**
- ✅ 完整的 REST API 模拟
- ✅ CORS 支持
- ✅ 健康检查端点
- ✅ 分页支持

**可用端点:**
```
GET  /api/health
GET  /api/courses/categories  
GET  /api/courses
GET  /api/courses/:id
```

### 6. 开发脚本 (`package.json`)

**新增脚本:**
```json
{
  "mock-api": "node scripts/start-mock-api.js",
  "dev:full": "concurrently \"npm run mock-api\" \"npm run dev\""
}
```

## 🚀 使用方法

### 方案 A: 使用模拟 API 服务器

1. **启动模拟 API:**
   ```bash
   pnpm run mock-api
   ```

2. **启动前端应用:**
   ```bash
   pnpm dev
   ```

3. **或者同时启动:**
   ```bash
   pnpm run dev:full
   ```

### 方案 B: 纯回退模式

1. **直接启动前端:**
   ```bash
   pnpm dev
   ```

2. **应用会自动:**
   - 检测 API 不可用
   - 回退到模拟数据
   - 显示离线模式提示

## 📊 测试验证

### 1. API 可用性测试
```bash
# 测试健康检查
curl http://localhost:3001/api/health

# 测试模拟 API
curl http://localhost:8000/api/health
curl http://localhost:8000/api/courses/categories
```

### 2. 回退机制测试
1. 启动前端应用（不启动后端）
2. 访问 `/courses` 页面
3. 验证：
   - ✅ 页面正常加载
   - ✅ 显示模拟课程数据
   - ✅ 显示"离线模式"提示
   - ✅ 无控制台错误

### 3. 状态切换测试
1. 前端运行时启动模拟 API
2. 观察状态指示器变化
3. 验证数据源切换

## 🎯 解决的问题

### ✅ 已解决
1. **网络错误** - 不再有 AxiosError 阻塞应用
2. **用户体验** - 优雅的错误处理和状态提示
3. **开发效率** - 无需后端即可开发前端
4. **错误提示** - 清晰的状态指示和错误信息

### 🔄 自动处理
1. **API 健康检查** - 每30秒自动检查
2. **智能回退** - 自动切换数据源
3. **状态缓存** - 避免频繁检查
4. **错误恢复** - API 恢复时自动切换回真实数据

## 📈 性能优化

### 缓存策略
- ✅ 健康检查结果缓存 30 秒
- ✅ 避免重复网络请求
- ✅ 快速响应用户操作

### 用户体验
- ✅ 无感知的数据源切换
- ✅ 清晰的状态提示
- ✅ 快速的页面加载

## 🔮 后续扩展

### 短期改进
1. 添加更多模拟数据
2. 实现数据同步机制
3. 添加离线存储

### 长期规划
1. 服务工作者（Service Worker）支持
2. 智能数据预取
3. 实时状态同步

## 🎉 总结

通过实施这个完整的 API 连接解决方案，我们成功地：

1. **解决了根本问题** - API 不可用不再导致应用崩溃
2. **提升了用户体验** - 清晰的状态提示和无缝的回退
3. **改善了开发体验** - 无需后端即可完整开发前端
4. **建立了可扩展架构** - 为未来的功能扩展奠定基础

现在课程页面可以在任何情况下正常工作，无论后端 API 是否可用！🚀
