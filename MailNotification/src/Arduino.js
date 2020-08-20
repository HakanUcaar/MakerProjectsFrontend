const edge = window.require('electron-edge-js');
const isDev = window.require("electron-is-dev");
const path = window.require('path');
const fs = window.require('fs');

const ArduinoConnect = edge.func({
    assemblyFile: "MailNotification.dll",
    typeName: "MailNotification.Notification",
    methodName: 'Connect'
});
const SendReceiveMess = edge.func({
    assemblyFile: "MailNotification.dll",
    typeName: "MailNotification.Notification",
    methodName: 'SendMailReceiveMessage'
});

const SendCloseMess = edge.func({
    assemblyFile: "MailNotification.dll",
    typeName: "MailNotification.Notification",
    methodName: 'SendCloseMessage'
});

let JsonPath = isDev
    ? "./Settings.json"
    : path.join(window.process.execPath, "../Settings.json");

export async function ConnectArduino(){
    if(fs.existsSync(JsonPath))
    await ArduinoConnect(JsonPath,function (error, result) {
        if (error) throw error;
        console.log(result);
      });  
}

export async function SendMessageReceive(){
    await SendReceiveMess(JsonPath,function (error, result) {
        if (error) throw error;
        console.log(result);
    });  
}

export async function SendCloseMessage(){
    await SendCloseMess(JsonPath,function (error, result) {
        if (error) throw error;
        console.log(result);
    });  
}