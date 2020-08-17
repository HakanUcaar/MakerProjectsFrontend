import React, { Component } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';

const useStyles = {
    root:{
        display: 'flex',
        flexDirection : 'Row',
        marginTop: "20px",        
    },
    card: {
        marginTop: "8px",
        maxHeight: 151,
        minWidth: 151,
      }
};

export class NoneSetting extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Box pr={2}>
                <Skeleton variant="rect" width={151} height={151} />
                </Box>
                
                <Box width= {"100%"}>
                    <Skeleton variant="text" />               
                    <Skeleton variant="text" width="60%"/>  
                </Box>
            </div>
        )
    }
}

export default withStyles(useStyles)(NoneSetting);

