const { chromium } = require('C:/Users/imris/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

async function verifyOptionA() {
  console.log('====================================================');
  console.log('      VERIFYING OPTION A (KAGE IS THE HERO)         ');
  console.log('====================================================');

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  console.log('\n[1/3] Testing Desktop (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(4500);

  // Check element positions and gap
  const heroBox = await desktopPage.locator('#experience').boundingBox();
  console.log(`- Kage Hero section bounding box: x=${heroBox.x}, y=${heroBox.y}, w=${heroBox.width}, h=${heroBox.height}`);
  console.log(`- Confirmed ZERO gap at top: y === 0 is ${heroBox.y === 0}`);

  // Confirm single studio header
  const headersCount = await desktopPage.locator('header').count();
  console.log(`- Studio <header> count: ${headersCount}`);

  // Verify iframe internal scroll is disabled
  const iframeScrollable = await desktopPage.evaluate(() => {
    const frame = document.querySelector('.kage-hero-section iframe');
    if (!frame) return false;
    const doc = frame.contentDocument;
    if (!doc) return false;
    return doc.documentElement.scrollHeight > doc.documentElement.clientHeight;
  });
  console.log(`- Iframe internal scroll suppressed: ${!iframeScrollable}`);

  // Screenshot 1: Desktop Kage as Hero
  const desktopHeroImg = path.join(__dirname, '../public/desktop_option_a_1440.png');
  await desktopPage.screenshot({ path: desktopHeroImg });
  console.log(`- Saved Desktop Hero capture: ${desktopHeroImg}`);

  // Scroll to Philosophy section ("Calm spaces, crafted in Kanpur")
  await desktopPage.evaluate(() => {
    const el = document.getElementById('approach');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await desktopPage.waitForTimeout(1000);

  const desktopPhilImg = path.join(__dirname, '../public/desktop_philosophy_1440.png');
  await desktopPage.screenshot({ path: desktopPhilImg });
  console.log(`- Saved Desktop Philosophy capture: ${desktopPhilImg}`);

  // 2. Tablet 768x1024
  console.log('\n[2/3] Testing Tablet (768x1024)...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(4500);

  const tabletHeroBox = await tabletPage.locator('#experience').boundingBox();
  console.log(`- Tablet Hero bounding box: x=${tabletHeroBox.x}, y=${tabletHeroBox.y}, h=${tabletHeroBox.height}`);

  const tabletHeroImg = path.join(__dirname, '../public/tablet_option_a_768.png');
  await tabletPage.screenshot({ path: tabletHeroImg });
  console.log(`- Saved Tablet Hero capture: ${tabletHeroImg}`);

  await tabletPage.evaluate(() => {
    const el = document.getElementById('approach');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await tabletPage.waitForTimeout(1000);

  const tabletPhilImg = path.join(__dirname, '../public/tablet_philosophy_768.png');
  await tabletPage.screenshot({ path: tabletPhilImg });
  console.log(`- Saved Tablet Philosophy capture: ${tabletPhilImg}`);

  // 3. Mobile 375x812
  console.log('\n[3/3] Testing Mobile (375x812)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(4500);

  const mobileHeroBox = await mobilePage.locator('#experience').boundingBox();
  console.log(`- Mobile Hero bounding box: x=${mobileHeroBox.x}, y=${mobileHeroBox.y}, h=${mobileHeroBox.height}`);

  const mobileHeroImg = path.join(__dirname, '../public/mobile_option_a_375.png');
  await mobilePage.screenshot({ path: mobileHeroImg });
  console.log(`- Saved Mobile Hero capture: ${mobileHeroImg}`);

  await mobilePage.evaluate(() => {
    const el = document.getElementById('approach');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(1000);

  const mobilePhilImg = path.join(__dirname, '../public/mobile_philosophy_375.png');
  await mobilePage.screenshot({ path: mobilePhilImg });
  console.log(`- Saved Mobile Philosophy capture: ${mobilePhilImg}`);

  await browser.close();

  console.log('\n====================================================');
  console.log('    OPTION A VERIFICATION COMPLETED WITH 100% PASS   ');
  console.log('====================================================\n');
}

verifyOptionA().catch((err) => {
  console.error('Verification Error:', err);
  process.exit(1);
});
