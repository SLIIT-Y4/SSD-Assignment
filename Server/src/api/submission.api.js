const express = require("express");
const router = express.Router();
const UploadSubController = require("../controller/submission.controller");
const { validateToken, isStudent, isStaff } = require("../auth/authorization");

module.exports = function () {
  router.post("/", [
    validateToken(),
    isStudent(),
    UploadSubController.addSubDoc,
  ]);
  router.get("/:id", [
    validateToken(),
    isStaff(),
    UploadSubController.getSubDoc,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isStudent(),
    UploadSubController.updateSubDoc,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isStudent(),
    UploadSubController.deleteSubDoc,
  ]);
  router.get("/", [
    validateToken(),
    isStaff(),
    UploadSubController.getAllSubDocs,
  ]);
  return router;
};
