let score = 0;
const basket = document.getElementById("basket");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");

// Move basket with arrow keys
let basketPos = 45;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketPos > 0) basketPos -= 5;
  if (e.key === "ArrowRight" && basketPos < 90) basketPos += 5;
  basket.style.left = basketPos + "%";
});

const kindWords = [
  "You matter 💙", "Strong 💪", "You’re enough", "Loved ❤️", "Worthy 🌟", "Brave ✨"
];
const badWords = [
  "Useless", "Not good", "Unloved", "Failure", "Weak"
];

// Create falling word
function createWord() {
  const word = document.createElement("div");
  word.classList.add("word");

  const isKind = Math.random() < 0.7; // 70% chance it's kind
  word.textContent = isKind
    ? kindWords[Math.floor(Math.random() * kindWords.length)]
    : badWords[Math.floor(Math.random() * badWords.length)];

  word.style.left = Math.random() * 90 + "vw";
  gameArea.appendChild(word);

  // Fall animation + collision check
  let fallInterval = setInterval(() => {
    const wordRect = word.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      wordRect.bottom >= basketRect.top &&
      wordRect.left < basketRect.right &&
      wordRect.right > basketRect.left
    ) {
      // Collision
      if (isKind) score++;
      else score--;

      scoreDisplay.textContent = score;
      word.remove();
      clearInterval(fallInterval);
    }

    // Remove if reaches bottom
    if (wordRect.top > window.innerHeight) {
      word.remove();
      clearInterval(fallInterval);
    }
  }, 50);
}

// Spawn new word every 1.2s
setInterval(createWord, 1200);
