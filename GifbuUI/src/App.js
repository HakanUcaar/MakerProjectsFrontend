import React, { Component } from 'react';
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from "react-redux";
import Main from './Components/Main';
import { readGifbuData} from "./Redux/ReduxActions";
import { SnackbarProvider } from 'notistack';

 const Arduino = require("./Arduino");
 Arduino.ConnectArduino();

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <CssBaseline/>
          <Main/>  
        </SnackbarProvider>     
      </ThemeProvider>      
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
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App) ;

