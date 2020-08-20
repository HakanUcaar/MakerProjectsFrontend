import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"
import DesktopNotification from "./Components/DesktopNotification";
import App from './App';
import {createMuiTheme} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import * as colors from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
    overrides: {
      MuiDrawer: {
        paper: {
          backgroundColor: colors.grey[900],
          color: colors.grey[100]
        }
      }
    }
  });

class ViewManager extends Component {
    static Views() {
        return {
            main : <App/>,
            viewA:  <DesktopNotification/>
        }
    }

    static View(props) {
        let name = props.location.search.substr(1);
        let view = ViewManager.Views()[name];
        if (view === undefined)
            return ViewManager.Views()["main"]
        if(view == null) 
            throw new Error("View " + name + " is undefined");
        return view;
    }
 
    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>                
                <Router>
                    <div>
                        <Route path="/" component={ViewManager.View}/>                      
                    </div>
                </Router>
            </ThemeProvider> 
        );
    }
}
export default ViewManager