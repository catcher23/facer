import axios from 'axios';
import cookie from 'react-cookie';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
} from './types';

const API_URL = 'http://localhost:3000/api';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if (error.data.error) {
        errorMessage = error.data.error;
    } else if (error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    dispatch({
        payload: errorMessage,
        type
    });
}

export const logoutUser = (dispatch) => {
    dispatch({type: UNAUTH_USER});
    cookie.remove('token', {path: '/'});
    window.location.href = '/login';
};

export const loginUser = ({email, password}) =>
(dispatch) => {
    axios.post(`${API_URL}/auth/login`, {email, password})
    .then((response) => {
        cookie.save('token', response.data.token, {path: '/'});
        dispatch({type: AUTH_USER});
        window.location.href = `/users/${response.id}`;
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
        window.location.href = `/users/${response.id}`;
    })
    .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
    });
};
