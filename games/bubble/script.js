let score = 0;

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Random horizontal position
  bubble.style.left = Math.random() * 90 + 'vw';

  // Click to pop
  bubble.onclick = () => {
    score++;
    document.getElementById('score').textContent = score;
    bubble.remove();
  };

  document.getElementById('game-area').appendChild(bubble);

  // Remove bubble after 4s (animation end)
  setTimeout(() => {
    bubble.remove();
  }, 4000);
}

// Start creating bubbles every 800ms
setInterval(createBubble, 800);
