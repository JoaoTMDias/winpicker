import { useId } from '@fluentui/react-hooks';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { useCallback, useState } from 'react';
import Preview from './preview';
import styles from './styles.module.scss';

const options: IDropdownOption[] = [
  { key: 'hex', text: 'Hex' },
  { key: 'rgb', text: 'RGB' },
  { key: 'hsla', text: 'HSLA' },
  { key: 'hsb', text: 'HSB' },
];

interface Props {
  id: string;
  label: string;
}

const Colour: React.FC<Props> = ({ id, label }) => {
  const [pickedColour, setPickerColour] = useState(
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${id}`)
      .trim()
  );
  const textFieldId = useId(id);

  const handleOnPickColor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;

      if (newColor) {
        setPickerColour(event.target.value);
        document.documentElement.style.setProperty(`--color-${id}`, newColor);
      }
    },
    [setPickerColour, id]
  );

  const handleOnChangeColourOnInput = useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      event.preventDefault();

      if (newValue) {
        setPickerColour(newValue);
        document.documentElement.style.setProperty(`--color-${id}`, newValue);
      }
    },
    [setPickerColour, id]
  );

  return (
    <Label className={styles.label} htmlFor={textFieldId}>
      {label}
      <div className={styles.container}>
        <span className={styles.data}>
          <Preview colour={pickedColour} onSelect={handleOnPickColor} />
          <TextField
            id={textFieldId}
            value={pickedColour}
            className={styles.valueInput}
            onChange={handleOnChangeColourOnInput}
          />
        </span>
        <Dropdown
          className={styles.dropdown}
          label="Pick Colour Format"
          defaultSelectedKey="hex"
          options={options}
        />
      </div>
    </Label>
  );
};

export default Colour;
