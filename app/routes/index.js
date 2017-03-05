import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import passportConfig from '../../config/passport';
import authenticate from './authenticate';
import register from './register';
import {getUsers, getUser, postUser} from './users';

const routes = (app) => {
    const apiRoutes = express.Router();
    passportConfig(passport);
    app.use(passport.initialize());
    app.use('/api', apiRoutes);
    app.use(bodyParser.json());

    apiRoutes.post('/register', register);
    apiRoutes.post('/authenticate', authenticate);
    apiRoutes.get('/users', getUsers);
    apiRoutes.get('/users', getUser);
    apiRoutes.post('/user', postUser);
};

export default routes;
