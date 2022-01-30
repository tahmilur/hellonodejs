const http = require('http');
const formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mv = require('mv');

const server = http.createServer((req, res) => {
  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true });
 
    form.parse(req, (err, fields, files) => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
    });
 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>Full Name: <input type="text" name="fullname" /></div>
      <div>User name: <input type="text" name="username" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <hr>
      <div>File: <input type="file" name="singleFile" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
 
server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080/ ...');
});