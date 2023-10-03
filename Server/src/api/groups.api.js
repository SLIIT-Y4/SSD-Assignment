const express = require("express");
const router = express.Router();
const GroupController = require("../controller/groups.controller");
const {
  validateToken,
  isStudent,
  isAdmin,
  isAdminAndStudent,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/register", [
    validateToken(),
    isStudent(),
    GroupController.registerGroup,
  ]);
  router.get("/", [
    validateToken(),
    isAdminAndStudent(),
    GroupController.getAllGroups,
  ]);
  return router;
};
