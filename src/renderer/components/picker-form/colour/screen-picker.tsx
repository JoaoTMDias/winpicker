import { Icon } from "@fluentui/react/lib/Icon";
import { FC, useEffect } from "react";
import useEyeDropper from "use-eye-dropper";
import styles from "./styles.module.scss";
import { Props } from "./types";
import { DefaultButton } from "@fluentui/react";

const ScreenPicker: FC<Props> = ({ type, onSelect }) => {
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
  async function handleOnClick() {
    try {
      open().then((result) => {
        onSelect(result.sRGBHex, type);
      });

      console.log("Click");
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
      onClick={handleOnClick}
    >
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      <span>Choose screen colour</span>
    </DefaultButton>
  );
};

export default ScreenPicker;
