// https://colorlib.com/wp/npm-packages-node-js/
// https://www.edureka.co/blog/node-js-npm-tutorial/
// https://www.edureka.co/blog/rest-api-with-node-js/
// https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
// https://medium.com/@rahulguptalive/how-to-build-simple-restful-crud-api-with-nodejs-expressjs-and-mongodb-2d25a0e27937
// https://dev.to/petereysermans/hosting-a-node-js-application-on-windows-with-iis-as-reverse-proxy-397b
// https://www.datree.io/resources/node-js-frameworks-packages
//
// dummy data generator
https://mockaroo.com/

// The code formatting is available in Visual Studio Code through the following shortcuts:

On Windows  : Shift + Alt + F
On Mac      : Shift + Option + F
On Linux    : Ctrl + Shift + I

https://cloudinary.com/
Cloud name: tahmilur
API Key: 752646436438946
API Secret:	6BZzjT2DNTh1RuVrY7-mcc5sSgI
API Environment variable:	CLOUDINARY_URL=cloudinary://752646436438946:6BZzjT2DNTh1RuVrY7-mcc5sSgI@tahmilur
// --------------------------------Useful packages-----------------------------------------------

run application:

"start": "node ./bin/www", -- node index.js
"start": "nodemon index"   --npm start

node -v
npm -v
npm init
npm install express --save
npm install express-validator
npm install body-parser --save
npm install mysql --save
npm install mongodb --save
npm install pug --save
npm install --save-dev nodemon
npm install cloudinary
npm i async
npm install socket.io
npm install passport
npm install restify
npm install nodemon -g

npm install --save express express-session body-parser
npm install --save express pdfkit cloudinary body-parser
// -------------------------------------------------------------------------------------------

npm install -g express express-fileupload express-session express-validator express-zip 
npm install -g axios body-parser cookie-parser form-data formidable 
npm install -g request mv node-fetch nodemailer pdfkit 
npm install -g mysql sqlite3 mongoose mongodb redis 

// Step to do
// https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/#Create-More-Views-with-Pug-and-Express
// https://blog.bitsrc.io/how-to-build-a-node-application-using-a-pug-template-7319ab1bba69

mkdir newProject
cd newProject

npm init
npm install nodejs express
npm install nodemon
npm install pug

// filename: app.js
const express = require('express');
const app = express();
app.listen(3000, () => console.log(“Listening on port 3000”));

// filename:  package.json
scripts{
    "app" : "nodemon app.js"
}


// run the server
npm run app

// filename:  package.json
scripts{
    "start" : "nodemon app.js"
}

// run the server : omit <run> command in the command
npm start

// views folder : index.pug
Doctype html
  html
     head
        meta charset UTF-8
        title Exploring the Pug template
     body
        h1#myHeading This is a pug template
        p.firstParagraph I love this template!!!

// update filename: app.js
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './src.views');
app.get('/', (req,res) => {
    res.render(index);
})
app.listen(3000, () => console.log(“Listening on port 3000”));
