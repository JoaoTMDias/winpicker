/* eslint-disable no-case-declarations */
import { ratio, score } from "get-contrast";
import { ColorType, ColorValues, NewColour, PickerState, Score } from "./types";

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
): Promise<string> {
  const PROPERTY = `${CSS_NAME_SCHEMA}${type}`;
  const PROPERTY_VALUE = newValue;

  return new Promise((resolve) => {
    document.documentElement.style.setProperty(PROPERTY, PROPERTY_VALUE);

    resolve(PROPERTY_VALUE);
  });
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
  const NEW_BACKGROUND = state.values.foreground;
  const NEW_FOREGROUND = state.values.background;

  setColorValueAsCSSVariable("background", NEW_BACKGROUND.value);
  setColorValueAsCSSVariable("foreground", NEW_FOREGROUND.value);

  return {
    ...state,
    values: {
      foreground: NEW_FOREGROUND,
      background: NEW_BACKGROUND,
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
