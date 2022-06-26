import { app, BrowserWindow, shell, ipcMain, IpcMainEvent } from "electron";
import { release } from "os";
import { join } from "path";
import MenuBuilder from "./menu";
import getColorFromPickerAddOn from "./ColourPicker";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) {
  app.disableHardwareAcceleration()
};

// Set application name for Windows 10+ notifications
if (process.platform === "win32") {
  app.setAppUserModelId(app.getName())
};

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let mainWindow: BrowserWindow | null = null;
// Here you can add more preload scripts
const splash = join(__dirname, "../preload/splash.js");
// 🚧 Use ['ENV_NAME'] to avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: "WinPicker",
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: splash,
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "../../index.html"));
  } else {
    mainWindow.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Test active push message to Renderer-process
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

ipcMain.on(
  "picker:request",
  async function (event: IpcMainEvent, data: "foreground" | "background") {
    try {
      const result = await getColorFromPickerAddOn();

      if (result && typeof result === "string") {
        console.log("a correr o picker");
        event.sender.send(`picker:response:${data}`, result);
      }
    } catch (error) {
      console.warn(error);
    }
  }
);
