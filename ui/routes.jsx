import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import Auth from './components/auth';
import Login from './components/login';
import NotFound from './components/notFound';
import Profile from './components/profile';
import Register from './components/register';

export default (
    <Route
        component={App}
        path="/"
    >
        <IndexRoute component={Register} />
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
