"use strict";
const passport = require('passport'),
  express = require('express'),
  config = require('../config/main'),
  jwt = require('jsonwebtoken'),
  User = require('./models/user'),
  Chat = require('./models/chat');

// Export the routes for our app to use
module.exports = (app) => {
  app.use(passport.initialize());
  require('../config/passport')(passport);
  const apiRoutes = express.Router();

// Create User
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
  
let users = [
  {id:1, name:'dan'},
  {id:2, name:'danny'}
];

  //Get all Users
  apiRoutes.get('/users', (req, res) => {
    res.status(200).send(JSON.stringify(users))
  });

  apiRoutes.post('/authenticate', (req, res) => {
    User.findOne({
      username: req.body.username

    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.send({success: false, message: 'Authentication failed. User not found.'});
      } else {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
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

  apiRoutes.get('/chat', passport.authenticate('jwt', {session: false}), (req, res) => {
    Chat.find({$or: [{'to': req.user._id}, {'from': req.user._id}]}, (err, messages) => {
      if (err) {
        res.send(err);
      }
      res.json(messages);
    });
  });

  apiRoutes.post('/chat', passport.authenticate('jwt', {session: false}), (req, res) => {
    let chat = new Chat();
    chat.from = req.user._id;
    chat.to = req.body.to;
    chat.message_body = req.body.message_body;

    chat.save((err) => {
      if (err)
        res.send(err);

      res.json({message: 'Message sent!'});
    });
  });

  apiRoutes.put('/chat/:message_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Chat.findOne({$and : [{'_id': req.params.message_id}, {'from': req.user._id}]}, (err, message) => {
      if (err)
        res.send(err);

      message.message_body = req.body.message_body;

      message.save( (err) => {
        if (err)
          res.send(err);

        res.json({ message: 'Message edited!' });
      });
    });
  });

  apiRoutes.delete('/chat/:message_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Chat.findOneAndRemove({$and : [{'_id': req.params.message_id}, {'from': req.user._id}]}, (err) => {
      if (err)
        res.send(err);

      res.json({ message: 'Message removed!' });
    });
  });

  app.use('/api', apiRoutes);
};
