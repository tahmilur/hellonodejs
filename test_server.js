var http = require('http');

http.createServer(function (req, res) {
    console.log('This example is different!');
    console.log('The result is displayed in the Command Line Interface');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(3000);