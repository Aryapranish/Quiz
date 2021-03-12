var db = require("../models");

exports.getQuestionsAll = function (req, res) {
  //   res.send("Hello from Quiz Routes");
  // find all the questions and sending them back
  db.Quiz.find()
    .then(function (questions) {
      res.json(questions);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.createQuestion = function (req, res) {
  //   res.send("POST Route");
  //   console.log(req.body);
  db.Quiz.create(req.body)
    .then(function (newQuestion) {
      res.status(201).json(newQuestion);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.updateQuestion = function (req, res) {
  db.Quiz.findOneAndUpdate({ _id: req.params.quizID }, req.body, { new: true })
    .then(function (question) {
      res.json(question);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.getQuestion = function (req, res) {
  db.Quiz.findById(req.params.quizID)
    .then(function (questionFound) {
      res.json(questionFound);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.deleteQuestion = function (req, res) {
  db.Quiz.deleteOne({ _id: req.params.quizID })
    .then(function () {
      res.json({ message: "We deleted it" });
    })
    .catch(function (err) {
      res.send(err);
    });
};
module.exports = exports;
