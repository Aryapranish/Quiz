var answerChosen = document.querySelectorAll(".choice-container");

//Show if answer was correct or wrong
var answer = answerChosen.forEach((item) => {
  item.addEventListener("click", (event) => {
    //handle click
    //   item.classList.toggle("reverse");
    //   console.log(item.childNodes);
    var choice = item.childNodes;
    if (choice[3].id === "correctAnswerChosen") {
      item.classList.toggle("right-reverse");
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
