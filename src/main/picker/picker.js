const path = require("path");
const childProcess = require("child_process");

function runColorPicker() {
  return new Promise((resolve, reject) =>
    (0, childProcess.execFile)(
      (0, path.join)(__dirname, "picker.exe"),
      (exception, stdout, s) => {
        if (exception) {
          return reject(exception);
        }

        resolve({ possibleColorString: stdout });
      }
    )
  );
}

exports.runColorPicker = runColorPicker;
