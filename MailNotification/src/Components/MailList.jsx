import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailModel from '../Models/MailModel';
import { selectMail,updateCurrentMail } from "../Redux/ReduxActions";

const { ipcRenderer } = window.require('electron');
const theme = createMuiTheme();
const useStyles = {
    root: {
        overflow: "auto"
      //width: '100%',
      //maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(3),
    },
};
const Arduino = require("../Arduino");

export class MailList extends Component {

    handleOpenMail=(e,p)=>{
        e.preventDefault();

        let TempSetting ={...this.props.Settings};
        let MailInfo = {...TempSetting.Maillist.MailList.find(Item=>Item.Id === p)};
        TempSetting.CurrentMail = MailInfo;
        this.props.updateCurrentMail(TempSetting);
        //Arduino.SendMessageReceive();
    }

    render() {
        const {classes} = this.props;
        
        return (
            <div>         
                <Paper style={{maxHeight: "55vh", overflow: 'auto'}}>

                    <List className={classes.root} >
                        {
                            this.props.Settings.Maillist.MailList === undefined ? <div></div> : 
                            this.props.Settings.Maillist.MailList.map((value) => {
                                const labelId = `checkbox-list-label-${value}`;
                        
                                return (
                                    <ListItem className={classes.nested} key={value.Id} role={undefined} dense button onClick={(e)=>this.handleOpenMail(e,value.Id)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {value.FromName.substring(0, 1).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={value.Subject} secondary={value.Date} />                           
                                    </ListItem>  
                                );
                            })                        
                        }
                    </List> 
                </Paper>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { Settings: state.Settings };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectMail: Setting => dispatch(selectMail(Setting))  ,
        updateCurrentMail: keyButton => dispatch(updateCurrentMail(keyButton))      
    }
}


const MailListComponent = withStyles(useStyles)(MailList);
export default connect(mapStateToProps, mapDispatchToProps)(MailListComponent)
