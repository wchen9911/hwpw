var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webconfig = require('./webconfig')

console.log(webconfig.mongodb);
//mongodb
var mongodbConnectURL = 'mongodb://';
if (webconfig.mongodb.username && webconfig.mongodb.password) {
  mongodbConnectURL += webconfig.mongodb.username;
  mongodbConnectURL += ':';
  mongodbConnectURL += webconfig.mongodb.password + '@';
}
mongodbConnectURL += webconfig.mongodb.host+':';
mongodbConnectURL += webconfig.mongodb.port+'/';
mongodbConnectURL += webconfig.mongodb.database;
//mongoose
mongoose.connect(mongodbConnectURL);

//connection call back
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("mongoose connected!!");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (webconfig.httpConfig.debug) {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
} else {
  app.use(express.static(path.join(__dirname, 'frontend/bin')));
}

app.use(function(req,res,next){
    req.db = db;
    //allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
    next();
});

app.use('/alcatraz/tickets', require('./routes/alcatrazIsland'));
app.use('/locations', require('./routes/locations'));
app.use('/feedbacks', require('./routes/feedbacks'));
app.use('/nba', require('./routes/nba'));
app.use('/orders', require('./routes/orders'));
app.use('/performances', require('./routes/performances'));
app.use('/performers', require('./routes/performers'));
app.use('/promotions', require('./routes/promotions'));
app.use('/tickets', require('./routes/tickets'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
