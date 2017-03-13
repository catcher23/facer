import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = user => jwt.sign(user, config.secret, {expiresIn: 10080});

export const setUserInfo = request => ({
    _id: request._id,
    email: request.email,
    name: request.name
});
