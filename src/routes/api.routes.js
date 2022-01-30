// define required module
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// set all api
router.all('/', function (req, res, next) {
    console.log('welcome to api home')
    next() // pass control to the next handler
});

// GET method route
router.get('/', function (req, res) {
    console.log('welcome to get api home');

    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("X-Magda-Session: " + req.header("X-Magda-Session"));
    res.write('<hr>');
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();    
});

// POST method route
router.post('/', function (req, res) {
    console.log('welcome to post api home');
    console.log(path.join(__dirname, './../../login.html'));

    res.send('POST request to the api homepage');

    /*
    var stream = fs.createReadStream(path.join(__dirname, './../../login.html'));
    stream.on('error', function( error ) {
      res.write('<style>body{font-family: sans-serif;}</style><h2>reveal.js multiplex server.</h2><a href="/token">Generate token</a>');
      res.end();
    });
    stream.on('readable', function() {
      stream.pipe(res);
    });
    */
});

// PUT method route
router.put('/', function (req, res) {
    console.log('welcome to put api home')
    res.send('PUT request to the api homepage')
});

// DELETE method route
router.delete('/:id', function (req, res) {
    console.log('welcome to delete api home')
    // res.write('DELETE request to the api homepage');
    var json = JSON.stringify(req.params);
    res.setHeader('Content-Type', 'application/json');
    res.write(json);
    res.end();
});

// assign exports router
module.exports = router