import React, { Component } from 'react';
import Main from './Components/Main';
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});


export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Main></Main>
      </ThemeProvider>      
    )
  }
}

export default App
