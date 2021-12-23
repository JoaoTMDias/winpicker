/* eslint-disable no-case-declarations */
import CoffeeColors from 'coffee-colors';
import { ratio, score } from 'get-contrast';
import { parseToHsl, parseToRgb } from 'polished';
import { createReducerContext } from 'react-use';
import { setColorValueAsCSSVariable } from './helpers';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

export type Color = {
  value: string;
  format: ColorFormat;
};
type Score = 'AA' | 'AA+' | 'AAA' | 'AAA+';
type ColorValues = {
  foreground: Color;
  background: Color;
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
      type: 'NEW_COLOUR' | 'NEW_FORMAT';
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

function convertColourToFormat(
  previousFormat: ColorFormat,
  format: ColorFormat,
  value: string
) {
  switch (format) {
    case 'hex':
      const newValue = new CoffeeColors(value);
      if (previousFormat === 'rgb') {
        return CoffeeColors.rgbToHex(newValue);
      }

      if (previousFormat === 'hsl') {
        return CoffeeColors.rgbToHex(CoffeeColors.hslToRgb(newValue));
      }

      return value;

    case 'hsl':
      const newHSL = parseToHsl(value);

      return `hsl(${newHSL.hue},${newHSL.saturation * 100}%,${
        newHSL.lightness * 100
      }%)`;

    case 'rgb':
      const newRGB = parseToRgb(value);
      return `rgb(${newRGB.red}, ${newRGB.green}, ${newRGB.blue})`;

    default:
      return value;
  }
}

function setNewColour(
  state: PickerState,
  type: 'NEW_COLOUR' | 'NEW_FORMAT',
  payload: NewColour
): ColorValues {
  const newValues = { ...state.values };

  switch (type) {
    case 'NEW_FORMAT':
      const convertedColour = convertColourToFormat(
        state.values[payload.type].format,
        payload.value as ColorFormat,
        newValues[payload.type].value
      );
      newValues[payload.type].value = convertedColour;
      newValues[payload.type].format = payload.value as ColorFormat;
      break;

    default:
    case 'NEW_COLOUR':
      newValues[payload.type].value = payload.value;
      break;
  }

  setColorValueAsCSSVariable(payload.type, newValues[payload.type].value);

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
  type: 'NEW_COLOUR' | 'NEW_FORMAT',
  payload: NewColour
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

const INITIAL_COLOURS: ColorValues = {
  foreground: {
    value: '#ffffff',
    format: 'hex',
  },
  background: {
    value: '#000000',
    format: 'hex',
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
  swatches: [],
};

const reducer = (
  state: PickerState,
  action: PickerStateAction
): PickerState => {
  switch (action.type) {
    case 'NEW_COLOUR':
    case 'NEW_FORMAT':
      return setNewColourState(state, action.type, action.payload);
    default:
      return state;
  }
};

export const [usePickerState, PickerStateProvider] = createReducerContext(
  reducer,
  INITIAL_STATE
);
