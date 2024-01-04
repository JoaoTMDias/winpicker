import { HEADER_RATIO_TITLE, INITIAL_STATE, expect, test } from './config';
import { getRatioAsString } from '../src/renderer/helpers';

test.describe("winpicker", async () => {
  test("it should load the app", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/WinPicker/);

    console.log(INITIAL_STATE);

    const expectedLabel = getRatioAsString(INITIAL_STATE.ratio, 1);

    console.log(expectedLabel);
    const RATIO = page.getByTestId(HEADER_RATIO_TITLE);

    await expect(RATIO).toBeDefined();
    await expect(RATIO).toHaveText(expectedLabel.label);

  });
});
