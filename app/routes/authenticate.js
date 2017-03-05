import jwt from 'jsonwebtoken';
import config from '../../config/main';
import User from '../models/user';

const authenticate = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.send({message: 'Authentication failed. User not found.', success: false});
        } else {
            user.comparePassword(req.body.password, (pwErr, isMatch) => {
                if (isMatch && !pwErr) {
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({success: true, token: `JWT${token}`});
                } else {
                    res.send({
                        message: 'Authentication failed. Passwords did not match.',
                        success: false
                    });
                }
            });
        }
    });
};

export default authenticate;
