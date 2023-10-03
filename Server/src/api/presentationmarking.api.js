const express = require("express");
const router = express.Router();
const PresentationMarkingController = require("../controller/presentationmarking.controller");
const { validateToken, isAdmin, isStaff } = require("../auth/authorization");

module.exports = function () {
  router.post("/create", [
    validateToken(),
    isAdmin(),
    PresentationMarkingController.createMarkingScheme,
  ]);
  router.get("/", [
    validateToken(),
    isStaff(),
    PresentationMarkingController.getAllMarkingSchemes,
  ]);
  router.get("/:id", [
    validateToken(),
    isStaff(),
    PresentationMarkingController.getMarkingScheme,
  ]);
  return router;
};
