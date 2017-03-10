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
    const apiRoutes = express.Router();
    passportConfig(passport);
    app.use(passport.initialize());
    app.use('/api', apiRoutes);
    app.use(bodyParser.json());

    apiRoutes.post('/register', registration);
    apiRoutes.post('/login', requireLogin, login);
    apiRoutes.get('/users', getUsers);
    apiRoutes.get('/users', getUser);
    apiRoutes.post('/user', postUser);
};

export default routes;
