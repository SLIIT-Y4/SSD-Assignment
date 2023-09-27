const express = require("express");
const router = express.Router();
const StudentController = require("../controller/student.controller");

// module.exports = function () {
//   router.post("/register", StudentController.registerStudent);
  // router.get("/students/:email", StudentController.profileDetails);
 // router.get("/", StudentController.getAllStudents);
//   router.put("/update/:id", StudentController.updateStudent);
//   router.delete("/delete/:id", StudentController.deleteStudent);

//   return router;
// };


const { body, param } = require('express-validator');


module.exports = function () {
// Registration
router.post("/register", [
  body('ID').notEmpty().withMessage('ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('contactNo').isLength({ min: 10, max: 10 }).withMessage('Contact number should be 10 digits'),
  body('NIC').notEmpty().withMessage('NIC is required'),
  body('faculty').notEmpty().withMessage('Faculty is required'),
  body('type').notEmpty().withMessage('Type is required'),
], StudentController.registerStudent);

// Profile details
router.get("/students/:email", [
  param('email').isEmail().withMessage('A valid email is required')
], StudentController.profileDetails);

//get all students
router.get("/", StudentController.getAllStudents);

// Update student
router.put("/update/:id", [
  param('id').isMongoId().withMessage('A valid ID is required'),
  // ... add more body validations if needed
], StudentController.updateStudent);

// Delete student
router.delete("/delete/:id", [
  param('id').isMongoId().withMessage('A valid ID is required')
], StudentController.deleteStudent);

  return router;
};
