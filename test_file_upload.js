var http = require('http');
var path = require('path');
var fs = require('fs');
var mv = require('mv');
var formidable = require('formidable');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = path.join(__dirname, "public") + '\\uploads\\' + files.filetoupload.name;

            mv(oldpath, newpath, { mkdirp: true }, function (err) {
                // done. it tried fs.rename first, and then falls back to
                // piping the source file to the dest file and then unlinking
                // the source file.
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });

            /*
            var form = new formidable.IncomingForm(); 
            form.uploadDir=path.join(__dirname, "public") + '\\uploads\\';
            
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
            */
        });
        /*
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write('File uploaded');
          res.end();
        });
        */
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8000);