const express = require("express");
const router = express.Router();
const UploadDocController = require("../controller/uploadDoc.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/", [validateToken(), UploadDocController.addUpDoc]);
  router.get("/:id", [validateToken(), UploadDocController.getUpDoc]);
  router.put("/update/:id", [validateToken(), UploadDocController.updateUpDoc]);
  router.delete("/delete/:id", [
    validateToken(),
    UploadDocController.deleteUpDoc,
  ]);
  router.get("/", [validateToken(), UploadDocController.getAllUpDocs]);
  return router;
};
