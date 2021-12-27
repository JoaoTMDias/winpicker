export type ColorType = "foreground" | "background";
export type ColorFormat = "hex" | "rgb" | "hsl";

export type Color = {
  value: string;
  format: ColorFormat;
};
export type Score = "AA" | "AA+" | "AAA" | "AAA+";
export type ColorValues = {
  foreground: Color;
  background: Color;
};
export type NewColour = {
  value: string;
  type: keyof ColorValues;
};
export type PickerState = {
  ratio: number;
  score: Score;
  values: ColorValues;
  swatches: ColorValues[];
};

export type PickerStateAction =
  | {
      type: "NEW_COLOUR" | "NEW_FORMAT";
      payload: NewColour;
    }
  | {
      type: "NEW_SWATCH" | "PICK_SWATCH";
      payload: ColorValues;
    }
  | {
      type: "SWAP_COLOURS" | "RESET_FORM";
    }
  | {
      type: "DELETE_SWATCH";
      payload: number;
    };
