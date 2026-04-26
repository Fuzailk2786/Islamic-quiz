import quizData from "../data/quizData.js";

const quizContainer = document.getElementById("quiz");

const user = JSON.parse(localStorage.getItem("islamicQuestz_user"));
const today = new Date().toDateString();

if (user.quizCompletedDate === today) {
  quizContainer.innerHTML = "<p>✅ You already completed today’s quiz.</p>";
} else {
  quizData.daily.forEach((q, i) => {
    quizContainer.innerHTML += `
      <p>${q.question}</p>
      ${q.options.map(o =>
        `<label><input type="radio" name="q${i}" value="${o}">${o}</label>`
      ).join("<br>")}
    `;
  });

  quizContainer.innerHTML += `<button onclick="submitQuiz()">Submit</button>`;
}

window.submitQuiz = function () {
  let score = 0;

  quizData.daily.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });

  const user = JSON.parse(localStorage.getItem("islamicQuestz_user"));
  user.quizCompletedDate = today;
  localStorage.setItem("islamicQuestz_user", JSON.stringify(user));

  addXP(20, "quiz");

  alert(`Quiz complete! Score: ${score}`);
};