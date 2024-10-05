import {
  DefaultButton,
  Icon,
  Label,
  PrimaryButton,
  TooltipDelay,
} from "@fluentui/react";
import clsx from "clsx";
import { useCallback } from "react";
import { usePickerState } from "../../containers/picker-state";
import { Tooltip } from "../common";
import Colour from "./colour";
import styles from "./styles.module.scss";
import { SwatchList } from "./swatch";

const PickerForm = () => {
  const [state, dispatch] = usePickerState();
  const handleOnClickToSwap = useCallback(() => {
    if (state) {
      dispatch({
        type: "SWAP_COLOURS",
      });
    }
  }, [state, dispatch]);

  const handleOnClickToSaveSwatch = useCallback(() => {
    if (state) {
      const newSwatch = state.values;

      dispatch({
        type: "NEW_SWATCH",
        payload: newSwatch,
      });
    }
  }, [state, dispatch]);

  const handleOnClickToReset = useCallback(() => {
    if (state) {
      dispatch({
        type: "RESET_FORM",
      });
    }
  }, [state, dispatch]);

  const swapButtonDescription = "Swap Foreground and Background Colours";

  return (
    <form className={styles.form}>
      <h2 className="sr-only">Foreground, Background and Saved Swatches</h2>
      <fieldset className={styles.wrapper}>
        <legend className="sr-only" data-testid="color-inputs-fieldset">
          Foreground and Background Colours
        </legend>
        <Colour id="foreground" label="Foreground" />
        <DefaultButton
          type="button"
          className={styles.swap}
          onClick={handleOnClickToSwap}
          data-testid="color-inputs-swap-button"
        >
          <Tooltip
            id="5da1ce23-2dc9-450c-a213-abccfc08ecb9"
            className={styles.swap__wrapper}
            description={swapButtonDescription}
            delay={TooltipDelay.long}
          >
            <span className="sr-only">{swapButtonDescription}</span>
            <Icon iconName="Switch" />
          </Tooltip>
        </DefaultButton>
        <Colour id="background" label="Background" />
      </fieldset>
      <div className={styles.form__footer}>
        <fieldset className={clsx(styles.wrapper, styles.swatches)}>
          <legend className="sr-only">Saved Swatches</legend>
          <Label
            className={styles.label}
            htmlFor="cfcdf2cc-072a-4358-a88b-2d2e7a24b118"
          >
            <span>
              Saved <span className="sr-only">Swatches</span>
              <span>{`(${state.swatches.length || 0})`}</span>
            </span>
            <SwatchList current={state.values} swatches={state.swatches} />
          </Label>
        </fieldset>
        <fieldset className={clsx(styles.wrapper, styles.cta)}>
          <legend className="sr-only">Call to Action buttons</legend>
          <DefaultButton
            type="button"
            className={clsx(styles.cta__button, styles["cta__button--default"])}
            onClick={handleOnClickToReset}
          >
            Reset Colours
          </DefaultButton>
          <PrimaryButton
            type="button"
            className={clsx(styles.cta__button, styles["cta__button--primary"])}
            onClick={handleOnClickToSaveSwatch}
          >
            Save as a Swatch
          </PrimaryButton>
        </fieldset>
      </div>
    </form>
  );
};

export default PickerForm;
