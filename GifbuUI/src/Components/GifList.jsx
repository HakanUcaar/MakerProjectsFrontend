import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles,createMuiTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

import { updateGifbuData} from "../Redux/ReduxActions";

import image1 from '../Gifs/1.gif';
import image2 from '../Gifs/2.gif';
import image3 from '../Gifs/3.gif';
import image4 from '../Gifs/4.gif';
import image5 from '../Gifs/5.gif';
import image6 from '../Gifs/6.gif';
import image7 from '../Gifs/7.gif';
import image8 from '../Gifs/8.gif';
import image9 from '../Gifs/9.gif';
import image10 from '../Gifs/10.gif';
import image11 from '../Gifs/11.gif';
import image12 from '../Gifs/12.gif';
import image13 from '../Gifs/13.gif';

const theme = createMuiTheme();
const useStyles = {
    root: {
        marginTop : "50px",
        flexGrow: 1,
    },
    gridList: {    
        paddingTop:"10px",   
        width: "95%",
        height: "100",
    },
    gridListTile:{
        '&:hover': {
            border: '2px solid '+theme.palette.primary.main,
            zIndex: 1,
            '& $imageBackdrop': {
            opacity: 0.15,
            },
            '& $imageMarked': {
            opacity: 0,
            },
        }
    },
    appBar: {
        position: 'relative',
    },
    dialog: {
        marginTop:"30px",
    }
};

const tileData = [
    {
        img: image1,
        title: 'Image1',
        author: 'author1',
    },
    {
        img: image2,
        title: 'Image2',
        author: 'author2',
    },
    {
        img: image3,
        title: 'Image3',
        author: 'author3',
    },
    {
        img: image4,
        title: 'Image4',
        author: 'author4',
    },      
    {
        img: image5,
        title: 'Image5',
        author: 'author5',
    },
    {
        img: image6,
        title: 'Image6',
        author: 'author6',
    },
    {
        img: image7,
        title: 'Image7',
        author: 'author7',
    },
    {
        img: image8,
        title: 'Image8',
        author: 'author8',
    },            
    {
        img: image9,
        title: 'Image9',
        author: 'author9',
    },      
    {
        img: image10,
        title: 'Image10',
        author: 'author10',
    },      
    {
        img: image11,
        title: 'Image11',
        author: 'author11',
    },      
    {
        img: image12,
        title: 'Image12',
        author: 'author12',
    },      
    {
        img: image13,
        title: 'Image13',
        author: 'author13',
    },      
                          
];

export class GifList extends Component {
    constructor(props){
        super(props);

        this.state={
            open:false,
        }
    }

    onClickImage =(e)=>{
        let GifBu = {...this.props.GifBu};
        GifBu.ImagePath = e.target.src;
        this.props.updateGifbuData(GifBu);
        this.props.close(); 
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Dialog className={classes.dialog} fullScreen open={this.props.gifListOpen} onClose={this.props.close} TransitionComponent={this.Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.props.close} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                GİF RESİM LİSTESİ
                            </Typography>
                        </Toolbar>
                    </AppBar>                    
                    <Container maxWidth="md">
                        <GridList cellHeight={300} className={classes.gridList} cols={3}>
                            {tileData.map((tile) => (
                                <GridListTile  className={classes.gridListTile} key={tile.img} cols={tile.cols || 1}>
                                    <img onClick={e=>this.onClickImage(e)} src={tile.img} alt={tile.title} />
                                </GridListTile>                   
                            ))}
                        </GridList>          
                    </Container>       
                </Dialog>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        GifBu : state.Gifbu
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGifbuData: gifbu => dispatch(updateGifbuData(gifbu))
    };
}

const GiftListComponent = withStyles(useStyles)(GifList);
export default connect(mapStateToProps,mapDispatchToProps)(GiftListComponent) ;

