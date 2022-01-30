const express = require("express");
const url = require('url');
const path = require("path");
var mysql = require('mysql');

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "3000";
 const constring = { host: "localhost", user: "root", password: "mysqladmin" };
 const dbconstring = { host: "localhost", user: "root", password: "mysqladmin", database: "testmydb" };

 /**
 * Routes Definitions
 */
app.get("/", (req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
    res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
    res.write('<hr>');  
    res.write("welcome to mysql");
    res.write('<hr>'); 
    res.write('<ol>'); 
    res.write("<li><a href='/connect'>connect mysql</a></li>");
    res.write("<li><a href='/createdb'>create database</a></li>");
    res.write("<li><a href='/createtable'>create table</a></li>");
    res.write("<li><a href='/insert'>insert</a></li>");
    res.write("<li><a href='/update'>update</a></li>");
    res.write("<li><a href='/select'>select</a></li>");    
    res.write("<li><a href='/delete'>delete</a></li>");
    res.write('</ol>'); 
    res.write('</div>');
    res.end();     
});

app.get("/connect", (req, res) => {

    var con = mysql.createConnection(constring);
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
    res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
    res.write('<hr>');  
    res.write(req.url);
    res.write('<hr>'); 
    res.write("Successfully connected with mysql!");
    res.write('</div>');
    res.end();    
});

app.get("/createdb", (req, res) => {

    var con = mysql.createConnection(constring);
      
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("CREATE DATABASE IF NOT EXISTS testmydb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });        
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
    res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
    res.write('<hr>');  
    res.write(req.url);
    res.write('<hr>'); 
    res.write("Successfully create new database!");
    res.write('</div>');
    res.end();    
});

app.get("/createtable", (req, res) => {

   var con = mysql.createConnection(dbconstring);
      
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
    res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
    res.write('<hr>');  
    res.write(req.url);
    res.write('<hr>'); 
    res.write("Successfully create new table!");
    res.write('</div>');
    res.end();    
});

app.get("/insert", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
    // insert records
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");

        // insert into 1 record
        var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
        con.query(sql, function (err, result) {
            if (err) throw err;

            /*            
                {
                    fieldCount: 0,
                    affectedRows: 14,
                    insertId: 0,
                    serverStatus: 2,
                    warningCount: 0,
                    message: '\'Records:14  Duplicated: 0  Warnings: 0',
                    protocol41: true,
                    changedRows: 0
                }
            */

            console.log("1 record inserted, ID: " + result.insertId);
        });

        // insert multiple records
        sql = "INSERT INTO customers (name, address) VALUES ?";
        var values = [
          ['John', 'Highway 71'],
          ['Peter', 'Lowstreet 4'],
          ['Amy', 'Apple st 652'],
          ['Hannah', 'Mountain 21'],
          ['Michael', 'Valley 345'],
          ['Sandy', 'Ocean blvd 2'],
          ['Betty', 'Green Grass 1'],
          ['Richard', 'Sky st 331'],
          ['Susan', 'One way 98'],
          ['Vicky', 'Yellow Garden 2'],
          ['Ben', 'Park Lane 38'],
          ['William', 'Central st 954'],
          ['Chuck', 'Main Road 989'],
          ['Viola', 'Sideway 1633']
        ];

        con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });

    });  

    // 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
    res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
    res.write('<hr>');  
    res.write(req.url);
    res.write('<hr>'); 
    res.write("Successfully insert into data!");
    res.write('</div>');
    res.end();    
 });

 app.get("/select", (req, res) => {

    var data = null;
    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "SELECT * FROM customers LIMIT 5";

         con.query("SELECT * FROM customers", function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            for (var i = 0; i < result.length; i++) {
              console.log('Name: ', result[i].name);
            }            

            data = JSON.stringify(result);
            console.log(data);
          });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write(data);
     res.write('</div>');
     res.end();    
 });

 app.get("/where", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         con.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
            if (err) throw err;
            console.log(result);
          });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write("Done");
     res.write('</div>');
     res.end();    
 });

 app.get("/orderby", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         con.query("SELECT * FROM customers ORDER BY name", function (err, result) {
            if (err) throw err;
            console.log(result);
          });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write("Done");
     res.write('</div>');
     res.end();    
 }); 

 app.get("/delete", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log("Number of records deleted: " + result.affectedRows);
         });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write("Done");
     res.write('</div>');
     res.end();    
 }); 

 app.get("/update", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(result.affectedRows + " record(s) updated");
         });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write("Done");
     res.write('</div>');
     res.end();    
 });

 app.get("/droptable", (req, res) => {

    var con = mysql.createConnection(dbconstring);
       
       con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
         var sql = "DROP TABLE customers";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log("Table deleted");
         });
     });
 
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
     res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 1px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
     res.write('<hr>'); 
     res.write("Done");
     res.write('</div>');
     res.end();    
 });  

 /**
 * Server Activation
 */
app.listen(port, () => {
    console.log(path.join(__dirname, "public"));
    console.log(`Listening to requests on http://localhost:${port}`);
});


