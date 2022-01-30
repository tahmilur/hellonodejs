'use strict';
const mysql = require('mysql');
// local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysqladmin',
  database : 'node_mysql_crud_db'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;

// use mongodb
// https://medium.com/@rahulguptalive/how-to-build-simple-restful-crud-api-with-nodejs-expressjs-and-mongodb-2d25a0e27937
// https://www.edureka.co/blog/node-js-mongodb-tutorial/