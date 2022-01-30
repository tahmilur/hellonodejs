/*
*   application variables
*/
const filename = 'test_pdf.js';
const hostname = '127.0.0.1';
const port = 8000;
const rootmsg = "Hello world: welcome to PDF example";

/*
*   Required modules
*/
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-hbs');
const path = require('path');
const uuid = require('uuid');

const userdata = require('./public/data/user.json');
const people = require("./public/data/people.json");
const countries = require("./node_modules/countries-list/dist/countries.json");

/*
*   initialize server
*/
const app = express();

/**
 *  view Configuration 
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/public", express.static(path.join(__dirname, 'public')));

// default options
// https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

/*
*   application
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// global route
app.all('*', function (req, res, next) {
    console.log('Welcome to global route ...');
    next() // pass control to the next handler
});

/*
*   define a root route
*/
app.get('/', (req, res) => {    
    res.render('test-pdf', { 'title': 'Welcome to pdf example', userList: userdata, 'countries': countries });
});

// Use the mv() method to place the file somewhere on your server
// https://github.com/richardgirges/express-fileupload/tree/master/example#basic-file-upload
function storeUploadFile(file, key) {

    let data = {};

    var xyz = path.join(__dirname, "public\\uploads\\" + file.name);

    data = {
        field: key,
        name: file.name,
        mimetype: file.mimetype,
        size: file.size,
        md5: file.md5,
        truncated: file.truncated
    };

    if (typeof file.mv === "function") {
        file.mv(xyz, function (err) {
            if (err) {
                // return res.status(500).send(err);
                console.log(err);
            }
        });
    }
    else {
        console.log('Not a file function mv ');
    }

    return data;
}

function handleUploadFiles(req) {

    // console.log(Object.keys(req.files));
    // https://html-to-pug.com/
    let data = [];

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files were uploaded.');
    }
    else {
        for (const key of Object.keys(req.files)) {

            var file = req.files[key];

            if (typeof file.mv === "function") {
                // console.log(JSON.stringify(storeUploadFile(file, key)));
                data.push(storeUploadFile(file, key));
            }
            else {
                for (var j = 0; j < file.length; j++) {
                    // console.log(JSON.stringify(storeUploadFile(file[j], key)));
                    data.push(storeUploadFile(file[j], key));
                }
            }
        }
    }

    return data;
}

/*
*   define a root route
*/
app.post('/register/:target', (req, res) => {

    console.log(JSON.stringify(req.params));
    console.log(JSON.stringify(req.body));
    console.log(JSON.stringify(req.query));

    if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send('No files were uploaded.');
        console.log('No files were uploaded.');
    }
    else {
        // https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties
        console.log(JSON.stringify(handleUploadFiles(req)));
    };

    res.render('test-pdf', { 'title': 'Welcome to pdf example', data: req.body, userList: userdata, 'countries': countries });
});

/*
*   login page
*/
app.get('/login', (req, res) => {
    res.render('login', { 'title': 'Login'});
});

/*
*   register page
*/
app.get('/register', (req, res) => {
    res.render('register', { 'title': 'New account'});
});

/*
*   myaccount page
*/
app.get('/account', (req, res) => {
    res.render('account', { 'title': 'My Account'});
});

/*
*   form example page
*/
app.get('/form', (req, res) => {
    res.render('form', { 'title': 'Form examples'});
});

/*
*   define about page
*/
app.get('/about', (req, res) => {
    res.send('welcome to about page');
});

/*
*   define help page
*/
app.get('/help', (req, res) => {
    res.render('test1', { 'message': 'help page' });
});

/*
*   define help page
*/
app.get('/copyright', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to nodejs example</h1>');
    res.write('<hr>');
    res.end('<h6>Copyright © 2020 Tahmilur Rahman</h6>');
});

/**
 * Run the Application
 */
app.listen(port, hostname, () => {
    console.log('Add line to script section of package.json. => "pdf": "nodemon ./' + filename + '"');
    console.log('command : npm run pdf');
    console.log('command : node ./' + filename + '');
    console.log(`Server running at http://${hostname}:${port}/`);
});