#!/usr/bin/env node

/**
 * 快速组件优化脚本 - 超简单版本
 * 专门解决 PraxisGrove 项目的组件冗余问题
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 主要功能：分析和清理
function main() {
  log('🚀 开始快速组件优化...', 'bright');
  log('='.repeat(50), 'cyan');

  try {
    // 1. 检查当前构建状态
    log('📋 步骤 1: 检查项目状态...', 'blue');

    const buildStart = Date.now();
    execSync('pnpm build', { stdio: 'pipe', timeout: 120000 });
    const buildTime = ((Date.now() - buildStart) / 1000).toFixed(1);

    log(`✅ 项目构建成功 (${buildTime}s)`, 'green');

    // 2. 分析打包大小
    log('📦 步骤 2: 分析打包大小...', 'blue');

    const nextDir = path.join(process.cwd(), '.next');
    const staticDir = path.join(nextDir, 'static');

    let totalSize = 0;
    let jsSize = 0;
    let cssSize = 0;

    if (fs.existsSync(staticDir)) {
      function calculateSize(dir) {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory()) {
            calculateSize(filePath);
          } else {
            totalSize += stat.size;
            if (file.endsWith('.js')) jsSize += stat.size;
            if (file.endsWith('.css')) cssSize += stat.size;
          }
        });
      }

      calculateSize(staticDir);
    }

    log(`📊 当前打包大小:`, 'green');
    log(`   总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    log(`   JavaScript: ${(jsSize / 1024 / 1024).toFixed(2)} MB`);
    log(`   CSS: ${(cssSize / 1024 / 1024).toFixed(2)} MB`);

    // 3. 分析组件使用情况
    log('🔍 步骤 3: 分析组件使用情况...', 'blue');

    const srcDir = path.join(process.cwd(), 'src');
    let componentImports = {
      shadcnui: 0,
      aceternity: 0,
      reactbit: 0,
      unified: 0,
    };

    function scanFiles(dir) {
      try {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);

          if (stat.isDirectory() && !file.startsWith('.')) {
            scanFiles(filePath);
          } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(filePath, 'utf8');

            // 统计导入
            const imports =
              content.match(
                /import.*from.*['"`]@\/components\/(ui|aceternity|reactbit|unified)['"`]/g
              ) || [];
            imports.forEach((imp) => {
              if (imp.includes('/ui')) componentImports.shadcnui++;
              else if (imp.includes('/aceternity'))
                componentImports.aceternity++;
              else if (imp.includes('/reactbit')) componentImports.reactbit++;
              else if (imp.includes('/unified')) componentImports.unified++;
            });
          }
        });
      } catch (error) {
        // 忽略权限错误
      }
    }

    scanFiles(srcDir);

    log(`📈 组件使用统计:`, 'green');
    log(`   shadcn/ui: ${componentImports.shadcnui} 次导入`);
    log(`   Aceternity UI: ${componentImports.aceternity} 次导入`);
    log(`   ReactBit UI: ${componentImports.reactbit} 次导入`);
    log(`   统一导入: ${componentImports.unified} 次导入`);

    // 4. 检查统一导出文件
    log('📝 步骤 4: 检查统一导出文件...', 'blue');

    const unifiedPath = 'src/components/unified/index.ts';
    if (fs.existsSync(unifiedPath)) {
      const content = fs.readFileSync(unifiedPath, 'utf8');
      const lines = content.split('\n').length;
      const exports = (content.match(/export\s+{[^}]+}/g) || []).length;

      log(`✅ 统一导出文件状态:`, 'green');
      log(`   文件行数: ${lines}`);
      log(`   导出块数: ${exports}`);

      // 检查是否有明显的冗余
      const redundantPatterns = [
        'ReactBitGradientBackground',
        'ReactBitParticleField',
        'ReactBitHoverCard',
        'ReactBitClickEffect',
      ];

      let foundRedundant = 0;
      redundantPatterns.forEach((pattern) => {
        if (content.includes(pattern)) {
          foundRedundant++;
        }
      });

      if (foundRedundant > 0) {
        log(`⚠️ 发现 ${foundRedundant} 个可能的冗余组件引用`, 'yellow');
      } else {
        log(`✅ 未发现明显的冗余组件`, 'green');
      }
    }

    // 5. 生成优化建议
    log('💡 步骤 5: 生成优化建议...', 'blue');

    const suggestions = [];

    if (totalSize > 5 * 1024 * 1024) {
      suggestions.push('考虑代码分割和懒加载来减少打包大小');
    }

    if (componentImports.reactbit === 0 && componentImports.unified === 0) {
      suggestions.push('考虑使用统一导入来简化组件管理');
    }

    if (jsSize > 3 * 1024 * 1024) {
      suggestions.push('JavaScript 包较大，检查是否有未使用的依赖');
    }

    if (suggestions.length === 0) {
      suggestions.push('项目状态良好，继续保持！');
    }

    log('📋 优化建议:', 'cyan');
    suggestions.forEach((suggestion, index) => {
      log(`   ${index + 1}. ${suggestion}`, 'yellow');
    });

    // 6. 生成报告
    const report = {
      timestamp: new Date().toISOString(),
      buildTime: buildTime,
      bundleSize: {
        total: totalSize,
        js: jsSize,
        css: cssSize,
      },
      componentUsage: componentImports,
      suggestions: suggestions,
    };

    fs.writeFileSync(
      'quick-optimization-report.json',
      JSON.stringify(report, null, 2)
    );

    log('\n🎉 快速优化分析完成！', 'green');
    log('='.repeat(50), 'cyan');
    log(`📄 详细报告已保存至: quick-optimization-report.json`, 'cyan');

    // 显示总结
    log('\n📊 总结:', 'bright');
    log(`   构建时间: ${buildTime}s`);
    log(`   打包大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    log(
      `   组件导入: ${Object.values(componentImports).reduce((a, b) => a + b, 0)} 次`
    );
    log(`   优化建议: ${suggestions.length} 条`);
  } catch (error) {
    log(`\n❌ 优化分析失败: ${error.message}`, 'red');

    if (error.message.includes('build')) {
      log('💡 建议:', 'yellow');
      log('1. 检查项目是否有语法错误');
      log('2. 确保所有依赖已安装');
      log('3. 尝试清理缓存: pnpm clean');
    }

    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { main };
