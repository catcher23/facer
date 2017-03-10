import React from 'react';
import {Route} from 'react-router';
import App from './components/app';
import Login from './components/login';
import Profile from './components/profile';
import AuthorizedContainer from './components/authorizedContainer';

export default (
    <Route
        component={App}
        path="/"
    >
        <Route
            component={Login}
            path="login"
        />
        <Route component={AuthorizedContainer}>
            <Route
                component={Profile}
                path="users/:id"
            />
        </Route>
    </Route>
);
