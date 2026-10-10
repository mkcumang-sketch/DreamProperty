const { chromium } = require('C:\\Users\\imris\\AppData\\Local\\ms-playwright-go\\1.57.0\\package');
const fs = require('fs');
const path = require('path');

async function runTest() {
  console.log('Launching Chromium for mobile viewport test...');
  const browser = await chromium.launch({ headless: true });
  
  // Test 1: Mobile Viewport (iPhone 14 / standard modern phone: 390x844)
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  
  // Track console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  // Measure load metrics
  const start = Date.now();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const loadTime = Date.now() - start;
  console.log(`Page loaded in ${loadTime}ms (Desktop/broadband localhost)`);

  // Wait 2s for 3D shaders in iframe
  await page.waitForTimeout(2000);

  // Take mobile hero screenshot
  const heroPath = path.resolve('public/mobile_hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved mobile hero screenshot to', heroPath);

  // Scroll iframe to contact section
  const frame = page.frames().find(f => f.url().includes('kage.html')) || page.mainFrame();
  await frame.evaluate(() => {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView();
  });
  await page.waitForTimeout(1000);

  const contactPath = path.resolve('public/mobile_contact.png');
  await page.screenshot({ path: contactPath });
  console.log('Saved mobile contact screenshot to', contactPath);

  await context.close();

  // Test 2: Simulated Slow Mobile 3G Connection
  console.log('\nTesting Simulated Slow Mobile 3G Connection...');
  const slowContext = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const slowPage = await slowContext.newPage();
  const cdp = await slowContext.newCDPSession(slowPage);

  // Slow 3G: ~400kbps download, ~400kbps upload, 400ms latency
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 400,
    downloadThroughput: 400 * 1024 / 8,
    uploadThroughput: 400 * 1024 / 8
  });

  let totalTransferBytes = 0;
  const slowRequests = [];
  slowPage.on('response', async res => {
    try {
      const headers = res.headers();
      const len = parseInt(headers['content-length'] || '0', 10);
      totalTransferBytes += len;
      slowRequests.push({ url: res.url().split('/').pop(), status: res.status(), size: len });
    } catch (e) {}
  });

  const slowStart = Date.now();
  await slowPage.goto('http://localhost:5173/', { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('Load event reached:', e.message));
  const slowLoadTime = Date.now() - slowStart;
  console.log(`Slow 3G DomContentLoaded/Load time: ${slowLoadTime}ms`);
  console.log(`Total transfer bytes detected: ${(totalTransferBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Console errors during test: ${errors.length ? errors.join(', ') : 'None'}`);

  await browser.close();
}

runTest().catch(console.error);
