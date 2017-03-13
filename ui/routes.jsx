import React from 'react';
import {Route} from 'react-router';
import App from './components/app';
import Login from './components/login';
import NotFound from './components/notFound';
import Profile from './components/profile';
import Auth from './components/auth';

export default (
    <Route
        component={App}
        path="/"
    >
        <Route
            component={Login}
            path="login"
        />
        <Route component={Auth}>
            <Route
                component={Profile}
                path="users/:id"
            />
        </Route>
        <Route
            component={NotFound}
            path="*"
        />
    </Route>
);
