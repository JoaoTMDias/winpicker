import { Icon } from "@fluentui/react/lib/Icon";
import { DefaultButton } from "@fluentui/react";
import { FC, useEffect } from "react";
import useEyeDropper from "use-eye-dropper";
import styles from "./styles.module.scss";
import { Props } from "../picker-form/colour/types";

export const ScreenPicker: FC<Props> = ({ type, onSelect }) => {
  const { open, close, isSupported } = useEyeDropper();

  useEffect(() => {
    return () => {
      close();
    };
  });

  /**
   * When clicking on the button, requests the ipcMain thread (node)
   * that executes the native colour picker
   *
   * @returns {Promise<void>}
   */
  async function handleOnClickToPick() {
    try {
      const result = await open();

      onSelect(result.sRGBHex, type);
    } catch (error) {
      console.warn(error);
    }
  }

  if (!isSupported) {
    return null;
  }

  return (
    <DefaultButton
      type="button"
      className={styles.preview}
      onClick={handleOnClickToPick}
    >
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      <span>Pick colour from your screen</span>
    </DefaultButton>
  );
};
