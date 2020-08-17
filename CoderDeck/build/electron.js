const { app, Menu, MenuItem, Tray } = require('electron');
const electron = require("electron");
//const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 900, 
        height: 680,
        frame: false,   
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file:///${path.join(__dirname, "../build/index.html")}`
    );

    // if(!isDev){
    //     const menu = new Menu();
    //     // menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }));
    //     // menu.append(new MenuItem({ type: 'separator' }));
    //     // menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }));
    
    //     Menu.setApplicationMenu(menu);
    // }

    // let tray = new Tray(path.join(__dirname, "./icon.ico"))
    // const contextMenu = new Menu();
    // contextMenu.append(new MenuItem({ label: 'Çıkış', click() 
    // { 
    //     app.isQuiting = true;
    //     app.quit();
    // } 
    // }));
    // contextMenu.append(new MenuItem({ label: 'Göster', click() { mainWindow.show(); } }));

    // tray.setToolTip('CoderDeck')
    // tray.setContextMenu(contextMenu)

    mainWindow.on("closed", () => (mainWindow = null));

    // mainWindow.on('minimize',function(event){
    //     event.preventDefault();
    //     mainWindow.hide();
    // });
    
    // mainWindow.on('close', function (event) {
    //     if(!app.isQuiting){
    //         event.preventDefault();
    //         mainWindow.hide();
    //     }    
    //     return false;
    // }); 
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


