// node ./test_sqlite.js
// https://www.sqlitetutorial.net/sqlite-nodejs/query/
// 
const sqlite3 = require('sqlite3').verbose();

function dbSum(a, b, db) {
    db.get('SELECT (? + ?) sum', [a, b], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`The sum of ${a} and ${b} is ${row.sum}`);
    });
};

function connectDatabase(filename) {
    // open database in memory
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the in-memory SQlite database.');
    });

    // serialize example
    db.serialize(() => {
        // Queries scheduled here will be serialized.
        db.run('CREATE TABLE greetings(message text)')
            .run(`INSERT INTO greetings(message)
                VALUES('Hi'),
                      ('Hello'),
                      ('Welcome')`)
            .each(`SELECT message FROM greetings`, (err, row) => {
                if (err) {
                    throw err;
                }
                console.log(row.message);
            });
    });

    // parallelize example
    db.parallelize(() => {
        dbSum(1, 1, db);
        dbSum(2, 2, db);
        dbSum(3, 3, db);
        dbSum(4, 4, db);
        dbSum(5, 5, db);
    });

    // close the database connection
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

function connectDatabase1(filename) {

    // open the database
    let db = new sqlite3.Database('./db/chinook.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the chinook database.');
    });

    // select all 
    db.serialize(() => {
        db.each(`SELECT PlaylistId, name as name FROM playlists`, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row.PlaylistId + "\t" + row.name);
        });
    });

    
    // get distinct records
    let sql = `SELECT DISTINCT name name FROM playlists ORDER BY name`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.name);
        });
    });

    // get a single record
    sql = `SELECT PlaylistId, Name name FROM playlists WHERE PlaylistId  = ?`;
    let playlistId = 1;

    // first row only
    db.get(sql, [playlistId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        return row
            ? console.log(row.PlaylistId, row.name)
            : console.log(`No playlist found with the id ${playlistId}`);
    });

    // filter by country
    sql = `SELECT FirstName firstName, LastName lastName, Email email FROM customers WHERE Country = ? ORDER BY FirstName`;

    db.each(sql, ['USA'], (err, row) => {
        if (err) {
            throw err;
        }
        console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
    });

    /*
    // insert one row into the langs table
    db.run(`INSERT INTO langs(name) VALUES(?)`, ['C1'], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // insert multiple rows into the langs table
    let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
    let placeholders = languages.map((language) => '(?)').join(',');
    sql = 'INSERT INTO langs(name) VALUES ' + placeholders;
    console.log(sql);

    db.run(sql, languages, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
    });

    // update rows
    let data = ['Ansi C', 'C'];
    sql = `UPDATE langs  SET name = ? WHERE name = ?`;

    db.run(sql, data, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });

    // delete row
    let id = 1;
    // delete a row based on id
    db.run(`DELETE FROM langs WHERE rowid=?`, id, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });

    // Controlling the Execution Flow of Statements
    // The serialize() method allows you to execute statements in serialized mode
    //
    //    The serialize() method puts the execution mode into serialized mode. It means that only one statement can execute at a time. 
    //    Other statements will wait in a queue until all the previous statements are executed.   
    //    1. Create a new table.
    //    2. Insert data into the table.
    //    3. Query data from the table.        
    //
    db.serialize(() => {
        // Queries scheduled here will be serialized.
        db.run('CREATE TABLE greetings(message text)')
            .run(`INSERT INTO greetings(message) VALUES('Hi'), ('Hello'), ('Welcome')`)
            .each(`SELECT message FROM greetings`, (err, row) => {
                if (err) {
                    throw err;
                }
                console.log(row.message);
            })
            .run('drop table greetings');
    });

    // Controlling the Execution Flow of Statements
    // while the parallelize() method executes the statements in parallel. 
    db.parallelize(() => {
        dbSum(1, 1, db);
        dbSum(2, 2, db);
        dbSum(3, 3, db);
        dbSum(4, 4, db);
        dbSum(5, 5, db);
    });

    */

    // close connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

console.log('Example of SQlite database.');
connectDatabase1(null);

