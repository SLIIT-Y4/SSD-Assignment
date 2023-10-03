const express = require("express");
const router = express.Router();
const AdminController = require("../controller/admin.controller");
const { validateToken, isAdmin } = require("../auth/authorization");

module.exports = function () {
  router.get("/admins/:email", [
    validateToken(),
    isAdmin(),
    AdminController.profileDetails,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isAdmin(),
    AdminController.updateAdmin,
  ]);
  router.delete("/delete/:id", [
    validateToken(),
    isAdmin(),
    AdminController.deleteAdmin,
  ]);
  return router;
};
