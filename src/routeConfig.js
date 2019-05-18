'use strict';

import React, { Component } from 'react';
import {
    Router,
    Route,
    Switch
} from 'react-router-dom';
import App from './App';

const AppRoute = ({ Layout, Component, path }, ...rest) => (
    <Route {...rest} path={path} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

const App = () => (
    <Router history={history}>
        <Switch>
            <AppRoute exact path={"/"} Layout={null} Component={App} />
        </Switch>
    </Router>
)

export default App;