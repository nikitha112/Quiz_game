const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
        ]
    },
    {
        question: "What does CPU stand for?",
        answers: [
            { text: "Central Process Unit", correct: false },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Processing Unit", correct: true },
            { text: "Central Processor Unit", correct: false }
        ]
    },
    {
        question: "How many planets are in our solar system?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "7", correct: false },
            { text: "10", correct: false }
        ]
    }
];

const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const scoreScreen = document.querySelector(".score-screen");

const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.getElementById("play-again-btn");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    quizScreen.style.display = "none";
    scoreScreen.style.display = "block";
    scoreText.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
});

playAgainButton.addEventListener("click", () => {
    scoreScreen.style.display = "none";
    startScreen.style.display = "block";
});