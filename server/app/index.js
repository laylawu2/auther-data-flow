'use strict';

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session')
var passport = require('passport')

app.use(require('./request-state.middleware'))
app.use(require('./statics.middleware'));


app.use(session({
  secret: 'peyton' // or whatever you like
}));

app.use(passport.initialize());//add methods to req.session?
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
      .then(function (user) {
        done(null, user);
      })
      .catch(done);
});

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
//  console.log('user', req.user)
  next();
});

app.use('/auth', require('../auth'));
app.use('/api', require('../api/api.router'));


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
