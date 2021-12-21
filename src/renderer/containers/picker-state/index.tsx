/* eslint-disable no-case-declarations */
import { ratio, score } from 'get-contrast';
import { createReducerContext } from 'react-use';
import { setColorValueAsCSSVariable } from './helpers';

type Score = 'AA' | 'AA+' | 'AAA' | 'AAA+';
type ColorValues = {
  foreground: string;
  background: string;
};
type NewColour = {
  value: string;
  type: keyof ColorValues;
};
type PickerState = {
  ratio: number;
  score: Score;
  values: ColorValues;
  swatches: ColorValues[];
};

type PickerStateAction =
  | {
      type: 'NEW_COLOUR';
      payload: NewColour;
    }
  | {
      type: 'NEW_SWATCH';
      payload: ColorValues;
    }
  | {
      type: 'SWAP_COLOURS' | 'RESET_FORM';
    }
  | {
      type: 'DELETE_SWATCH';
      payload: number;
    };

function setNewColour(state: PickerState, payload: NewColour): ColorValues {
  setColorValueAsCSSVariable(payload.type, payload.value);

  const newValues = { ...state.values };

  newValues[payload.type] = payload.value;

  return newValues;
}

function setNewRatio(foreground: string, background: string): number {
  return ratio(foreground, background).toFixed(2);
}

function setNewScore(foreground: string, background: string): Score {
  return score(foreground, background);
}

function setNewColourState(
  state: PickerState,
  payload: NewColour
): PickerState {
  const newValues = setNewColour(state, payload);
  const newRatio = setNewRatio(newValues.foreground, newValues.background);
  const newScore = setNewScore(newValues.foreground, newValues.background);

  return {
    ...state,
    ratio: newRatio,
    values: newValues,
    score: newScore,
  };
}

const INITIAL_COLOURS: ColorValues = {
  foreground: '#ffffff',
  background: '#000000',
};
const INITIAL_RATIO: number = setNewRatio(
  INITIAL_COLOURS.foreground,
  INITIAL_COLOURS.background
);
const INITIAL_SCORE: Score = setNewScore(
  INITIAL_COLOURS.foreground,
  INITIAL_COLOURS.background
);
const INITIAL_STATE: PickerState = {
  ratio: INITIAL_RATIO,
  score: INITIAL_SCORE,
  values: INITIAL_COLOURS,
  swatches: [],
};

const reducer = (
  state: PickerState,
  action: PickerStateAction
): PickerState => {
  switch (action.type) {
    case 'NEW_COLOUR':
      return setNewColourState(state, action.payload);
    default:
      return state;
  }
};

export const [usePickerState, PickerStateProvider] = createReducerContext(
  reducer,
  INITIAL_STATE
);
