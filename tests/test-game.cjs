const { chromium } = require('@playwright/test');

(async () => {
  console.log('🚀 Starting Playwright browser instance...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🌐 Navigating to http://localhost:5173/game...');
  try {
    await page.goto('http://localhost:5173/game', { timeout: 10000 });
  } catch (err) {
    console.error('❌ Failed to navigate to dev server. Is the server running?');
    await browser.close();
    process.exit(1);
  }
  
  // Wait for the select catalog NES header to load
  console.log('🔍 Waiting for select catalog screen...');
  await page.waitForSelector('pre');
  console.log('✅ Select catalog screen loaded successfully.');

  // Click on SNAKE.EXE BOOT button
  console.log('👉 Clicking the game BOOT button...');
  const bootButton = page.locator('button:has-text("[ BOOT ]")').first();
  await bootButton.click();
  
  // Wait for loading screen to complete and transition to playing state
  console.log('⏳ Waiting for boot loader sequence (3s)...');
  await page.waitForTimeout(3000);

  // Check if the Exit button is visible in the chassis knobs
  console.log('🔍 Verifying if [ EXIT GAME ] button is visible in bezel knobs...');
  const exitButton = page.locator('button:has-text("[ EXIT GAME ]")');
  const isVisible = await exitButton.isVisible();
  
  if (isVisible) {
    console.log('✅ Success: [ EXIT GAME ] button is visible and active!');
    console.log('👉 Clicking [ EXIT GAME ] button to test navigation...');
    await exitButton.click();
    await page.waitForTimeout(1000);
    const isBackToMenu = await page.locator('pre').isVisible();
    if (isBackToMenu) {
      console.log('🎉 Test Succeeded: Game was successfully booted, exited, and returned to the selection menu.');
    } else {
      console.error('❌ Failed: Clicking exit button did not return to selection menu.');
    }
  } else {
    console.error('❌ Failed: [ EXIT GAME ] button was not found or was invisible.');
  }

  await browser.close();
  console.log('🔒 Browser closed. Test run complete.');
})();
