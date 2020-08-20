import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ViewManager from './ViewManager';
import { Provider } from "react-redux";
import store from "./Redux/ReduxStore";
import * as serviceWorker from './serviceWorker';

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <ViewManager/>                     
    </Provider>       
    , document.getElementById('root')
);

serviceWorker.unregister();
