import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import config from './config/main';
import routes from './app/routes/index';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(passport.initialize());

mongoose.connect(config.database);

routes(app, {});

const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Started server at port', port);
});
