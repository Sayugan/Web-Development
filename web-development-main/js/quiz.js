let totalQuestions = 0;

let availableQuestions = [];
let currentQuestion = {};

let quizScore = {
  completed: 0,
  incorrect: 0,
  score: 0,
  geade: "",
  time: 0,
};

// Quiz container
let mainContent = document.getElementById("content");

// Score card container
let scoreCard = document.getElementById("score_card");

// Quiz score
let scoreElement = document.getElementById("score");

// Completed questions
let questionCount = document.getElementById("question_count");

// Play again button
let btnPlayAgain = document.getElementById("play_again");

// Quiz options
let quizOptions = Array.from(document.getElementsByClassName("quiz-options"));

// Main method
const startQuiz = async () => {
  // Fetch questions from JSON file
  await fetch("../data/questions.json").then(async (response) => {
    // https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
    await response.json().then(({ questions }) => {
      totalQuestions = questions.length;

      availableQuestions = [...questions]; // Spread operator
    });
  });

  startTimer(); // Start timer

  localStorage.removeItem("quiz_score"); // Remove previous quiz score

  scoreElement.innerHTML = quizScore.score; // Set score to 0

  questionCount.innerHTML = `${quizScore.completed}/${totalQuestions}`; // Set question count to 0

  nextQuestion(); // Next question
};

// Get next question
const nextQuestion = () => {
  quizScore.completed++; // Increase completed questions

  // End quiz if all questions have been completed or there are no more questions
  if (quizScore.completed > totalQuestions || availableQuestions.length === 0)
    endQuiz();

  // Get random question
  let randomIndex = Math.floor(Math.random() * availableQuestions.length); // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array

  // Check if questions are available
  if (availableQuestions.length) {
    // Get current question
    currentQuestion = availableQuestions[randomIndex];

    // Set question
    let question = document.getElementById("question");
    question.innerHTML = `<span class="question-no">Q${quizScore.completed})</span> ${currentQuestion.question}`;

    // Shuffle choices
    let shuffledChoices = shuffleChoices(currentQuestion.choices);

    // Set choices
    for (let [i, option] of quizOptions.entries()) {
      option.innerHTML = shuffledChoices[i];
      option.classList.add("bg-highlight");
    }

    // Remove question from available questions
    availableQuestions.splice(randomIndex, 1);
  }
};

quizOptions.forEach((option) => {
  // Add click event listener to each option
  option.addEventListener("click", (e) => {
    // Remove highlight class
    option.classList.remove("bg-highlight");

    let selectedAnswer = e.target.innerHTML;

    // Check if answer is correct
    let answerStatus =
      selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

    // Add class to option based on answer status
    option.classList.add(answerStatus);

    // Increase score if answer is correct
    if (answerStatus === "correct") {
      increaseScore();
    } else {
      // Increase incorrect count
      quizScore.incorrect++;

      // Highlight correct answer
      let correctAnswer = quizOptions.find(
        (option) => option.innerHTML === currentQuestion.answer
      );
      correctAnswer.classList.add("correct");

      // Remove highlight class after 1 second
      setTimeout(() => {
        correctAnswer.classList.remove("correct");
      }, 1000);
    }

    questionCount.innerHTML = `${quizScore.completed}/${totalQuestions}`; // Update question count

    setTimeout(() => {
      // Remove highlight class after 1 second
      option.classList.remove(answerStatus);

      nextQuestion(); // Next question
    }, 1000);
  });
});

// Play again
btnPlayAgain.addEventListener("click", () => {
  location.reload();
});

// Increase score
const increaseScore = () => {
  quizScore.score++;
  scoreElement.innerHTML = quizScore.score;
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleChoices = (choices) => {
  for (let current = choices.length - 1; current > 0; current--) {
    const random = Math.floor(Math.random() * (current + 1));
    [choices[current], choices[random]] = [choices[random], choices[current]];
  }
  return choices;
};

// End quiz
const endQuiz = () => {
  quizScore.time = checkTimer(); // Get time taken to complete quiz

  // Set completed questions to 0 if all questions were not completed
  // if (availableQuestions.length + 1 === totalQuestions) quizScore.completed = 0;

  // Set completed questions to 0 if all questions were not completed
  quizScore.completed =
    quizScore.score + quizScore.incorrect > 0
      ? quizScore.score + quizScore.incorrect
      : 0;

  stopTimer(); // Stop timer

  quizScore.grade = `${(quizScore.score / totalQuestions) * 100}%`; // Calculate grade

  localStorage.setItem("quiz_score", JSON.stringify(quizScore)); // Save quiz score

  document.getElementById("quiz").classList.add("hidden"); // Hide quiz
  document.getElementById("score_card").classList.remove("hidden"); // Show score card

  loadScoreCard(); // Load score card
};

startQuiz();
