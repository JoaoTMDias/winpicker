import path from 'path';
import { app } from 'electron';

const IS_PROD = process.env.NODE_ENV === "production";

const root = process.cwd();

const { isPackaged } = app;

const BINARIES_PATH =
  IS_PROD && isPackaged
    ? path.join(process.resourcesPath, "./")
    : path.join(root, "./resources");

/**
 * Returns the path to the binaries folder.
 * @returns {string}
 */
export function getBinariesPath() {
  return BINARIES_PATH;
}
