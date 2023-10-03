const express = require("express");
const router = express.Router();
const GroupController = require("../controller/groups.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/register", [validateToken(), GroupController.registerGroup]);
  router.get("/", [validateToken(), GroupController.getAllGroups]);
  return router;
};
