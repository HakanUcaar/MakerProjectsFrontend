const { screen,BrowserWindow,ipcMain } = require('electron');
const isDev = require("electron-is-dev");
const path = require("path");

function createDesktopImageWindow() {
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  let windowA = new BrowserWindow(
    {
      name: 'window-a',
      height: 550,
      width: 400,
      x: width - 400,
      y: height - 550,
      frame: false,
      //focusable: false,
      alwaysOnTop: true,
      webPreferences:{
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nativeWindowOpen: true
      }
    }
  );

  windowA.loadURL(
    isDev
        ? "http://localhost:3000?viewA"
        : `file:///${path.join(__dirname, "../build/index.html?viewA")}`
  );

  //setTimeout(() => {  windowA.close() }, 5000);
  
  windowA.on("closed", () => 
    ""
  );
}

module.exports = {
  'createWindow':createDesktopImageWindow
}