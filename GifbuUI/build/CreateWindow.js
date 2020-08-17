const { screen,BrowserWindow } = require('electron');
const isDev = require("electron-is-dev");
const path = require("path");


function createDesktopImageWindow() {
  let display = screen.getPrimaryDisplay();
  let width = display.bounds.width;
  let height = display.bounds.height;

  // const win = new BrowserWindow({
  //   height: 425,
  //   width: 275,
  //   x: width - 275,
  //   y: height - 425,
  //   //transparent:true,
  //   //alwaysOnTop: true,
  //   //focusable: false,
  //   //frame: false,
  //   webPreferences:{
  //     nodeIntegration: true,
  //     nodeIntegrationInWorker: true
  //   }
  // });  
  // //win.loadURL(window.process.cwd()+"/ImageFormIndex.html");
  // //win.loadURL(`file://${__dirname}/index.html#/desktopframe`);
  // //win.loadURL('http://localhost:3000/desktopframe');  
  // //win.setIgnoreMouseEvents(true);
  let windowA = new BrowserWindow(
    {
      name: 'window-a',
      height: 425,
      width: 275,
      x: width - 275,
      y: height - 425,
      frame: false,
      focusable: false,
      alwaysOnTop: true,
      transparent:true,
      webPreferences:{
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nativeWindowOpen: true
      }
    }
  );
  windowA.loadURL(
    isDev
      ? 'http://localhost:3000?viewA'
      : `file://${path.join(__dirname, '../build/index.html?viewA')}`
  ); 

  setTimeout(() => {  windowA.close() }, 5000);
}

module.exports = {
  'createWind':createDesktopImageWindow
}