const path = require("path");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
var nodemailer = require('nodemailer');

/**
 * Mail function 
*/
function sendEmail(params) {
    // https://mailtrap.io/
    // https://community.nodemailer.com/
    // send email

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
};

console.log('send email using nodemailer');
sendEmail(null);