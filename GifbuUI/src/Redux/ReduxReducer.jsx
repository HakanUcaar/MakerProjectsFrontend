import {
    SELECTED_GIFIMAGE,
    UPDATE_GIFBU_DATA,
    READ_GIFBU_DATA,
    SAVE_GIFBU_DATA
}

from './ReduxActionContants';
import Gifbu from '../Models/GifbuModel';
import ArduinoMachine from '../Models/ArduinoMachineModel';

const fs = window.require('fs');
const isDev = window.require("electron-is-dev");
const path = require('path');
var CryptoJS = require("crypto-js");

let JsonPath = isDev
? "./data.json"
: path.join(window.process.execPath, "../data.json");

let secretKey = "hakobako";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function saveGifbu(state){
    console.log("saveGifbu "+JsonPath);
    fs.writeFileSync(JsonPath,JSON.stringify(state.Gifbu, null, "\t")) 
}

const initialState = {
    SelectedGifImage : null,
    Gifbu : new Gifbu("","",new ArduinoMachine())
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case SELECTED_GIFIMAGE:{
            return {
                ...state, SelectedGifImage: action.payload
              }
        }
        case UPDATE_GIFBU_DATA:{
            return {...state, Gifbu:action.payload};
        }   
        case READ_GIFBU_DATA:{
            if (!fs.existsSync(JsonPath)) {
                saveGifbu({...state});
                return{...state};
            }
            else{
                let GifbuJsondata = JSON.parse(fs.readFileSync(JsonPath,{encoding:'utf8', flag:'r'}));
                return {...state,Gifbu:GifbuJsondata};
            }
        }    
        case SAVE_GIFBU_DATA:{
            saveGifbu({...state});
            return state;
        }         
        default: return state;
    }
}

export default rootReducer;