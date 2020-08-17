import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from "react-redux";
import { updateKeyButton} from "../Redux/KeyButtonsActions";
import HotKeyAction from "../Models/HotKeyActionModel";

const useStyles = {
    root:{
        display: 'flex',
        marginTop: "20px",        
    },
    card: {
        marginTop: "8px",
        maxHeight: 151,
        minWidth: 151,
      },
    rounded: {
        color: '#fff',
        //backgroundColor: green[500],
      },
    media: {
        height: 151,
        //width:151
      },
};

let Refresh = true;
let Repeat = 0;

export class HotkeySwitchSetting extends Component {
    constructor(props){
        super(props);
        
        window.addEventListener("keydown", this.handlekeydown, true);
        window.addEventListener("keyup", this.handlekeyup, true);

        this.state = {
            hotkeyAction1 : null,
            hotkeyAction2 : null,
            hotkeyValue1 : "",
            hotkeyValue2 : ""
        }
    }

    handlekeyup=(e)=>{
        if(document.activeElement.id==="Assinged-Hotkey-1")
        {   
            let KeyButton = {...this.props.SelectedKeyButton};           
            KeyButton.Action.HotKey1 = this.state.hotkeyAction1;
            this.props.updateKeyButton(KeyButton);
            
            Refresh = true;
            Repeat = 0;
        }
        if(document.activeElement.id==="Assinged-Hotkey-2")
        {   
            let KeyButton = {...this.props.SelectedKeyButton};           
            KeyButton.Action.HotKey2 = this.state.hotkeyAction2;
            this.props.updateKeyButton(KeyButton);
            
            Refresh = true;
            Repeat = 0;
        }
    }

    handlekeydown=(e)=>{    
        if(document.activeElement.id === "Assinged-Hotkey-1" || document.activeElement.id==="Assinged-Hotkey-2")
        {      
            if(Refresh && Repeat===0){
                let Action = new HotKeyAction();
                Action.Name = document.activeElement.id === "Assinged-Hotkey-1" 
                    ? this.props.SelectedKeyButton.Action.HotKey1.Name 
                    : this.props.SelectedKeyButton.Action.HotKey2.Name;
                Action.CtrlKey = e.ctrlKey;
                Action.AltKey = e.altKey;
                Action.ShiftKey = e.shiftKey;          
    
                if(!(e.keyCode === 16 || e.keyCode === 17 ||  e.keyCode === 16))
                {
                    if(Action.CtrlKey || Action.AltKey || Action.ShiftKey)
                    {
                        Action.Keys.push(e.key.toUpperCase());
                    }
                    else{                    
                        Action.Keys = [e.key.toUpperCase()];
                    }                
                } 
                Repeat++;

                if(document.activeElement.id === "Assinged-Hotkey-1" )
                    this.setState({hotkeyAction1:Action})
                else
                    this.setState({hotkeyAction2:Action});

                 //this.getHotKey(Action);  
            }  
            else if(Repeat>0){
                let Action = document.activeElement.id === "Assinged-Hotkey-1" 
                    ? this.state.hotkeyAction1
                    : this.state.hotkeyAction2;
                    
                Action.Name = document.activeElement.id === "Assinged-Hotkey-1" 
                    ? this.props.SelectedKeyButton.Action.HotKey1.Name 
                    : this.props.SelectedKeyButton.Action.HotKey2.Name;

                Action.CtrlKey = e.ctrlKey;
                Action.AltKey = e.altKey;
                Action.ShiftKey = e.shiftKey;          
    
                if(!(e.keyCode === 16 || e.keyCode === 17 ||  e.keyCode === 16 || e.repeat))
                {
                    if(Action.CtrlKey || Action.AltKey || Action.ShiftKey)
                    {
                        Action.Keys.push(e.key.toUpperCase());
                    }
                    else{                    
                        Action.Keys = [e.key.toUpperCase()];
                    }                
                } 

                if(document.activeElement.id === "Assinged-Hotkey-1")
                    this.setState({hotkeyAction1:Action})
                else
                    this.setState({hotkeyAction2:Action});               
            }
        }
    }

    getHotKey1Value=()=>{
        let hotkeyValue = "";
        let HotKeyAction = this.props.SelectedKeyButton.Action.HotKey1;
        if(HotKeyAction.CtrlKey) hotkeyValue += "CTRL + ";
        if(HotKeyAction.AltKey) hotkeyValue += "ALT + ";
        if(HotKeyAction.ShiftKey) hotkeyValue += "SHIFT + ";

        HotKeyAction.Keys.map((row,index)=>{
            if(index === 0)
            {
                hotkeyValue += row;
            }
            else{
                hotkeyValue += " + "+row;
            }            
        });
        
        return hotkeyValue;        
    }
    
    getHotKey2Value=()=>{
        let hotkeyValue = "";
        let HotKeyAction = this.props.SelectedKeyButton.Action.HotKey2;
        if(HotKeyAction.CtrlKey) hotkeyValue += "CTRL + ";
        if(HotKeyAction.AltKey) hotkeyValue += "ALT + ";
        if(HotKeyAction.ShiftKey) hotkeyValue += "SHIFT + ";

        HotKeyAction.Keys.map((row,index)=>{
            if(index === 0)
            {
                hotkeyValue += row;
            }
            else{
                hotkeyValue += " + "+row;
            }            
        });
        
        return hotkeyValue; 
    }

    changeActionName =(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.Name = e.target.value;
        this.props.updateKeyButton(KeyButton);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://api.adorable.io/avatars/285/hakan@adorable.png"
                        title="Contemplative Reptile"
                    />
                </Card>
                <div >
                    <TextField
                        id="filled-full-width"
                        label="Başlık"
                        style={{ margin: 8 }}
                        placeholder="Bir başlık girin"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        onChange={this.changeActionName}
                        value={this.props.SelectedKeyButton.Action.Name}
                    />
                    <TextField
                        id="Assinged-Hotkey-1"
                        label="Birinci Atanan Tuş"
                        style={{ margin: 8 }}
                        placeholder="Atanacak tuşlara basın"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        value ={this.getHotKey1Value()}   
                    />      
                    <TextField
                        id="Assinged-Hotkey-2"
                        label="İkinci Atanan Tuş"
                        style={{ margin: 8 }}
                        placeholder="Atanacak tuşlara basın"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        value ={this.getHotKey2Value()}   
                    />                                
                </div>            
            </div>

        )
    }
}

function mapStateToProps(state){
    return { SelectedKeyButton: state.SelectedKeyButton };
};

function mapDispatchToProps(dispatch) {
    return {
        updateKeyButton: keyButton => dispatch(updateKeyButton(keyButton))
    };
}

const HotkeySwitchSettingComponent = withStyles(useStyles)(HotkeySwitchSetting);
export default connect(mapStateToProps,mapDispatchToProps)(HotkeySwitchSettingComponent) ;
