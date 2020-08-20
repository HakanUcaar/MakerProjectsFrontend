import {
    UPDATE_SETTINGS,
    READ_SETTINGS,
    SAVE_SETTINGS,
    SELECTED_MAIL,
    UPDATE_CURRENTMAIL
}
from './ReduxActionContants';
import SettingsModel from '../Models/SettingsModel';

const initialState = {
    Settings : new SettingsModel(),
    IsConnected : false
};

const { ipcRenderer } = window.require('electron');
const path = require('path');
const fs = window.require('fs');
const isDev = window.require("electron-is-dev");

let JsonPath = isDev
    ? "./Settings.json"
    : path.join(window.process.execPath, "../Settings.json");

async function SaveSetting(state){
    fs.writeFileSync(JsonPath,JSON.stringify(state.Settings, null, "\t")) 
}    

function rootReducer(state = initialState, action) {
    switch(action.type){
        case SELECTED_MAIL:{
            ipcRenderer.send('create-notification', 'ping');
            return {...state, CurrentMail: action.payload};
        }        
        case UPDATE_SETTINGS:{
            return {
                ...state, Settings: action.payload
            }
        }
        case READ_SETTINGS:{
            if (!fs.existsSync(JsonPath)) {
                SaveSetting({...state});
                return{...state};
            }
            else{
                let SettingsJsondata = JSON.parse(fs.readFileSync(JsonPath,{encoding:'utf8', flag:'r'}));
                return {...state,Settings:SettingsJsondata};
            }
        }
        case SAVE_SETTINGS:{
            let TempSetting = {...state.Settings};
            fs.writeFile(JsonPath, JSON.stringify(TempSetting, null, "\t"), function(err) {
                if (err) {
                    console.log(err);
                }
            }); 

            return {
                ...state, Settings: action.payload
            }
        }
        case UPDATE_CURRENTMAIL:{  
            SaveSetting({...state, Settings: action.payload});  
            ipcRenderer.send('create-notification', 'ping');        
            return {
                ...state, Settings: action.payload
            }
        }
       
        default: return state;
    }
}

export default rootReducer;