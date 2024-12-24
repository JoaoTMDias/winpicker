/* eslint-disable no-case-declarations */
import { create } from "zustand";
import {
  setColorValueAsCSSVariable,
  setNewColorSwatch,
  getColorRatio,
  setNewScore,
  swapColours,
} from "./helpers";
import { ColorValues, PickerState, Score, UsePickerState } from "./types";
import { removeIndex, set as setValue } from "@feedzai/js-utilities";

const INITIAL_COLOURS: ColorValues = {
  foreground: {
    value: "#ffffff",
    format: "hex",
  },
  background: {
    value: "#000000",
    format: "hex",
  },
};
const INITIAL_RATIO: number = getColorRatio(
  INITIAL_COLOURS.foreground.value,
  INITIAL_COLOURS.background.value
);
const INITIAL_SCORE: Score = setNewScore(
  INITIAL_COLOURS.foreground.value,
  INITIAL_COLOURS.background.value
);
const INITIAL_STATE: PickerState = {
  ratio: INITIAL_RATIO,
  score: INITIAL_SCORE,
  values: INITIAL_COLOURS,
  swatches: [],
};

export const usePicker = create<UsePickerState>((set) => {
  return {
    ...INITIAL_STATE,
    createNewColour: async (colour) => {
      const { type, value } = colour;
      await setColorValueAsCSSVariable(type, value);

      return set((state) => {
        const NEW_VALUES = setValue(
          {
            ...state.values,
          },
          `${type}.value`,
          value
        );

        const NEW_RATIO = getColorRatio(
          NEW_VALUES.foreground.value,
          NEW_VALUES.background.value
        );
        const NEW_SCORE = setNewScore(
          NEW_VALUES.foreground.value,
          NEW_VALUES.background.value
        );

        return {
          ...state,
          values: NEW_VALUES,
          ratio: NEW_RATIO,
          score: NEW_SCORE,
        };
      });
    },
    pickSwatch: (swatch) =>
      set((state) => {
        const NEW_VALUES = {
          ...swatch,
        };

        setColorValueAsCSSVariable("foreground", NEW_VALUES.foreground.value);
        setColorValueAsCSSVariable("background", NEW_VALUES.background.value);

        return {
          ...state,
          values: NEW_VALUES,
        };
      }),
    swapColours: () => set(swapColours),
    resetState: () =>
      set((state) => {
        const NEXT_STATE = {
          ...state,
          ...INITIAL_STATE,
        };

        setColorValueAsCSSVariable("foreground", "#fff");
        setColorValueAsCSSVariable("background", "#000");

        return NEXT_STATE;
      }),
    deleteSwatch: (index: number) =>
      set((state) => ({
        ...state,
        swatches: removeIndex(state.swatches, index),
      })),
    createNewSwatch: (colorValues) =>
      set((state) => ({
        ...state,
        swatches: setNewColorSwatch(colorValues),
      })),
  };
});
