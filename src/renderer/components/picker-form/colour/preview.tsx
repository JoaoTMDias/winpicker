import { Icon } from "@fluentui/react/lib/Icon";
import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { CustomWindow, Props } from "./types";

declare let window: CustomWindow;

const Preview: FC<Props> = ({ type, onSelect }) => {
  useEffect(() => {
    /**
     * Handles the colour response event and calls the `onSelect` callback
     *
     * @param {Electron.IpcRendererEvent} _
     * @param {string} colour
     */
    function handleColour(_: Electron.IpcRendererEvent, colour: string) {
      onSelect(colour, type);
    }

    window.ipcRenderer.on(`picker:response:${type}`, handleColour);

    return () => {
      window.ipcRenderer.removeListener(
        `picker:response:${type}`,
        handleColour
      );
    };
  }, []);

  /**
   * When clicking on the button, requests the ipcMain thread (node)
   * that executes the native colour picker
   *
   * @returns {Promise<void>}
   */
  async function handleOnClick() {
    try {
      window.ipcRenderer.send("picker:request", type);
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <span className={styles.preview}>
      <Icon iconName="BucketColor" className={styles.preview__icon} />
      <button
        type="button"
        className={styles.preview__input}
        onClick={handleOnClick}
      >
        Choose Colour
      </button>
    </span>
  );
};

export default Preview;
