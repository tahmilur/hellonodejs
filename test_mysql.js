// run : node ./test_mysql_db_con.js
// https://www.w3schools.com/nodejs/nodejs_mysql.asp
// https://www.npmjs.com/package/mysql#error-handling

var mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysqladmin12',
    database : 'node_mysql_crud_db'
});

con.connect(function(err) {
  if (err) {

    console.log(err.code);        // 'ECONNREFUSED'
    console.log(err.errno);       // error number
    console.log(err.fatal);       // true
    console.log(err.sql);         // full SQL of the failed query
    console.log(err.sqlState);    // five-character SQLSTATE value
    console.log(err.sqlMessage);  // description of the error

    throw err;
  }

  console.log("Connected!");

  // create database
  con.query("CREATE DATABASE mytestdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  // create table
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("customers Table created");
  });

  var sql1 = "CREATE TABLE users (id int, name VARCHAR(255), favorite_product VARCHAR(255))";
  con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("users Table created");
  });
  
  var sql2 = "CREATE TABLE products (id int, name VARCHAR(255))";
  con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("products Table created");
  });  
  
  // insert data into customers
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  // update record
  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Highway 37'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });  
  
  // select all data
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });  

  // filter data
  con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  
  // order by record
  con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
    if (err) throw err;
    console.log(result);
  });  
  
  // delete record
  var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

  // limit record
  var sql = "SELECT * FROM customers LIMIT 5";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  
  // join tables
  var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
  var lsql = "SELECT users.name AS user, products.name AS favorite FROM users LEFT JOIN products ON users.favorite_product = products.id";
  var rsql ="SELECT users.name AS user, products.name AS favorite FROM users RIGHT JOIN products ON users.favorite_product = products.id";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });  
  
  // drop table
  var sql = "DROP TABLE customers";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });  

});

con.destroy();
