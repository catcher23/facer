import User from '../models/user';
import {setUserInfo, generateToken} from './authentication';

const register = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if (!email) return res.status(422).send({error: 'You must enter an email address.'});
    if (!name) return res.status(422).send({error: 'You must enter your full name.'});
    if (!password) return res.status(422).send({error: 'You must enter a password.'});

    return User.findOne({email}, (err, existingUser) => {
        if (err) return next(err);
        if (existingUser) return res.status(422).send({error: 'That email address is already in use.'});

        const user = new User({
            email,
            name,
            password,
        });

        return user.save((err, user) => {
            if (err) return next(err);
            const userInfo = setUserInfo(user);

            return res.status(201).json({
                token: `JWT${generateToken(userInfo)}`,
                user: userInfo
            });
        });
    });
};

export default register;
