// index.js
// https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/
// http://www.java2s.com/Tutorials/Javascript/Node.js_Tutorial/0100__Node.js_Functions.htm
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms
// 
/**
 * Required External Modules
 */
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const { body,validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const url = require('url');
const path = require("path");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const http = require('http');
const request = require('request');
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

// custom route
const siriusRoutes = require('./src/routes/sirius.routes');
const employeeRoutes = require('./src/routes/employee.routes');
const userRoutes = require('./src/routes/user.routes');

// static data
const userdata = require('./public/data/user.json');
const people = require("./public/data/people.json");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration 
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// enable files upload
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 5 * 1024 * 1024 * 1024 //2MB max file(s) size
  }
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// directory
app.use(express.static(path.join(__dirname, "public")));

/**
 * API function 
*/
app.use('/api/v1/sirius', siriusRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/employees', employeeRoutes);

// mongoose db & Configuring the database
const dbConfig = require('./config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});


/**
 * create pdf file
 * http://programmerblog.net/generate-pdf-using-nodejs/
 * https://stackoverflow.com/questions/34632086/node-js-generate-the-pdf-by-reading-data-from-db-page-wise-and-stream-it-on
*/

function createPdf(params) {
  
  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.';

  console.log(__dirname + '/public/uploads/output.pdf');
  
  // Create a document
  const doc = new PDFDocument;
  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream(__dirname + '/public/uploads/output.pdf'));

  // draw some text
  doc.fontSize(25).text('Here is some vector graphics...', 100, 70);

  // Embed a font, set the font size, and render some text
  doc.font(__dirname + '/public/fonts/PalatinoBold.ttf') // .font('Times-Roman', 13)    
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image(__dirname + '/public/images/tom-jagger.jpg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

  // Add another page
  doc.addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  doc.save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

// some vector graphics
doc
.save()
.moveTo(100, 150)
.lineTo(100, 250)
.lineTo(200, 250)
.fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
doc
.scale(0.6)
.translate(470, 130)
.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
.fill('red', 'even-odd')
.restore();

// and some justified text wrapped into columns
doc
.text('And here is some wrapped text...', 100, 300)
.font('Times-Roman', 13)
.fillColor("blue")
.moveDown()
.text(lorem, {
  width: 412,
  align: 'justify',
  indent: 30,
  columns: 2,
  height: 300,
  ellipsis: true
});    

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc.scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore();

  // Add some text with annotations
  doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, {color: "#0000FF"})
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();
}
/**
 * read file
*/
function readfile(params) {

  fs.readFile('/etc/hosts', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });  

};

/**
 * Form data function 
 * https://www.npmjs.com/package/form-data
*/

function postData (){

  /*
  // 1.  we are constructing a form with 3 fields that contain a string, a buffer and a file stream.
  var form = new FormData();
  form.append('my_field', 'my value');
  form.append('my_buffer', new Buffer(10));
  form.append('my_file', fs.createReadStream('/foo/bar.jpg'));  

  // 2. 
  var form = new FormData(); 
  http.request('http://nodejs.org/images/logo.png', function(response) {
    form.append('my_field', 'my value');
    form.append('my_buffer', new Buffer(10));
    form.append('my_logo', response);
  });  

  // 3. 
  var form = new FormData();  // var form = new FormData({ maxDataSize: 20971520 });
  form.append('my_field', 'my value');
  form.append('my_buffer', new Buffer(10));
  form.append('my_logo', request('http://nodejs.org/images/logo.png'));
  // In order to submit this form to a web application, call submit(url, [callback]) method:
  form.submit('http://example.org/', function(err, res) {
    // res – response object (http.IncomingMessage)  //
    res.resume();
  });

  // Append data to the form
  var form = new FormData();
  form.append( 'my_string', 'my value' );
  form.append( 'my_integer', 1 );
  form.append( 'my_boolean', true );
  form.append( 'my_buffer', new Buffer(10) );
  form.append( 'my_array_as_json', JSON.stringify( ['bird','cute'] ) ) 
  
// Set filename by providing a string for options
form.append( 'my_file', fs.createReadStream('/foo/bar.jpg'), 'bar.jpg' );
 
// provide an object.
form.append( 'my_file', fs.createReadStream('/foo/bar.jpg'), {filename: 'bar.jpg', contentType: 'image/jpeg', knownLength: 19806} );

var form = new FormData();
form.append( 'my_buffer', Buffer.from([0x4a,0x42,0x20,0x52,0x6f,0x63,0x6b,0x73]) );
form.append( 'my_file', fs.readFileSync('/foo/bar.jpg') );
 
axios.post( 'https://example.com/path/to/api',
            form.getBuffer(),
            form.getHeaders()
          );

*/

}

/**
 * Mail function 
*/
function sendEmail(params) {
    // https://mailtrap.io/
    // https://community.nodemailer.com/
    // send email
    var nodemailer = require('nodemailer');
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: "e532343d545c47",
        pass: "6a406395fda972"
      }
    });
    
    var mailOptions = {
      from: '"Tahmilur Rahman" <tahmilur@yahoo.com>',
      to: 'tahmilur@gmail.com, tahmilur73@yahoo.com',
      subject: 'Nice Nodemailer test',
      text: 'Hey there, it’s our first message sent with Nodemailer ',
      html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
      list: {
        // List-Help: <mailto:admin@example.com?subject=help>
        help: 'admin@example.com?subject=help',

        // List-Unsubscribe: <http://example.com> (Comment)
        unsubscribe: [
            {
                url: 'http://example.com/unsubscribe',
                comment: 'A short note about this url'
            },
            'unsubscribe@example.com'
        ],

        // List-ID: "comment" <example.com>
        id: {
            url: 'mylist.example.com',
            comment: 'my new list'
        }
      },      
      attachments: [
        {
          filename: 'mailtrap.png',
          path: __dirname + '/public/images/tom-jagger.jpg',
          cid: 'uniq-mailtrap.png' 
        },
        {  
          filename: 'text.txt',
          content: 'Test data'
        },
        {
          filename: 'image.png',
          content: Buffer.from(
              'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                  '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                  'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
              'base64'
          )
        },
        {   // utf-8 string as an attachment
          filename: 'text1.txt',
          content: 'hello world!'
        },
        {   // binary buffer as an attachment
            filename: 'text2.txt',
            content: Buffer.from('hello world','utf-8')
        },
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: __dirname + '/readme.txt' // stream this file
        },
        {   // filename and content type is derived from path
            path:  __dirname + '/readme.txt'
        },
        {   // stream as an attachment
            filename: 'text4.txt',
            content: fs.createReadStream(__dirname + '/readme.txt')
        },
        {   // define custom content type for the attachment
            filename: 'text.bin',
            content: 'hello world!',
            contentType: 'text/plain'
        },
        {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        },
        {   // encoded string as an attachment
            filename: 'text1.txt',
            content: 'aGVsbG8gd29ybGQh',
            encoding: 'base64'
        },
        {   // data uri as an attachment
            path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        },
        {
            // use pregenerated MIME node
            raw: 'Content-Type: text/plain\r\n' +
                'Content-Disposition: attachment;\r\n' +
                '\r\n' +
                'Hello world!'
        }                       
      ]
    };
    
    transport.verify(function(error, success) {
      if (error) {
           console.log(error);
      } else {
           console.log('Server is ready to take our messages');
      }
   });

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });   
}

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    // res.status(200).send("WHATABYTE: Food For Devs");
    // send email -- working
    // sendEmail(null);
    res.render("index", { title: "Home", userList: userdata });
});

// sendFile will go here
app.get('/login1', function(req, res) {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/map', function(req, res) {
  res.sendFile(path.join(__dirname, '/map.html'));
});

function saveUploadFile(avatar, key, isArray) { // req,key

  // let avatar = req.files[key];
  let result = { key: key, success : false, message : 'error', isArray: isArray };

  console.log(avatar);

  if (typeof avatar.mv === 'function') {

    result = { 
      key: key,
      success: true,
      message: 'File uploded successfully', 
      name: avatar.name,
      size: avatar.size, 
      mimetype: avatar.mimetype,
      md5: avatar.md5,
      truncated: avatar.truncated,
      isArray: isArray
    };

    avatar.mv('./public/uploads/' + avatar.name, function(err) {
      if (err) {
        result.success = false;
        result.message = 'error';      
      }
      else{
        result.success = false;
        result.message = 'File uploded successfully'; 
      }
    });
  };

  return result;
}

app.post('/uploadfile', function(req, res) {
 
  /*
    // http://myhost.com/items/23
    var express = require('express');
    var app = express();
    app.get("items/:id", function(req, res) {
        var id = req.params.id;
        //further operations to perform
    });
    app.listen(3000);  
  
    // http://myhost.com/items?id=23
    var express = require('express');
    var app = express();
    app.get("/items", function(req, res) {
        var id = req.query.id;
        //further operations to perform
    });
    app.listen(3000);

    // 
    const express= require('express');
    const app = express();

    app.get('/post', (req, res, next) => {
      res.send('ID:' + req.query.id + ' Edit:'+ req.query.edit);
    });

    app.listen(1000);

    // localhost:1000/post?id=123&edit=true
    // output: ID: 123 Edit: true  
    
    const courses = [{
        id: 1,
        name: 'Mathematics'
    },
    {
        id: 2,
        name: 'History'
    }
    ];

    // 
    app.get('/api/posts/:id',(req,res)=>{
        const course = courses.find(o=>o.id == (req.params.id))
        res.send(course);
    });  
    
    // ?id=1
    app.get('/api/posts',(req,res)=>{
        const course = courses.find(o=>o.id == (req.query.id))
        res.send(course);
    });    

  */

  // get data from form post
  console.log('Body- ' + JSON.stringify(req.body));

  // get data from url
  console.log('Url- ' + JSON.stringify(req.query));
  console.log('Url- id: ' + req.query.id);

  let data = []; 

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log(Object.keys(req.files));

  Object.keys(req.files).forEach(key => {

    let avatar = req.files[key];
    // console.log(key, req.files[key]);

    if(Array.isArray(avatar)){
      for(var i = 0; i < avatar.length; i++){
        data.push(saveUploadFile(avatar[i], key, true));
      }
    }
    else{
      data.push(saveUploadFile(avatar, key, false));
    }
  });  
  
  res.send({
    status: true,
    message: 'Files are uploaded',
    data: data
  });
});

app.get("/pdf", (req, res) => {
  createPdf(null);

  res.write('<h1>Saved pdf file in upload folder</h1>');
  res.write('<hr>');
  res.end('<a href='+'/'+'>Home</a>');

  /*
  var filePath = "/public/uploads/output.pdf";
  var file = path.join(__dirname, filePath);

  res.download(file, function (err) {
      if (err) {
          console.log("Error");
          console.log(err);
      } else {
          console.log("Success");
      }
  });
  */
});

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "Tahmilur" } });
});

app.get("/person/:id", async(req, res) => {

  // https://blog.logrocket.com/getting-started-with-pug/
  // http://zetcode.com/javascript/axios/

  var name = 'Not available';
  for (i = 0; i < userdata.length; i++) {   
    if(userdata[i]._id == req.params.id) {
      name = userdata[i];
      break;
    }
  }

  var baseurl = req.protocol + '://' + req.get('host') + '/';
  let empRes = await axios.get(baseurl + "api/v1/employees");
  // let data = empRes.data;
  console.log(empRes.data);

  res.render("detail", { 
      title: "Profile", 
      baseurl:  baseurl, 
      userProfile: name, 
      employeeList: empRes.data,
      people: people.profiles
    });
  // res.status(200).send("WHATABYTE: Food For Devs: " + name + '__' + req.params.id);
});

app.get("/sync", async (req, res) => {
  const query = await axios.get("https://randomuser.me/api/?results=9");
  res.render("index", { users: query.data.results });
});

app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});

app.get('/login',(req,res) => {
  sess = req.session;
  sess.username = 'tahmilur';
  sess.email = 'tahmilur@yahoo.com';
  res.write('<h1>Done</h1>');
  res.write('<hr>');
  res.end('<a href='+'/admin'+'>Admin</a>');
});

app.get('/admin',(req,res) => {
  sess = req.session;
  if(sess.email) {
      res.write(`<h1>Hello ${sess.email} </h1><br>`);
      res.end('<a href='+'/logout'+'>Logout</a>');
  }
  else {
      res.write('<h1>Please login first.</h1>');
      res.end('<a href='+'/login'+'>Login</a>');
  }
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(path.join(__dirname, "public"));
    console.log(`Listening to requests on http://localhost:${port}`);
});