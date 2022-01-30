// https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
// https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
// https://medium.com/swlh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-e59595091640
// https://www.edureka.co/blog/rest-api-with-node-js/
// https://time2hack.com/creating-rest-api-in-node-js-with-express-and-mysql/

var express = require('express');
var app = express();
var fs = require("fs");

const port = process.env.PORT || "3000";

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 };

app.get('/', (req, res) => {
    res.send("Hello World ! Welcome to REST API test");
});

// rest url
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

// add user
app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 });

 // get user by id
 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 });


 // delete user by id
 var id = 2;

app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
});


// run the server
var server = app.listen(port, function () {
   console.log(`Listening to requests on http://localhost:${port}`);
})