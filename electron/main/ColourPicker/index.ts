import path from "path";
import { execFile } from "child_process";
import { getBinariesPath } from "../getBinariesPath";

let isRunningPicker = !1;
const COLOUR_REGEX = /#[A-F0-9]{6}/;

function runColorPicker(): Promise<{ possibleColorString: string }> {
  const binariesPath = getBinariesPath();
  return new Promise((resolve, reject) => {
    const filePath = path.join(binariesPath, "./ColourPicker.exe");

    execFile(
      filePath,
      (err, stdout, stderr) => {

        console.log(err);
        if (err) {
          reject(err);
        } else {
          resolve({ possibleColorString: stdout.trim() });
        }
      }
    );
  });
}


async function getColorFromPickerAddOn() {
  if (isRunningPicker) {
    throw new Error("color picker already running!");
  }

  isRunningPicker = !0;
  const { possibleColorString: colourResult } = await runColorPicker();

  isRunningPicker = !1;

  const [res] = COLOUR_REGEX.exec(colourResult.toUpperCase()) || [""];

  return res;
}

export default getColorFromPickerAddOn;
