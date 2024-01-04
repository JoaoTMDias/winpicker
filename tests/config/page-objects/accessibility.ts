import { AxeBuilder } from '@axe-core/playwright';
import { type Page } from '@playwright/test';
import { SerialFrameSelector } from 'axe-core';
import { expect } from '../assertions';

/**
 * Page Object Model for the CR HUB Accessibility Audit Controller
 *
 * @class AccessibilityAudit
 */
class AccessibilityAuditController {
  private readonly page: Page;
  readonly AxeBuilder: AxeBuilder;

  constructor (page: Page) {
    this.page = page;
    this.AxeBuilder = new AxeBuilder({
      page: this.page,
    });
  }

  /**
   * Runs axe against the document at the point in which it is called.
   * This means you can call this after interacting with your page and uncover accessibility issues introduced as a
   * result of rendering in response to user actions.
   *
   * Note: This method is self-contained, meaning that it does the assertion on itself.
   *
   * @example
   * ```ts
   * // scan a full-page
   * await integrationTests.goto("/a-page-url");
   * await a11y.check();
   *
   * // scan an element
   * await integrationTests.goto("/a-page-url");
   * await a11y.check('#DOM-selector.with-also-a-css-class');
   * ```
   */
  async check(selector?: string) {
    const results = selector ? await this.auditElement(selector) : await this.auditPage();

    expect(results).toPassAccessibilityAudit();
  }

  /**
   * Tests an entire page for automatically detectable accessibility violations
   *
   * {@link https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md#axebuilderincludeselector-string--string | Axe include API}
   * {@link https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md#axebuilderexcludeselector-string--string | Axe exclude API}
   *
   * @example
   * ```ts
   * // scan a full-page
   * await integrationTests.goto("/a-page-url");
   * const results = await a11y.auditPage();
   * expect(results).toPassAccessibilityAudit();
   *
   * // scan a full-page, and exclude certain DOM elements via CSS selector
   * const accessibilityScanResults = await a11y.auditPage('.custom-css');
   * const accessibilityScanResults = await a11y.auditPage([
   *  '.custom-css',
   *  '.another-custom-css'
   * ]);
   * ```
   */
  async auditPage(excludeSelectors?: string | string[]) {
    if (!excludeSelectors) {
      return await this.AxeBuilder.analyze();
    }

    // If multiple selectors to exclude
    if (Array.isArray(excludeSelectors) && excludeSelectors.length > 1) {
      const a11y = this.AxeBuilder;

      excludeSelectors.forEach((string) => {
        a11y.exclude(string);
      });

      return await a11y.analyze();
    }

    // If single selector to exclude
    return await this.AxeBuilder.exclude(excludeSelectors).analyze();
  }

  /**
   * Tests a DOM element for automatically detectable accessibility violations
   *
   * {@link https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md#axebuilderincludeselector-string--string | Axe include API}
   * {@link https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/README.md#axebuilderexcludeselector-string--string | Axe exclude API}
   *
   * @example
   * ```ts
   * await integrationTests.goto("/a-page-url");
   * const results = await a11y.auditElement('#navigation-menu-flyout');
   * expect(results).toPassAccessibilityAudit();
   *
   * // scan an element, and exclude certain DOM elements via CSS selector
   * const results = await a11y.auditElement(
   *  '.this-class-is-the-target',
   *  [
   *      '.this-will-be-excluded',
   *      '.this-will-also-be-excluded',
   *  ]
   * );
   * expect(results).toPassAccessibilityAudit();
   * ```
   */
  async auditElement(selector: SerialFrameSelector, excludeSelectors?: string | string[]) {
    if (!excludeSelectors) {
      return await this.AxeBuilder.include(selector).analyze();
    }

    // If multiple selectors to exclude
    if (Array.isArray(excludeSelectors) && excludeSelectors.length > 1) {
      const a11y = this.AxeBuilder;

      excludeSelectors.forEach((string) => {
        a11y.exclude(string);
      });

      return await a11y.include(selector).analyze();
    }

    // If single selector to exclude
    return await this.AxeBuilder.include(selector).exclude(excludeSelectors).analyze();
  }

  /**
   * By default, axe checks against a wide variety of accessibility rules. Some of these rules correspond to specific
   * success criteria from the Web Content Accessibility Guidelines (WCAG), and others are "best practice" rules that
   * are not specifically required by any WCAG criterion.
   *
   * You can constrain an accessibility scan to only run those rules which are "tagged" as corresponding to specific
   * WCAG success criteria by using AxeBuilder.withTags(). For example, Accessibility Insights for Web's Automated
   * Checks only include axe rules that test for violations of WCAG A and AA success criteria; to match that behavior,
   * you would use the tags `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa`.
   *
   * Note that automated testing cannot detect all types of WCAG violations.
   *
   * {@link https://www.deque.com/axe/core-documentation/api-documentation/#axecore-tags | Complete list of Axe Tags}
   *
   * @example
   * ```ts
   * await integrationTests.goto("/a-page-url");
   * const results = await a11y.auditWithCustomTags([
   *  'wcag2a',
   *  'wcag2aa',
   *  'wcag21a',
   *  'wcag21aa'
   * ]);
   * expect(results).toPassAccessibilityAudit();
   * ```
   */
  async auditWithCustomTags(tags: string | string[], excludeSelectors?: string | string[]) {
    if (!excludeSelectors) {
      return await this.AxeBuilder.withTags(tags).analyze();
    }

    // If multiple selectors to exclude
    if (Array.isArray(excludeSelectors) && excludeSelectors.length > 1) {
      const a11y = this.AxeBuilder;

      excludeSelectors.forEach((string) => {
        a11y.exclude(string);
      });

      return await a11y.withTags(tags).analyze();
    }

    // If single selector to exclude
    return await this.AxeBuilder.withTags(tags).exclude(excludeSelectors).analyze();
  }

  /**
   * If your application contains many different pre-existing violations of a specific rule, you can use
   * AxeBuilder.disableRules() to temporarily disable individual rules until you're able to fix the issues.
   *
   * You can find the rule IDs to pass to disableRules() in the id property of the violations you want to suppress.
   * A complete list of axe's rules can be found in axe-core's documentation.
   *
   * {@link https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md | Complete list of Axe Rules}
   *
   * @example
   * ```ts
   * await integrationTests.goto("/a-page-url");
   * const results = await a11y.auditWithExcludedRules(['duplicate-id']);
   * expect(results).toPassAccessibilityAudit();
   * ```
   */
  async auditWithExcludedRules(rules: string[]) {
    return await this.AxeBuilder.disableRules(rules).analyze();
  }
}

export default AccessibilityAuditController;
