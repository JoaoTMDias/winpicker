/* eslint-disable no-case-declarations */
import CoffeeColors from "coffee-colors";
import { ratio, score } from "get-contrast";
import { parseToHsl, parseToRgb } from "polished";
import {
  ColorFormat,
  ColorType,
  ColorValues,
  NewColour,
  PickerState,
  Score,
} from "./types";

export const CSS_NAME_SCHEMA = "--color-";

export function getColorValueofCSSVariable(type: ColorType = "foreground") {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`${CSS_NAME_SCHEMA}${type}`)
    .trim();

  return value || undefined;
}

export function setColorValueAsCSSVariable(
  type: ColorType = "foreground",
  newValue: string
) {
  document.documentElement.style.setProperty(
    `${CSS_NAME_SCHEMA}${type}`,
    newValue
  );
}

export function convertColourToFormat(
  previousFormat: ColorFormat,
  format: ColorFormat,
  value: string
) {
  switch (format) {
    case "hex":
      const newValue = new CoffeeColors(value);
      const previousFormatWasRGBorHSL = !!(
        previousFormat === "rgb" || previousFormat === "hsl"
      );

      return previousFormatWasRGBorHSL
        ? CoffeeColors.rgbToHex(newValue)
        : value;

    case "hsl":
      const newHSL = parseToHsl(value);

      return `hsl(${newHSL.hue},${(newHSL.saturation * 100).toFixed(0)}%,${(
        newHSL.lightness * 100
      ).toFixed(0)}%)`;

    case "rgb":
      const newRGB = parseToRgb(value);
      return `rgb(${newRGB.red}, ${newRGB.green}, ${newRGB.blue})`;

    default:
      return value;
  }
}

export function setNewColour<GenericPayload>(
  state: PickerState,
  type: "NEW_COLOUR" | "NEW_FORMAT" | "PICK_SWATCH",
  payload: GenericPayload
): ColorValues {
  let newValues = { ...state.values };

  switch (type) {
    case "PICK_SWATCH":
      const payloadColours = payload as unknown;

      newValues = payloadColours as ColorValues;
      setColorValueAsCSSVariable("foreground", newValues.foreground.value);
      setColorValueAsCSSVariable("background", newValues.background.value);

      return newValues;

    case "NEW_FORMAT":
      const formatPayload: unknown = payload;
      const payloadType = (formatPayload as NewColour).type;
      const payloadValue = (formatPayload as NewColour).value;
      const convertedColour = convertColourToFormat(
        state.values[payloadType].format,
        payloadValue as ColorFormat,
        newValues[payloadType].value
      );
      newValues[payloadType].value = convertedColour;
      newValues[payloadType].format = payloadValue as ColorFormat;
      break;

    default:
    case "NEW_COLOUR":
      const colourPayload: unknown = payload;

      newValues[(colourPayload as NewColour).type].value = (
        colourPayload as NewColour
      ).value;
      break;
  }

  const formatPayload: unknown = payload;
  const payloadType = (formatPayload as NewColour).type;

  setColorValueAsCSSVariable(payloadType, newValues[payloadType].value);

  return newValues;
}

export function setNewRatio(foreground: string, background: string): number {
  return ratio(foreground, background).toFixed(2);
}

export function setNewScore(foreground: string, background: string): Score {
  return score(foreground, background);
}

/**
 *
 * @param {PickerState} state
 * @param {"NEW_COLOUR" | "NEW_FORMAT"} type
 * @param {NewColour} payload
 * @returns {PickerState}
 */
export function setNewColourState<GenericPayload>(
  state: PickerState,
  type: "NEW_COLOUR" | "NEW_FORMAT" | "PICK_SWATCH",
  payload: GenericPayload
): PickerState {
  const newValues = setNewColour(state, type, payload);
  const newRatio = setNewRatio(
    newValues.foreground.value,
    newValues.background.value
  );
  const newScore = setNewScore(
    newValues.foreground.value,
    newValues.background.value
  );

  return {
    ...state,
    ratio: newRatio,
    values: newValues,
    score: newScore,
  };
}

export function swapColours(state: PickerState): PickerState {
  const newBackground = state.values.foreground;
  const newForeground = state.values.background;

  setColorValueAsCSSVariable("background", newBackground.value);
  setColorValueAsCSSVariable("foreground", newForeground.value);

  return {
    ...state,
    values: {
      foreground: newForeground,
      background: newBackground,
    },
  };
}

export function getInitialStorage() {
  let swatches: ColorValues[] = [];

  try {
    if (window.localStorage) {
      const stored = window.localStorage.getItem("swatches");

      if (!stored) {
        const newDefaultSwatches = JSON.stringify(swatches);

        window.localStorage.setItem("swatches", newDefaultSwatches);
      } else {
        swatches = JSON.parse(stored);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return swatches;
}

export function setNewColorSwatch(payload: ColorValues): ColorValues[] {
  let swatches: ColorValues[] = [];

  try {
    if (window.localStorage) {
      const stored = window.localStorage.getItem("swatches");
      const currentSwatches: ColorValues[] | undefined = stored
        ? JSON.parse(stored)
        : undefined;

      if (currentSwatches) {
        currentSwatches.push(payload);

        swatches = currentSwatches;

        window.localStorage.setItem("swatches", JSON.stringify(swatches));
      }
    }
  } catch (error) {
    console.log(error);
  }

  return swatches;
}

export function resetColorSwatches(state: PickerState): PickerState {
  setColorValueAsCSSVariable("background", state.values.background.value);
  setColorValueAsCSSVariable("foreground", state.values.foreground.value);

  try {
    if (window.localStorage) {
      window.localStorage.setItem("swatches", JSON.stringify([]));
    }
  } catch (error) {
    console.log(error);
  }

  return state;
}
