import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import GifList from './GifList';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ImageIcon from '@material-ui/icons/Image';
import ArduinoIcon from '../ArduinoSvgIconComponent/ArduinoIcon';

import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import { withSnackbar } from 'notistack';

import 
{ 
    readGifbuData,
    selectedGifImage,
    updateGifbuData,
    saveGifbuData
} 
from "../Redux/ReduxActions";
import ArduinoSettingDialog from './ArduinoSettingDialog';

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
        minHeight: "95vh",
        //alignItems:"center"
    },
    paper:{       
        margin : "50px", 
        width: "275px",
        height: "425px",
        position: "absolute",
        left: "35%",
        top: "35%",
        transform: "translate(-35%, -35%)"
    },
    gifImage:{
        width: "275px",
        height: "425px",
    },
    fab: {
        position: "absolute",
        top: "90%",
        left:"85%"
    },
    imageIcon :{
        height : "50px",
        width : "50px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
};

export class Main extends Component {
    constructor(props){
        super(props);

        this.state={
            open:false,
            arduinoSettingOpen:false
        }
    }

    componentDidMount=async()=>{
        this.props.readGifbuData();
    }

    giftListCloseHandle = () =>{
        this.setState({open:false});
    }
    giftListOpenHandle=()=>{
        this.setState({open:true});
    }

    arduinoSettingCloseHandle = () =>{
        this.setState({arduinoSettingOpen:false});
    }
    arduinoSettingOpenHandle=()=>{
        this.setState({arduinoSettingOpen:true});
    }    

    changeMessageText =(e)=>{
        let GifBu = {...this.props.GifBu};
        GifBu.Message = e.target.value;
        this.props.updateGifbuData(GifBu);       
    }

    onDoneClick=()=> {
        this.props.saveGifbuData();      
        
        this.props.enqueueSnackbar("Veriler kaydedildi", { 
            variant: 'success',
        });     
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.lvl1}>
                <div className={classes.lvl2}>                       
                    <div className={classes.lvl3}>  
                        <Container maxWidth="md">
                            <TextField
                                id="filled-full-width"
                                label="Gönderilecek Mesaj"
                                style={{ margin: 8 }}
                                placeholder="Göndermek istediğin mesajı buraya gir"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                variant="filled"
                                InputProps={{
                                    endAdornment: 
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.giftListOpenHandle}>                                
                                            <AttachFileIcon /> 
                                        </IconButton>
                                        <IconButton onClick={this.arduinoSettingOpenHandle}>                                
                                            <ArduinoIcon /> 
                                         </IconButton>

                                    </InputAdornment>,
                                  }}                                
                                onChange={this.changeMessageText}
                                value ={this.props.GifBu.Message}
                            />    
                            <Paper className={classes.paper} elevation={3}>             
                                {
                                    this.props.GifBu.ImagePath === ""
                                    ? <ImageIcon className={classes.imageIcon}/> 
                                    : <img className={classes.gifImage} src={this.props.GifBu.ImagePath} />
                                }                                
                                <Fab className={classes.fab} color="primary" aria-label="add">
                                    <DoneIcon onClick={this.onDoneClick} />
                                </Fab>                                
                            </Paper>
                            <GifList gifListOpen={this.state.open} close={this.giftListCloseHandle}></GifList>
                            <ArduinoSettingDialog settingOpen={this.state.arduinoSettingOpen} close={this.arduinoSettingCloseHandle}></ArduinoSettingDialog>
                        </Container>
                    </div>
                </div>          
            </div>              
        )
    }
}

const mapStateToProps = (state) => {
    return {
        GifBu : state.Gifbu
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        readGifbuData : GifBu => dispatch(readGifbuData(GifBu)),
        selectedGifImage: GifBu => dispatch(selectedGifImage(GifBu)),
        updateGifbuData: GifBu => dispatch(updateGifbuData(GifBu)),
        saveGifbuData: GifBu => dispatch(saveGifbuData(GifBu)),        
    };
}

const MainComponentSnackbar = withSnackbar(Main);
const MainComponent = withStyles(useStyles)(MainComponentSnackbar);
export default connect(mapStateToProps,mapDispatchToProps)(MainComponent) ;
