export type ColorSelectionOptions = {
  signal?: AbortSignal
}

export type ColorSelectionResult = {
  sRGBHex: string
}

interface EyeDropperAPI {
  close: () => void
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>
  isSupported: () => boolean
}

declare global {
  interface Window {
    EyeDropper: EyeDropperAPI;
  }
}

export type SelectType = "foreground" | "background";
export interface Props {
  type: SelectType;
  onSelect: (colour: string, type: SelectType) => void;
}
