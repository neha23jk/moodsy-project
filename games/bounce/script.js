const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const game = document.getElementById("game");
const message = document.getElementById("message");

let ballX = 185;
let ballY = 0;
let velocityY = 2;
let velocityX = 2; // NEW: horizontal movement

let paddleX = 150;

// Move paddle with mouse
document.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  paddleX = e.clientX - rect.left - 50;
  paddleX = Math.max(0, Math.min(300, paddleX));
  paddle.style.left = `${paddleX}px`;
});

function resetBall() {
  ballX = Math.floor(Math.random() * 300); // randomize starting x
  ballY = 0;
  velocityY = 2;
  velocityX = Math.random() < 0.5 ? 2 : -2; // random direction
  message.textContent = "Oops! Try again 🧸";
}

function update() {
  ballX += velocityX;
  ballY += velocityY;

  // Wall bounce
  if (ballX <= 0 || ballX + 30 >= 400) {
    velocityX *= -1;
  }

  // Bounce off top
  if (ballY <= 0) {
    velocityY *= -1;
  }

  // Bounce on paddle
  const ballBottom = ballY + 30;
  const paddleTop = 490;
  if (
    ballBottom >= paddleTop &&
    ballY <= paddleTop + 15 &&
    ballX + 30 > paddleX &&
    ballX < paddleX + 100
  ) {
    velocityY *= -1;

    // Change X direction slightly based on where it hit the paddle
    const hitPos = ballX + 15 - (paddleX + 50);
    velocityX = hitPos * 0.1;
    message.textContent = "Nice catch ✨";
  }

  // Missed the paddle
  if (ballY > 500) {
    resetBall();
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(update);
}

resetBall();
update();
