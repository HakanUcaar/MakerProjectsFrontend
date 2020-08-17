import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from "react-redux";
import 
{ 
    selectedKeyButton,
    updateKeyButton
} 
from "../Redux/KeyButtonsActions";

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
};

export class WebsiteSetting extends Component {
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

    changeWebSiteAddress=(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.Website = e.target.value;
        this.props.updateKeyButton(KeyButton);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://api.adorable.io/avatars/285/hakobako@adorable.png"
                        title="Contemplative Reptile"
                    />
                </Card>
                <div >
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
                        onChange={(e)=>this.changeActionName(e)}
                        value={this.props.SelectedKeyButton.Action.Name}                        
                    />
                    <TextField
                        id="filled-full-width"
                        label="Web Sitesi"
                        style={{ margin: 8 }}
                        placeholder="Websitesi adresinin girin"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        onChange={(e)=>this.changeWebSiteAddress(e)}
                        value={this.props.SelectedKeyButton.Action.Website}
                    />                
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

const WebsiteSettingComponent = withStyles(useStyles)(WebsiteSetting);
export default connect(mapStateToProps,mapDispatchToProps)(WebsiteSettingComponent) ;

