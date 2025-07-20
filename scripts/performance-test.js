#!/usr/bin/env node

/**
 * 性能测试脚本
 * 用于测试组件库的性能表现
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 性能测试配置
const testConfig = {
  buildTimeout: 300000, // 5分钟
  bundleAnalyzer: true,
  lighthouse: true,
  webVitals: true,
};

// 获取包大小信息
function getBundleSize() {
  log('📦 分析打包大小...', 'blue');

  try {
    // 构建项目
    execSync('npm run build', {
      stdio: 'inherit',
      timeout: testConfig.buildTimeout,
    });

    // 分析 .next 目录
    const nextDir = path.join(process.cwd(), '.next');
    const staticDir = path.join(nextDir, 'static');

    if (!fs.existsSync(staticDir)) {
      log('❌ 构建文件不存在', 'red');
      return null;
    }

    const bundleInfo = {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      chunks: [],
    };

    // 递归计算文件大小
    function calculateSize(dir, prefix = '') {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          calculateSize(filePath, `${prefix}${file}/`);
        } else {
          const size = stat.size;
          bundleInfo.totalSize += size;

          if (file.endsWith('.js')) {
            bundleInfo.jsSize += size;
            bundleInfo.chunks.push({
              name: `${prefix}${file}`,
              size: size,
              type: 'js',
            });
          } else if (file.endsWith('.css')) {
            bundleInfo.cssSize += size;
            bundleInfo.chunks.push({
              name: `${prefix}${file}`,
              size: size,
              type: 'css',
            });
          }
        }
      });
    }

    calculateSize(staticDir);

    return bundleInfo;
  } catch (error) {
    log(`❌ 构建失败: ${error.message}`, 'red');
    return null;
  }
}

// 分析组件库使用情况
function analyzeComponentUsage() {
  log('🔍 分析组件使用情况...', 'blue');

  const srcDir = path.join(process.cwd(), 'src');
  const componentUsage = {
    shadcnui: 0,
    aceternity: 0,
    reactbit: 0,
    unified: 0,
  };

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');

        // 统计导入语句
        const imports =
          content.match(
            /import.*from.*['"`]@\/components\/(ui|aceternity|reactbit|unified)['"`]/g
          ) || [];

        imports.forEach((importStatement) => {
          if (importStatement.includes('/ui')) {
            componentUsage.shadcnui++;
          } else if (importStatement.includes('/aceternity')) {
            componentUsage.aceternity++;
          } else if (importStatement.includes('/reactbit')) {
            componentUsage.reactbit++;
          } else if (importStatement.includes('/unified')) {
            componentUsage.unified++;
          }
        });
      }
    });
  }

  scanDirectory(srcDir);
  return componentUsage;
}

// 运行 Lighthouse 测试
function runLighthouseTest() {
  if (!testConfig.lighthouse) return null;

  log('🚀 运行 Lighthouse 性能测试...', 'blue');

  try {
    // 启动开发服务器
    log('启动开发服务器...', 'yellow');
    const server = execSync('npm run dev &', { stdio: 'pipe' });

    // 等待服务器启动
    setTimeout(() => {
      try {
        // 运行 Lighthouse
        const lighthouseResult = execSync(
          'npx lighthouse http://localhost:3000 --output=json --quiet',
          { encoding: 'utf8', timeout: 60000 }
        );

        const report = JSON.parse(lighthouseResult);

        return {
          performance: report.lhr.categories.performance.score * 100,
          accessibility: report.lhr.categories.accessibility.score * 100,
          bestPractices: report.lhr.categories['best-practices'].score * 100,
          seo: report.lhr.categories.seo.score * 100,
          fcp: report.lhr.audits['first-contentful-paint'].numericValue,
          lcp: report.lhr.audits['largest-contentful-paint'].numericValue,
          cls: report.lhr.audits['cumulative-layout-shift'].numericValue,
        };
      } catch (error) {
        log(`❌ Lighthouse 测试失败: ${error.message}`, 'red');
        return null;
      } finally {
        // 停止开发服务器
        execSync('pkill -f "next dev"', { stdio: 'ignore' });
      }
    }, 10000);
  } catch (error) {
    log(`❌ 无法启动开发服务器: ${error.message}`, 'red');
    return null;
  }
}

// 生成性能报告
function generateReport(bundleInfo, componentUsage, lighthouseResults) {
  log('\n📊 性能测试报告', 'bright');
  log('='.repeat(50), 'cyan');

  // 打包大小报告
  if (bundleInfo) {
    log('\n📦 打包大小分析:', 'green');
    log(`总大小: ${(bundleInfo.totalSize / 1024 / 1024).toFixed(2)} MB`);
    log(`JavaScript: ${(bundleInfo.jsSize / 1024 / 1024).toFixed(2)} MB`);
    log(`CSS: ${(bundleInfo.cssSize / 1024 / 1024).toFixed(2)} MB`);

    // 显示最大的几个文件
    const largestChunks = bundleInfo.chunks
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);

    log('\n🔍 最大的文件:');
    largestChunks.forEach((chunk, index) => {
      log(`${index + 1}. ${chunk.name}: ${(chunk.size / 1024).toFixed(2)} KB`);
    });

    // 性能建议
    log('\n💡 优化建议:');
    if (bundleInfo.totalSize > 5 * 1024 * 1024) {
      log('- 总包大小过大，考虑代码分割和懒加载', 'yellow');
    }
    if (bundleInfo.jsSize > 3 * 1024 * 1024) {
      log('- JavaScript 包过大，考虑移除未使用的依赖', 'yellow');
    }
  }

  // 组件使用情况报告
  log('\n🧩 组件库使用情况:', 'green');
  log(`shadcn/ui: ${componentUsage.shadcnui} 次导入`);
  log(`Aceternity UI: ${componentUsage.aceternity} 次导入`);
  log(`ReactBit UI: ${componentUsage.reactbit} 次导入`);
  log(`统一导入: ${componentUsage.unified} 次导入`);

  const totalUsage = Object.values(componentUsage).reduce((a, b) => a + b, 0);
  if (totalUsage > 0) {
    log('\n📈 使用比例:');
    Object.entries(componentUsage).forEach(([lib, count]) => {
      const percentage = ((count / totalUsage) * 100).toFixed(1);
      log(`${lib}: ${percentage}%`);
    });
  }

  // Lighthouse 报告
  if (lighthouseResults) {
    log('\n🚀 Lighthouse 性能评分:', 'green');
    log(`性能: ${lighthouseResults.performance.toFixed(0)}/100`);
    log(`可访问性: ${lighthouseResults.accessibility.toFixed(0)}/100`);
    log(`最佳实践: ${lighthouseResults.bestPractices.toFixed(0)}/100`);
    log(`SEO: ${lighthouseResults.seo.toFixed(0)}/100`);

    log('\n⏱️ Core Web Vitals:');
    log(`FCP: ${(lighthouseResults.fcp / 1000).toFixed(2)}s`);
    log(`LCP: ${(lighthouseResults.lcp / 1000).toFixed(2)}s`);
    log(`CLS: ${lighthouseResults.cls.toFixed(3)}`);
  }

  // 总体评估
  log('\n🎯 总体评估:', 'bright');
  let score = 100;
  const issues = [];

  if (bundleInfo && bundleInfo.totalSize > 5 * 1024 * 1024) {
    score -= 20;
    issues.push('包大小过大');
  }

  if (lighthouseResults && lighthouseResults.performance < 80) {
    score -= 30;
    issues.push('性能评分偏低');
  }

  if (componentUsage.unified < totalUsage * 0.5) {
    score -= 10;
    issues.push('建议更多使用统一导入');
  }

  if (issues.length === 0) {
    log('✅ 性能表现优秀！', 'green');
  } else {
    log(`⚠️ 发现 ${issues.length} 个问题:`, 'yellow');
    issues.forEach((issue) => log(`- ${issue}`, 'yellow'));
  }

  log(
    `\n🏆 综合评分: ${score}/100`,
    score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red'
  );
  log('='.repeat(50), 'cyan');
}

// 主函数
async function main() {
  log('🚀 开始性能测试...', 'bright');

  const bundleInfo = getBundleSize();
  const componentUsage = analyzeComponentUsage();
  const lighthouseResults = runLighthouseTest();

  generateReport(bundleInfo, componentUsage, lighthouseResults);

  log('\n✅ 性能测试完成！', 'green');
}

// 运行测试
if (require.main === module) {
  main().catch((error) => {
    log(`❌ 测试失败: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  getBundleSize,
  analyzeComponentUsage,
  runLighthouseTest,
  generateReport,
};
