let questions = []; let currentIndex = 0; let score = 0; let shuffledQuestions = [];

// DOM elements const playBtn = document.getElementById('play-button'); const quizContainer = document.getElementById('quiz-container'); const mainScreen = document.getElementById('main-screen'); const endScreen = document.getElementById('end-screen'); const restartBtn = document.getElementById('restart-button'); const questionText = document.getElementById('question-text'); const questionAudio = document.getElementById('question-audio'); const leftOption = document.getElementById('left-option'); const rightOption = document.getElementById('right-option'); const feedback = document.getElementById('feedback'); const tryAgainBtn = document.getElementById('try-again'); const nextBtn = document.getElementById('next-question'); const actionButtons = document.getElementById('action-buttons');

// Load questions from JSON file fetch('questions.json') .then(res => res.json()) .then(data => { questions = data; shuffledQuestions = shuffleArray([...questions]); });

playBtn.addEventListener('click', () => { mainScreen.style.display = 'none'; quizContainer.style.display = 'flex'; playQuestion(); });

restartBtn.addEventListener('click', () => { currentIndex = 0; score = 0; shuffledQuestions = shuffleArray([...questions]); endScreen.style.display = 'none'; mainScreen.style.display = 'flex'; });

tryAgainBtn.addEventListener('click', () => { feedback.textContent = ''; actionButtons.style.display = 'none'; playQuestion(); });

nextBtn.addEventListener('click', () => { currentIndex++; feedback.textContent = ''; actionButtons.style.display = 'none'; playQuestion(); });

function playQuestion() { if (currentIndex >= shuffledQuestions.length) { showEndScreen(); return; }

const q = shuffledQuestions[currentIndex]; questionText.textContent = q.question; questionAudio.src = q.audio;

const options = shuffleArray([q.correct, q.incorrect]); const isLeftCorrect = options[0] === q.correct;

setOption(leftOption, options[0], isLeftCorrect); setOption(rightOption, options[1], !isLeftCorrect); }

function setOption(element, option, isCorrect) { element.innerHTML = <h3>${option.text}</h3><img src="${option.image}" alt="Option" />; element.onclick = () => { if (isCorrect) { feedback.textContent = 'Well done!'; score++; setTimeout(() => { currentIndex++; feedback.textContent = ''; playQuestion(); }, 1000); } else { feedback.textContent = 'Wrong answer!'; actionButtons.style.display = 'block'; } }; }

function showEndScreen() { quizContainer.style.display = 'none'; endScreen.style.display = 'flex'; }

function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; }

