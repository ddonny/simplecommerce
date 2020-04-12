import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
    BrowserRouter,
    Route,
    // Redirect,
    Switch
} from "react-router-dom";
import reducers from "./reducer";
import registerServiceWorker from './registerServiceWorker';
import "./http";

import Login from "./container/login/login";
import AuthRoute from "./components/authroute/authroute";
import Search from "./container/search/search";
import Home from "./container/home/home";
import Purchaselist from "./container/purchaselist/purchaselist"
import Productdetail from "./container/productdetail/productdetail"

import "./static/css/main.css";

const reduxDevTools = (window.devToolsExtension&&window.devToolsExtension())||(f=>f);
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevTools
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/login" component={props => <Login {...props} />} />
                    <Route path="/home" component={props => <Home {...props} />} />
                    <Route path="/search" component={props => <Search {...props} />} />
                    <Route path="/purchaselist" component={props => <Purchaselist {...props} />} />
                    <Route path="/productdetail" component={props => <Productdetail {...props} />} />
                    <Route path="/" component={props => <Login {...props} />} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

