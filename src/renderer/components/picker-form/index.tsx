import { DefaultButton, Icon } from '@fluentui/react';
import Colour from './colour';
import styles from './styles.module.scss';

const PickerForm = () => {
  return (
    <form className={styles.form}>
      <fieldset className={styles.wrapper}>
        <legend className="sr-only">Foreground and Background Colours</legend>
        <Colour id="foreground" label="Foreground" />
        <DefaultButton type="button" className={styles.swap}>
          <span className="sr-only">
            Swap Foreground and Background Colours
          </span>
          <Icon iconName="Switch" />
        </DefaultButton>
        <Colour id="background" label="Background" />
      </fieldset>
    </form>
  );
};

export default PickerForm;
