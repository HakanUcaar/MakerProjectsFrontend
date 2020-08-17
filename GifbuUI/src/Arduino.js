const edge = window.require('electron-edge-js');
const isDev = window.require("electron-is-dev");
const path = window.require('path');
const fs = window.require('fs');

const ArduinoConnect = edge.func({
    assemblyFile: "Gifbu.dll",
    typeName: "Gifbu.Gifbulib",
    methodName: 'Connect'
});
let JsonPath = isDev
    ? "./data.json"
    : path.join(window.process.execPath, "../data.json");

export async function ConnectArduino(){
    if(fs.existsSync(JsonPath))
    await ArduinoConnect(JsonPath,function (error, result) {
        if (error) throw error;
        console.log(result);
      });  
}