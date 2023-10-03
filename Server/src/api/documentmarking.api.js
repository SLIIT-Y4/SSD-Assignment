const express = require("express");
const router = express.Router();
const DocumentMarkingController = require("../controller/documentmarking.controller");
const { validateToken, isAdmin, isStaff } = require("../auth/authorization");

module.exports = function () {
  router.post("/create", [
    validateToken(),
    isAdmin(),
    DocumentMarkingController.createMarkingScheme,
  ]);
  router.get("/", [
    validateToken(),
    isStaff(),
    DocumentMarkingController.getAllMarkingSchemes,
  ]);
  router.get("/:id", [
    validateToken(),
    isStaff(),
    DocumentMarkingController.getMarkingScheme,
  ]);
  return router;
};
