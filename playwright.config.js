// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['html'],
    ["allure-playwright"]

  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.demoblaze.com/',
    //baseURL: 'https://restful-booker.herokuapp.com',
    testStatus : 'FAILED', // Initialize the test status as 'FAILED'
    run_id : 12404,
    user_email : 'qa.admin@yopmail.com',
    tma_key : 'qfst2zqwZX24iQVmKMNj',
    project_key : 'tevW0gOrOed7ERbz0Gwg',
    case_id_1 : 407483,
    case_id_2 : 407484,
    case_id_3 : 407485,
    case_id_4 : 407486,
    case_id_5 : 407487,



    // ignoreHTTPSErrors: true,
    // extraHTTPHeaders: {
    //   'X-USER-EMAIL': 'migrationv2@yopmail.com', // Set your authorization header
    //   'X-TMA-KEY':'qfst2zqwZX24iQVmKMNj',
    //   'X-PROJECT-KEY': 'tevW0gOrOed7ERbz0Gwg',
    //   'Content-Type': 'application/json', // Set your content type
    //   'Set-Cookie': '.TCookie=CfDJ8NvEpa8b6O9HsycfRueM_XOcqRhaimxjjyhfWCAyfY2ci8epcp8jrJAUGuB1HC1R3B7RjDyWUrUnGb0HWlFzxzNiHjULQPnbKWUc2R6zUY37Vy7c1tN6OR1TETJSryy1KA5HXFETGeuLMHrjhgvabhYkBRY9_ObP0SPpVUgCHha3ymR8KXzLhStu04mAZD5JChniy9VzkJuBUYlQssufOkKAVMqO__UC0yEbc4FlkQcrLiZNCpoxsDI68mMx5MQ6cKDGvxFAKbXjZbZOM1_JNe_lpIP9QaVpUZ0B5-ytTWDtBBtNegINTQ2hdUMO2n6OCSNQYjBXdEOg3VuzMqSiVeIRoNYldRZMKQ4eXmxy1xUhZzWsiwFglpCjCL_GCUKTmWy4fL4Mph7rMCPjcNMybzDLrwUS7vr0UPd6o3H_AyFNBoCq6Ufie91l7Ar7o0ipkw'
    // },
    // // contextOptions: {
    //   ignoreHTTPSErrors: true,
    //   // Other context options can be added here if needed
    // },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

