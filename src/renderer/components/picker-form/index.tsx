import {
  DefaultButton,
  Icon,
  Label,
  PrimaryButton,
  TooltipDelay,
} from "@fluentui/react";
import clsx from "clsx";
import { useCallback } from "react";
import { usePicker } from "@/renderer/containers";
import { Tooltip, SwatchList } from "@/renderer/components";
import Colour from "./colour";
import styles from "./styles.module.scss";

const PickerForm = () => {
  const { values, swatches, swapColours, createNewSwatch, resetState } =
    usePicker();

  const handleOnClickToSaveSwatch = useCallback(() => {
    const NEW_SWATCH = values;

    createNewSwatch(NEW_SWATCH);
  }, [values]);

  const handleOnClickOnReset = useCallback(() => {
    resetState();
  }, []);

  const swapButtonDescription = "Swap Foreground and Background Colours";

  return (
    <form className={styles.form}>
      <h2 className="sr-only">Foreground, Background and Saved Swatches</h2>
      <fieldset className={styles.wrapper}>
        <legend className="sr-only" data-testid="color-inputs-fieldset">
          Foreground and Background Colours
        </legend>
        <Colour id="foreground" label="Foreground" />
        <Tooltip
          id="5da1ce23-2dc9-450c-a213-abccfc08ecb9"
          className={styles.swap__wrapper}
          description={swapButtonDescription}
          delay={TooltipDelay.long}
        >
          <DefaultButton
            type="button"
            className={styles.swap}
            onClick={swapColours}
            data-testid="color-inputs-swap-button"
          >
            <span className="sr-only">{swapButtonDescription}</span>
            <Icon iconName="Switch" />
          </DefaultButton>
        </Tooltip>
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
              Saved Swatches
              <span>{` (${swatches.length || 0})`}</span>
            </span>
            <SwatchList current={values} swatches={swatches} />
          </Label>
        </fieldset>
        <fieldset className={clsx(styles.wrapper, styles.cta)}>
          <legend className="sr-only">Call to Action buttons</legend>
          <DefaultButton
            type="button"
            className={clsx(styles.cta__button, styles["cta__button--default"])}
            onClick={handleOnClickOnReset}
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
