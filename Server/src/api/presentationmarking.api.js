const express = require("express");
const router = express.Router();
const PresentationMarkingController = require("../controller/presentationmarking.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/create", [
    validateToken(),
    PresentationMarkingController.createMarkingScheme,
  ]);
  router.get("/", [
    validateToken(),
    PresentationMarkingController.getAllMarkingSchemes,
  ]);
  router.get("/:id", [
    validateToken(),
    PresentationMarkingController.getMarkingScheme,
  ]);
  return router;
};
