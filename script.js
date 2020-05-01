var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "alerts", "booleans", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if/else statement is enclosed within ___",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in Javascript can be used to store ___",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    }, 
    {
      title: "String values must be enclosed within ___ when being assigned to variables",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    }, 
    {
      title: "A very useful tool used during development and debugging for printing conent to the debugger is?",
      choices: ["console.log", "for loops", "terminal/bash", "javascript"],
      answer: "console.log"
    }, 
    
  ];

  var choicesContent = document.querySelector("#choices-menu");
  var startMenu = document.getElementById('start-menu');
  var questionHeading = document.getElementById('heading1');
  var gameClock = document.getElementById('game-clock');
  var enterInitialsMenu = document.getElementById('enter-initials-menu');
  var enterInitialsBtn = document.getElementById('submit-intials-btn');
  var scoresMenu = document.getElementById('scores-menu');
  var backToStartLink = document.getElementById('back-to-start-link');
  var viewHighScoresLink = document.getElementById('high-scores-link');
  var questionNumber = 0;
  var numberOfQuestions = questions.length;
  var questionChoices = questions[questionNumber].choices;
  var gameTimer = numberOfQuestions * 15;
  var finalScore;
  var highScores = [];
  renderHighScores()
  function renderHighScores() {
      var savedHighScores = localStorage.getItem("high scores");
      
      if (savedHighScores === null) {
          return;
      }
      var objectScores = JSON.parse(savedHighScores);
      highScores = objectScores;           
  }

  function startQuiz() {
      startMenu.setAttribute("style", "display: none;");
      scoresMenu.setAttribute("style", "display: none;");
      choicesContent.setAttribute("style", "display: block");
      enterInitialsMenu.setAttribute("style", "display: none;");
      choicesContent.innerHTML = " ";
      viewHighScoresLink.setAttribute("style", "display: none;");
      countdownClock();
      questionHeading.textContent = questions[questionNumber].title;
      listChoices();
  }

  function listChoices() {
      for (var i = 0; i < questionChoices.length; i++) {
          var choiceBtn = document.createElement("button");
          choiceBtn.setAttribute("class", "btn btn-dark btn-sm d-block my-2 choice-btn");
          choiceBtn.setAttribute("id", "choice-" + i );
          choiceBtn.textContent = questions[questionNumber].choices[i];
          choicesContent.appendChild(choiceBtn);
      }
  }

  function correctAnswer() {
      var correctNotify = document.createElement("div");
      correctNotify.setAttribute("class", "border-top mt-3 pt-3")
      correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
      correctNotify.textContent = "You got the answer right!";
      choicesContent.appendChild(correctNotify);
  }

  function incorrectAnswer() {
      var incorrectNotify = document.createElement("div");
      incorrectNotify.setAttribute("class", "border-top mt-3 pt-3");incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
      incorrectNotify.textContent = "You got the answer wrong!";
      choicesContent.appendChild(incorrectNotify);
  }

  function countdownClock() {
      var timerInterval = setInterval(function() {
          gameClock.textContent = gameTimer;
          gameTimer--;
          if (gameTimer <= 0) {
              clearInterval(timerInterval);
              gameClock.textContent = "0";
              choicesContent.innerHTML = " ";
              questionNumber = 0;
              choicesContent.setAttribute("display", "none");
              startMenu.setAttribute("style", "display: block;");
              questionHeading.textContent = "Your score is: " +  gameTimer;
              gameTimer = numberOfQuestions * 15;
          } 
          else if (questionNumber === 10) {
              clearInterval(timerInterval);
              questionNumber = 0;
              gameTimer = numberOfQuestions * 15;
          }

      }, 1000);
  } 

  document.addEventListener("click", function(event) {
      if (event.target.matches('.choice-btn')) {
          event.stopPropagation();
          event.preventDefault();
          if (event.target.textContent === questions[questionNumber].answer) {
              questionNumber = questionNumber + 1;
              gameTimer += 5;
              if (questionNumber <= (numberOfQuestions - 1)) {
                  questionHeading.textContent = questions[questionNumber].title;
                  choicesContent.innerHTML = " ";
                  listChoices();
                  correctAnswer();
              } else {
                  choicesContent.innerHTML = " ";
                  correctAnswer();
                  enterInitialsMenu.setAttribute("style", "display: block;");
                  startMenu.setAttribute("style", "display: block;");
                  viewHighScoresLink.setAttribute("style", "display: inline;");
                  questionHeading.textContent = "Your score is: " +  gameTimer;
                  finalScore = gameTimer;
              }                   
          } 
          else if (event.target.textContent !== questions[questionNumber].answer) {
              questionNumber = questionNumber + 1;
              gameTimer -= 15;
              if (questionNumber <= (numberOfQuestions - 1)) {
                  questionHeading.textContent = questions[questionNumber].title;
                  choicesContent.innerHTML = " ";
                  listChoices();
                  incorrectAnswer();
              } else {
                  choicesContent.innerHTML = " ";
                  incorrectAnswer();
                  enterInitialsMenu.setAttribute("style", "display: block;");
                  startMenu.setAttribute("style", "display: block;");
                  viewHighScoresLink.setAttribute("style", "display: inline;");
                  questionHeading.textContent = "Your score is: " +  gameTimer;
                  finalScore = gameTimer;
              }                   
          }
      }
  });

  function enterInitials(event) {
      event.preventDefault();
      var userInitials = document.getElementById('initials-input').value;
      var userScores = {
          initials: userInitials,
          score: finalScore
      };

      highScores.push(userScores);
      var highScoresString = JSON.stringify(highScores);
      window.localStorage.setItem("high scores", highScoresString);
      questionHeading.textContent = "You have entered your score. Play again?";
      enterInitialsMenu.setAttribute("style", "display: none;");
      choicesContent.innerHTML = " ";
  }

  function goBackToStart() {
      backToStartLink.setAttribute("style", "display: none;")
      viewHighScoresLink.setAttribute("style", "display: inline;")
      startMenu.setAttribute("style", "display: block;");
      scoresMenu.setAttribute("style", "display: none;");
      choicesContent.setAttribute("style", "display: none");
      enterInitialsMenu.setAttribute("style", "display: none;");
      questionHeading.textContent = "Coding Quiz Challenge";
  }

  enterInitialsBtn.addEventListener("click", enterInitials);
  function viewHighScores() {
      scoresMenu.innerHTML = " ";
      startMenu.setAttribute("style", "display: none;");
      scoresMenu.setAttribute("style", "display: block;");
      choicesContent.setAttribute("style", "display: none");
      enterInitialsMenu.setAttribute("style", "display: none;");
      questionHeading.textContent = "View High Scores";
      backToStartLink.setAttribute("style", "display: inline;");
      viewHighScoresLink.setAttribute("style", "display: none;");
      var highScoreList = window.localStorage.getItem("high scores");            
      var highScoreObject = JSON.parse(highScoreList);
      highScoreObject.sort(highestToLowest);
      for (var i=0;i <= highScores.length - 1;i++){
          var highScoreEntry = document.createElement("div");
          highScoreEntry.setAttribute("class", "alert alert-warning");
          highScoreEntry.innerHTML = "<span style='font-weight: bold;''>" +  highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
          scoresMenu.appendChild(highScoreEntry);
      }
  }

function highestToLowest(x,y) {
  var scoreX = x.score;
  var scoreY = y.score;

  var comparison = 0;
  if (scoreX > scoreY) {
      comparison = 1;
  } else if (scoreX < scoreY) {
      comparison = -1;
  }
  return comparison * -1;
}  

