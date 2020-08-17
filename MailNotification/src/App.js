import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import * as colors from "@material-ui/core/colors";

import Main from './Components/Main';
import SettingsModel from './Models/SettingsModel';
import { readSettings} from "./Redux/ReduxActions";
import StartUp from './Startup';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: colors.grey[900],
        color: colors.grey[100]
      }
    }
  }
});

const path = require('path');
const fs = window.require('fs');
const isDev = window.require("electron-is-dev");
const StartServices = new StartUp();

export class App extends Component {

  componentDidMount(){
    let JsonPath = isDev
    ? "./Settings.json"
    : path.join(window.process.execPath, "../Settings.json");

    try 
    {
      if (!fs.existsSync(JsonPath)) {
          let Settings = new SettingsModel();
          fs.writeFile(JsonPath, JSON.stringify(Settings, null, "\t"), function(err) {
              if (err) {
                  console.log(err);
              }
          }); 
          this.props.readSettings(Settings);
      }
      else{
        const data = fs.readFileSync(JsonPath,{encoding:'utf8', flag:'r'});
        let Settings = Object.assign(new SettingsModel(), JSON.parse(data));
        this.props.readSettings(Settings);
        StartServices.StartImapServices(Settings);
      }
    } catch(err) {
      console.error(err)
    }    
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Main/> 
      </ThemeProvider> 
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch)=> {
  return {
    readSettings: keyButton => dispatch(readSettings(keyButton))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
