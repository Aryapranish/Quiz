var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  incorrect_answers: {
    type: Array,
  },
  points: {
    type: Number,
    default: 10,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// var Quiz = mongoose.model;

var Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
