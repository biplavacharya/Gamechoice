let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let shuffledQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("play-button");
  const mainScreen = document.getElementById("main-screen");
  const quizContainer = document.getElementById("quiz-container");
  const questionText = document.getElementById("question-text");
  const leftOption = document.getElementById("left-option");
  const rightOption = document.getElementById("right-option");
  const feedback = document.getElementById("feedback");
  const tryAgainBtn = document.getElementById("try-again-btn");
  const nextBtn = document.getElementById("next-btn");

  fetch("questions.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      shuffledQuestions = shuffleArray([...questions]);
    });

  playButton.addEventListener("click", () => {
    mainScreen.style.display = "none";
    quizContainer.style.display = "flex";
    startGame();
  });

  function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showQuestion();
  }

  function showQuestion() {
    feedback.style.display = "none";
    tryAgainBtn.style.display = "none";
    nextBtn.style.display = "none";

    const current = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = current.question;

    const options = shuffleArray(current.options);
    leftOption.querySelector("h3").textContent = options[0].title;
    leftOption.querySelector("img").src = options[0].image;
    leftOption.dataset.correct = options[0].correct;

    rightOption.querySelector("h3").textContent = options[1].title;
    rightOption.querySelector("img").src = options[1].image;
    rightOption.dataset.correct = options[1].correct;
  }

  function handleAnswer(isCorrect) {
    feedback.style.display = "block";
    if (isCorrect) {
      feedback.textContent = "Well done!";
      correctAnswers++;
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
          showQuestion();
        } else {
          endGame();
        }
      }, 1500);
    } else {
      feedback.textContent = "Wrong answer!";
      tryAgainBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
    }
  }

  function endGame() {
    alert("Congratulations! You answered all questions correctly.");
    location.reload();
  }

  leftOption.addEventListener("click", () => {
    handleAnswer(leftOption.dataset.correct === "true");
  });

  rightOption.addEventListener("click", () => {
    handleAnswer(rightOption.dataset.correct === "true");
  });

  tryAgainBtn.addEventListener("click", () => {
    showQuestion();
  });

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame();
    }
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
