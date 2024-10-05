import { SELECTORS, expect, test } from "./config";
import { Page } from "@playwright/test";

async function getElements(page: Page) {
  const ELEMENTS = {
    LOGO: await page.getByTestId(SELECTORS.header.logo),
    RATIO: await page.getByTestId(SELECTORS.header.ratio),
    GRADE_RESULTS: await page.getByTestId(SELECTORS.header["grade-results"]),
    GRADE_ITEMS: {
      aa: await page.getByTestId(SELECTORS.header["grade-items"].aa.wrapper),
      "aa-plus": await page.getByTestId(
        SELECTORS.header["grade-items"]["aa-plus"].wrapper
      ),
      aaa: await page.getByTestId(SELECTORS.header["grade-items"].aaa.wrapper),
      "aaa-plus": await page.getByTestId(
        SELECTORS.header["grade-items"]["aaa-plus"].wrapper
      ),
    },
    RATING: await page.getByTestId(SELECTORS.header.rating),
    RATING_STARS: {
      1: await page.getByText("1 of 5 stars"),
      2: await page.getByText("2 of 5 stars"),
      3: await page.getByText("3 of 5 stars"),
      4: await page.getByText("4 of 5 stars"),
      5: await page.getByText("5 of 5 stars"),
    },
    COLOR_INPUTS: {
      FIELDSET: await page.getByTestId(SELECTORS["color-inputs"].fieldset),
      FOREGROUND: {
        LABEL: await page.getByTestId(
          SELECTORS["color-inputs"].foreground.label
        ),
        PICKER: await page.getByTestId(
          SELECTORS["color-inputs"].foreground.picker
        ),
      },
      TOGGLE: await page.getByTestId(SELECTORS["color-inputs"].toggle),
      BACKGROUND: {
        LABEL: await page.getByTestId(
          SELECTORS["color-inputs"].background.label
        ),
        PICKER: await page.getByTestId(
          SELECTORS["color-inputs"].background.picker
        ),
      },
      CALLOUT: {
        DIALOG: await page.getByTestId(
          SELECTORS["color-inputs"].callout.dialog
        ),
      },
    },
  };

  return ELEMENTS;
}

test.describe("winpicker", async () => {
  let ELEMENTS: Awaited<ReturnType<typeof getElements>>;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    ELEMENTS = await getElements(page);
  });

  test.describe("Basic UI", () => {
    test("it should load the app", async ({ page }) => {
      // Title should exist
      await expect(page).toHaveTitle(/WinPicker/);

      // Logo should be visible
      await expect(ELEMENTS.LOGO).toBeVisible();

      // Ratio should be visible
      await expect(ELEMENTS.RATIO).toBeDefined();

      // There should be a list of grades
      await expect(ELEMENTS.GRADE_RESULTS).toBeDefined();
      await expect(ELEMENTS.GRADE_ITEMS.aa).toBeVisible();
      await expect(ELEMENTS.GRADE_ITEMS["aa-plus"]).toBeVisible();
      await expect(ELEMENTS.GRADE_ITEMS.aaa).toBeVisible();
      await expect(ELEMENTS.GRADE_ITEMS["aaa-plus"]).toBeVisible();

      // Rating Stars should be visible
      await expect(ELEMENTS.RATING).toBeVisible();

      // And each rating star should be visible
      for (const entry of Object.values(ELEMENTS.RATING_STARS)) {
        await expect(entry).toBeVisible();
      }

      // Should load the colours fieldset
      await expect(ELEMENTS.COLOR_INPUTS.FIELDSET).toBeVisible();
    });
  });

  test.describe("Picking a foreground colour", () => {
    test.beforeEach(async () => {
      await test.step("Opening the Callout Picker", async () => {
        await expect(ELEMENTS.COLOR_INPUTS.FOREGROUND.PICKER).toBeVisible();
        await ELEMENTS.COLOR_INPUTS.FOREGROUND.PICKER.click();
        await expect(ELEMENTS.COLOR_INPUTS.CALLOUT.DIALOG).toBeVisible();
      });
    });

    test("Using the browser's EyeDropper API", async ({ page }) => {});

    test("Using the color picker UI", async ({ page }) => {});
  });

  /* test("asdsssads", async ({ page }) => {
    const EXPECTED_LABEL = getRatioAsString(INITIAL_STATE.ratio, 1);

    // There should be a ratio defined
    await expect(RATIO).toHaveText(EXPECTED_LABEL.label);
  }); */
});
