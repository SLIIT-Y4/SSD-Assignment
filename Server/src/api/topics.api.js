const express = require("express");
const router = express.Router();
const TopicController = require("../controller/topics.controller");
const {
  validateToken,
  isStudent,
  isStaff,
  isStaffAndStudent,
} = require("../auth/authorization");

module.exports = function () {
  router.post("/add", isStudent(), [
    validateToken(),
    TopicController.registerTopic,
  ]);
  router.get("/", [
    validateToken(),
    isStaffAndStudent(),
    TopicController.getAllTopics,
  ]);
  router.put("/update/:id", [
    validateToken(),
    isStaff(),
    TopicController.updateStatus,
  ]);
  return router;
};
