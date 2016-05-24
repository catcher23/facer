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

  apiRoutes.post('/signup', (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, message: 'Please enter username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });

      newUser.save( (err) => {
        if (err) {
          return res.json({success: false, message: 'That username address already exists.'});
        }
        res.json({success: true, message: 'Successfully created new user.'});
      });
    }
  });

  apiRoutes.post('/authenticate', function(req, res) {
    User.findOne({
      username: req.body.username

    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  });
  
  const apiRoutes = express.Router();
  apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('Logged in. User id is: ' + req.user._id + '.');
  });

// Set url for API group routes
  app.use('/api', apiRoutes);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};