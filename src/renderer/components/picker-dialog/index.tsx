import { ColourPickerDialogProps } from "@/renderer/components/picker-form/colour/types";
import {
  Panel,
  ColorPicker,
  DefaultButton,
  IColor,
  PrimaryButton,
  Text,
  getColorFromString,
  PanelType,
} from "@fluentui/react";
import { ScreenPicker, TextPreview } from "@/renderer/components";
import styles from "./styles.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePicker } from "@/renderer/containers";
import Grade from "../header/grades/grade";
import { getComplianceState } from "@/renderer/helpers";
import {
  getColorRating,
  getColorRatio,
} from "@/renderer/containers/picker-state/helpers";

const callout = `colour-picker-dialog`;

/**
 * Colour picker dialog
 */
export function ColourPickerDialog({
  open,
  target,
  onDismiss,
  id,
  label,
}: ColourPickerDialogProps) {
  const TEST_IDS = useRef({
    callout,
    title: `${callout}-title`,
    description: `${callout}-description`,
    picker: `${callout}-picker`,
  }).current;

  const { values, createNewColour, resetState } = usePicker();
  const targetColour = values[id]?.value ?? "#ffffff";
  const [currentColor, setCurrentColor] = useState(targetColour);
  const [currentRatio, setCurrentRatio] = useState(0);

  useEffect(() => {
    const colors = {
      foreground:
        id === "foreground"
          ? currentColor
          : values.foreground?.value ?? "#000000",
      background:
        id === "background"
          ? currentColor
          : values.background?.value ?? "#ffffff",
    };
    const nextRatio = getColorRatio(colors.foreground, colors.background);

    setCurrentRatio(nextRatio);
  }, [currentColor, id, values]);

  const TOOLTIP_PROPS = {
    id: `${crypto.randomUUID()}-${id}`,
    title: `${label} colour`,
  };

  /**
   * Calculates the compliance state of the current ratio
   *
   */
  const compliance = useMemo(() => {
    return getComplianceState(currentRatio);
  }, [currentRatio]);

  /**
   * Calculates the rating of the current ratio
   */
  const rating = useMemo(() => {
    return getColorRating(currentRatio);
  }, [currentRatio]);

  /**
   * Handles the colour picker change event
   */
  const handleOnPickColor = useCallback(
    (_: React.SyntheticEvent<HTMLElement>, color: IColor) => {
      setCurrentColor(color.str);
    },
    []
  );

  /**
   * Handles the colour picker change event from the system
   */
  const handleOnPickColorFromSystem = useCallback(
    (color: string) => {
      setCurrentColor(color);
    },
    [setCurrentColor]
  );

  /**
   * Handles the reset button click event
   */
  const handleOnClickOnReset = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setCurrentColor(targetColour);
      resetState();
    },
    [resetState, targetColour]
  );

  /**
   * Handles the submit button click event
   */
  const handleOnSubmit = useCallback(() => {
    createNewColour({ type: id, value: currentColor });
    onDismiss?.();
  }, [createNewColour, currentColor, id, onDismiss]);

  const onRenderFooterContent = useCallback(
    () => (
      <div className={styles.callout__footer}>
        <DefaultButton
          type="reset"
          data-testid="colour-picker-dialog-reset"
          onClick={handleOnClickOnReset}
        >
          Reset
        </DefaultButton>
        <PrimaryButton
          type="button"
          onClick={handleOnSubmit}
          data-testid="colour-picker-dialog-save"
        >
          {`Set new ${label} colour`}
        </PrimaryButton>
      </div>
    ),
    [handleOnClickOnReset]
  );

  const PICKER_COLOUR = getColorFromString(currentColor) ?? currentColor;

  return (
    <Panel
      className={styles.callout}
      closeButtonAriaLabel="Close"
      headerText={TOOLTIP_PROPS.title}
      isFooterAtBottom={true}
      isLightDismiss
      isOpen={open}
      onDismiss={onDismiss}
      onRenderFooterContent={onRenderFooterContent}
      type={PanelType.medium}
      data-testid={TEST_IDS.callout}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <header className={styles.callout__header}>
          <div className={styles.callout__header__left}>
            <Text block variant="small" data-testid={TEST_IDS.description}>
              Choose a colour from your screen or use the picker below
            </Text>
          </div>
        </header>
        <div className={styles.callout__body} data-testid={TEST_IDS.picker}>
          <div className={styles.callout__score}>
            <h2 className={styles.callout__ratio}>
              <span className={styles.callout__ratio__label}>Ratio: </span>
              <span className={styles.callout__ratio__value}>
                {currentRatio}
              </span>
            </h2>
            <div className={styles.callout__rating}>{rating}</div>
            <div
              role="list"
              className={styles.callout__grade}
              data-testid="panel-grade-results-list"
            >
              <Grade
                compliant={compliance.AA}
                level="AA"
                data-testid="header-grade-results-item-aa"
              />
              <Grade
                compliant={compliance["AA+"]}
                level="AA+"
                data-testid="header-grade-results-item-aa-plus"
              />
              <Grade
                compliant={compliance.AAA}
                level="AAA"
                data-testid="header-grade-results-item-aaa"
              />
              <Grade
                compliant={compliance["AAA+"]}
                level="AAA+"
                data-testid="header-grade-results-item-aaa-plus"
              />
            </div>
          </div>
          <div className="picker">
            <ColorPicker
              color={(PICKER_COLOUR as IColor).str}
              alphaType="none"
              onChange={handleOnPickColor}
              className={styles.callout__picker}
            />
            <ScreenPicker type={id} onSelect={handleOnPickColorFromSystem} />
          </div>
          <div className="preview">
            <TextPreview
              style={{
                [`--color-${id}`]: currentColor,
              }}
            />
          </div>
        </div>
      </form>
    </Panel>
  );
}
