const express = require("express");
const router = express.Router();
const CoSupController = require("../controller/cosup.controller");
const {
  validateToken,
  isStudent,
  isStaff,
  isStaffAndStudent,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/request", [
    validateToken(),
    isStudent(),
    CoSupController.requestCoSup,
  ]);
  router.get("/", [
    validateToken(),
    isStaffAndStudent(),
    CoSupController.getAllCoSupRequests,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isStaff(),
    CoSupController.updateStatus,
  ]);
  return router;
};
