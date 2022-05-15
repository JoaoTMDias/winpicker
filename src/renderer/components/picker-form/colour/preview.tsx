import { Icon } from "@fluentui/react/lib/Icon";
import { ChangeEvent, FC, useRef } from "react";
import { Color } from "../../../containers/picker-state/types";
import styles from "./styles.module.scss";

interface Props {
  colour: Color;
  onSelect: (colour: string) => void;
}

interface ColorSelectionOptions {
  signal?: AbortSignal;
}

interface ColorSelectionResult {
  sRGBHex: string;
}

declare global {
  interface window extends Window {
    EyeDropper: {
      open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>;
    };
  }
}

const Preview: FC<Props> = ({ colour, onSelect }) => {
  const { current: supportsEyeDropper } = useRef("EyeDropper" in window);

  async function handleOnSelectColourWithEyeDropper() {
    try {
      let dropper = new EyeDropper();

      const result = await dropper.open();
      const value = result.sRGBHex as string;

      onSelect(value);
    } catch (error) {
      console.warn(error);
    }
  }

  function handleOnSelectWithColorInput(event: ChangeEvent<HTMLInputElement>) {
    const newColour = (event.target as HTMLInputElement).value;

    onSelect(newColour);
  }

  function renderCallToAction() {
    if (supportsEyeDropper) {
      return (
        <button
          type="button"
          className={styles.preview__input}
          onClick={handleOnSelectColourWithEyeDropper}
        >
          Choose Colour
        </button>
      );
    }

    return (
      <input
        className={styles.preview__input}
        type="color"
        value={colour.value}
        onChange={handleOnSelectWithColorInput}
      />
    );
  }

  return (
    <span className={styles.preview}>
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      {renderCallToAction()}
    </span>
  );
};

export default Preview;
