import {
  AccessibilityAuditController,
} from '../page-objects';

export interface AxeFixture {
  /**
   * Creates an AxeBuilder instance.
   *
   * @example
   * ```ts
   * test('should load the initial page', async ({ integrationTests, accessibility }) => {
   *  await integrationTests.setup(SELECTORS_PAGES_HOME_URL);
   *  await a11y.check();
   * ```
   */
  a11y: AccessibilityAuditController;
}
