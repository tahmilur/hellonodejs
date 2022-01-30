/*
https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6

API End Points: CRUD example
GET /api/v1/employees: will give all employees stored in database
GET /api/v1/employees/<employee_id>: will give a specific employee with employee_id.
POST /api/v1/employees : create a employee
PATCH /api/v1/employees/<employee_id>: update a employee partially
DELETE /api/v1/employees/<employee_id>: delete a employee
PUT /api/v1/employees/<employee_id>: update a employee completely
*/

const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require employee routes
const employeeRoutes = require('./src/routes/employee.routes')
// using as middleware
app.use('/api/v1/employees', employeeRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});