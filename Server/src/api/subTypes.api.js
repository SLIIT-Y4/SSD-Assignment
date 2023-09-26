const express = require("express");
const router = express.Router();
const SubTypeController = require("../controller/subTypes.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/add", [validateToken(), SubTypeController.addSubType]);
  router.get("/:id", [validateToken(), SubTypeController.getSubType]);
  router.put("/update/:id", [validateToken(), SubTypeController.updateSubType]);
  router.delete("/delete/:id", [
    validateToken(),
    SubTypeController.deleteSubType,
  ]);
  router.get("/", [validateToken(), SubTypeController.getAllSubTypes]);
  return router;
};
