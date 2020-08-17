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

import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const theme = createMuiTheme();
const useStyles = {
    root: {
      //width: '100%',
      //maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(5),
    },
};

export class MailList extends Component {
    render() {
        const {classes} = this.props;
        
        return (
            <div>
                <List>
                    {[0, 1, 2, 3,4,5,6].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                
                        return (
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                >
                                    <Typography>{labelId}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography color="textSecondary">
                                    The click event of the nested action will propagate up and expand the accordion unless
                                    you explicitly stop it.
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}                

                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

const MailListComponent = withStyles(useStyles)(MailList);
export default connect(mapStateToProps, mapDispatchToProps)(MailListComponent)
