// https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
// https://expressjs.com/en/starter/installing.html
// https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
// $env:DEBUG='myapp:*'; npm start

var createError = require('http-errors');
var express = require('express');
var zip = require('express-zip');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var birds = require('./birds');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(express.static('files'));
app.use('/static', express.static('public')); // create a virtual path prefix

// Basic routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/birds', birds);

// crud: reate chainable route handlers for a route path 
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
  .delete(function (req, res) {
    res.send('delete the book')
  });

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    // next() // pass control to the next handler
});

// ======================== Pattern url ========================================
// This route path will match acd and abcd
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
});

// This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', function (req, res) {
    res.send('ab+cd')
});

// This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
app.get('/ab*cd', function (req, res) {
    res.send('ab*cd')
});

// This route path will match /abe and /abcde.
app.get('/ab(cd)?e', function (req, res) {
    res.send('ab(cd)?e')
});

/*
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
*/
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params);
});

// ======================== Pattern url ========================================
app.get('/downloadfile', function(req, res) {
    res.download('files/test.pdf', 'report.pdf', function (err) {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent so check res.headersSent
            console.log("Error : ", err);
        } else {
            // decrement a download credit, etc.
            console.log("headersSent : ", res.headersSent);

            // delete after download
            // fs.unlink(filePath);
        }
    });
});

app.get('/downloadfiles', function(req, res) {
    res.zip([
        { path: 'files/test.pdf', name: 'test.pdf' },
        { path: 'files/ikea.png', name: 'ikea.png' }
      ]);
});

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