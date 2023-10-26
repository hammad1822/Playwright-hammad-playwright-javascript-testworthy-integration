const { chromium } = require('@playwright/test');
const url = 'https://www.google.com';
const baselineImagePath = 'C:/Users/hammad.mahmood/Downloads/login-error.png';

async function compareScreenshots(url, baselineImagePath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);
  const screenshot = await page.screenshot();
  
  // Load the baseline image for comparison
  const fs = require('fs');
  const baselineImage = fs.readFileSync(baselineImagePath);

  const imageBuffersEqual = screenshot.equals(baselineImage);
  
  if (imageBuffersEqual) {
    console.log('Images are identical.');
  } else {
    console.log('Images are different.');
  }

  await browser.close();
}

// const url = 'https://www.google.com';
// const baselineImagePath = 'C:\Users\hammad.mahmood\Downloads\login-error.png';

(async () => {
  await compareScreenshots(url, baselineImagePath);
})();