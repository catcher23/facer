import axios from 'axios';
import cookie from 'react-cookie';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
} from './types';
import {
    API_URL,
    CLIENT_ROOT_URL,
    errorHandler
} from './index';


export const logoutUser = (dispatch) => {
    dispatch({type: UNAUTH_USER});
    cookie.remove('token', {path: '/'});
    window.location.href = `${CLIENT_ROOT_URL}/login`;
};

export const loginUser = ({email, password}) =>
(dispatch) => {
    axios.post(`${API_URL}/auth/login`, {email, password})
    .then((response) => {
        cookie.save('token', response.data.token, {path: '/'});
        dispatch({type: AUTH_USER});
        window.location.href = `${CLIENT_ROOT_URL}/users/${response.id}`;
    })
    .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};

export const registerUser = ({email, name, password}) => (dispatch) => {
    axios.post(`${API_URL}/auth/register`, {email, name, password})
    .then((response) => {
        cookie.save('token', response.data.token, {path: '/'});
        dispatch({type: AUTH_USER});
        window.location.href = `${CLIENT_ROOT_URL}/users/${response.id}`;
    })
    .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};
