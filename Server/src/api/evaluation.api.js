const express = require("express");
const router = express.Router();
const EvaluationController = require("../controller/evaluation.controller");
const { validateToken, isStaff } = require("../auth/authorization");

module.exports = function () {
  router.post("/evaluate", [
    validateToken(),
    isStaff(),
    EvaluationController.createEvaluation,
  ]);
  return router;
};
