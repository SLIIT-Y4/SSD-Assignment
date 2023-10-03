const express = require("express");
const router = express.Router();
const EvaluationController = require("../controller/evaluation.controller");
const { validateToken } = require("../auth/authorization");

module.exports = function () {
  router.post("/evaluate", [
    validateToken(),
    EvaluationController.createEvaluation,
  ]);
  return router;
};
