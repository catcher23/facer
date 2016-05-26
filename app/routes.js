const passport = require('passport'),
  express = require('express'),
  config = require('../config/main'),
  jwt = require('jsonwebtoken'),
  User = require('./models/user'),
  Chat = require('./models/chat');;

// Export the routes for our app to use
module.exports = (app) => {
  // API Route Section

  app.use(passport.initialize());

  require('../config/passport')(passport);

  const apiRoutes = express.Router();

  apiRoutes.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({success: false, message: 'Please enter email and password.'});
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      newUser.save(function (err) {
        if (err) {
          return res.json({success: false, message: 'That email address already exists.'});
        }
        res.json({success: true, message: 'Successfully created new user.'});
      });
    }
  });

  apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({
      username: req.body.username

    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
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

  // GET messages for authenticated user
  apiRoutes.get('/chat', passport.authenticate('jwt', { session: false }), (req, res) => {
    Chat.find({$or : [{'to': req.user._id}, {'from': req.user._id}]}, (err, messages) => {
      if (err) {
        res.send(err);
      }
      res.json(messages);
    });
  });

// Set url for API group routes
  app.use('/api', apiRoutes);
