import KeyButton from '../Models/KeyButtonModel';
import {
  SELECTED_KEYBUTTON,
  UPDATE_KEYBUTTON,
  READ_KEYBUTTONS,
  UPDATE_MACHINE_STATUS,
}
from '../Constants/CoderDeckActionConstans';

const path = require('path');
const FileSaver = require('file-saver');
const fs = window.require('fs');
const isDev = window.require("electron-is-dev");

let JsonPath = isDev
? "./KeyButtons.json"
: path.join(window.process.execPath, "../KeyButtons.json");
//: `file:///${path.join(__dirname, "../build/libraries/KeyButtons.json")}`;

function saveKeyButton(state){
  let KeyButtons = [];
  KeyButtons.push(state.KeyButton1);
  KeyButtons.push(state.KeyButton2);
  KeyButtons.push(state.KeyButton3);
  KeyButtons.push(state.KeyButton4);
  KeyButtons.push(state.KeyButton5);
  KeyButtons.push(state.KeyButton6);

  console.log("saveKeyButton "+JsonPath);
  fs.writeFile(JsonPath, JSON.stringify(KeyButtons, null, "\t"), function(err) {
    if (err) {
        console.log(err);
    }
  }); 
}

const initialState = {
  MachineStatus : "Cihaz bağlı değil",
  SelectedKeyButton : new KeyButton(-1),
  KeyButton1 : new KeyButton(1),
  KeyButton2 : new KeyButton(2),
  KeyButton3 : new KeyButton(3),
  KeyButton4 : new KeyButton(4),
  KeyButton5 : new KeyButton(5),
  KeyButton6 : new KeyButton(6),
};

function rootReducer(state = initialState, action) {
  switch(action.type){
    case SELECTED_KEYBUTTON:{
        return {
          ...state, SelectedKeyButton: action.payload
        }
    }
    case UPDATE_KEYBUTTON:{
      switch(action.payload.Id){
        case 1:
          {
            let NewState = {...state, KeyButton1:action.payload, SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }          
        case 2:
          {
            let NewState = {...state, KeyButton2:action.payload,SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }          
        case 3:
          {
            let NewState = {...state, KeyButton3:action.payload,SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }           
        case 4:
          {
            let NewState = {...state, KeyButton4:action.payload,SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }           
        case 5:
          {
            let NewState = {...state, KeyButton5:action.payload,SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }            
        case 6:
          {
            let NewState = {...state, KeyButton6:action.payload,SelectedKeyButton:action.payload};
            saveKeyButton(NewState);
            return NewState;
          }          
        default : return 
      }
    }         
    case READ_KEYBUTTONS:{
      let NewState = {...state};
      console.log("readKeybuttons "+JsonPath);
      const data = fs.readFileSync(JsonPath,{encoding:'utf8', flag:'r'}); 
      JSON.parse(data).map(row=>{
        switch(row.Id){
          case 1:
            {
              Object.assign(NewState.KeyButton1, row);
              break;
            }
          case 2:
            {
              Object.assign(NewState.KeyButton2, row);
              break;
            }              
          case 3:
            {
              Object.assign(NewState.KeyButton3, row);
              break;
            }              
          case 4:
            {
              Object.assign(NewState.KeyButton4, row);                              
              break;
            }              
          case 5:
            {
              Object.assign(NewState.KeyButton5, row);                                            
              break;
            }              
          case 6:
            {
              Object.assign(NewState.KeyButton6, row);                                            
              break;
            }              
          default : break;
        }          
      })
      return NewState;
    }      
    case UPDATE_MACHINE_STATUS:{
      return {
        ...state, MachineStatus: action.payload
      }
  }        
    default: return state;
  }  
};

export default rootReducer;