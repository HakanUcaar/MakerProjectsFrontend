import React, { Component } from 'react';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import MenuItem from '@material-ui/core/MenuItem';

import SerialPort from '../Models/SerialPortInfoModel';
import { connect } from "react-redux";
import { updateMachineStatus } from "../Redux/KeyButtonsActions";

const useStyles = {
    lvl1:{
        flexGrow: "0",
        flexBasis: "250px",
        flexShrink: "0",
         borderRight: "1px solid rgba(255, 255, 255, 0.12)",
    },
}

const ParityList = [
    {
        value: '0',
        label: 'None',
    },
    {
        value: '1',
        label: 'Odd',
    },
    {
        value: '2',
        label: 'Even',
    },
    {
        value: '3',
        label: 'Mark',
    },
    {
        value: '4',
        label: 'Space',
    },
];
const ComPorts = [
{
    value: '1',
    label: 'COM1',
},
{
    value: '2',
    label: 'COM2',
},
{
    value: '3',
    label: 'COM3',
},
{
    value: '4',
    label: 'COM4',
},
{
    value: '5',
    label: 'COM5',
    },
]; 

const edge = window.require('electron-edge-js');
const isDev = window.require("electron-is-dev");
const path = require('path');

let Path = isDev
? "./CoderDeckLib.dll"
:path.join(window.process.execPath, "/CoderDeckLib.dll");
//: `file:///${path.join(__dirname, "../build/libraries/CoderDeckLib.dll")}`;

const ArduinoConnect = edge.func({
    assemblyFile: "CoderDeckLib.dll",
    typeName: "CoderDeckLib.CoderDeck",
    methodName: 'Connect'
});

export class Settings extends Component {
    constructor(props){
        super(props);

        this.state={
            parity : "0",
            boundRate :"9600",
            comPort : "3"
        }
    }

    handleToggle = (value) => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({checked:newChecked});
    };

    handleParityChange = (event) => {
        this.setState({parity:event.target.value});
    };
    handlePortChange = (event) => {
        this.setState({comPort:event.target.value});
    };    
    handleBoundRateChange = (event) => {
        this.setState({boundRate:event.target.value});
    };     

    connectClick=()=>{
        let SerialPortInf = 
            new SerialPort(
                "COM"+this.state.comPort,
                this.state.boundRate,
                this.state.parity
            );

        ArduinoConnect(JSON.stringify(SerialPortInf),function (error, result) {
            if (error) throw error;
            console.log(result);
        });
        this.props.updateMachineStatus("Cihaz bağlı");
        this.props.onCloseHandle();
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Dialog fullWidth maxWidth="sm" open={this.props.openCloseInfo} onClose={this.props.onCloseHandle} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Ayarlar</DialogTitle>
                    <DialogContent>
                        <List subheader={<ListSubheader>Arduino Bağlantı Ayarları</ListSubheader>} className={classes.root}>
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Port" />
                                <ListItemSecondaryAction>
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    value={this.state.comPort}
                                    onChange={this.handlePortChange}
                                    >
                                    {ComPorts.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                    </TextField>
                                </ListItemSecondaryAction>
                            </ListItem> 
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Baud Rate" />
                                <ListItemSecondaryAction>
                                    <TextField 
                                    id="standard-basic"
                                    value={this.state.boundRate}
                                    onChange={this.handleBoundRateChange}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>          
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Parity" />
                                <ListItemSecondaryAction>
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    value={this.state.parity}
                                    onChange={this.handleParityChange}
                                    >
                                    {ParityList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                    </TextField>
                                </ListItemSecondaryAction>
                            </ListItem>                 
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.connectClick} color="primary">
                            Bağlan
                        </Button>
                        <Button onClick={this.props.onCloseHandle} color="primary">
                            İptal
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return { SelectedKeyButton: state.SelectedKeyButton };
};

function mapDispatchToProps(dispatch) {
    return {
        updateMachineStatus: status => dispatch(updateMachineStatus(status))
    };
}
const SettingsComponent = withStyles(useStyles)(Settings);
export default connect(mapStateToProps,mapDispatchToProps)(SettingsComponent) ;

