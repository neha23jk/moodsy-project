let score = 0;

function createDot() {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  // Random position
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight * 0.8 - 50);
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  // Random color
  const colors = ["red", "blue", "purple", "orange"];
  dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  // Click event
  dot.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    dot.remove();
  });

  document.getElementById("game-area").appendChild(dot);

  // Remove after 1.5s if not clicked
  setTimeout(() => {
    dot.remove();
  }, 1500);
}

// Spawn a new dot every 500ms
setInterval(createDot, 500);
