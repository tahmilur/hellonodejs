var http = require('http');
var fs = require('fs');
var port = 8000;

function appendFile() {
    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function writeFile() {
    fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}

function deleteFile(params) {
    fs.unlink('mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
}

function renameFile(params) {
    fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });
}

function emptyFile() {
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function writeFile(params) {
    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// run the server
http.createServer(function (req, res) {

    console.log(`Server is listening on port ${port}`);
    
    fs.readFile('demofile1.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(port);