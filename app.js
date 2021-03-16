const express = require("express"),
  bodyParser = require("body-parser"),
  ejs = require("ejs"),
  port = 3000,
  db = require(__dirname + "/models");
const fetch = require("node-fetch");

var quizRoutes = require("./routes/quiz_route");
// quizQuestion = require("./helpers/sendToEJS");

// var question = quizQuestion.questions();

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  // console.log(quizQuestion); asdf
  res.render("home.ejs");
});

app.get("/game", function (req, res) {
  
  let url = "https://opentdb.com/api.php?amount=10&type=multiple";

  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((loadedQuestions) => {
      // let question = loadedQuestions.results[numberQ].question;
      let numberQ = Math.floor(Math.random() * 3);
      let answerArr = [...loadedQuestions.results[numberQ].incorrect_answers];
      answerArr = answerArr.concat(
        loadedQuestions.results[numberQ].correct_answer
      );

      function shuffle(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

      shuffle(answerArr);

      res.render("game", {
        questionForQuiz: loadedQuestions.results[numberQ].question,
        answerChoices: answerArr,
        correctAnswer: loadedQuestions.results[numberQ].correct_answer
      });
    })
    .catch((err) => {
      return err;
    });
});

//using the /api/quiz route and using functions in the routes folder
app.use("/api/quiz", quizRoutes);

app.listen(port, function (req, res) {
  console.log("Server started on port " + 3000);
});
