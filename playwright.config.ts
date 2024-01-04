import { defineConfig, devices } from '@playwright/test';
import { APP_PORT } from "./vite.config";

export const PLAYWRIGHT_CONFIG = {
  CI: !!process.env.CI,
  baseURL: `http://localhost:${APP_PORT}`,
} as const;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './tests/results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: PLAYWRIGHT_CONFIG.CI,
  /* Retry on CI only */
  retries: PLAYWRIGHT_CONFIG.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: PLAYWRIGHT_CONFIG.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list', { printSteps: true }],
    [
      'html',
    ],
  ], // Reporter to use. See https://playwright.dev/docs/test-reporters

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: PLAYWRIGHT_CONFIG.baseURL, // Base URL to use in actions like `await page.goto('/')`.
    trace: 'on-first-retry', // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    viewport: {
      width: 800,
      height: 600,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn dev',
    url: PLAYWRIGHT_CONFIG.baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
