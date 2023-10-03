const express = require("express");
const router = express.Router();
const UploadDocController = require("../controller/uploadDoc.controller");
const { validateToken, isStaff, isStudent } = require("../auth/authorization");

module.exports = function () {
  router.post("/", [
    validateToken(),
    isStudent(),
    UploadDocController.addUpDoc,
  ]);
  router.get("/:id", [
    validateToken(),
    isStudent(),
    UploadDocController.getUpDoc,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isStudent(),
    UploadDocController.updateUpDoc,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isStudent(),
    UploadDocController.deleteUpDoc,
  ]);
  router.get("/", [
    validateToken(),
    isStaff(),
    UploadDocController.getAllUpDocs,
  ]);
  return router;
};
