import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { readSettings } from "../Redux/ReduxActions";
import Backdrop from '@material-ui/core/Backdrop';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import image1 from '../Images/PYh.gif';

const { ipcRenderer } = window.require('electron');
const theme = createMuiTheme();
const useStyles = {
    imageDiv:{
        height : "10%"
    },
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
};

export class DesktopNotification extends Component {
    constructor()
    {
        super();

        this.state ={
            backdropOpen : false
        }
    }
    componentDidMount=()=>
    {
        this.props.readSettings();
        this.setState({backdropOpen:true});
        setTimeout(() => {  this.setState({backdropOpen:false}) }, 2000);
    }

    handleOpenBackdrop=()=>{
        this.setState({backdropOpen:true});
    }
    handleCloseBackdrop=()=>{
        this.setState({backdropOpen:false});
    }

    render() {
        
        const {classes} = this.props;

        return (
            <div>
                <Backdrop className={classes.backdrop} open={this.state.backdropOpen} onClick={this.handleCloseBackdrop}>
                    <img className={classes.gifImage} src={image1} alt={image1} />
                </Backdrop>
                {
                    this.state.backdropOpen === false ?                 
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                {this.props.Settings === undefined ? "A" : this.props.Settings.CurrentMail.FromName.substring(0, 1).toUpperCase()}
                                </Avatar>
                            }
                            title={this.props.Settings === undefined ? "Konu Bulunamadı" : this.props.Settings.CurrentMail.Subject}
                            subheader={this.props.Settings === undefined ? new Date().toLocaleDateString() : this.props.Settings.CurrentMail.Date}
                        />                      
                        <CardContent>
                            
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.Settings === undefined ? "İçerik bulunamadı" : 
                                ReactHtmlParser(this.props.Settings.CurrentMail.Html) }
                            </Typography>
                        </CardContent>                                  
                    </Card> : <div></div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { Settings: state.Settings };
}

const mapDispatchToProps = (dispatch)=> {
    return {
      readSettings: keyButton => dispatch(readSettings(keyButton))
    }
  }

const DesktopNotificationComponent = withStyles(useStyles)(DesktopNotification);
export default connect(mapStateToProps,mapDispatchToProps)(DesktopNotificationComponent) ;
