interface Window {
  // Expose API through preload script
  fs: typeof import('fs')
  ipcRenderer: import('electron').IpcRenderer
  removeLoading: () => void
}
window.ipcRenderer = require("electron").ipcRenderer;


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
