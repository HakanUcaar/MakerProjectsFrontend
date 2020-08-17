import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ImageIcon from '@material-ui/icons/Image';
import 
{ 
    readGifbuData,
    selectedGifImage,
    updateGifbuData,
    saveGifbuData
} 
from "../Redux/ReduxActions";

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
        width: "100%",
        height: "100%",
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

export class GifDesktopWindow extends Component {
    componentDidMount=async()=>{
        this.props.readGifbuData();
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                {
                    this.props.GifBu.ImagePath === ""
                    ? <ImageIcon className={classes.imageIcon}/> 
                    : <img className={classes.gifImage} src={this.props.GifBu.ImagePath} />
                }
                <h1>{this.props.GifBu.Message}</h1>
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

const GifDesktopWindowComponent = withStyles(useStyles)(GifDesktopWindow);
export default connect(mapStateToProps,mapDispatchToProps)(GifDesktopWindowComponent) ;

