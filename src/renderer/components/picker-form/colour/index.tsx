import { useId } from '@fluentui/react-hooks';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { useCallback } from 'react';
import { usePickerState } from 'renderer/containers/picker-state';
import Preview from './preview';
import styles from './styles.module.scss';

const options: IDropdownOption[] = [
  { key: 'hex', text: 'Hex' },
  { key: 'rgb', text: 'RGB' },
  { key: 'hsl', text: 'HSL' },
];

interface Props {
  id: 'foreground' | 'background';
  label: string;
}

const Colour: React.FC<Props> = ({ id, label }) => {
  const [state, dispatch] = usePickerState();

  const textFieldId = useId(id);

  const handleOnPickColor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;

      if (newColor) {
        dispatch({
          type: 'NEW_COLOUR',
          payload: {
            type: id,
            value: newColor,
          },
        });
      }
    },
    [dispatch, id]
  );

  const handleOnChangeColourOnInput = useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      event.preventDefault();

      if (newValue) {
        dispatch({
          type: 'NEW_COLOUR',
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
    (
      _: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      __?: number
    ) => {
      if (option?.key) {
        dispatch({
          type: 'NEW_FORMAT',
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

  return (
    <Label className={styles.label} htmlFor={textFieldId}>
      {label}
      <div className={styles.container}>
        <span className={styles.data}>
          <Preview colour={pickedColour} onSelect={handleOnPickColor} />
          <TextField
            id={textFieldId}
            value={pickedColour.value}
            className={styles.valueInput}
            onChange={handleOnChangeColourOnInput}
          />
        </span>
        <Dropdown
          className={styles.dropdown}
          label="Pick Colour Format"
          defaultSelectedKey="hex"
          onChange={handleOnChangeColourFormat}
          options={options}
        />
      </div>
    </Label>
  );
};

export default Colour;
