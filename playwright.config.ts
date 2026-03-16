import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [['list']],
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.POKEMON_API_URL,
    ...devices['Desktop Chrome'],
  },
});
