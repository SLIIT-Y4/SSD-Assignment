const express = require("express");
const router = express.Router();
const TopicController = require("../controller/topics.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/add", [validateToken(), TopicController.registerTopic]);
  router.get("/", [validateToken(), TopicController.getAllTopics]);
  router.put("/update/:id", [validateToken(), TopicController.updateStatus]);
  return router;
};
