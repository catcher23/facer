import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../app/models/user';
import config from './main';

const localOptions = {usernameField: 'email'};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email}, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false,
            {error: 'Your login details could not be verified. Please try again.'});
        }

        return user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false,
                {error: 'Your login details could not be verified. Please try again.'});
            }
            return done(null, user);
        });
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload._id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);

        return done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
