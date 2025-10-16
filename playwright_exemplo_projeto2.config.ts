/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { PlaywrightTestConfig } from '@playwright/test';
import * as customEnv from 'custom-env';
import { TestOptions } from './test/e2e/setup/environmentSetup';
import baseEnvUrl from './test/commons/utils/environmentBaseUrl';

/**
 * Read environment variables from file.
 * https://github.com/erisanolasheni/custom-env
 */
customEnv.env();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config: PlaywrightTestConfig<TestOptions> = {
  /** Setup to reuse the login for all tests
   * it creates a file storageState.json that is configured by ./test/e2e/setup/globalSetup[env].ts
   * if the storageState.json already exists (it can be uploaded to a server), you don't need the above file (until the session expires),
   * meaning that you can save/upload the file in other ways;
   * it requires to setup the path down below at use/storageState
   * You can ignore this setup (reusable login) for one test if needed:
   * test.use({ storageState: undefined }); -- see login.spec.ts */
  globalSetup:
    process.env.MODE === 'local'
      ? require.resolve('./test/e2e/setup/globalSetupLocal')
      : process.env.MODE === 'staging'
      ? require.resolve('./test/e2e/setup/globalSetupStaging')
      : require.resolve('./test/e2e/setup/globalSetupProduction'),
  /**  Setup to run all tests in parallel
   * it's possible to set workers:
   * https://playwright.dev/docs/test-parallel
   * Ignore this setup (run tests in parallel) for one single test if needed:
   * test.describe.configure({ mode: 'serial' }); */
  // The line below allow parallelism within the same file. It will be changed when tests are added to the pipeline.
  fullyParallel: true,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 2,
  /* Opt out of parallel tests on CI */
  // workers: process.env.CI ? 1 : undefined,
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'on-failure' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: 'storageState.json',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'local',
      use: {
        environmentDefault: 'local',
        baseURL: baseEnvUrl.local.home,
        // channel: 'chrome',
        // ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'staging',
      use: {
        environmentDefault: 'staging',
        baseURL: baseEnvUrl.staging.home,
        // channel: 'chrome',
        // ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'production',
      use: {
        environmentDefault: 'production',
        baseURL: baseEnvUrl.production.home,
        // channel: 'chrome',
        // ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'ci',
      use: {
        environmentDefault: 'staging',
        baseURL: process.env.CI_COMMIT_REF_SLUG
          ? baseEnvUrl.ci.prefix + process.env.CI_COMMIT_REF_SLUG + baseEnvUrl.ci.suffix
          : baseEnvUrl.staging.home,
      },
    },
    {
      name: 'ciStaging',
      use: {
        environmentDefault: 'staging',
        baseURL: baseEnvUrl.staging.home,
      },
    },
    {
      name: 'ciProduction',
      use: {
        environmentDefault: 'production',
        baseURL: baseEnvUrl.production.home,
      },
    },
    // {
    //   name: 'edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //   },
    // },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // {
    //   name: 'Smoke',
    //   testMatch: /.*smoke.spec.ts/,
    //   retries: 2,
    // }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
