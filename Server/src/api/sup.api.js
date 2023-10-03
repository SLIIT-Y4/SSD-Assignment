const express = require("express");
const router = express.Router();
const SupController = require("../controller/sup.controller");
const {
  validateToken,
  isStudent,
  isStaffAndStudent,
  isStaff,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/request", isStudent(), [
    validateToken(),
    SupController.requestSup,
  ]);
  router.get("/", [
    validateToken(),
    isStaffAndStudent(),
    SupController.getAllSupRequests,
  ]);
  router.put("/update/:id", isStaff(), [
    validateToken(),
    SupController.updateStatus,
  ]);
  return router;
};
