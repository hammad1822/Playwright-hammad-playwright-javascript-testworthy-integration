const { chromium } = require('@playwright/test');
const url1 = 'https://www.google.com';
const url2 = 'https://www.google.com';
//const baselineImagePath = 'C:/Users/hammad.mahmood/Downloads/login-error.png';

async function compareScreenshots(url1, url2) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url1);
  const screenshot1 = await page.screenshot();

  await page.goto(url2);
  const screenshot2 = await page.screenshot();

  const compareScreenshots = screenshot1.equals(screenshot2);
  
  if (compareScreenshots) {
    console.log('Images are identical.');
  } else {
    console.log('Images are different.');
  }

  await browser.close();
}

(async () => {
  await compareScreenshots(url1, url2);
})();