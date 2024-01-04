import * as fs from 'fs';
import * as path from 'path';
import { BrowserContext, Locator } from '@playwright/test';

const ISTANBUL_CLI_OUTPUT = path.join(process.cwd(), 'coverage-reports/playwright');

/**
 * Collects code coverage from running end-to-end tests.
 *
 * Assumes that code has been instrumented with `babel-plugin-istanbul` during the build process.
 */
export async function setupCoverage(
  context: BrowserContext,
  use: (r: BrowserContext) => Promise<void>
) {
  await context.addInitScript(() =>
    window.addEventListener('beforeunload', () =>
      (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
    )
  );
  await fs.promises.mkdir(ISTANBUL_CLI_OUTPUT, { recursive: true });
  await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
    if (coverageJSON)
      fs.writeFileSync(
        path.join(ISTANBUL_CLI_OUTPUT, `playwright_coverage.json`),
        coverageJSON
      );
  });
  await use(context);
  for (const page of context.pages()) {
    await page.evaluate(() =>
      (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
    );
  }
}
type WaitForRes = [locatorIndex: number, locator: Locator];

export async function waitForOneOf(
  locators: Locator[],
): Promise<WaitForRes> {
  const res = await Promise.race([
    ...locators.map(async (locator, index): Promise<WaitForRes> => {
      let timedOut = false;
      await locator.waitFor({ state: 'visible' }).catch(() => timedOut = true);
      return [timedOut ? -1 : index, locator];
    }),
  ]);
  if (res[0] === -1) {
    throw new Error('no locator visible before timeout');
  }
  return res;
}
