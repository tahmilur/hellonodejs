// https://bezkoder.com/node-js-express-file-upload/

const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors(corsOptions));

const initRoutes = require("./src/routes/upload.routes.js");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8000;

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});