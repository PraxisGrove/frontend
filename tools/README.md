# PraxisGrove 优化工具

## 🎯 概述

这个目录包含了用于分析和优化 PraxisGrove 项目的简化工具。专注于提供可靠、快速的项目性能分析。

## 📁 工具清单

### 🚀 快速优化工具

#### `quick-optimize.js`

**功能**: 快速分析项目状态和性能指标
**用途**: 一键获取项目健康状况报告

```bash
# 运行快速优化分析
npm run optimize

# 或直接运行
node scripts/quick-optimize.js
```

**功能**:

- ✅ 项目构建验证
- ✅ 打包大小分析
- ✅ 组件使用统计
- ✅ 优化建议生成
- ✅ 详细报告输出

## 🚀 快速开始

### 一键优化分析（推荐）

```bash
# 运行完整的项目分析
npm run optimize
```

**输出内容**:

- 📊 项目构建状态
- 📦 打包大小详情
- 📈 组件使用统计
- 💡 优化建议
- 📄 详细 JSON 报告

## 📊 分析报告示例

```json
{
  "timestamp": "2025-01-20T19:19:25.544Z",
  "buildTime": "78.6",
  "bundleSize": {
    "total": 2883584,
    "js": 2611200,
    "css": 163840
  },
  "componentUsage": {
    "shadcnui": 0,
    "aceternity": 1,
    "reactbit": 0,
    "unified": 0
  },
  "suggestions": ["考虑使用统一导入来简化组件管理"]
}
```

## 🛡️ 安全特性

- ✅ **只读分析**: 不修改任何项目文件
- ✅ **构建验证**: 确保项目可以正常构建
- ✅ **错误处理**: 优雅处理各种异常情况
- ✅ **详细日志**: 提供清晰的执行过程反馈

## 📋 使用场景

### 项目健康检查

```bash
# 定期检查项目状态
npm run optimize
```

### 性能监控

```bash
# 监控打包大小变化
npm run optimize
# 查看生成的 quick-optimization-report.json
```

### 开发调试

```bash
# 验证项目构建状态
npm run optimize
```

## 🚨 注意事项

- ✅ **安全**: 工具只进行分析，不修改项目文件
- ✅ **快速**: 通常在 1-2 分钟内完成分析
- ✅ **详细**: 提供完整的项目状态报告
- ✅ **可靠**: 经过充分测试，无卡顿问题

## 📚 相关文档

- [组件库文档](../src/components/README.md)
- [项目优化指南](../docs/)

---

**工具版本**: v2.0.0 (简化版)
**兼容项目**: PraxisGrove Frontend v0.1.0
**最后更新**: 2025-01-20
