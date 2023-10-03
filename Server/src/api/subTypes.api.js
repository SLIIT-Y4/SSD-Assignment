const express = require("express");
const router = express.Router();
const SubTypeController = require("../controller/subTypes.controller");
const { validateToken, isAdmin, isStudent } = require("../auth/authorization");

module.exports = function () {
  router.post("/add", [
    validateToken(),
    isAdmin(),
    SubTypeController.addSubType,
  ]);
  router.get("/:id", [
    validateToken(),
    isStudent(),
    SubTypeController.getSubType,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isAdmin(),
    SubTypeController.updateSubType,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isAdmin(),
    SubTypeController.deleteSubType,
  ]);
  router.get("/", [
    validateToken(),
    isStudent(),
    SubTypeController.getAllSubTypes,
  ]);
  return router;
};
