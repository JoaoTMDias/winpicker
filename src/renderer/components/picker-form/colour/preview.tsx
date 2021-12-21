import { Icon } from '@fluentui/react/lib/Icon';
import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  colour: string;
  onSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Preview: FC<Props> = ({ colour, onSelect }) => {
  return (
    <span className={styles.preview}>
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      <input
        className={styles.preview__input}
        type="color"
        value={colour}
        onChange={onSelect}
      />
    </span>
  );
};

export default Preview;
