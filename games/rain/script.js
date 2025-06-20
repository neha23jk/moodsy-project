let score = 0;

function createRaindrop() {
  const drop = document.createElement('div');
  drop.classList.add('drop');

  // Random X position
  drop.style.left = Math.random() * 95 + 'vw';

  drop.onclick = () => {
    score++;
    document.getElementById('score').textContent = score;
    drop.remove();
  };

  document.getElementById('game-area').appendChild(drop);

  // Remove if not tapped (i.e., hits ground)
  setTimeout(() => {
    drop.remove();
  }, 3000);
}

// Drop new raindrops every 600ms
setInterval(createRaindrop, 600);
