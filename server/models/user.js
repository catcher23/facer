import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
    email: {
        lowercase: true,
        required: true,
        type: String,
        unique: true,
    },
    firstName: {
        type: String
    },
    group: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        required: true,
        type: String,
    },
    title: {
        type: String
    },
    username: {
        lowercase: true,
        required: true,
        type: String,
        unique: true,
    },
});

// Pre save user, hash pw if modified or new
UserSchema.pre('save', (next) => {
    const user = this;
    const SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        return bcrypt.hash(user.password, salt, (hash, err) => {
            if (err) return next(err);
            user.password = hash;
            return next();
        });
    });
    return next();
});

UserSchema.methods.comparePassword = (pw, cb) =>
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        return cb(null, isMatch);
    });


export default mongoose.model('User', UserSchema);
