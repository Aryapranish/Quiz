var express = require("express"),
  router = express.Router(),
  db = require("../models"),
  helpers = require("../helpers/routesForResquests");

router.route("/").get(helpers.getQuestionsAll).post(helpers.createQuestion);

//retrieving a single question
router
  .route("/:quizID")
  .get(helpers.getQuestion)
  .put(helpers.updateQuestion)
  .delete(helpers.deleteQuestion);

//retrieving questions from opentdb

module.exports = router;
