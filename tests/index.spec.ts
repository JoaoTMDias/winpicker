import { HEADER_LOGO, HEADER_RATIO_TITLE, expect, test } from "./config";
import { RATIOS } from "../src/constants";
import { Grade_Level } from "../src/typings";
import { Locator } from "@playwright/test";

test.describe("winpicker", async () => {
  let ELEMENTS: {
    LOGO: Locator;
    RATIO: Locator;
    GRADE_RESULTS: Locator;
    GRADE_ITEMS: Locator;
    RATING: Locator;
    RATING_STARS: {
      1: Locator;
      2: Locator;
      3: Locator;
      4: Locator;
      5: Locator;
    };
    COLOR_INPUTS: {
      FIELDSET: Locator;
      FOREGROUND: {
        PICKER: Locator;
        INPUT: Locator;
        SELECT: Locator;
        OPTION: Locator;
      };
      TOGGLE: Locator;
      BACKGROUND: {
        PICKER: Locator;
        INPUT: Locator;
        SELECT: Locator;
        OPTION: Locator;
      };
    };
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    ELEMENTS = {
      LOGO: page.getByTestId(HEADER_LOGO),
      RATIO: page.getByTestId(HEADER_RATIO_TITLE),
      GRADE_RESULTS: page.getByRole("list").filter({
        hasText: "Grade results",
      }),
      GRADE_ITEMS: page.getByTestId("header-grade-item"),
      RATING: page.getByTestId("header-rating").getByRole("textbox"),
      RATING_STARS: {
        1: page.getByText("1 of 5 stars"),
        2: page.getByText("2 of 5 stars"),
        3: page.getByText("3 of 5 stars"),
        4: page.getByText("4 of 5 stars"),
        5: page.getByText("5 of 5 stars"),
      },
      COLOR_INPUTS: {
        FIELDSET: page.getByRole("group", {
          name: "Foreground and Background Colours",
        }),
        FOREGROUND: {
          PICKER: page
            .getByLabel("Foreground")
            .getByRole("button", { name: "Choose Colour" }),
          INPUT: page.getByLabel("Foreground").getByRole("textbox"),
          SELECT: page.getByLabel("Foreground").getByRole("combobox"),
          OPTION: page.getByLabel("Foreground").getByRole("option"),
        },
        TOGGLE: page.getByTestId("swap-button"),
        BACKGROUND: {
          PICKER: page
            .getByLabel("Background")
            .getByRole("button", { name: "Choose Colour" }),
          INPUT: page.getByLabel("Background").getByRole("textbox"),
          SELECT: page.getByLabel("Background").getByRole("combobox"),
          OPTION: page.getByLabel("Background").getByRole("option"),
        },
      },
    };
  });

  test.describe("Basic UI", () => {
    test("it should load the app", async ({ page }) => {
      // Title should exist
      await expect(page).toHaveTitle(/WinPicker/);
    });

    test("logo should be visible", async () => {
      // Logo should be visible
      await expect(ELEMENTS.LOGO).toBeVisible();
    });

    test("Ratio should be visible", async () => {
      // Ratio should be visible
      await expect(ELEMENTS.RATIO).toBeDefined();
    });

    test("There should be a list of grades", async () => {
      // There should be a list of grades
      await expect(ELEMENTS.GRADE_RESULTS).toBeDefined();
      await expect(ELEMENTS.GRADE_ITEMS).toHaveCount(4);

      // And each grade should be labelled by its level
      for (const ITEM of await ELEMENTS.GRADE_ITEMS.all()) {
        const LABEL = await ITEM.getByTestId(
          "header-grade-item-label"
        ).textContent();

        await expect(ITEM).toBeVisible();
        await expect(RATIOS.includes(LABEL as Grade_Level)).toBeTruthy();
      }
    });

    test("Rating stars should be visible", async () => {
      // Rating Stars should be visible
      await expect(ELEMENTS.RATING).toBeVisible();

      // And each rating star should be visible
      for (const entry of Object.values(ELEMENTS.RATING_STARS)) {
        await expect(entry).toBeVisible();
      }
    });

    test("should load the colours fieldset", async () => {
      await expect(ELEMENTS.COLOR_INPUTS.FIELDSET).toBeVisible();
    });
  });

  /* test("asdsssads", async ({ page }) => {
    const EXPECTED_LABEL = getRatioAsString(INITIAL_STATE.ratio, 1);

    // There should be a ratio defined
    await expect(RATIO).toHaveText(EXPECTED_LABEL.label);
  }); */
});
