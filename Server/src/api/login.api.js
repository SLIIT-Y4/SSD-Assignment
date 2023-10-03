const express = require("express");
const router = express.Router();
const LoginController = require("../controller/login.controller");
const { validateToken } = require("../auth/authorization");


const { body, param } = require('express-validator');


module.exports = function () {
// Registration
router.post("/add", [
  body('iD').notEmpty().withMessage('ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('password').notEmpty().withMessage('Password is required'),
], LoginController.add);

// Profile details
router.get("/:email", [
  param('email').isEmail().withMessage('A valid email is required')
], LoginController.userLogin);

//lock account
router.post("/lock", [], LoginController.lockUser);
  return router;
};
