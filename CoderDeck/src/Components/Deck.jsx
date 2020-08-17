import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';

import KeyboardIcon from '@material-ui/icons/Keyboard';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import LanguageIcon from '@material-ui/icons/Language';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import TheatersIcon from '@material-ui/icons/Theaters';
import Typography from '@material-ui/core/Typography';

import {SystemComponentsKeys,SystemComponentsKeysTurkce} from '../Constants/CoderDeckConstants';
import HotKeyAction from '../Models/HotKeyActionModel';
import HotKeySwitchAction from '../Models/HotkeySwitchActionModel';
import WebSiteAction from '../Models/WebSiteActionModel';
import OpenFileAction from '../Models/OpenFileActionModel';
import MultimediaAction from '../Models/MultimediaActionModel';

import 
{ 
    selectedKeyButton,
    updateKeyButton,
    readKeyButtons,
} 
from "../Redux/KeyButtonsActions";

const theme = createMuiTheme();
const useStyles = {
    root: {
        marginTop : "50px",
        flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      height : "100px",
      width :"100%",
      textAlign: 'center',
      color: theme.palette.text.secondary,
      '&:hover': {
            border: '2px solid '+theme.palette.primary.main,
            zIndex: 1,
            '& $imageBackdrop': {
            opacity: 0.15,
            },
            '& $imageMarked': {
            opacity: 0,
            },
        }
    },
    divider :{
        marginTop : "10px"
    },
    butonBase:{
        width:"100%",
        display:"inline-block",
    }
};

const _ = require("underscore");

export class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount=async ()=>{
        this.props.readKeyButtons();
        this.props.selectedKeyButton(this.props.KeyButton1);
    }

    getComponentTurkce=(KeyId)=>{
        return (_.invert(SystemComponentsKeysTurkce))[KeyId];
    }

    getAction=(KeyId)=>{
        switch (KeyId){
            case 1: return new HotKeyAction();
            case 2: return new HotKeySwitchAction();
            case 3: return new WebSiteAction();              
            case 4: return new OpenFileAction();               
            case 5: return new MultimediaAction();
            default: return "";
        }
    }
    dropKeyButon1 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key = {...this.props.KeyButton1}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));
        this.props.updateKeyButton(Key);
    }
    dropKeyButon2 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key =  {...this.props.KeyButton2}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));  
        this.props.updateKeyButton(Key);
    }  
    dropKeyButon3 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key =  {...this.props.KeyButton3}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));        
        this.props.updateKeyButton(Key);
    }
    dropKeyButon4 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key =  {...this.props.KeyButton4}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));        
        this.props.updateKeyButton(Key);
    }
    dropKeyButon5 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key =  {...this.props.KeyButton5}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));        
        this.props.updateKeyButton(Key);
    }      
    dropKeyButon6 = (e) =>{
        e.preventDefault();
        let KeyId = e.dataTransfer.getData("KeyId");
        let Key =  {...this.props.KeyButton6}
        Key.Name = (_.invert(SystemComponentsKeys))[KeyId];
        Key.ActionType = Number(KeyId);
        Key.Action = this.getAction(Number(KeyId));        
        this.props.updateKeyButton(Key);
    }               

    dragOver = (e) =>{
        e.preventDefault();
        //e.target.style.border = '2px solid '+theme.palette.primary.main;
    }
    dragLeave = (e) =>{
        e.preventDefault();
        //e.target.style.border = 'none';
    }
    dragEnter =(e)=>{
        e.preventDefault();
        //e.target.style.border = '2px solid '+theme.palette.primary.main;
    }

    getIcon=(Key)=>{
        switch (Key.ActionType){
            case 1:
                return (
                    <React.Fragment>                        
                        <KeyboardIcon></KeyboardIcon>                    
                        <Typography variant="h6" gutterBottom>{this.getComponentTurkce(Key.ActionType)}</Typography>
                    </React.Fragment>
                )           
            case 2:
                return (
                    <React.Fragment>
                        <SwapHorizIcon></SwapHorizIcon>                    
                        <Typography variant="h6" gutterBottom>{this.getComponentTurkce(Key.ActionType)}</Typography>
                    </React.Fragment>
                ) 
            case 3:
                return (
                    <React.Fragment>                        
                        <LanguageIcon></LanguageIcon>                    
                        <Typography variant="h6" gutterBottom>{this.getComponentTurkce(Key.ActionType)}</Typography>
                    </React.Fragment>
                )                 
            case 4:
                return (
                    <React.Fragment>
                        <WebAssetIcon></WebAssetIcon>                    
                        <Typography variant="h6" gutterBottom>{this.getComponentTurkce(Key.ActionType)}</Typography>                        
                    </React.Fragment>
                )                 
            case 5:
                return (
                    <React.Fragment>
                        <TheatersIcon></TheatersIcon>                    
                        <Typography variant="h6" gutterBottom>{this.getComponentTurkce(Key.ActionType)}</Typography>                        
                    </React.Fragment>
                )                 
            default:
                return "";
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={1}>
                        <React.Fragment>
                            <Grid item xs={4}>
                                <div   
                                    onDrop={this.dropKeyButon1}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                  
                                >
                                    <ButtonBase                                         
                                        className={classes.butonBase} 
                                        onClick={(e)=>{
                                            this.props.selectedKeyButton(this.props.KeyButton1); 
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                            {this.getIcon(this.props.KeyButton1)}                                            
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid>                            
                            <Grid item xs={4}>
                                <div                                     
                                    onDrop={this.dropKeyButon2}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                                     
                                >
                                    <ButtonBase
                                        className={classes.butonBase}
                                        onClick={(e)=>{
                                            this.props.selectedKeyButton(this.props.KeyButton2); 
                                            //this.props.changeSetting(this.state.KeyButton2);
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                            {this.getIcon(this.props.KeyButton2)}
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid>  
                            <Grid item xs={4}>
                                <div 
                                    id ="KeyButton3"
                                    onDrop={this.dropKeyButon3}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                  
                                >
                                    <ButtonBase 
                                        className={classes.butonBase}
                                        onClick={()=>{
                                            this.props.selectedKeyButton(this.props.KeyButton3); 
                                            //this.props.changeSetting(this.state.KeyButton3);
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                            {this.getIcon(this.props.KeyButton3)}
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid>  
                        </React.Fragment> 
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <React.Fragment>
                            <Grid item xs={4}>
                                <div 
                                    onDrop={this.dropKeyButon4}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                   
                                >
                                    <ButtonBase 
                                        className={classes.butonBase}
                                        onClick={(e)=>{
                                            this.props.selectedKeyButton(this.props.KeyButton4); 
                                            //this.props.changeSetting(this.state.KeyButton4);
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                        {this.getIcon(this.props.KeyButton4)}
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid>  
                            <Grid item xs={4}>
                                <div 
                                    onDrop={this.dropKeyButon5}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                  
                                >
                                    <ButtonBase 
                                        className={classes.butonBase}
                                        onClick={(e)=>{
                                            this.props.selectedKeyButton(this.props.KeyButton5); 
                                            //this.props.changeSetting(this.state.KeyButton5);
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                            {this.getIcon(this.props.KeyButton5)}
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid> 
                            <Grid item xs={4}>
                                <div 
                                    onDrop={this.dropKeyButon6}
                                    onDragOver={this.dragOver}
                                    onDragLeave={this.dragLeave}
                                    onDragEnter={this.dragEnter}                                  
                                >
                                    <ButtonBase 
                                        className={classes.butonBase}
                                        onClick={()=>{
                                            this.props.selectedKeyButton(this.props.KeyButton6); 
                                            //this.props.changeSetting(this.state.KeyButton6)
                                        }}
                                    >
                                        <Paper className={classes.paper}>
                                            {this.getIcon(this.props.KeyButton6)}
                                        </Paper>
                                    </ButtonBase>                                    
                                </div>
                            </Grid> 
                        </React.Fragment>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}></Divider>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return { 
        KeyButton1 : state.KeyButton1,
        KeyButton2 : state.KeyButton2,
        KeyButton3 : state.KeyButton3,
        KeyButton4 : state.KeyButton4,
        KeyButton5 : state.KeyButton5,
        KeyButton6 : state.KeyButton6,
        SelectedKeyButton: state.SelectedKeyButton 
    };
};

function mapDispatchToProps(dispatch) {
    return {
        readKeyButtons : keyButton => dispatch(readKeyButtons(keyButton)),
        selectedKeyButton: keyButton => dispatch(selectedKeyButton(keyButton)),
        updateKeyButton: keyButton => dispatch(updateKeyButton(keyButton))      
    };
}

const DeckComponent = withStyles(useStyles)(Deck);
export default connect(mapStateToProps, mapDispatchToProps)(DeckComponent);
