import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./Redux/ReduxStore";
//import { SnackbarProvider } from 'notistack';
import ViewManager from "./ViewManager";


ReactDOM.render(
    <Provider store={store}> 
        <ViewManager/>
    </Provider>
    , document.getElementById('root')
);

serviceWorker.unregister();
