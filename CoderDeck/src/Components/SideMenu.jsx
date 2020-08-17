import React, { Component } from 'react';
import {withStyles, createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import LanguageIcon from '@material-ui/icons/Language';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import TheatersIcon from '@material-ui/icons/Theaters';
import {SystemComponentsKeys} from '../Constants/CoderDeckConstants';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Settings from '../Components/Settings';

const theme = createMuiTheme();
const useStyles = {
    lvl1:{
        flexGrow: "0",
        flexBasis: "250px",
        flexShrink: "0",
         borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        // borderTop: "1px solid #eeeeee",
    },
    lvl2:{
        position: "relative"
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    userbox:{
        //background: "#f4f5fd",
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
    menuItemText:{
        paddingLeft: "50px"
    },
    chipCloud:{
        display: "flex",
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        },
    },
    setting:{
        position: "absolute",
        right: "1rem",
        top: "1rem"
    }
};

const { shell } = window.require('electron');

export class SideMenu extends Component {

    constructor(props){
        super(props);

        this.state={
            SystemMenuOpen : false,
            SettingOpen : false
        }
    }

    handleClick=()=>{
        this.setState({SystemMenuOpen:!this.state.SystemMenuOpen});
    }

    dragStart=(e)=>{
        const target = e.target;
        e.dataTransfer.setData("KeyId",target.id);
        e.dataTransfer.setData("ActionType","System");

        // setTimeout(()=>{
        //     target.style.display = "none";
        // },0);
    }

    dragOver =(e)=>{
        e.stopPropagation();
    }

    settingOpenClick=()=>{
        this.setState({SettingOpen:true})
    }
    settingClose=()=>{
        this.setState({SettingOpen:false})
    }
    githubClick=()=>{
        let link = "https://github.com/HakanUcaar/";
        shell.openExternal(link);
    }
    linkedinClick=()=>{
        let link = "https://www.linkedin.com/in/hakan-u%C3%A7ar-baa718159/";
        shell.openExternal(link);
    }    

    render() {
        const {classes} = this.props;

        return (    
            <div className={classes.lvl1}>
                <div className={classes.lvl2}>
                    <Settings openCloseInfo={this.state.SettingOpen} onCloseHandle={this.settingClose}></Settings>
                    <Box className={classes.userbox}>
                        <Avatar className={classes.avatar} src="https://api.adorable.io/avatars/285/barista@adorable.pngC"></Avatar>
                        <IconButton size="small" className={classes.setting} onClick={this.settingOpenClick}>
                            <SettingsIcon></SettingsIcon>
                        </IconButton>
                        <Box>
                            <Box><b>Hakan UÇAR</b></Box>
                            <Box style={{marginBottom:".5rem"}}>Software Developer</Box>
                            <Box >
                                <IconButton  size="small" onClick={this.githubClick}> 
                                    <GitHubIcon></GitHubIcon>
                                </IconButton>  
                                <IconButton  size="small" onClick={this.linkedinClick}>
                                    <LinkedInIcon></LinkedInIcon>
                                </IconButton>                             
                                
                            </Box>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary="Sistem" />
                        {this.state.SystemMenuOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.SystemMenuOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <div
                                id = {SystemComponentsKeys.HotKey}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                            >
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <KeyboardIcon />
                                    </ListItemIcon>
                                    <ListItemText secondary="Kısayol" />
                                </ListItem>                            
                            </div>
                            <div
                                id = {SystemComponentsKeys.SwitchHotkey}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                            >
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <SwapHorizIcon />
                                    </ListItemIcon>                                
                                    <ListItemText secondary="Seçmeli Kısayol" />
                                </ListItem>                             
                            </div>                            
                            <div
                                id = {SystemComponentsKeys.WebSite}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                            >
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <LanguageIcon />
                                    </ListItemIcon>                              
                                    <ListItemText secondary="WebSite" />
                                </ListItem>                              
                            </div>
                            <div
                                id = {SystemComponentsKeys.FileOpen}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                            >
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <WebAssetIcon />
                                    </ListItemIcon>                              
                                    <ListItemText secondary="Aç" />
                                </ListItem>                             
                            </div>
                            <div
                                id = {SystemComponentsKeys.Multimedia}
                                draggable="true"
                                onDragStart={this.dragStart}
                                onDragOver={this.dragOver}
                            >
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <TheatersIcon />
                                    </ListItemIcon>                              
                                    <ListItemText secondary="Multimedya" />
                                </ListItem>                               
                            </div>                                                                                                                                       
                        </List>
                    </Collapse>                            
                </div>
            </div>   
        )
    }
}

export default withStyles(useStyles)(SideMenu);