const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  config = require('./config/main');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('static'));

mongoose.connect(config.database);

const server = app.listen(3000, () => {
  const port = server.address().port;
  console.log("Started server at port", port);
});