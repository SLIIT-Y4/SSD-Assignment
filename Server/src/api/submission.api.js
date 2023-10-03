const express = require("express");
const router = express.Router();
const UploadSubController = require("../controller/submission.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/", [validateToken(), UploadSubController.addSubDoc]);
  router.get("/:id", [validateToken(), UploadSubController.getSubDoc]);
  router.put("/update/:id", [
    validateToken(),
    UploadSubController.updateSubDoc,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    UploadSubController.deleteSubDoc,
  ]);
  router.get("/", [validateToken(), UploadSubController.getAllSubDocs]);
  return router;
};
