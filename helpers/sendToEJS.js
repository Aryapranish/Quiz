const fetch = require("node-fetch");

// var newData = [];
// var question = "";
let url = "https://opentdb.com/api.php?amount=10&type=multiple";
var promiseForQuiz = fetch(url)
  .then((result) => {
    return result.json();
  })
  .then((loadedQuestions) => {
    let question = loadedQuestions.results[numberQ].question;
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
    
  })
  .catch((err) => {
    return err;
  });

  module.exports = promiseForQuiz
