var http = require('http');
var dt = require('./test_module_data');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">');
  res.write('<div style="background-color:#d5f4e6;font-size:20px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;padding:10px;border: 2px solid blue;border-radius: 5px;width:500px;height:300px;font-family: Lobster, cursive,Arial, Helvetica, sans-serif;">');
  res.write("Yesterday date and time was: " + dt.getYesterday());
  res.write('<hr>');
  res.write("Today date and time are : " + dt.getToday());
  res.write('<hr>');
  res.write("Welcome : " + dt.getHelloWorld());
  res.write('<hr>');  
  res.write(req.url);
  res.write('</div>');
  res.end();

}).listen(3000);