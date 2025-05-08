import { test } from '@playwright/test';
import { expect } from '@playwright/test';

test('LoginTest_2025-05-08', async ({ page, context }) => {
  
    // Navigate to URL
    await page.goto('https://www.nebulablock.com/home');

    // Click element
    await page.click('text=Log in');

    // Fill input field
    await page.fill('input[type="text"]', 'thivunguyen1506@gmail.com');

    // Fill input field
    await page.fill('input[type="password"]', '123123');

    // Click element
    await page.click('button.el-button--primary');

    // Click element
    await page.click('button.el-dialog__headerbtn');

    // Click element
    await page.click('button.el-button--primary');

    // Take screenshot
    await page.screenshot({ path: 'login-success.png', { fullPage: true } });

    // Click element
    await page.click('text=Logout');

    // Click element
    await page.click('.login-user .sign .available-style.b');

    // Click element
    await page.click('text=Account');

    // Click element
    await page.click('text=Logout');

    // Take screenshot
    await page.screenshot({ path: 'after-logout.png', { fullPage: true } });

    // Fill input field
    await page.fill('input[type="text"]', 'invaliduser@example.com');

    // Fill input field
    await page.fill('input[type="password"]', 'wrongpassword');

    // Click element
    await page.click('button.el-button--primary');

    // Take screenshot
    await page.screenshot({ path: 'login-failed.png', { fullPage: true } });
});