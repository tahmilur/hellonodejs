/*
    API End Points: 

    GET /api/v1/employees: will give all employees stored in database
    GET /api/v1/employees/<employee_id>: will give a specific employee with employee_id.
    POST /api/v1/employees : create a employee
    PATCH /api/v1/employees/<employee_id>: update a employee partially
    DELETE /api/v1/employees/<employee_id>: delete a employee
    PUT /api/v1/employees/<employee_id>: update a employee completely
*/
const express = require('express')
const router = express.Router()
const employeeController =   require('../controllers/employee.controller');

// Retrieve all employees
router.get('/', employeeController.findAll);
// Create a new employee
router.post('/', employeeController.create);
// Retrieve a single employee with id
router.get('/:id', employeeController.findById);
// Update a employee with id
router.put('/:id', employeeController.update);
// Delete a employee with id
router.delete('/:id', employeeController.delete);

// exports routers
module.exports = router