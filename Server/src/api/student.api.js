const express = require("express");
const router = express.Router();
const StudentController = require("../controller/student.controller");
const {
  validateToken,
  isStudent,
  isAdmin,
  isAdminAndStudent,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/register", StudentController.registerStudent);
  router.get("/students/:email", [
    validateToken(),
    isStudent(),
    StudentController.profileDetails,
  ]);
  router.get("/", [
    validateToken(),
    isAdmin(),
    StudentController.getAllStudents,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isAdminAndStudent(),
    StudentController.updateStudent,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isAdminAndStudent(),
    StudentController.deleteStudent,
  ]);

  return router;
};
