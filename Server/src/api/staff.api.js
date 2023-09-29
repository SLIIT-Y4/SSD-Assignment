const express = require("express");
const router = express.Router();
const StaffController = require("../controller/staff.controller");
const {
  validateToken,
  isStaff,
  isAdmin,
  isAdminAndStaff,
  isAdminAndStudent,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/register", StaffController.registerStaff);
  router.get("/staffs/:email", [
    validateToken(),
    isStaff(),
    StaffController.profileDetails,
  ]);
  router.get("/", [
    validateToken(),
    isAdminAndStudent(),
    StaffController.getAllStaffs,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isAdminAndStaff(),
    StaffController.updateStaff,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isAdminAndStaff(),
    StaffController.deleteStaff,
  ]);

  return router;
};
