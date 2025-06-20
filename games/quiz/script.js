const quizData = [
  { emoji: "🍟🍔🥤", answer: "fast food" },
  { emoji: "🐍📱", answer: "python" },
  { emoji: "🎓📚", answer: "study" },
  { emoji: "👩‍💻💻☕", answer: "coding" },
  { emoji: "🌧️☔📖", answer: "rainy day reading" },
  { emoji: "🌞🏖️", answer: "vacation" },
  { emoji: "💡🛠️", answer: "hackathon" },
  { emoji: "🛏️💤", answer: "sleep" },
  { emoji: "😢🎵", answer: "sad song" },
  { emoji: "❤️🌍", answer: "love the world" }
];

let current = 0;
let score = 0;

const emojiDiv = document.getElementById("emoji");
const feedback = document.getElementById("feedback");
const input = document.getElementById("guess");
const scoreDisplay = document.getElementById("score");

function showQuestion() {
  emojiDiv.textContent = quizData[current].emoji;
  input.value = "";
  feedback.textContent = "";
}

function checkAnswer() {
  const userGuess = input.value.trim().toLowerCase();
  const correctAnswer = quizData[current].answer.toLowerCase();

  if (userGuess === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
    feedback.textContent = "✅ Correct!";
    current++;
    if (current < quizData.length) {
      setTimeout(showQuestion, 1000);
    } else {
      setTimeout(() => {
        alert("🎉 You completed the quiz! Final Score: " + score);
        location.reload(); // Restart quiz
      }, 800);
    }
  } else {
    feedback.textContent = "❌ Try again!";
  }
}

showQuestion();
