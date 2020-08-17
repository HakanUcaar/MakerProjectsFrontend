const { app, Menu, MenuItem,Tray } = require('electron');
const electron = require("electron");
const { ipcMain } = require('electron')
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { withWidth } = require('@material-ui/core');

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 550, 
        height: 655,
        frame:false,
        //resizable: false,
        webPreferences:{
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nativeWindowOpen: true
          }
    });
    mainWindow.setSkipTaskbar(true);

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000?main"
            : `file:///${path.join(__dirname, "../build/index.html")}`
    );

    if(!isDev){
        const menu = new Menu();
        // menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }));
        // menu.append(new MenuItem({ type: 'separator' }));
        // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
    
        Menu.setApplicationMenu(menu);
    }

    tray = new Tray(path.join(__dirname, "./catpurple.ico"))
    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({ label: 'Çıkış', click() 
    { 
        app.isQuiting = true;
        app.quit();
    } 
    }));
    contextMenu.append(new MenuItem({ label: 'Göster', click() { mainWindow.show(); } }));

    tray.setToolTip("Gifbu");
    tray.setContextMenu(contextMenu)

    //mainWindow.on("closed", () => (mainWindow = null));

    mainWindow.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            mainWindow.minimize();
        }    
        return false;
    }); 

    process.on('uncaughtException', function (err) {
        console.log(err);
    }) 
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});

ipcMain.on('asynchronous-message', (event, arg) => {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 13100 });
    const Window = require("./CreateWindow");

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        Window.createWind();
        //event.reply('asynchronous-reply', 'pong');
      });
    });

    wss.on('listening',(ws)=>{
        console.log("listening");
    })    
})
