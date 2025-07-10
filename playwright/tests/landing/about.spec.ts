import { test, expect } from '@playwright/test';

test('Landing Page UI - Home', async ({ page }) => {
  await page.goto('https://dev-portal.nebulablock.com/company/about');
  // Cuộn xuống cuối trang để kích hoạt lazy-loading
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000); // đợi nội dung hiển thị xong

  await expect(page).toHaveScreenshot({
  fullPage: true,
  timeout: 5000
});
  
});
