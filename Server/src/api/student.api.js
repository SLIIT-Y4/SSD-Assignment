const express = require("express");
const router = express.Router();
const StudentController = require("../controller/student.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/register", StudentController.registerStudent);
  router.get("/students/:email", [
    validateToken(),
    StudentController.profileDetails,
  ]);
  router.get("/", [validateToken(), StudentController.getAllStudents]);
  router.put("/update/:id", [validateToken(), StudentController.updateStudent]);
  router.delete("/delete/:id", [
    validateToken(),
    StudentController.deleteStudent,
  ]);

  return router;
};
