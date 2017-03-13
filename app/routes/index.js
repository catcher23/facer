import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import passportConfig from '../config/passport';
import login from '../controllers/login';
import registration from '../controllers/registration';
import {getUsers, getUser, postUser} from '../controllers/users';

// const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

const routes = (app) => {
    const api = express.Router();
    passportConfig(passport);
    app.use(passport.initialize());
    app.use('/api', api);
    app.use(bodyParser.json());

    api.post('/register', registration);
    api.post('/login', requireLogin, login);
    api.get('/users', getUsers);
    api.get('/users', getUser);
    api.post('/user', postUser);
};

export default routes;
