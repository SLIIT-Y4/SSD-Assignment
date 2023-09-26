const express = require("express");
const router = express.Router();
const DocumentMarkingController = require("../controller/documentmarking.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/create", [
    validateToken(),
    DocumentMarkingController.createMarkingScheme,
  ]);
  router.get("/", [
    validateToken(),
    DocumentMarkingController.getAllMarkingSchemes,
  ]);
  router.get("/:id", [
    validateToken(),
    DocumentMarkingController.getMarkingScheme,
  ]);
  return router;
};
