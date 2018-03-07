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

//const index = require('./routes/index');
//const users = require('./routes/users');

const app = express()
const port = 3000

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

// view engine setup
//app.set('view engine', 'jade');
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

//app.use('/', index);
//app.use('/users', users);

require('./server/routes')(app);

app.get('/', (request, response) => {
  response.render('home', {
    //id: '12',
    //fname: 'John',
    //lname: 'Doe',
    //address: '123 Basic St.\nSanta Cruz, CA 95060',
    //fwver: '1.1.2',
    //motorsn: '23423545',
    //shipdate: '12/24/17',
    //mfgdate: '10/18/17',
    //netsuite: '12323'
  })
})

//app.post('/users', function (req, res) {
//    const user = req.body
//    fs.appendFile('users.txt', JSON.stringify({ name: user.name, age: user.age }), (err) => {
//        res.send('successfully registered')
//    })
//})

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
