const express = require("express");
const router = express.Router();
const PanelMembersController = require("../controller/panel.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/add", [validateToken(), PanelMembersController.assignPanel]);
  router.get("/", [validateToken(), PanelMembersController.getAllPanelDetails]);
  return router;
};
