require('dotenv').config();

const express = require("express"),
  bodyParser = require("body-parser"),
  ejs = require("ejs"),
  port = 3000,
  encrypt = require("mongoose-encryption"),
  db = require(__dirname + "/models");
const fetch = require("node-fetch");
var mongoose = require("mongoose");

var quizRoutes = require("./routes/quiz_route");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
});

userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields: ['password']});


const User = new mongoose.model("User",userSchema);





app.get("/", function (req, res) {
  // console.log(quizQuestion); asdf
  res.render("login.ejs");
});

app.get("/home",function(req,res){
  res.render("home.ejs")
})
app.get("/login",function(req,res){
  res.render("login.ejs")
})


app.get("/register",function(req,res){
  res.render("register.ejs")
})

app.get("/game", function (req, res) {
  let url =
    "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((loadedQuestions) => {
      // let question = loadedQuestions.results[numberQ].question;
      let numberQ = Math.floor(Math.random() * 3) + 1;
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

      // console.log((loadedQuestions.results[1]));

      res.render("game", {
        questionForQuiz: loadedQuestions.results[numberQ].question,
        answerChoices: answerArr,
        correctAnswer: loadedQuestions.results[numberQ].correct_answer,
        score: 10,
      });
    })
    .catch((err) => {
      return err;
    });
});

 
app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.render("login");
    }
  })
});
app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email:username},function(err,foundUser){
    if(err){
      console.log(err);
    }
    else{
      if(foundUser){
        if(foundUser.password === password){
          res.render("home")
        }
      }
    }
  })
})


//using the /api/quiz route and using functions in the routes folder
app.use("/api/quiz", quizRoutes);

app.listen(port, function (req, res) {
  console.log("Server started on port " + 3000);
});
