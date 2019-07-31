/* Polyfill Imports */
import "core-js/stable";
import "regenerator-runtime/runtime";
/* React Imports */
import React from 'react';
import ReactDOM from 'react-dom';
/* Redux Store Imports */
import configureStore from './store/configureStore';
/* React Redux Imports */
import { Provider } from 'react-redux';
/* React Router Imports */
import { BrowserRouter } from 'react-router-dom';

import App from './views/app/App';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/" >
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);