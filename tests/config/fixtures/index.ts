import {
  AccessibilityAuditController,
} from '../page-objects';
import { AxeFixture } from './types';
import { test as base } from '@playwright/test';
import { setupCoverage } from '../helpers';

/**
* CRHUB extended base test that provides new fixtures.
*/
export const test = base.extend<AxeFixture>({
  context: async ({ context }, use) => {
    await setupCoverage(context, use);
  },
  a11y: async ({ page }, use) => {
    const a11y = new AccessibilityAuditController(page);

    await use(a11y);
  },
});
