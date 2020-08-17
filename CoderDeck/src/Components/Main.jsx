import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withStyles } from '@material-ui/core/styles';
import Drawer from '../Components/SideMenu';
import Context from '../Components/Context';
import StatusBar from '../Components/StatusBar';

const useStyles = {
    lvl1:{
        display: "flex",
        
    },
    lvl2:{
        flexGrow: "1",
        maxWidth: "100%",
        overflowX: "hidden"
    },
    lvl3:{
        display: "flex",
        overflow: "hidden",
        transition: "transform 195ms",
        minHeight: "95vh"
    }
};

export class MainPage extends Component {
    render() {
        const {classes} = this.props;
        
        return (
            <div className={classes.lvl1}>
                <div className={classes.lvl2}>                       
                    <div className={classes.lvl3}>                            
                        <Drawer></Drawer>
                        <Context></Context>
                        <StatusBar></StatusBar>
                    </div>
                </div>          
            </div>          
        )
    }
}

export default withStyles(useStyles)(MainPage);
