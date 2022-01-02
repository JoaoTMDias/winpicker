import { Icon } from "@fluentui/react/lib/Icon";
import { ChangeEvent, FC } from "react";
import { Color } from "../../../containers/picker-state/types";
import styles from "./styles.module.scss";

interface Props {
  colour: Color;
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
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
