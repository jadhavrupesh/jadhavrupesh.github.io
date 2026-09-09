import { expect, test } from '@playwright/test';
import { educationData, experienceData, personalInfo, professionalSummary, projectData, skillData } from '../constants';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || 'http://localhost:5173';
const url = (path = '/') => new URL(path, baseURL).href;
const routes = [
  ['about', 'A little about me.', professionalSummary],
  ['experience', 'Built along the way.', experienceData[0].description[0]],
  ['skills', 'My working toolkit.', educationData.degree],
  ['projects', 'From idea to shipped.', projectData[0].description[0]],
  ['contact', 'Let’s build something.', personalInfo.email],
] as const;

test.use({ browserName: 'chromium', channel: 'chrome', viewport: { width: 1440, height: 1000 }, contextOptions: { reducedMotion: 'reduce' } });

test.describe('ASCII theme', () => {
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => { if (!localStorage.getItem('portfolio-theme')) localStorage.setItem('portfolio-theme', 'ascii'); });
});

test('direct routes preserve portfolio content, native accordions, and Escape navigation', async ({ page }) => {
  for (const [path, title, content] of routes) {
    await page.goto(url(`/${path}`));
    const dialog = page.getByRole('dialog', { name: title });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(content);
    await expect(dialog.getByRole('heading', { name: title })).toBeFocused();
    if (path === 'projects' || path === 'experience') {
      const entries = path === 'projects' ? projectData : experienceData;
      await expect(dialog.locator('details')).toHaveCount(entries.length);
      for (const [index, entry] of entries.entries()) {
        const details = dialog.locator('details').nth(index);
        if (index > 0) await details.locator('summary').click();
        await expect(details).toHaveAttribute('open', '');
        await expect(details).toContainText(entry.duration);
        for (const description of entry.description) await expect(details.getByText(description, { exact: true })).toBeVisible();
        await details.locator('summary').click();
        await expect(details).not.toHaveAttribute('open');
      }
    }
    if (path === 'skills') {
      for (const category of skillData) for (const skill of category.skills) await expect(dialog.getByText(skill, { exact: true })).toBeVisible();
    }
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(url());
  }
});

test('main navigation opens every section and the close button returns home', async ({ page }) => {
  await page.goto(url());
  const nav = page.locator('nav[aria-label="Main navigation"]');
  await expect(nav.locator('a')).toHaveCount(5);
  await expect(nav.locator('a[href="/contact"]')).toHaveCount(0);
  await expect(nav.locator('a[href="/"]')).toHaveAttribute('aria-current', 'page');
  for (const [path, title] of routes.filter(([p]) => p !== 'contact')) {
    await nav.locator(`a[href="/${path}"]`).click();
    await expect(page).toHaveURL(url(`/${path}`));
    await expect(page.getByRole('dialog', { name: title })).toBeVisible();
    await expect(nav.locator(`a[href="/${path}"]`)).toHaveAttribute('aria-current', 'page');
    await page.getByRole('button', { name: 'Close panel' }).click();
    await expect(page).toHaveURL(url());
  }
  await nav.locator('a[href="/"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('RUPESH');
});

test('header navigation is centralized and die is removed', async ({ page }) => {
  await page.goto(url());
  await expect(page.locator('.ascii-die')).toHaveCount(0);
  await expect(page.locator('.theme-switcher')).toHaveCount(0);
  const nav = page.locator('nav[aria-label="Main navigation"]');
  await expect(nav).toBeVisible();

  // Verify horizontal centering on desktop
  const headerBox = await page.locator('.terminal-header').boundingBox();
  const navBox = await nav.boundingBox();
  if (headerBox && navBox) {
    const headerCenter = headerBox.x + headerBox.width / 2;
    const navCenter = navBox.x + navBox.width / 2;
    expect(Math.abs(headerCenter - navCenter)).toBeLessThanOrEqual(2);
  }
});

test('ASCII sculpture renders torus, rotates by keyboard and drag, and resets', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url());
  const stage = page.getByRole('region', { name: 'Interactive ASCII sculpture' });
  const artwork = stage.locator('pre[data-frame][data-rotation]');
  await expect(artwork).toBeVisible();
  expect((await artwork.textContent())?.replace(/\s/g, '').length).toBeGreaterThan(500);
  const initialRotation = await artwork.getAttribute('data-rotation');
  const torus = await artwork.textContent();
  const torusBtn = page.getByRole('button', { name: /Torus/i });
  await expect(torusBtn).toBeVisible();
  await expect(torusBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: /Sphere/i })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Cube/i })).toHaveCount(0);
  await stage.focus();
  await stage.press('ArrowRight');
  await expect(artwork).not.toHaveAttribute('data-rotation', initialRotation!);
  const keyboardRotation = await artwork.getAttribute('data-rotation');
  const box = await stage.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width / 2 + 70, box!.y + box!.height / 2 + 40, { steps: 5 });
  await page.mouse.up();
  await expect(artwork).not.toHaveAttribute('data-rotation', keyboardRotation!);
  await expect(page.getByRole('button', { name: 'Play animation' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset rotation' }).click();
  await expect(artwork).toHaveAttribute('data-rotation', initialRotation!);
  await expect(artwork).toHaveText(torus!);
  expect(errors).toEqual([]);
});

test('reduced motion starts paused, explicit playback works, and hidden pages stop rendering', async ({ page }) => {
  await page.goto(url());
  const artwork = page.locator('pre.ascii-output[data-frame]');
  await expect(artwork).toBeVisible();
  await expect(page.getByRole('button', { name: 'Play animation' })).toBeEnabled();
  const initialFrame = await artwork.getAttribute('data-frame');
  await page.waitForTimeout(180); // Measure whether animation produces frames while paused.
  await expect(artwork).toHaveAttribute('data-frame', initialFrame!);
  await page.getByRole('button', { name: 'Play animation' }).click();
  await expect.poll(async () => Number(await artwork.getAttribute('data-frame'))).toBeGreaterThan(Number(initialFrame) + 2);
  await page.getByRole('button', { name: 'Pause animation' }).click();
  await expect(page.getByRole('button', { name: 'Play animation' })).toBeVisible();
  await page.waitForTimeout(80); // Let the final paused render settle before measuring.
  const pausedFrame = await artwork.getAttribute('data-frame');
  await page.waitForTimeout(180);
  await expect(artwork).toHaveAttribute('data-frame', pausedFrame!);
  await page.getByRole('button', { name: 'Play animation' }).click();
  await expect.poll(async () => Number(await artwork.getAttribute('data-frame'))).toBeGreaterThan(Number(pausedFrame) + 2);
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  const hiddenFrame = await artwork.getAttribute('data-frame');
  await page.waitForTimeout(180);
  await expect(artwork).toHaveAttribute('data-frame', hiddenFrame!);
  await page.evaluate(() => { Reflect.deleteProperty(document, 'hidden'); document.dispatchEvent(new Event('visibilitychange')); });
  await expect.poll(async () => Number(await artwork.getAttribute('data-frame'))).toBeGreaterThan(Number(hiddenFrame) + 2);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Allow the browser to dispatch this preference change before changing it again.
  await page.evaluate(() => new Promise<number>(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: 'Play animation' })).toBeVisible();
});

test('320px, 375px, and 768px layouts keep the name and contact panel within the viewport', async ({ page }) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url());
    await expect(page.locator('pre.ascii-output[data-frame]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const name = await page.getByRole('heading', { level: 1 }).evaluate(element => {
      const range = document.createRange();
      range.selectNodeContents(element);
      const box = range.getBoundingClientRect();
      return { left: box.left, right: box.right, scroll: element.scrollWidth, client: element.clientWidth };
    });
    expect(name.left).toBeGreaterThanOrEqual(0);
    expect(name.right).toBeLessThanOrEqual(width);
    expect(name.scroll).toBeLessThanOrEqual(name.client);
    await page.locator('.spec-strip a[href="/contact"]').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('link', { name: personalInfo.email })).toBeVisible();
    const panel = await dialog.evaluate(element => ({ scroll: element.scrollWidth, client: element.clientWidth, right: element.getBoundingClientRect().right }));
    expect(panel.scroll).toBeLessThanOrEqual(panel.client);
    expect(panel.right).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.getByRole('button', { name: 'Close panel' }).click();
  }
});

test('contact links and clipboard success and failure feedback work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(url('/contact'));
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('link', { name: personalInfo.email })).toHaveAttribute('href', `mailto:${personalInfo.email}`);
  await expect(dialog.getByRole('link', { name: personalInfo.phone })).toHaveAttribute('href', `tel:${personalInfo.phone}`);
  await dialog.getByRole('button', { name: 'Copy email address' }).click();
  await expect(dialog.getByRole('status')).toHaveText('Email address copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(personalInfo.email);
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new DOMException('Permission denied', 'NotAllowedError'); } }); });
  await dialog.getByRole('button', { name: 'Copy email address' }).click();
  await expect(dialog.getByRole('status')).toContainText('Could not copy.');
  await expect(dialog.getByRole('link', { name: personalInfo.email })).toBeVisible();
});
});

test('ASCII theme is the primary default and fits desktop and mobile with working navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url());
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'ascii');
    await expect(page.locator('.theme-switcher')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.locator('.spec-strip a[href="/contact"]').click();
    await expect(page.getByRole('dialog').getByRole('link', { name: personalInfo.email })).toBeVisible();
    expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.keyboard.press('Escape');
  }
  expect(errors).toEqual([]);
});
