const maze = document.getElementById("maze");
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const message = document.getElementById("message");

const gridSize = 20;
const cols = 20;
const rows = 20;

let playerX = 0;
let playerY = 0;

let wallSet = new Set();

function setPlayerPos(x, y) {
  playerX = x;
  playerY = y;
  player.style.left = `${x * gridSize}px`;
  player.style.top = `${y * gridSize}px`;
}

function setGoalPos(x, y) {
  goal.style.left = `${x * gridSize}px`;
  goal.style.top = `${y * gridSize}px`;
}

function generateMaze() {
  // Clear old walls
  document.querySelectorAll(".wall").forEach(wall => wall.remove());
  wallSet.clear();

  setPlayerPos(0, 0);
  setGoalPos(cols - 1, rows - 1);

  while (wallSet.size < Math.floor(cols * rows * 0.3)) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    if ((x === 0 && y === 0) || (x === cols - 1 && y === rows - 1)) continue;
    const key = `${x}-${y}`;
    if (!wallSet.has(key)) {
      wallSet.add(key);
      const wall = document.createElement("div");
      wall.className = "wall";
      wall.style.width = `${gridSize}px`;
      wall.style.height = `${gridSize}px`;
      wall.style.left = `${x * gridSize}px`;
      wall.style.top = `${y * gridSize}px`;
      maze.appendChild(wall);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (newX < 0 || newY < 0 || newX >= cols || newY >= rows) return;

  const key = `${newX}-${newY}`;
  if (wallSet.has(key)) return;

  setPlayerPos(newX, newY);

  // Check win
  if (newX === cols - 1 && newY === rows - 1) {
    setTimeout(() => {
      alert("🧘 You reached the flower. Maze will restart.");
      generateMaze();
    }, 300);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": movePlayer(0, -1); break;
    case "ArrowDown": movePlayer(0, 1); break;
    case "ArrowLeft": movePlayer(-1, 0); break;
    case "ArrowRight": movePlayer(1, 0); break;
  }
});

generateMaze();
