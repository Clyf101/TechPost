const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// set up the session
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

// set up passport
app.use(passport.initialize());
app.use(passport.session());

// set up logger
app.use(logger('dev'));

// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// set up views folder and templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
