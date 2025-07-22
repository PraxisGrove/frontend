# API 文档系统使用指南

## 📋 概述

PraxisGrove API 文档系统基于 OpenAPI 3.0 规范，提供完整的 API 接口文档和在线测试功能。

## 🚀 访问方式

### 在线文档

- **URL**: `http://localhost:3000/api-docs`
- **功能**: 交互式 API 文档，支持在线测试

### JSON 规范

- **URL**: `http://localhost:3000/api/swagger.json`
- **功能**: 标准 OpenAPI JSON 格式，可导入到其他工具

### 健康检查

- **URL**: `http://localhost:3000/api/health`
- **功能**: API 服务状态监控

## 🎯 主要功能

### 1. 交互式测试

- 点击任意 API 端点
- 点击 "Try it out" 按钮
- 填写必要参数
- 点击 "Execute" 执行请求
- 查看实时响应结果

### 2. 认证测试

```bash
# 1. 首先登录获取 token
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# 2. 复制返回的 token
# 3. 在 Swagger UI 中点击 "Authorize" 按钮
# 4. 输入: Bearer <your-token>
# 5. 现在可以测试需要认证的 API
```

### 3. 数据模型查看

- 滚动到页面底部查看 "Schemas" 部分
- 点击任意模型名称查看详细结构
- 查看字段类型、验证规则和示例值

## 📊 API 分组说明

### System (系统)

- `GET /api/health` - 健康检查
- `GET /api/swagger.json` - 获取 API 规范

### Authentication (认证)

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/profile` - 获取用户信息
- `PUT /api/auth/profile` - 更新用户信息
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/refresh` - 刷新令牌

### Courses (课程)

- `GET /api/courses` - 获取课程列表
- `GET /api/courses/{id}` - 获取课程详情
- `GET /api/courses/categories` - 获取课程分类
- `GET /api/courses/{id}/lessons` - 获取课程课时
- `POST /api/courses/{id}/enroll` - 报名课程

### Learning (学习)

- `PUT /api/lessons/{id}/progress` - 更新学习进度

## 🔧 开发者工具集成

### Postman 集成

```bash
# 1. 打开 Postman
# 2. 点击 Import
# 3. 选择 "Link" 标签
# 4. 输入: http://localhost:3000/api/swagger.json
# 5. 点击 Continue 导入所有 API
```

### 代码生成

```bash
# 使用 OpenAPI Generator 生成客户端代码
npx @openapitools/openapi-generator-cli generate \
  -i http://localhost:3000/api/swagger.json \
  -g typescript-axios \
  -o ./generated-client

# 生成 Python 客户端
npx @openapitools/openapi-generator-cli generate \
  -i http://localhost:3000/api/swagger.json \
  -g python \
  -o ./python-client
```

### cURL 示例

```bash
# 获取课程列表
curl -X GET "http://localhost:8000/api/courses?page=1&limit=12" \
  -H "Content-Type: application/json"

# 用户登录
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# 获取用户信息 (需要认证)
curl -X GET "http://localhost:8000/api/auth/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>"
```

## 📈 最佳实践

### 1. 认证流程

1. 使用 `/api/auth/login` 获取访问令牌
2. 在后续请求中添加 `Authorization: Bearer <token>` 头
3. 令牌过期时使用 `/api/auth/refresh` 刷新
4. 登出时调用 `/api/auth/logout` 使令牌失效

### 2. 错误处理

所有 API 错误都遵循统一格式：

```json
{
  "success": false,
  "error": "ERROR_TYPE",
  "message": "错误描述",
  "details": {},
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

### 3. 分页处理

列表 API 支持分页参数：

- `page`: 页码 (从 1 开始)
- `limit`: 每页数量 (最大 100)
- `sort`: 排序字段
- `order`: 排序方向 (asc/desc)

### 4. 数据验证

- 所有输入数据都会进行验证
- 查看 API 文档中的参数说明了解验证规则
- 400 错误响应会包含具体的验证失败信息

## 🛠️ 故障排除

### 常见问题

1. **CORS 错误**
   - 确保前端运行在 `http://localhost:3000`
   - 检查 API 服务器的 CORS 配置

2. **认证失败**
   - 检查令牌格式: `Bearer <token>`
   - 确认令牌未过期
   - 验证用户权限

3. **404 错误**
   - 检查 API 端点 URL 是否正确
   - 确认 API 服务器正在运行
   - 验证路径参数格式

4. **文档加载失败**
   - 刷新页面重试
   - 检查浏览器控制台错误
   - 确认 `/api/swagger.json` 可访问

### 调试技巧

1. **使用浏览器开发者工具**
   - 查看 Network 标签页的请求详情
   - 检查 Console 标签页的错误信息

2. **启用详细日志**
   - 在 Swagger UI 中查看请求/响应详情
   - 使用 `curl -v` 查看详细的 HTTP 交互

3. **健康检查**
   - 访问 `/api/health` 检查服务状态
   - 查看返回的系统信息和检查结果

## 📞 支持

如果遇到问题或需要帮助：

1. 查看本文档的故障排除部分
2. 检查 GitHub Issues
3. 联系开发团队

---

**更新时间**: 2024-01-01  
**文档版本**: 1.0.0
