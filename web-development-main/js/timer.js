const MAX_TIME = 60;

const timerText = "Time Remaining:";

let quizTimer = document.getElementById("quiz-timer");

let timer;
let remainingTime = MAX_TIME;
let isStopped = true;

const startTimer = () => {
  quizTimer.textContent = `${timerText} ${remainingTime}s`;

  if (isStopped) {
    isStopped = false;
    timer = setInterval(renderTime, 1000);
  }
};

const renderTime = () => {
  remainingTime--;

  quizTimer.textContent =
    remainingTime >= 10
      ? `${timerText} ${remainingTime}s`
      : `${timerText} 0${remainingTime}s`;

  if (remainingTime == 0) {
    isStopped = true;

    endQuiz(); // End quiz

    quizTimer.textContent = "Time's up!";

    document.getElementById("score_card_title").innerHTML = "Quiz Ended!";
  } else if (remainingTime < 30) {
    quizTimer.style.color = "rgba(231, 49, 49, 0.89)";
  }
};

const stopTimer = () => {
  isStopped = true;
  clearInterval(timer);
};

const checkTimer = () => {
  return MAX_TIME - remainingTime;
};
