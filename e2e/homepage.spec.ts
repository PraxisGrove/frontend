import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');

    // 检查主标题是否存在
    await expect(
      page.getByRole('heading', { name: /欢迎来到.*PraxisGrove/i })
    ).toBeVisible();
  });

  test('should have navigation buttons', async ({ page }) => {
    await page.goto('/');

    // 检查主要按钮是否存在
    await expect(
      page.getByRole('button', { name: /开始学习之旅/i })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /探索3D知识宇宙/i })
    ).toBeVisible();
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/');

    // 检查功能卡片是否存在
    await expect(page.getByText('🤖 AI智能助手')).toBeVisible();
    await expect(page.getByText('🌌 3D知识宇宙')).toBeVisible();
    await expect(page.getByText('👥 学习社区')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // 测试桌面视图
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /欢迎来到.*PraxisGrove/i })
    ).toBeVisible();

    // 测试移动视图
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(
      page.getByRole('heading', { name: /欢迎来到.*PraxisGrove/i })
    ).toBeVisible();
  });
});
