import { ColourPickerDialogProps } from "./types";
import {
  Callout,
  ColorPicker,
  DefaultButton,
  FocusTrapZone,
  IColor,
  Icon,
  IconButton,
  PrimaryButton,
  Text,
  getColorFromString,
} from "@fluentui/react";
import ScreenPicker from "./screen-picker";
import styles from "./styles.module.scss";
import { FormEvent, useCallback, useRef } from "react";
import { usePickerState } from "../../../containers/picker-state";

const callout = `colour-picker-dialog`;

export function ColourPickerDialog({
  open,
  target,
  onDismiss,
  id,
  label,
}: ColourPickerDialogProps) {
  const [state, dispatch] = usePickerState();
  const TOOLTIP_PROPS = {
    id: `a05383f4-3cc3-4788-9ca5-9340c754818d-${id}`,
    title: `${label} colour`,
  };

  const { current: TEST_IDS } = useRef({
    callout,
    title: `${callout}-title`,
    description: `${callout}-description`,
    picker: `${callout}-picker`,
  });

  const handleOnPickColorFromSystem = useCallback(
    (newColour: string) => {
      dispatch({
        type: "NEW_COLOUR",
        payload: {
          type: id,
          value: newColour,
        },
      });
    },
    [dispatch, id]
  );

  const handleOnPickColor = useCallback(
    (_: React.SyntheticEvent<HTMLElement, Event>, color: IColor) => {
      const NEW_COLOUR = color.str;

      dispatch({
        type: "NEW_COLOUR",
        payload: {
          type: id,
          value: NEW_COLOUR,
        },
      });
    },
    [dispatch, id]
  );

  const handleOnChangeColourOnInput = useCallback(
    (
      event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      event.preventDefault();

      if (newValue) {
        dispatch({
          type: "NEW_COLOUR",
          payload: {
            type: id,
            value: newValue,
          },
        });
      }
    },
    [dispatch, id]
  );

  if (!open) {
    return null;
  }

  const CURRENT_COLOUR =
    getColorFromString(state.values.foreground.value) ??
    state.values.foreground.value;

  return (
    <Callout
      className={styles.callout}
      role="dialog"
      gapSpace={8}
      target={`#${target}`}
      onDismiss={onDismiss}
      setInitialFocus
      data-testid={TEST_IDS.callout}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <FocusTrapZone>
          <header className={styles.callout__header}>
            <div className={styles.callout__header__left}>
              <Text
                as="h1"
                block
                variant="xLarge"
                className={styles.title}
                data-testid={TEST_IDS.title}
              >
                {TOOLTIP_PROPS.title}
              </Text>
              <Text block variant="small" data-testid={TEST_IDS.description}>
                Choose a colour from your screen or use the picker below
              </Text>
            </div>
            <div className={styles.callout__header__right}>
              <IconButton
                onClick={onDismiss}
                iconProps={{
                  iconName: "Cancel",
                }}
                ariaLabel="Close the Dialog"
              ></IconButton>
            </div>
          </header>
          <div className={styles.callout__body} data-testid={TEST_IDS.picker}>
            <ScreenPicker type={id} onSelect={handleOnPickColorFromSystem} />
            <ColorPicker
              color={CURRENT_COLOUR}
              alphaType="none"
              onChange={handleOnPickColor}
              className={styles.callout__picker}
            />
          </div>
          <footer className={styles.callout__footer}>
            <DefaultButton
              type="reset"
              data-testid="colour-picker-dialog-reset"
            >
              Reset
            </DefaultButton>
            <PrimaryButton
              type="submit"
              data-testid="colour-picker-dialog-save"
            >
              Set new colour
            </PrimaryButton>
          </footer>
        </FocusTrapZone>
      </form>
    </Callout>
  );
}
