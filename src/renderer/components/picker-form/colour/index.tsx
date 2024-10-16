import { useAutoId } from "@feedzai/js-utilities/hooks";
import { Label } from "@fluentui/react/lib/Label";
import { FC, useMemo } from "react";
import { usePicker } from "@/renderer/containers";
import { useBoolean } from "react-use";
import { ColourPickerDialog } from "@/renderer/components";
import styles from "./styles.module.scss";

interface Props {
  id: "foreground" | "background";
  label: string;
}

const Colour: FC<Props> = ({ id, label }) => {
  const [isCalloutVisible, toggleIsCalloutVisible] = useBoolean(false);
  const { values, createNewColour } = usePicker();
  const GENERATED_ID = useAutoId();
  const BUTTON_ID = `${CSS.escape(GENERATED_ID!)}--${id}`;

  const TEST_IDS = useMemo(() => {
    const label = `color-inputs-${id}-label`;
    const toggle = `${label}-toggle`;

    return {
      label,
      toggle,
    };
  }, [id]);

  const { value } = values[id];

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
