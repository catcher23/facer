import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App, Auth, Login, NotFound, Profile, Register} from './components';

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
