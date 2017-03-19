import React from 'react';
import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, browserHistory} from 'react-router';
import cookie from 'react-cookie';
import rootReducer from './reducers';
import routes from './routes';
import {AUTH_USER} from './actions/types';

const store = applyMiddleware(
    reduxThunk
)(createStore);

const token = cookie.load('token');

if (token) store.dispatch({type: AUTH_USER});

ReactDOM.render(
    <Provider store={store(rootReducer)}>
        <Router
            history={browserHistory}
            routes={routes}
        />
    </Provider>,
    document.querySelector('.reactContainer')
);
