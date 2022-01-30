// http://localhost:8000/summer.html
// http://localhost:8000/winter.html
// https://www.w3schools.com/nodejs/nodejs_url.asp

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  console.log(filename);

  // parese url
  var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
  var q = url.parse(adr, true);
  
  console.log(q.host); //returns 'localhost:8080'
  console.log(q.pathname); //returns '/default.htm'
  console.log(q.search); //returns '?year=2017&month=february'
  
  var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
  console.log(JSON.stringify(qdata));
  console.log(qdata.month); //returns 'february'  
  // end

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8000);