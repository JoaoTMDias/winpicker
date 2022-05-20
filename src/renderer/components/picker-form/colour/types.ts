import { IpcRenderer } from "electron";

export type SelectType = "foreground" | "background";
export interface Props {
  type: SelectType;
  onSelect: (colour: string, type: SelectType) => void;
}

export interface CustomWindow extends Window {
  ipcRenderer: IpcRenderer;
}
