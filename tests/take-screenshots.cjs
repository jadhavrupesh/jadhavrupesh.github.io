const { chromium } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = '/Users/rupeshjadhav/.gemini/antigravity-cli/brain/9e99c172-4026-4c86-863c-8bf972ae9725';

(async () => {
  console.log('🚀 Launching browser to take screenshots...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:5173/game...');
  await page.goto('http://localhost:5173/game');

  // Wait for catalog screen
  await page.waitForSelector('pre');
  console.log('📸 Taking screenshot of select state...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_select.png') });

  // Click boot
  console.log('👉 Booting game...');
  const bootButton = page.locator('button:has-text("[ BOOT ]")').first();
  await bootButton.click();

  // Take screenshot of loading state (immediate)
  console.log('📸 Taking screenshot of loading state...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_loading.png') });

  // Wait for game to load
  console.log('⏳ Waiting for game to load...');
  await page.waitForTimeout(3000);

  // Take screenshot of playing state
  console.log('📸 Taking screenshot of playing state...');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot_playing.png') });

  await browser.close();
  console.log('✅ Done! Screenshots saved to artifacts directory.');
})();
