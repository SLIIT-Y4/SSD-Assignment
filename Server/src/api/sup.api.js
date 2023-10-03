const express = require("express");
const router = express.Router();
const SupController = require("../controller/sup.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/request", [validateToken(), SupController.requestSup]);
  router.get("/", [validateToken(), SupController.getAllSupRequests]);
  router.put("/update/:id", [validateToken(), SupController.updateStatus]);
  return router;
};
