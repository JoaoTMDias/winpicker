import { Icon } from '@fluentui/react/lib/Icon';
import { FC } from 'react';
import { Color } from '../../../containers/picker-state';
import styles from './styles.module.scss';

interface Props {
  colour: Color;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Preview: FC<Props> = ({ colour, onSelect }) => {
  return (
    <span className={styles.preview}>
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      <input
        className={styles.preview__input}
        type="color"
        value={colour.value}
        onChange={onSelect}
      />
    </span>
  );
};

export default Preview;
