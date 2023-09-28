const express = require("express");
const router = express.Router();
const LoginController = require("../controller/login.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.get("/:email", LoginController.userLogin);
  router.post("/add", LoginController.add);
  router.delete("/delete/:id", [validateToken(), LoginController.deleteUser]);

  return router;
};
