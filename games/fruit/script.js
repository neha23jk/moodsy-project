const fruits = ["🍉", "🍌", "🍍", "🍓", "🍊", "🍇"];
let timeLeft = 30;
let gameInterval;
let timerInterval;
let score = 0;


function createFruit() {
  const fruit = document.createElement("div");
  fruit.classList.add("fruit");
  fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];

  // Random X position
  fruit.style.left = Math.random() * 95 + "vw";
  fruit.style.bottom = "0";

  // Slice detection (mouse over)
  fruit.addEventListener("mouseover", () => {
  // Add slice effect
  fruit.classList.add("sliced");

  // Prevent double slice
  fruit.style.pointerEvents = "none";

  // Update score
  score++;
  document.getElementById("score").textContent = score;

  // Remove after animation ends
  setTimeout(() => {
    fruit.remove();
  }, 400);
});

  document.getElementById("game-area").appendChild(fruit);

  // Remove after animation
  setTimeout(() => {
    fruit.remove();
  }, 3000);
}

function endGame() {
  // Disable slicing
  document.querySelectorAll(".fruit").forEach(fruit => {
    fruit.style.pointerEvents = "none";
  });

  // Show result
  setTimeout(() => {
    alert("⏰ Time's up! Final Score: " + score);
    location.reload(); // restart the game
  }, 300);
}

function startGame() {
  gameInterval = setInterval(createFruit, 800);

  // Timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

startGame(); // Begin the game on load

