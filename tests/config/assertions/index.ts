import { mergeExpects } from '@playwright/test';
import { expect as toPassAccessibilityAuditExpect } from './toPassAccessibilityAudit';

/**
 * CRHUB extended base expect that provides new assertions.
 */
export const expect = mergeExpects(toPassAccessibilityAuditExpect);
