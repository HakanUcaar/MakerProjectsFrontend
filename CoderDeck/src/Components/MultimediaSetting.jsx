import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from "react-redux";
import { updateKeyButton} from "../Redux/KeyButtonsActions";
import MenuItem from '@material-ui/core/MenuItem';


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
        width:151
    },
    mediaDiv :{
        width:"100%"
    }
};

const MediaButtons = [
    {
        value: '1',
        label: 'Next',
    },
    {
        value: '2',
        label: 'Back',
    },
    {
        value: '3',
        label: 'Start',
    },
    {
        value: '4',
        label: 'Stop',
    },
    {
        value: '5',
        label: 'Pause',
        },
    ];

export class MultimediaSetting extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            //SelectedAction : this.props.action,
        }
    }

    changeActionName =(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.Name = e.target.value;
        this.props.updateKeyButton(KeyButton);
    }    

    changeActionValue=(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.MediaAction = e.target.value;
        this.props.updateKeyButton(KeyButton);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://api.adorable.io/avatars/285/cicikız@adorable.png"
                        title="Contemplative Reptile"
                    />
                </Card>
                <div className={classes.mediaDiv}>
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
                        id="standard-select-currency"
                        label="Websitesi"
                        style={{ margin: 8 }}
                        placeholder="Websitesi adresinin girin"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"                        
                        select
                        value={this.props.SelectedKeyButton.Action.MediaAction}
                        onChange={this.changeActionValue}
                        >
                        {MediaButtons.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>                                  
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

const MultimediaSettingComponent = withStyles(useStyles)(MultimediaSetting);
export default connect(mapStateToProps,mapDispatchToProps)(MultimediaSettingComponent) ;

