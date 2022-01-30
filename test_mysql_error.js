// https://www.npmjs.com/package/mysql
// https://codeforgeek.com/nodejs-mysql-tutorial/
// https://github.com/mysqljs/mysql#pool-events

const express = require("express");
const app = express();
const mysql = require('mysql');

const constring = {
    host     : 'localhost',
    user     : 'root',
    password : 'mysqladmin',
    database : 'node_mysql_crud_db'
};

function getResult(success, message, data) { 
    return { success : success, message : message, data : data };
} 

/*
const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'todolist',
    debug    :  false
});
*/
const pool = mysql.createPool(constring);

// To simulate the concurrent connection scenario, we are going to use a tool called siege.
// https://www.npmjs.com/package/siegecls

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysqladmin',
    database : 'node_mysql_crud_db'
});
  
connection.connect((err) => {
      if(err) throw err;
      console.log('Connected to MySQL Server!');
});

app.get("/",(req,res) => {
    connection.query('SELECT * from employees LIMIT 1', (err, rows) => {
        if(err) throw err;
        console.log('The data from employees table are: \n', JSON.stringify(rows));
        connection.end();
    });
});

// url
app.get("/get",(req,res) => {

    var con = mysql.createConnection(constring);

    con.connect(function(err) {

        if (err) { 
            res.send(JSON.stringify(getResult(false,err.sqlMessage, null)));
            res.end();
            return;
            // throw err; 
        }

        console.log("Connected!");
        var sql = mysql.format('INSERT INTO ?? (??,??) VALUES (?,?)', ["employees", "first_name", "last_name", "Tahmilur", "Rahman"]);
        console.log(sql);

        con.query("SELECT * from employees LIMIT 5", function (err, result) {            

            if (err) { 
                res.send(JSON.stringify(getResult(false,err.sqlMessage, null)));
                res.end();
                return;
                // throw err; 
            }

            console.log('The data from employees table are: \n', JSON.stringify(result));
            con.end();

            res.send(JSON.stringify(getResult(true,'success', result)));
        });        
    });
});

app.get("/getpool",(req,res) => {
    pool.getConnection((err, connection) => {

        if (err) { 
            res.send(JSON.stringify(getResult(false,err.sqlMessage, null)));
            res.end();
            return;
            // throw err; 
        }

        console.log('connected as id ' + connection.threadId);

        connection.query('SELECT * from employees LIMIT 2', (err, rows) => {
            connection.release(); // return the connection to pool
            if (err) { 
                res.send(JSON.stringify(getResult(false,err.sqlMessage, null)));
                res.end();
                return;
                // throw err; 
            }

            console.log('The data from employees table are: \n', rows);
            res.send(JSON.stringify(getResult(true,'success', rows)));
        });
    });
});

// query rows in the table
function queryRow(userName) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    let query = mysql.format(selectQuery,["todo","user", userName]);
    // query = SELECT * FROM `todo` where `user` = 'shahid'
    pool.query(query,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
}

// add rows in the table
function addRow(data) {

    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);

    /*
    // for multiple data insert
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let values = [["shahid","hello"],["Rohit","Hi"]]; // each array is one row
    let query = mysql.format(insertQuery,["todo","user","notes",values]);
    */   

    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
}

function updateRow(data) {
    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    let query = mysql.format(updateQuery,["todo","notes",data.value,"user",data.user]);
    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows);
    });
}

function deleteRow(userName) {
    let deleteQuery = "DELETE from ?? where ?? = ?";
    let query = mysql.format(deleteQuery, ["todo", "user", userName]);
    // query = DELETE from `todo` where `user`='shahid';
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows);
    });
}

// Calling MySQL Stored Procedure Using Node
/*
CREATE TABLE `node_mysql_crud_db`.`todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(145) NULL,
  `notes` VARCHAR(200) NULL,
  PRIMARY KEY (`id`));
*/
/*
DELIMITER $$ 
CREATE PROCEDURE `getAllTodo`()
BEGIN
    SELECT * FROM employees;
END$$ 
DELIMITER ;

setTimeout(() => {
    // call the function
    addRow({
        "user": "Shahid",
        "value": "Just adding a note"
    });
},5000);

*/
function callSP(spName) {
    let spQuery = 'CALL ??';
    let query = mysql.format(spQuery,[spName]);
    // CALL `getAllEmployees`
    pool.query(query,(err, result) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows from SP
        console.log(result);
    });
}

// end pool

// run the server
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});