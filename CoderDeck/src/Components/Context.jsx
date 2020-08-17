import React, { Component } from 'react';
import Deck from "./Deck";
import Container from '@material-ui/core/Container';
import HotkeySetting from "./HotkeySetting";
import HotkeySwitchSetting from "./HotkeySwitchSetting";
import NoneSetting from "./NoneSetting";
import WebsiteSetting from "./WebsiteSetting";
import FileOpenSetting from "./FileOpenSetting";
import MultimediaSetting from "./MultimediaSetting";
import {Typography } from '@material-ui/core';
import {withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { connect } from "react-redux";
import { updateKeyButton} from "../Redux/KeyButtonsActions";
import KeyButton from '../Models/KeyButtonModel';

const useStyles = {
    lvl1:{
        display : "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between!important",
        paddingTop : "10px"       
    },
    lvl2:{
        flexGrow: "1",
        maxWidth: "100%",
        overflowX: "hidden"
    }
};

export class Context extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    getCurrentSetting=()=>{
        switch(this.props.SelectedKeyButton.ActionType){
            case 1:
                return <HotkeySetting></HotkeySetting>
            case 2:
                return <HotkeySwitchSetting></HotkeySwitchSetting>
            case 3:
                return <WebsiteSetting></WebsiteSetting>                
            case 4:
                return <FileOpenSetting></FileOpenSetting>        
            case 5:
                return <MultimediaSetting></MultimediaSetting>                            
            default:
                return <NoneSetting></NoneSetting>
        }  
    }

    deleteCurrentAction=()=>{
        let NewKeyButton =  new KeyButton(-1,"");
        NewKeyButton.Id =  this.props.SelectedKeyButton.Id;
        this.props.updateKeyButton(NewKeyButton);
    }

    render() {
        const {classes} = this.props;

        return (
            <Container maxWidth="sm">
                <Deck ></Deck>
                <div className={classes.lvl1}>
                    <Typography>Sistem : {this.props.SelectedKeyButton.Name}</Typography>
                    <IconButton onClick={this.deleteCurrentAction}>
                        <DeleteIcon></DeleteIcon>
                    </IconButton>                    
                </div>
                {this.getCurrentSetting()}
            </Container>
        )
    }
}

const mapStateToProps = state =>{
    return { SelectedKeyButton: state.SelectedKeyButton };
};

const mapDispatchToProps = dispatch=> {
    return {
        updateKeyButton: keyButton => dispatch(updateKeyButton(keyButton))
    };
}

const ContextComponent = withStyles(useStyles)(Context);
export default connect(mapStateToProps,mapDispatchToProps)(ContextComponent) ;

