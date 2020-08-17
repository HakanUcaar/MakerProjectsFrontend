import {
    UPDATE_SETTINGS,
    READ_SETTINGS,
    SAVE_SETTINGS
}
from './ReduxActionContants';
import SettingsModel from '../Models/SettingsModel';
import MailModel from '../Models/MailModel';
import MailListModel from '../Models/MailListModel';

const initialState = {
    Settings : new SettingsModel(),
    IsConnected : false,
    CurrentMail : new MailModel(),
    MailList : new MailListModel()
};

const path = require('path');
const fs = window.require('fs');
const isDev = window.require("electron-is-dev");

let JsonPath = isDev
    ? "./Settings.json"
    : path.join(window.process.execPath, "../Settings.json");

function rootReducer(state = initialState, action) {
    switch(action.type){
        case UPDATE_SETTINGS:{
            return {
                ...state, Settings: action.payload
            }
        }
        case READ_SETTINGS:{
            return {
                ...state, Settings: action.payload
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
       
        default: return state;
    }
}

export default rootReducer;