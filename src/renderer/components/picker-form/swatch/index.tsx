import { Icon } from "@fluentui/react";
import { CSSProperties, FC, useCallback } from "react";
import { usePickerState } from "../../../containers/picker-state";
import { Color, ColorValues } from "../../../containers/picker-state/types";
import styles from "./styles.module.scss";

interface SwatchProps {
  selected?: boolean;
  foreground: Color;
  background: Color;
}

export const Swatch: FC<SwatchProps> = ({
  selected,
  foreground,
  background,
}) => {
  const [state, dispatch] = usePickerState();

  const handleOnClickToPickSwatch = useCallback(() => {
    if (!selected && state) {
      dispatch({
        type: "PICK_SWATCH",
        payload: {
          foreground,
          background,
        },
      });
    }
  }, [selected, state, foreground, background, dispatch]);
  const description = `Swatch: Background = ${background.value}. Foreground = ${foreground.value}. Click/Tap to apply these colour values.`;
  return (
    <li data-selected={selected} className={styles.swatches__item}>
      <Icon className={styles.swatches__check} iconName="CompletedSolid" />
      <button
        type="button"
        aria-pressed={selected}
        className={styles.swatches__button}
        onClick={handleOnClickToPickSwatch}
      >
        <span
          className={styles.swatches__item__foreground}
          style={{ "--swatch-colour": foreground.value } as CSSProperties}
        />
        <span
          className={styles.swatches__item__background}
          style={{ "--swatch-colour": background.value } as CSSProperties}
        />
        <span className="sr-only">{description}</span>
      </button>
    </li>
  );
};

Swatch.defaultProps = {
  selected: false,
};

interface SwatchListProps {
  current: ColorValues;
  swatches: ColorValues[];
}

export const SwatchList: FC<SwatchListProps> = ({
  current,
  swatches,
}) => {
  function renderSwatches() {
    const list = swatches.map((item, index) => {
      const key = `${item.foreground.value}-${index}`;
      const hasSameForeground =
        current.foreground.value === item.foreground.value;
      const hasSameBackground =
        current.background.value === item.background.value;
      const isSelected = !!(hasSameForeground && hasSameBackground);

      return (
        <Swatch
          key={key}
          selected={isSelected}
          foreground={item.foreground}
          background={item.background}
        />
      );
    });

    return (
      <ul
        id="cfcdf2cc-072a-4358-a88b-2d2e7a24b118"
        className={styles.swatches__list}
      >
        {list}
      </ul>
    );
  }

  return swatches.length > 0 ? (
    renderSwatches()
  ) : (
    <div className={styles.swatches__list} />
  );
};
