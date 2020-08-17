import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateSettings,saveSettings } from "../Redux/ReduxActions";

const useStyles = {
    lvl1:{
    },
};

export class Settings extends Component {
    constructor(){
        super();

        this.state = {
            open : false,
        }
    }

    handleCloseSetting=()=>{
        let TmpSetting = {...this.props.Settings}
        this.props.saveSettings(TmpSetting);
        this.props.handleClose();
    }

    onHostChange=(e)=>{
        let TmpSetting = {...this.props.Settings}
        TmpSetting.Host = e.target.value;  
        this.props.updateSettings(TmpSetting);  
    }
    onUserNameChange=(e)=>{
        let TmpSetting = {...this.props.Settings}
        TmpSetting.UserName = e.target.value;  
        this.props.updateSettings(TmpSetting); 
    }
    onPasswordChange=(e)=>{
        let TmpSetting = {...this.props.Settings}
        TmpSetting.Password = e.target.value;  
        this.props.updateSettings(TmpSetting); 
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">IMAP Bilgileri</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Host"
                            type="text"
                            fullWidth
                            onChange={(e)=>this.onHostChange(e)}
                            value = {this.props.Settings.Host}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Kullanıcı Adı"
                            type="text"
                            fullWidth
                            onChange={(e)=>this.onUserNameChange(e)}
                            value = {this.props.Settings.UserName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Şifre"
                            type="text"
                            fullWidth
                            onChange={(e)=>this.onPasswordChange(e)}
                            value = {this.props.Settings.Password}
                        />                                                
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleCloseSetting} color="primary">
                        Kaydet
                    </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                        Kapat
                    </Button>
                    </DialogActions>
                </Dialog>                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { Settings: state.Settings };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: Setting => dispatch(updateSettings(Setting)),
        saveSettings: Setting => dispatch(saveSettings(Setting))
        
    }
}


const SettingsComponent = withStyles(useStyles)(Settings);
export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent)
