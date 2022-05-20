let isRunningPicker = !1;
const COLOUR_REGEX = /#[A-F0-9]{6}/;

const executePicker = (() => {
  try {
    const { runColorPicker } = require(`./picker`);
    return runColorPicker;
  } catch (error) {}
  return runColorPicker;
})();

async function getColorFromPickerAddOn() {
  if (isRunningPicker) {
    throw new Error("color picker already running!");
  }

  isRunningPicker = !0;
  const { possibleColorString: colourResult } = await executePicker();

  isRunningPicker = !1;

  const [res] = COLOUR_REGEX.exec(colourResult.toUpperCase()) || [""];

  return res;
}

exports.getColorFromPickerAddOn = getColorFromPickerAddOn;
