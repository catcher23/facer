import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    password: {
        required: true,
        type: String,
    },
    username: {
        lowercase: true,
        required: true,
        type: String,
        unique: true,
    },
});

// Saves the user's hashed password
UserSchema.pre('save', (next) => {
    const tracker = this;
    if (this.isModified('password') || this.isNew) {
        return bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            return bcrypt.hash(tracker.password, salt, (hash) => {
                if (err) return next(err);
                tracker.password = hash;
                return next();
            });
        });
    }
    return next();
});

UserSchema.methods.comparePassword = (pw, cb) =>
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        return cb(null, isMatch);
    });


export default mongoose.model('User', UserSchema);
