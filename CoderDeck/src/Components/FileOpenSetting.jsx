import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from "react-redux";
import { updateKeyButton} from "../Redux/KeyButtonsActions";
import { FilePicker } from 'react-file-picker';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

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

export class FileOpenSetting extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            SelectedAction : this.props.action,
        }
    }

    changeActionName =(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.Name = e.target.value;
        this.props.updateKeyButton(KeyButton);
    } 

    changeFilePath =(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.FilePath = e.target.value;
        this.props.updateKeyButton(KeyButton);  
    }
    changeFilePathFromIcon =(e)=>{
        let KeyButton = {...this.props.SelectedKeyButton};
        KeyButton.Action.FilePath = e.path;
        this.props.updateKeyButton(KeyButton);  
    }    

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="https://api.adorable.io/avatars/285/cimilcimil@adorable.png"
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
                        label="Dosya Yolu"
                        style={{ margin: 8 }}
                        placeholder="Açılacak dosyanın yolunu seçin"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        InputProps={{
                            endAdornment: 
                            <InputAdornment position="end">
                                <FilePicker                                
                                onChange={FileObject => this.changeFilePathFromIcon(FileObject)}
                                >
                                    <IconButton>                                
                                        <AttachFileIcon /> 
                                    </IconButton>
                                </FilePicker>
                            </InputAdornment>,
                          }}
                        onChange={(e)=>this.changeFilePath(e)}
                        value={this.props.SelectedKeyButton.Action.FilePath} 
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

const FileOpenSettingComponent = withStyles(useStyles)(FileOpenSetting);
export default connect(mapStateToProps,mapDispatchToProps)(FileOpenSettingComponent) ;

