import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Settings from './Settings';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';

const Arduino = require("../Arduino");
const notifier = window.require('mail-notifier');
const useStyles = {
    lvl1:{
        flexGrow: "0",
        flexShrink: "0",
    },
    userbox:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "1rem",
        margin: "0",
        borderRadius: "0",
        textAlign: "center",
        whiteSpace: "nowrap"
    },
    avatar:{
        width: "54px",
        height: "54px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: ".5rem"
    },

};

export class Header extends Component {  
    constructor(){
        super();

        this.state = {
            settingOpen : false
        }
    }

    handleConnectClick=()=>{
        Arduino.SendCloseMessage();
        //notifier.start();
    }

    handleSettingClose=()=>{
        this.setState({settingOpen:false});
    }
    handleSettingOpen=()=>{
        //ipcRenderer.send('send-currentmail', 'ping');
        this.setState({settingOpen:true});
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.lvl1}>
                <Box className={classes.userbox}>
                    <Avatar className={classes.avatar} src="https://api.adorable.io/avatars/285/barista@adorable.pngC"></Avatar>
                    <Box>
                        <Box><b>Hakan UÇAR</b></Box>
                        <Box style={{marginBottom:".5rem"}}>Software Developer</Box>
                        <Box>
                            <IconButton onClick={this.handleSettingOpen}>
                                <SettingsIcon/>
                            </IconButton>
                            <IconButton >
                                {this.props.IsConnected ? <PowerIcon onClick={this.handleConnectClick}/> : <PowerOffIcon onClick={this.handleConnectClick}/>}
                            </IconButton>                            
                        </Box>
                    </Box>
                </Box>
                <Settings open = {this.state.settingOpen} handleClose = {this.handleSettingClose}></Settings>
                <Typography variant="h5" component="h2">
                    <b>Gelen Mail Listesi</b>
                </Typography>  
                <Divider></Divider>                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { IsConnected: state.IsConnected };
}
const mapDispatchToProps = {
    
}

const HeaderComponent = withStyles(useStyles)(Header);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)
