const express = require("express");
const router = express.Router();
const PanelMembersController = require("../controller/panel.controller");
const { validateToken, isAdmin } = require("../auth/authorization");

module.exports = function () {
  router.post("/add", [
    validateToken(),
    isAdmin(),
    PanelMembersController.assignPanel,
  ]);
  router.get("/", [
    validateToken(),
    isAdmin(),
    PanelMembersController.getAllPanelDetails,
  ]);
  return router;
};
