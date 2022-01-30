const path = require("path");
const express = require('express');
const router = express.Router();

// Import the pug module
const pug = require('pug');
// Compile the template (with the data not yet inserted)
const templateCompiler = pug.compileFile('D:/hellonodejs/views/test.pug');

// static data
const userdata = require('./../public/data/user.json');
const people = require("./../public/data/people.json");
const { json } = require("body-parser");

// global route of the top of all other route definitions
// app.all('*', requireAuthentication, loadUser);
// app.all('*', requireAuthentication);
// app.all('*', loadUser);
// app.all('/api/*', requireAuthentication);

// Home page route
router.all('*', function (req, res, next) {
  console.log('Accessing the wiki router ...');
  next() // pass control to the next handler
});

// Home page route
router.get('/status', function (req, res) {

  /*
  res.set('Content-Type', 'text/html');
  res.set('Content-Type', 'text/plain');
  res.send(Buffer.from('whoop'));
  res.send({ some: 'json' });
  res.send('<p>some html</p>');
  res.status(404).send('Sorry, we cannot find that!');
  res.status(500).send({ error: 'something blew up' });
  res.send({ user: 'tobi' });
  res.send([1, 2, 3]);

  // Sets the response HTTP status code to statusCode
  res.sendStatus(200) // equivalent to res.status(200).send('OK')
  res.sendStatus(403) // equivalent to res.status(403).send('Forbidden')
  res.sendStatus(404) // equivalent to res.status(404).send('Not Found')
  res.sendStatus(500) // equivalent to res.status(500).send('Internal Server Error')
  res.sendStatus(9999) // equivalent to res.status(9999).send('9999')

  //
  res.status(403).end()
  res.status(400).send('Bad Request')
  res.status(404).sendFile('/absolute/path/to/404.png')

  */

  res.send('Wiki status page');
});

// About page route
router.get('/about', function (req, res) {
  res.send('About this wiki');
});

// About page route
router.get('/person/:user_id', function (req, res) {

  var name = 'Not available';
  var found = userdata.find(function (element) { return element._id == req.params.user_id; });

  res.send(found);
});

// http://expressjs.com/en/guide/using-template-engines.html
router.get('/', function (req, res) {

  // Insert your data into the template file
  console.log(templateCompiler({ name: 'John' }));

  var months = [
    { "abbreviation": "Jan", "name": "January" },
    { "abbreviation": "Feb", "name": "February" },
    { "abbreviation": "Mar", "name": "March" },
    { "abbreviation": "Apr", "name": "April" },
    { "abbreviation": "May", "name": "May" },
    { "abbreviation": "Jun", "name": "June" },
    { "abbreviation": "Jul", "name": "July" },
    { "abbreviation": "Aug", "name": "August" },
    { "abbreviation": "Sep", "name": "September" },
    { "abbreviation": "Oct", "name": "October" },
    { "abbreviation": "Nov", "name": "November" },
    { "abbreviation": "Dec", "name": "December" }
  ];

  var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var gallaryPhotos = [
    { "name": "Hardanger, Norway", "url": "../images/image1.jpg" },
    { "name": "Hardanger, Sweden", "url": "../images/image2.jpg" },
    { "name": "Hardanger, Canada", "url": "../images/image3.jpg" },
    { "name": "Hardanger, USA", "url": "../images/image4.jpg" },
    { "name": "Hardanger, Denmark", "url": "../images/image5.jpg" },
    { "name": "Hardanger, Russia", "url": "../images/image6.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image7.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image8.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image9.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image10.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image11.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image12.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image13.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image14.jpg" },
    { "name": "Hardanger, Norway", "url": "../images/image15.jpg" },
  ];  

  let tag = "<div>You can't escape me!</div>";

  res.render('wiki', {
    title: 'Hey', message: 'Welcome to nodejs crud example!',
    weekdays: weekdays, months: months, userList: userdata, 
    gallaryPhotos: gallaryPhotos,
    path: path.join(__dirname, "../public"),
    myTag: tag
  });
});

// The route path below will match catfish and dogfish, but not catflap, catfishhead, and so on.
router.get(/.*fish$/, function (req, res) {
  res.send('fish: ' + req.path);
});

// wiki/book
router.route('/book')
  .get(function (req, res) {
    res.send('GET: Get a random book')
  })
  .post(function (req, res) {
    res.send('POST: Add a book')
  })
  .put(function (req, res) {
    res.send('PUT: Update the book')
  })
  .delete(function (req, res) {
    res.send('DELETE: delete the book')
  });

// https://expressjs.com/en/4x/api.html#middleware-callback-function-examples
router.param('user_id', function (req, res, next, id) {
  console.log('user id: ' + id);
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'Tahmilur Rahman',
    phone: '0760884511',
    email: 'tahmilur@yahoo.com',
    password: 'test123',
    active: true
  };

  next()
});
/*

router.param('user', function (req, res, next, id) {
  // try to get the user details from the User model and attach it to the request object
  User.find(id, function (err, user) {
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
});

// A param callback will be called only once in a request-response cycle, even if the parameter is matched in multiple routes
// https://expressjs.com/en/4x/api.html#res.render

router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE')
  next()
})

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches')
  next()
})

router.get('/user/:id', function (req, res) {
  console.log('and this matches too')
  res.end()
})

*/
// end middleware

router.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId, req.params.bookId
  console.log(req.params);
  res.send(req.params);
});

router.route('/users/:user_id')
  .all(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
  .put(function (req, res, next) {
    req.user.name = req.params.name
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  });

module.exports = router;

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
// https://www.sitepoint.com/forms-file-uploads-security-node-express/
// https://dev.to/petereysermans/hosting-a-node-js-application-on-windows-with-iis-as-reverse-proxy-397b