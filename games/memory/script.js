const emojis = ["🐶", "🐱", "🐻", "🦊", "🐼", "🐸"];
let cards = [...emojis, ...emojis]; // total 12 cards (6 pairs)
cards.sort(() => 0.5 - Math.random()); // shuffle

const board = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchCount = 0;

function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.textContent = "❓";

  card.addEventListener("click", () => {
    if (lockBoard || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.textContent = emoji;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  });

  board.appendChild(card);
}

function checkMatch() {
  lockBoard = true;

  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  setTimeout(() => {
    if (isMatch) {
      matchCount++;
      document.getElementById("matches").textContent = matchCount;
      firstCard.style.backgroundColor = "#b2f2bb";
      secondCard.style.backgroundColor = "#b2f2bb";

      // ✅ Check if game is complete
      if (matchCount === emojis.length) {
        setTimeout(() => {
          alert("🎉 Congratulations! You've matched all pairs!");
          location.reload(); // 🔁 reloads the page (reshuffles automatically)
        }, 300);
      }
    } else {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "❓";
      secondCard.textContent = "❓";
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 1000);
}


// Build the board
cards.forEach(emoji => createCard(emoji));
