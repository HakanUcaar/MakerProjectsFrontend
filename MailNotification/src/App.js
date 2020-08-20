import React, { Component } from 'react'
import { connect } from 'react-redux'
import Main from './Components/Main';
import SettingsModel from './Models/SettingsModel';
import { readSettings,updateCurrentMail } from "./Redux/ReduxActions";
import MailModel from './Models/MailModel';

const { ipcRenderer } = window.require('electron');
const notifier = window.require('mail-notifier');
const path = require('path');
const fs = window.require('fs');
const isDev = window.require("electron-is-dev");

const Arduino = require("./Arduino");
 

export class App extends Component {

  componentDidMount(){
    Arduino.ConnectArduino();
    ipcRenderer.on('close-mail',(e,p)=>{
      console.log("trigger-closemail");
      Arduino.SendCloseMessage();
    });

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
          this.props.readSettings();
      }
      else{
        const data = fs.readFileSync(JsonPath,{encoding:'utf8', flag:'r'});
        let Settings = Object.assign(new SettingsModel(), JSON.parse(data));
        this.props.readSettings(Settings);

        if (Settings.Imap.UserName !== "" 
            || Settings.Imap.Password !== ""
            || Settings.Imap.Host) 
        {
            notifier(
                {
                    user: Settings.Imap.UserName,
                    password: Settings.Imap.Password,
                    host: Settings.Imap.Host,
                    port: 993, // imap port
                    tls: true,// use secure connection
                    connTimeout : 5000000,
                    tlsOptions: { rejectUnauthorized: false }
                }
            )
            .on('end', () => notifier.start()) 
            .on('mail', mail => 
               {
                  console.log(mail);
                  let Data = {...this.props.Settings};
                  Data.CurrentMail = new MailModel();
                  Data.CurrentMail.Subject = mail.subject;
                  Data.CurrentMail.FromName = mail.from[0].name;
                  Data.CurrentMail.FromAdress = mail.from[0].address;
                  Data.CurrentMail.Date = new Date().toLocaleString();
                  Data.CurrentMail.Html = mail.html;

                  Data.Maillist.MailList.push(Data.CurrentMail);
                  this.props.updateCurrentMail(Data);
                  Arduino.SendMessageReceive("");
               })
            .start();         
        }
      }
    } catch(err) {
      console.error(err)
    }    
  }

  render() {
    return (
      <Main/> 
    )
  }
}

const mapStateToProps = (state) => {
  return { Settings: state.Settings };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    readSettings: keyButton => dispatch(readSettings(keyButton)),
    updateCurrentMail: keyButton => dispatch(updateCurrentMail(keyButton))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
