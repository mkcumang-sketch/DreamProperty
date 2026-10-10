const { chromium } = require('C:\\Users\\imris\\AppData\\Local\\ms-playwright-go\\1.57.0\\package');
const path = require('path');

async function captureLoadedMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  // wait 5 seconds for preloader fade-out
  await page.waitForTimeout(5000);
  const heroPath = path.resolve('public/mobile_hero_loaded.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved loaded mobile hero screenshot to', heroPath);
  await browser.close();
}

captureLoadedMobile().catch(console.error);
