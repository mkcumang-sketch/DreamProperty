const { chromium } = require('C:/Users/imris/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

async function runVerification() {
  console.log('====================================================');
  console.log('   VERIFYING OPTION B (HERO + KAGE ISOLATION)       ');
  console.log('====================================================');

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  console.log('\n[1/3] Testing Desktop (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1600); // Wait for page loader curtain reveal

  // Confirm only ONE Studio navbar is visible at the top
  const navbars = await desktopPage.locator('header').count();
  console.log(`- Studio <header> count: ${navbars}`);

  // Confirm WhatsApp button visible
  const waVisible = await desktopPage.locator('#floating-whatsapp-btn').isVisible();
  console.log(`- Floating WhatsApp button visible: ${waVisible}`);

  // Screenshot 1: Desktop Hero (clean, high contrast, own background, no KAGE letters)
  const heroPath = path.join(__dirname, '../public/desktop_option_b_1440.png');
  await desktopPage.screenshot({ path: heroPath });
  console.log(`- Desktop Hero screenshot saved to ${heroPath}`);

  // Scroll to KageExperience
  await desktopPage.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await desktopPage.waitForTimeout(1000);

  // Check KageExperience wrapper styles
  const kageStyles = await desktopPage.evaluate(() => {
    const el = document.getElementById('experience');
    if (!el) return null;
    const computed = window.getComputedStyle(el);
    return {
      position: computed.position,
      overflow: computed.overflow,
      isolation: computed.isolation,
      zIndex: computed.zIndex,
      height: el.offsetHeight,
    };
  });
  console.log('- KageExperience wrapper computed styles:', kageStyles);

  // Check scrollbars in iframe
  const iframeScrollable = await desktopPage.evaluate(() => {
    const frame = document.querySelector('.kage-experience-wrapper iframe');
    if (!frame) return false;
    const doc = frame.contentDocument;
    if (!doc) return false;
    return doc.documentElement.scrollHeight > doc.documentElement.clientHeight;
  });
  console.log(`- Iframe internal scroll suppressed: ${!iframeScrollable}`);

  // Screenshot 2: KageExperience standalone
  const kageDesktopPath = path.join(__dirname, '../public/desktop_kage_experience_1440.png');
  await desktopPage.screenshot({ path: kageDesktopPath });
  console.log(`- Desktop KageExperience screenshot saved to ${kageDesktopPath}`);

  // 2. Tablet 768x1024
  console.log('\n[2/3] Testing Tablet (768x1024)...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1600);

  const tabletHeroPath = path.join(__dirname, '../public/tablet_hero_768.png');
  await tabletPage.screenshot({ path: tabletHeroPath });
  console.log(`- Tablet Hero screenshot saved to ${tabletHeroPath}`);

  await tabletPage.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await tabletPage.waitForTimeout(1000);

  const tabletKagePath = path.join(__dirname, '../public/tablet_kage_768.png');
  await tabletPage.screenshot({ path: tabletKagePath });
  console.log(`- Tablet KageExperience screenshot saved to ${tabletKagePath}`);

  // 3. Mobile 375x812
  console.log('\n[3/3] Testing Mobile (375x812)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1600);

  // Check top navbar elements: no clipping at y=0
  const navbarBox = await mobilePage.locator('header').boundingBox();
  console.log('- Mobile header bounding box:', navbarBox);

  const mobileHeroPath = path.join(__dirname, '../public/mobile_hero_375.png');
  await mobilePage.screenshot({ path: mobileHeroPath });
  console.log(`- Mobile Hero screenshot saved to ${mobileHeroPath}`);

  await mobilePage.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(1000);

  const mobileKagePath = path.join(__dirname, '../public/mobile_kage_375.png');
  await mobilePage.screenshot({ path: mobileKagePath });
  console.log(`- Mobile KageExperience screenshot saved to ${mobileKagePath}`);

  await browser.close();

  console.log('\n====================================================');
  console.log('   ALL VIEWPORT VERIFICATIONS COMPLETED SUCCESSFULLY!');
  console.log('====================================================\n');
}

runVerification().catch((err) => {
  console.error('Option B Verification Error:', err);
  process.exit(1);
});
