import { useId } from "@fluentui/react-hooks";
import { Label } from "@fluentui/react/lib/Label";
import { FC, useCallback, useMemo } from "react";
import { usePickerState } from "../../../containers/picker-state";
import styles from "./styles.module.scss";
import { useBoolean } from "react-use";
import { ColourPickerDialog } from "./ColourPickerDialog";

interface Props {
  id: "foreground" | "background";
  label: string;
}

const Colour: FC<Props> = ({ id, label }) => {
  const [isCalloutVisible, toggleIsCalloutVisible] = useBoolean(false);
  const [state, dispatch] = usePickerState();
  const GENERATED_ID = useId();
  const BUTTON_ID = `${GENERATED_ID}--${id}`;

  const TEST_IDS = useMemo(() => {
    const label = `color-inputs-${id}-label`;
    const toggle = `${label}-toggle`;

    return {
      label,
      toggle,
    };
  }, [id]);

  const handleOnPickColor = useCallback(
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

  const { value } = state.values[id];

  const BUTTON_TEXT = `Current ${id} colour is `;

  return (
    <Label
      className={styles.label}
      htmlFor={BUTTON_ID}
      data-testid={TEST_IDS.label}
    >
      {label}
      <div className={styles.container}>
        <button
          className={styles.toggle}
          type="button"
          id={BUTTON_ID}
          onClick={toggleIsCalloutVisible}
          data-testid={TEST_IDS.toggle}
        >
          <span className="sr-only">{BUTTON_TEXT}</span>
          {value}
        </button>
      </div>
      <ColourPickerDialog
        open={isCalloutVisible}
        id={id}
        label={label}
        onDismiss={toggleIsCalloutVisible}
        target={BUTTON_ID}
      />
    </Label>
  );
};

export default Colour;
