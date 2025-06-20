let score = 0;

function createBox() {
  const box = document.createElement("div");
  box.classList.add("box");

  // Random position
  const x = Math.random() * (window.innerWidth - 70);
  const y = Math.random() * (window.innerHeight * 0.8 - 70);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  // Punch (click) event
  box.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    box.remove();
  });

  document.getElementById("game-area").appendChild(box);

  // Remove box after 1.2s if not clicked
  setTimeout(() => {
    box.remove();
  }, 1200);
}

// Spawn a new box every 500ms
setInterval(createBox, 500);
