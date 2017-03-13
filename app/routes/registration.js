import User from '../models';

const register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({message: 'Please enter email and password.', success: false});
    } else {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        newUser.save((err) => {
            if (err) {
                return res.json({message: 'That email address already exists.', success: false});
            }
            return res.json({message: 'Successfully created new user.', success: true});
        });
    }
};

export default register;
