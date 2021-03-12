var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/quiz-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = Promise;

module.exports.Quiz = require("./quiz");
