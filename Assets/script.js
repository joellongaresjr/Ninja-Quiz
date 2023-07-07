var startButton = document.getElementById('start');
var timerDisplay = document.getElementById('time');
var questionDisplay = document.getElementById('question');
var optionsDisplay = document.getElementById('options');
var endScreen = document.getElementById('end-screen');
var scoreDisplay = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var saveButton = document.getElementById('save');

var timer;
var time = 60;
var questionIndex = 0;
var score = 0;
var highScores = [];

var questions = [
    {
        question: 'What does Naruto like to eat?',
        options: ['Ramen', 'Sushi', 'Bento Boxes', 'Salads'],
        answer: 'Ramen',
    },
    {
        question: 'How many hidden villages exist in Naruto?',
        options: ['3', '2', '5', '4'],
        answer: '5',        
    },
    {
        question: 'How many tails does Kurama have?',
        options: ['8', '9', '6', '1'],
        answer: '9',
    },
    {
        question: 'Who gave Kakashi his Sharingan?',
        options: ['Shisui', 'Sasuke', 'Itachi', 'Obito'],
        answer: 'Obito',
    },
    {
        question: 'Why am I being quizzed on Anime?',
        options: ['because the person who wrote this code likes Naruto', 'because sensi said so', 'because anime is for losers', 'Attack on Titan is better'],
        answer: 'because the person who wrote this code likes Naruto', 
    }
];
 
startButton.addEventListener('click', startGame);
saveButton.addEventListener('click', saveGame);

function startGame() {

    timer = setInterval(countdownTimer, 1000);

    displayQuestions();

    startButton.style.display = 'none';
}

function countdownTimer() {

    time--;

    timerDisplay.textContent = time;

    if (time <= 0) {
        endGame();
    }
}

function displayQuestions() {

    var currentQuestion = questions[questionIndex]

    questionDisplay.textContent = currentQuestion.question

    optionsDisplay.textContent = '';

    currentQuestion.options.forEach(function(option) {
        var button = document.createElement('button');
        button.textContent = option;

        button.addEventListener('click', oopsie);

        optionsDisplay.append(button);
    });
}

function displayHighScores() {

    var highScoresList = document.getElementById('high-scores');

    highScores.sort(function(low, high) {
      return high.score - low.score;
    });

    highScores.forEach(function(user) {
      var listItem = document.createElement('li');

      listItem.textContent = user.initials + ' - ' + user.score;

      highScoresList.appendChild(listItem);
    });
  }

function oopsie(event) {

    var selectedOption = event.target.textContent;
    var currentQuestion = questions[questionIndex];

    if (selectedOption === currentQuestion.answer) {
      score++;

    } else {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
    }

    questionIndex++;

    if (questionIndex >= questions.length || time === 0) {
      endGame();

    } else {
      displayQuestions();
    }
}

function endGame() {

    clearInterval(timer);

    questionDisplay.textContent = '';

    optionsDisplay.textContent = '';

    endScreen.style.display = 'flex';

    scoreDisplay.textContent = score;
}

function saveGame() {

    var initials = initialsInput.value.trim();

    if (initials !== '') {
      var user = {
        initials: initials,
        score: score
      };

      highScores.push(user);

      localStorage.setItem('highScores', JSON.stringify(highScores));

      initialsInput.value = '';

      displayHighScores();
    }
}

window.addEventListener('load', function () {

    var localHighScores = localStorage.getItem('highScores');
   
    if (localHighScores) {
        highScores = JSON.parse(localHighScores);
        displayHighScores();
}
})