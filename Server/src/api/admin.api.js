const express = require("express");
const router = express.Router();
const AdminController = require("../controller/admin.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.get("/admins/:email", [
    validateToken(),
    AdminController.profileDetails,
  ]);
  router.put("/update/:id", [validateToken(), AdminController.updateAdmin]);
  router.delete("/delete/:id", [validateToken(), AdminController.deleteAdmin]);
  return router;
};
