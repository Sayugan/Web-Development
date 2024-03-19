const loadScoreCard = () => {
  // Get score card elements
  let score_status = document.getElementById("score_status");
  let questions = document.getElementById("score_card_questions");
  let wrongAnswer = document.getElementById("score_card_wrong_answers");
  let totalScore = document.getElementById("score_card_score");
  let quizGrade = document.getElementById("score_card_grade");
  let quizTime = document.getElementById("score_card_time");

  // Get quiz score from local storage
  let quizScore = JSON.parse(localStorage.getItem("quiz_score"));

  // Set score card values
  score_status.innerHTML =
    quizScore.score >= 5
      ? "Congratulations! You have scored great. You can see your score and grade below."
      : "You have scored low. You can try again.";

  score_status.style.color = quizScore.score > 5 ? "green" : "red";

  questions.innerHTML = `Questions : ${quizScore.completed}`;
  wrongAnswer.innerHTML = `Incorrect : ${quizScore.incorrect}`;
  totalScore.innerHTML = `Score : ${quizScore.score}`;
  quizGrade.innerHTML = `Grade : ${quizScore.grade}`;
  quizTime.innerHTML = `Time : ${quizScore.time}s`;
};
