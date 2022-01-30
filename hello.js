// ===============================================================
// node ./hello.js
/*
const http = require('http');
const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to nodejs example</h1>');
    res.write('<hr>');
    res.end('welcome to hello world');
});

// run the server
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`);
});

*/

// ========================nodejs with express =======================================
/**
 * Application variables
 */
const hostname = '127.0.0.1';
const port = 3000;

/**
 * Application required modules
 */
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

/**
 * Application view setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * setup folder path
 */
router.use(express.static(path.join(__dirname, 'public')))
router.use(express.static(path.join(__dirname, 'files')))
router.use(express.static(path.join(__dirname, 'uploads')))

/**
 * custom modules
 */
const square = require('./modules/square');
const circle = require('./modules/circle');

/**
 * Creating route handlers
 */
const wiki = require('./routes/wiki.js');

/**
 * directory
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Application route api
 */
app.use('/wiki', wiki);

// global route
app.all('*', function (req, res, next) {
    console.log('Welcome to hello application ...');
    next() // pass control to the next handler
});

app.all('/secret', function(req, res, next) {
    console.log('Accessing the secret section ...');
    res.write('<h1>Security check</h1>');
    res.write('<hr>');
    next(); // pass control to the next handler
});

app.get('/', (req, res) => {

    console.log('square: ' + square.area(100));
    console.log('circle: ' + circle.area(10));

    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome to nodejs example</h1>');
    res.write('<hr>');
    res.end('welcome to hello world');
});

/**
 * Run the Application
 */
app.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// ===============================================================