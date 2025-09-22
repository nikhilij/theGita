const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const url = process.argv[2] || 'https://improved-dollop-74q9vj457v92pp9j-3000.app.github.dev/';
  const outPath = process.argv[3] || path.resolve(__dirname, '../screenshots/site.png');

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1365, height: 768 });

  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 }).catch(err => {
    console.warn('Initial navigation warning:', err.message || err);
  });

  // Try to find and click a "Continue" button or link that appears on Codespaces dev-port interstitials.
  try {
    // XPath looks for button or anchor containing the text Continue (case-sensitive)
    const xpaths = [
      "//button[contains(., 'Continue')]",
      "//a[contains(., 'Continue')]",
      "//button[contains(translate(., 'CONTINUE', 'continue'), 'continue')]",
      "//a[contains(translate(., 'CONTINUE', 'continue'), 'continue')]"
    ];

    let clicked = false;
    for (const xp of xpaths) {
      const handles = await page.$x(xp);
      if (handles.length) {
        console.log('Found interstitial control, clicking...');
        await handles[0].click();
        // Wait a bit for navigation or content change
        try { await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }); } catch (e) { /* ignore */ }
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      console.log('No interstitial Continue button found, proceeding to screenshot after a short wait.');
    }
  } catch (err) {
    console.warn('Error while attempting to click interstitial:', err.message || err);
  }

  // Wait for main content to appear if possible
  try {
    await page.waitForSelector('main, .container, #__next, h1', { timeout: 7000 });
  } catch (e) {
    console.log('Main content selector not found within timeout — continuing to capture whatever is visible.');
  }

  console.log('Saving screenshot to', outPath);
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log('Screenshot saved.');
})();
