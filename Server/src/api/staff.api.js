const express = require("express");
const router = express.Router();
const StaffController = require("../controller/staff.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/register", StaffController.registerStaff);
  router.get("/staffs/:email", [
    validateToken(),
    StaffController.profileDetails,
  ]);
  router.get("/", [validateToken(), StaffController.getAllStaffs]);
  router.put("/update/:id", [validateToken(), StaffController.updateStaff]);
  router.delete("/delete/:id", [validateToken(), StaffController.deleteStaff]);

  return router;
};
