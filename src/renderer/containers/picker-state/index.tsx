/* eslint-disable no-case-declarations */
import { createReducerContext } from "react-use";
import {
  getInitialStorage,
  resetColorSwatches,
  setNewColorSwatch,
  setNewColourState,
  setNewRatio,
  setNewScore,
  swapColours,
} from "./helpers";
import {
  ColorValues,
  NewColour,
  PickerState,
  PickerStateAction,
  Score,
} from "./types";

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
const INITIAL_RATIO: number = setNewRatio(
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
  swatches: getInitialStorage(),
};

const reducer = (
  state: PickerState,
  action: PickerStateAction
): PickerState => {
  switch (action.type) {
    case "NEW_COLOUR":
    case "NEW_FORMAT":
      return setNewColourState<NewColour>(state, action.type, action.payload);

    case "SWAP_COLOURS":
      return swapColours(state);

    case "PICK_SWATCH":
      return setNewColourState<ColorValues>(state, action.type, action.payload);

    case "RESET_FORM":
      const newState = resetColorSwatches(INITIAL_STATE);
      return {
        ...newState,
      };

    case "NEW_SWATCH":
      return {
        ...state,
        swatches: setNewColorSwatch(action.payload),
      };
    default:
      return state;
  }
};

export const [usePickerState, PickerStateProvider] = createReducerContext(
  reducer,
  INITIAL_STATE
);
