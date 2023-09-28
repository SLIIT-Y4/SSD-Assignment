const express = require("express");
const router = express.Router();
const StaffController = require("../controller/staff.controller");

// module.exports = function () {
//   router.post("/register", StaffController.registerStaff);
//   router.get("/staffs/:email", StaffController.profileDetails);
//   router.get("/", StaffController.getAllStaffs);
//   router.put("/update/:id", StaffController.updateStaff);
//   router.delete("/delete/:id", StaffController.deleteStaff);

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
  body('researchInterest').notEmpty().withMessage('Research Interest is required'),
  body('faculty').notEmpty().withMessage('Faculty is required'),
  body('type').notEmpty().withMessage('Type is required'),
], StaffController.registerStaff);

// Profile details
router.get("/staffs/:email", [
  param('email').isEmail().withMessage('A valid email is required')
], StaffController.profileDetails);

//get all students
router.get("/", StaffController.getAllStaffs);

// Update student
router.put("/update/:id", [
  param('id').isMongoId().withMessage('A valid ID is required'),
  // ... add more body validations if needed
], StaffController.updateStaff);

// Delete student
router.delete("/delete/:id", [
  param('id').isMongoId().withMessage('A valid ID is required')
], StaffController.deleteStaff);

  return router;
};
