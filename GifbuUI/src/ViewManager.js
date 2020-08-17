import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom"
import GifDesktopWindow from "./Components/GifDesktopWindow";
import App from './App';

class ViewManager extends Component {
    static Views() {
        return {
            main : <App></App>,
            viewA: <GifDesktopWindow/>,
        }
    }

    static View(props) {
        let name = props.location.search.substr(1);
        let view = ViewManager.Views()[name];
        if (view == undefined)
            return ViewManager.Views()["main"]
        if(view == null) 
            throw new Error("View " + name + " is undefined");
        return view;
    }
 
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={ViewManager.View}/>
                </div>
            </Router>
        );
    }
}
export default ViewManager