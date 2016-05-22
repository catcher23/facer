const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  config = require('./config/main'),
  User = require('./app/models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(passport.initialize());

mongoose.connect(config.database);
require('./config/passport')(passport);
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

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
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

apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('Logged in. User id is: ' + req.user._id + '.');
});

// Set url for API group routes
app.use('/api', apiRoutes);

const server = app.listen(3000, () => {
  const port = server.address().port;
  console.log("Started server at port", port);
});