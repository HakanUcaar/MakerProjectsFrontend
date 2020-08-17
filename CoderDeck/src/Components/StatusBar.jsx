import React, { Component } from 'react';
import {withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { connect } from "react-redux";
import { updateMachineStatus } from "../Redux/KeyButtonsActions";

const useStyles = {
    appBar: {
        top: 'auto',
        bottom: 0,
        flexGrow : 1,
        height : "20px",
      },
    Toolbar:{
        minHeight:"20px",
    },
    barInfo: {
        flexGrow : 1,
        fontSize: "0.80rem",
    },
    dividerInf:{
        marginLeft:"20px"
    },
    connectedDevicecss:{
        fontSize: "0.80rem",
        paddingLeft : "15px", 
        //justifyContent: "space-between!important",
    }
};

export class StatusBar extends Component {
    constructor(props){
        super(props);

        this.state={
            // status : "Servise bağlı değil",
            // connectedDevice : "Yok", 
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div>                
                <AppBar position="fixed"  className={classes.appBar}>
                    <Toolbar className={classes.Toolbar}>
                        <Typography color ="textSecondary" className={classes.barInfo}>Cihaz Durumu : {this.props.MachineStatus}</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return { MachineStatus: state.MachineStatus };
};

function mapDispatchToProps(dispatch) {
    return {
        updateMachineStatus: status => dispatch(updateMachineStatus(status))
    };
}
const StatusBarComponent = withStyles(useStyles)(StatusBar);
export default connect(mapStateToProps,mapDispatchToProps)(StatusBarComponent) ;


// <Divider orientation="vertical" flexItem className={classes.dividerInf}></Divider>
// <Typography color ="textSecondary" className={classes.connectedDevicecss}>Durum : {this.state.status}</Typography>