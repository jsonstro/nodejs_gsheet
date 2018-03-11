// index.js

const path = require('path')
const express = require('express')
const fs = require('fs')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const importCsv = require('./import_csv');
const importGsh = require('./import_gsheet');

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'server', 'views', 'layouts')
}))

// view engine setup
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'server', 'views'))

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

require('./server/routes')(app);

app.get('/', (req, res) => {
  res.render('home', {})
})

// setup the logger
app.use(logger('dev'));
//app.use(logger('dev', {
//  skip: function (req, res) { return res.statusCode < 400 }
//}))
//app.use(logger('common', {
//  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
//}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
