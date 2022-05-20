const { Menu, shell } = require("electron");

/**
 * @typedef {import("electron").BrowserWindow} IBrowserWindow
 * @typedef {import("electron").Menu} IMenu
 */

class MenuBuilder {
  /**
   * @type {IBrowserWindow}
   */
  mainWindow;

  /**
   * @param {IBrowserWindow} mainWindow
   */
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  /**
   *
   * @returns {IMenu}
   */
  buildMenu() {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.DEBUG_PROD === "true"
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template = this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  /**
   * @returns {void}
   */
  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on("context-menu", (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: "Inspect element",
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: "&File",
        submenu: [
          {
            label: "&Close",
            accelerator: "Ctrl+W",
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: "&View",
        submenu:
          process.env.NODE_ENV === "development" ||
          process.env.DEBUG_PROD === "true"
            ? [
                {
                  label: "&Reload",
                  accelerator: "Ctrl+R",
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
                {
                  label: "Toggle &Developer Tools",
                  accelerator: "Alt+Ctrl+I",
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
              ]
            : [
                {
                  label: "Toggle &Full Screen",
                  accelerator: "F11",
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  },
                },
              ],
      },
      {
        label: "Help",
        submenu: [
          {
            label: "About",
            click() {
              shell.openExternal("https://github.com/JoaoTMDias/winpicker");
            },
          },
          {
            label: "Contrast and Colour Accessibility",
            click() {
              shell.openExternal("https://webaim.org/articles/contrast/");
            },
          },
          {
            label: "Give Feedback",
            click() {
              shell.openExternal(
                "https://github.com/JoaoTMDias/winpicker/issues/new/choose"
              );
            },
          },
        ],
      },
    ];

    return templateDefault;
  }
}


module.exports = MenuBuilder;
