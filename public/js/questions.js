var answerChosen = document.querySelectorAll(".choice-container");
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');
var home = document.getElementById("home");

n = localStorage.getItem('on_load_counter');
if (n === null) {
  n = 0;
}

localStorage.removeItem('on_load_counter');

scoreText.innerText = n;

//Show if answer was correct or wrong
var answer = answerChosen.forEach((item) => {
  item.addEventListener("click", (event) => {
    //handle click
    //   item.classList.toggle("reverse");
    //   console.log(item.childNodes);
    var choice = item.childNodes;
    
    if (choice[3].id === "correctAnswerChosen") {
      // scoreText.innerText = count;
      item.classList.toggle("right-reverse");
      addScore(n);
      setTimeout(location.reload.bind(location), 200);
      
    } else {
      item.classList.add("reverse");
      item.classList.add("apply-shake");

      setTimeout(function() {
        item.classList.remove("reverse");
      }, 500); // waiting one second
      
      //   console.log("Wrong");
    }
    // console.log(typeof(choice[3].id));
  });
});

function addScore(n) {
n = parseInt(n) + 10;
localStorage.setItem("on_load_counter", n);}