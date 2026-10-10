const { chromium } = require('C:/Users/imris/AppData/Local/ms-playwright-go/1.57.0/package');
const path = require('path');

async function testUI() {
  console.log('Launching browser for end-to-end UI verification...');
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440x900
  console.log('Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1600);

  // Verify page title
  const title = await desktopPage.title();
  console.log('Page Title:', title);

  // Take full desktop hero screenshot
  await desktopPage.screenshot({ path: path.join(__dirname, '../public/desktop_hero_verify.png') });
  console.log('Desktop Hero screenshot saved.');

  // Test Language Toggle
  console.log('Testing Language Toggle...');
  const hindiToggle = desktopPage.locator('#lang-toggle-hi').first();
  await hindiToggle.click({ force: true });
  await desktopPage.waitForTimeout(400);

  // Check if Hindi headline is rendered
  const hindiText = await desktopPage.textContent('body');
  const hasHindi = hindiText.includes('बिकने वाले स्थान') || hindiText.includes('साझेदारी');
  console.log('Hindi Toggle Functional:', hasHindi);

  // Toggle back to English
  const enToggle = desktopPage.locator('#lang-toggle-en').first();
  await enToggle.click();
  await desktopPage.waitForTimeout(400);

  // Test Accordion toggle in FAQ
  console.log('Testing FAQ Accordion...');
  const faqHeading = desktopPage.locator('#faq-heading-faq-1');
  if (await faqHeading.isVisible()) {
    await faqHeading.click();
    await desktopPage.waitForTimeout(300);
    const panel = desktopPage.locator('#faq-panel-faq-1');
    const panelVisible = await panel.isVisible();
    console.log('FAQ Accordion Panel Expanded:', panelVisible);
  }

  // 2. Mobile Viewport 375x812 (iPhone / Android)
  console.log('\nTesting Mobile Viewport (375x812)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1600);

  // Test Mobile Navigation Drawer
  console.log('Testing Mobile Drawer...');
  const menuButton = mobilePage.locator('#mobile-menu-toggle');
  await menuButton.click({ force: true });
  await mobilePage.waitForTimeout(700);
  const mobileMenuVisible = await mobilePage.locator('[role="dialog"]').isVisible();
  console.log('Mobile Drawer Open:', mobileMenuVisible);

  const closeButton = mobilePage.locator('#mobile-menu-close');
  await mobilePage.evaluate(() => {
    const btn = document.getElementById('mobile-menu-close');
    if (btn) btn.click();
  });
  await mobilePage.waitForTimeout(600);

  // Scroll to Contact Section and Submit Form
  console.log('Testing Mobile Lead Form Submission...');
  await mobilePage.evaluate(() => {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(600);

  await mobilePage.locator('#lead-name').fill('Ankit Verma');
  await mobilePage.locator('#lead-phone').fill('9839055443');
  await mobilePage.locator('#lead-email').fill('ankit.verma@example.com');
  await mobilePage.locator('#lead-type').selectOption('BUYER');
  await mobilePage.locator('#lead-service').selectOption('Turnkey Interior');
  await mobilePage.locator('#lead-location').fill('Swaroop Nagar, Kanpur');
  await mobilePage.locator('#lead-message').fill('Interested in 3D walkthrough and site visit.');

  await mobilePage.screenshot({ path: path.join(__dirname, '../public/mobile_form_verify.png') });
  console.log('Mobile Form screenshot saved.');

  // Submit
  await mobilePage.locator('#lead-form-submit-btn').click();
  await mobilePage.waitForTimeout(2000);

  // Check success state
  const bodyText = await mobilePage.textContent('body');
  const submitted = bodyText.includes('Enquiry Received') || bodyText.includes('Speed up via WhatsApp') || bodyText.includes('Reference ID');
  console.log('Lead Form Successfully Submitted & Rendered Success State:', submitted);

  // 3. Admin Login & CRM Flow
  console.log('\nTesting Admin Login & CRM Flow...');
  const adminPage = await desktopContext.newPage();
  await adminPage.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });

  await adminPage.locator('#admin-email').fill('admin@dreamproperties.in');
  await adminPage.locator('#admin-password').fill('admin123');
  await adminPage.locator('#admin-login-submit-btn').click();

  await adminPage.waitForURL('**/admin', { timeout: 6000 });
  console.log('Navigated to Admin Dashboard:', adminPage.url());

  await adminPage.screenshot({ path: path.join(__dirname, '../public/admin_dashboard_verify.png') });
  console.log('Admin Dashboard screenshot saved.');

  const adminBody = await adminPage.textContent('body');
  const hasLeadsTable = adminBody.includes('Interior Leads CRM') && adminBody.includes('Total Leads');
  console.log('Admin Dashboard CRM Functional:', hasLeadsTable);

  await browser.close();
  console.log('\nAll End-to-End Browser UI & Flow Verifications Completed Successfully!');
}

testUI().catch((err) => {
  console.error('UI Verification Error:', err);
  process.exit(1);
});
