import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth';

const rootReducer = combineReducers({
    authReducer,
    formReducer
});

export default rootReducer;
