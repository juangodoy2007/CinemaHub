var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var methodOverride = require('method-override');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var peliculasRouter = require('./routes/movieRouter')
var salasRouter = require('./routes/salasRouter')
var funcionesRouter = require('./routes/funcionesRouter')
var clientesRouter = require('./routes/clientesRouter')
var ventasRouter = require('./routes/ventasRouter')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/peliculas', peliculasRouter);
app.use('/salas', salasRouter);
app.use('/funciones', funcionesRouter);
app.use('/clientes', clientesRouter);
app.use('/ventas', ventasRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
