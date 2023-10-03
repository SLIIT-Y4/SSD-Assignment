const express = require("express");
const router = express.Router();
const CoSupController = require("../controller/cosup.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/request", [validateToken(), CoSupController.requestCoSup]);
  router.get("/", [validateToken(), CoSupController.getAllCoSupRequests]);
  router.put("/update/:id", [validateToken(), CoSupController.updateStatus]);
  return router;
};
