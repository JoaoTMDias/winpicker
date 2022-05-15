import { TooltipDelay } from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
import { ChangeEvent, FC, FormEvent, useCallback } from "react";
import { usePickerState } from "../../../containers/picker-state";
import { Tooltip } from "../../common";
import Preview from "./preview";
import styles from "./styles.module.scss";

const options: IDropdownOption[] = [
  { key: "hex", text: "Hex" },
  { key: "rgb", text: "RGB" },
  { key: "hsl", text: "HSL" },
];

interface Props {
  id: "foreground" | "background";
  label: string;
}

const Colour: FC<Props> = ({ id, label }) => {
  const [state, dispatch] = usePickerState();
  const textFieldId = useId(id);

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

  const handleOnChangeColourFormat = useCallback(
    (_: FormEvent<HTMLDivElement>, option?: IDropdownOption, __?: number) => {
      if (option?.key) {
        dispatch({
          type: "NEW_FORMAT",
          payload: {
            value: option.key.toString(),
            type: id,
          },
        });
      }
    },
    [dispatch, id]
  );

  const pickedColour = state.values[id];
  const tooltipProps = {
    id: `a05383f4-3cc3-4788-9ca5-9340c754818d-${id}`,
    description: `Choose a new ${label.toLowerCase()} colour`,
  };
  const dropdownProps = {
    id: `96db919e-2fde-4267-94ff-24da2dac1b65-${id}`,
    description: `Change the ${label.toLowerCase()} colour format`,
    styles: {
      dropdown: {
        ":focus": {
          ":after": {
            border: "none",
          },
          ".ms-Dropdown-title, .ms-Dropdown-caretDown": {
            color: "var(--color-foreground)",
            borderColor: "currentColor",
          },
        },
      },
    } as Partial<IDropdownStyles>,
  };

  return (
    <Label className={styles.label} htmlFor={textFieldId}>
      {label}
      <div className={styles.container}>
        <span className={styles.data}>
          <Tooltip
            id={tooltipProps.id}
            description={tooltipProps.description}
            delay={TooltipDelay.long}
          >
            <Preview colour={pickedColour} onSelect={handleOnPickColor} />
          </Tooltip>
          <TextField
            id={textFieldId}
            value={pickedColour.value}
            className={styles.valueInput}
            onChange={handleOnChangeColourOnInput}
          />
        </span>
        <Tooltip
          id={dropdownProps.id}
          description={dropdownProps.description}
          delay={TooltipDelay.long}
        >
          <Dropdown
            className={styles.dropdown}
            label="Pick Colour Format"
            defaultSelectedKey="hex"
            onChange={handleOnChangeColourFormat}
            options={options}
            styles={dropdownProps.styles}
          />
        </Tooltip>
      </div>
    </Label>
  );
};

export default Colour;
