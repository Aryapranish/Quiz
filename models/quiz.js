var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  type:{
    type: String,
    default: "multiple",
  },
  question: {
    type: String,
  },
  correct_answer: {
    type: String,
  },
  incorrect_answers: {
    type: Array,
  },
});

// var Quiz = mongoose.model;

var Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
