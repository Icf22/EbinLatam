import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */ 
export default defineConfig({
  testDir: 'POM/tests',

  //**** Este código estoy probando
    expect: {
    timeout: 5000,
  },
  // If nothing is printed for 10m, then CircleCI times us out, which means we don't
  // find out which test hung. So timeout here first so that it tells us what hung.
  globalTimeout: 6000000,
  // in ms. 30000 = 30s
  timeout: 1000000,
  use: {
    actionTimeout: 20000,
    headless: true,
    trace: "retain-on-failure",
    screenshot: "off",
    video: "on",
  },
  //**** Este código estoy probando

  /* Run tests in files in parallel */
  fullyParallel: true, // para Correr los test de manera paralela o consecutiva
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1, //El primer numero indica que en CI(Jenkins, Github Actios etc)va a intentar 2 veces en caso de fallar y el segundo numero es para reintentos locales
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, //la cantidad de workers que van a trabjar en CI, si la plataforma de CI soporta parallel execution se puede modificar y el segundo define los workers locales, esta asi para usar los maximos posibles
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   /* Base URL to use in actions like `await page.goto('/')`. */
  //   // baseURL: 'http://127.0.0.1:3000',
  //   viewport:{width: 1920, height: 1080},
  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on',  
  //   ignoreHTTPSErrors: true,
  //   video: "retain-on-failure",
  //   screenshot:"only-on-failure"
  //   //A continuacion los comandos y funciones que puedes cambiar entre esas comillas:
  //   // 'off - Do not record a trace.
  //   // 'on' - Record a trace for each test
  //   // 'retain-on-failure' - Record a trace for each test, but remove it from successful test runs.
  //   // 'on-first-retry' - Record a trace only when retrying a test for the first
  // },
    

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

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
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
