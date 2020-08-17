import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import { updateGifbuData,saveGifbuData} from "../Redux/ReduxActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const ParityList = [
    {
        value: '0',
        label: 'None',
    },
    {
        value: '1',
        label: 'Odd',
    },
    {
        value: '2',
        label: 'Even',
    },
    {
        value: '3',
        label: 'Mark',
    },
    {
        value: '4',
        label: 'Space',
    },
];
const ComPorts = [
{
    value: '1',
    label: 'COM1',
},
{
    value: '2',
    label: 'COM2',
},
{
    value: '3',
    label: 'COM3',
},
{
    value: '4',
    label: 'COM4',
},
{
    value: '5',
    label: 'COM5',
    },
]; 

const theme = createMuiTheme();
const useStyles = {
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
};

export class ArduinoSettingDialog extends Component {
    constructor(props){
        super(props);

        this.state={
            parity : "0",
            boundRate :"9600",
            comPort : "3"
        }
    }

    handleParityChange = (e) => {
        let GifBu = {...this.props.Gifbu};
        GifBu.Machine.Parity = e.target.value;
        this.props.updateGifbuData(GifBu);
    };
    handlePortChange = (e) => {
        let GifBu = {...this.props.Gifbu};
        GifBu.Machine.PortName = e.target.value;
        this.props.updateGifbuData(GifBu);
    };    
    handleBoundRateChange = (e) => {
        let GifBu = {...this.props.Gifbu};
        GifBu.Machine.BaudRate = e.target.value;
        this.props.updateGifbuData(GifBu);
    };  
    handleSave=()=>{
        this.props.saveGifbuData();
        this.props.close();
    }   

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog fullWidth maxWidth="sm" open={this.props.settingOpen} onClose={this.props.close} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Arduino Bağlantı Bilgileri</DialogTitle>
                    <DialogContent>
                        <List subheader={<ListSubheader>Arduino Bağlantı Ayarları</ListSubheader>} className={classes.root}>
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Port" />
                                <ListItemSecondaryAction>
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    value={this.props.Gifbu.Machine.PortName}
                                    onChange={this.handlePortChange}
                                    >
                                    {ComPorts.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                    </TextField>
                                </ListItemSecondaryAction>
                            </ListItem> 
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Baud Rate" />
                                <ListItemSecondaryAction>
                                    <TextField 
                                    id="standard-basic"
                                    value={this.props.Gifbu.Machine.BaudRate}
                                    onChange={this.handleBoundRateChange}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>          
                            <ListItem>
                                <ListItemText id="switch-list-label-wifi" secondary="Parity" />
                                <ListItemSecondaryAction>
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    value={this.props.Gifbu.Machine.Parity}
                                    onChange={this.handleParityChange}
                                    >
                                    {ParityList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    ))}
                                    </TextField>
                                </ListItemSecondaryAction>
                            </ListItem>                 
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">
                            Değişiklikleri Kaydet
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Gifbu : state.Gifbu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateGifbuData: gifImage => dispatch(updateGifbuData(gifImage)),
        saveGifbuData: GifBu => dispatch(saveGifbuData(GifBu)),     
    };
}

const ArduinoSettingDialogComponent = withStyles(useStyles)(ArduinoSettingDialog);
export default connect(mapStateToProps,mapDispatchToProps)(ArduinoSettingDialogComponent) ;
