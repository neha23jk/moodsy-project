let score = 0;

function createBug() {
  const bug = document.createElement("div");
  bug.classList.add("bug");
  bug.textContent = "🐞";

  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight * 0.8 - 50);

  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  bug.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    bug.remove();
  });

  document.getElementById("game-area").appendChild(bug);

  setTimeout(() => {
    bug.remove();
  }, 2000); // disappears if not clicked in 2s
}

// Create a bug every 600ms
setInterval(createBug, 600);
