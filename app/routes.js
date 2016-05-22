const passport = require('passport'),
  express = require('express'),
  config = require('../config/main'),
  jwt = require('jsonwebtoken'),
  User = require('./models/user');

// Export the routes for our app to use
module.exports = function (app) {
  // API Route Section

  // Initialize passport for use
  app.use(passport.initialize());

  // Bring in defined Passport Strategy
  require('../config/passport')(passport);

  // Create API group routes
  const apiRoutes = express.Router();

  // Register new users
  apiRoutes.post('/register', function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({success: false, message: 'Please enter email and password.'});
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Attempt to save the user
      newUser.save(function (err) {
        if (err) {
          return res.json({success: false, message: 'That email address already exists.'});
        }
        res.json({success: true, message: 'Successfully created new user.'});
      });
    }
  });

  // Authenticate the user and get a JSON Web Token to include in the header of future requests.
  apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, message: 'Authentication failed. User not found.'});
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            const token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, message: 'Authentication failed. Passwords did not match.'});
          }
        });
      }
    });
  });

  // Protect dashboard route with JWT
  apiRoutes.get('/dashboard', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};