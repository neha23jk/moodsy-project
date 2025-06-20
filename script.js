let gameTimeout;
let countdownInterval;


function selectMood(mood) {
  // Hide popup when mood is selected
  const popup = document.getElementById("choose-text");
  if (popup) popup.style.display = "none";

  // Reset background to default white (will be updated by theme)
  document.body.style.backgroundColor = "#ffffff";

  // Clear previous
  document.getElementById('mood-output').innerHTML = "";
  localStorage.setItem('userMood', mood);

  // Proceed to quote → countdown → game
  showMoodOutput(mood);
  applyTheme(mood);
}


function applyTheme(mood) {
  const body = document.body;
  const themes = {
    happy: '#fff8dc',
    sad: '#cce6ff',
    angry: '#ffcccc',
    anxious: '#e0ccff',
    calm: '#d9f2d9'
  };
  body.style.backgroundColor = themes[mood] || '#ffffff';
  body.style.color='black';
}

function showMoodOutput(mood) {
  const output = document.getElementById('mood-output');

  const moodQuotes = {
    happy: [
      "Keep spreading smiles 😊",
      "Joy shared is joy doubled!",
      "Let your happiness shine 🌞",
      "Dance like no one's watching!",
      "Every moment is a fresh beginning!"
    ],
    sad: [
      "It's okay to feel down 💙",
      "This too shall pass 🌈",
      "You're not alone — ever.",
      "Your feelings are valid 💧",
      "Tears help flowers grow 🌸"
    ],
    angry: [
      "Pause. Breathe. It’ll pass 🔥",
      "Channel the fire, don’t fear it.",
      "It’s brave to stay calm 🧘",
      "Let go. Let peace in 🌿",
      "You are bigger than this moment."
    ],
    anxious: [
      "Take a deep breath. You're safe 🫶",
      "Let go of what you can't control.",
      "Inhale calm, exhale stress 💨",
      "You’re doing better than you think 💛",
      "This moment is yours to ease 🌤️"
    ],
    calm: [
      "Enjoy the peace 🌿",
      "Still waters run deep 💧",
      "In calm, we reconnect ✨",
      "You are grounded and safe.",
      "Let your thoughts drift like clouds ☁️"
    ]
  };

  const quotes = moodQuotes[mood] || ["Feel your feelings. You’re doing great."];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  // Clear previous timers
  clearTimeout(gameTimeout);
  clearInterval(countdownInterval);

  // Display quote + countdown placeholder
  output.innerHTML = `
    <h2>Your mood: ${capitalize(mood)}</h2>
    <p class="quote">${randomQuote}</p>
    <p id="countdown" class="countdown-text">Game appearing in 3...</p>
  `;

  // Start countdown
  let secondsLeft = 3;
  countdownInterval = setInterval(() => {
    secondsLeft--;
    document.getElementById("countdown").textContent = `Game appearing in ${secondsLeft}...`;
    if (secondsLeft === 0) clearInterval(countdownInterval);
  }, 1000);

  // Show game after 3 seconds
  gameTimeout = setTimeout(() => {
    suggestGame(mood);
  }, 3000);
}

function suggestGame(mood) {
  const games = {
    happy: [
      {
        name: "Memory Match",
        desc: "Flip cards and match emojis!",
        link: "games/memory/index.html"
      },
      {
        name: "Fruit Slice",
        desc: "Slice the fruits and test your reflex!",
        link: "games/fruit/index.html"
      },
      {
        name: "Emoji Quiz",
        desc: "Guess the word from emojis 🧠",
        link: "games/quiz/index.html"
      }
    ],
    sad: [
      {
        name: "Bubble Pop",
        desc: "Pop bubbles for stress relief 💭",
        link: "games/bubble/index.html"
      },
      {
        name: "Rainy Tap",
        desc: "Tap falling drops and feel the calm.",
        link: "games/rain/index.html"
      },
      {
        name: "Kindness Catch",
        desc: "Catch hearts and kind words 💖",
        link: "games/kindness/index.html"
      }
    ],
    angry: [
      {
        name: "Smash the Dots",
        desc: "Tap the fast dots to release anger!",
        link: "games/smash/index.html"
      },
      {
        name: "Whack the Bug",
        desc: "Whack bugs quickly and score points.",
        link: "games/bug/index.html"
      },
      {
        name: "Box Punch",
        desc: "Virtual punching bag for quick release!",
        link: "games/box/index.html"
      }
    ],
    anxious: [
      {
        name: "Zen Maze",
        desc: "Guide the ball through peaceful paths.",
        link: "games/maze/index.html"
      },
      {
        name: "Breathing Ball",
        desc: "Breathe with expanding & shrinking circle.",
        link: "games/breathe/index.html"
      },
      {
        name: "Soft Bounce",
        desc: "Bounce a ball gently through the sky.",
        link: "games/bounce/index.html"
      }
    ],
    calm: [
      {
        name: "Zen Garden",
        desc: "Draw & relax in the digital sand.",
        link: "games/zen/index.html"
      },
      {
        name: "Mandala Maker",
        desc: "Create peaceful mandalas 🌸",
        link: "games/mandala/index.html"
      },
      {
        name: "Pet the Plant",
        desc: "Water, nurture, and watch grow 🌿",
        link: "games/pet/index.html"
      }
    ]
  };

  const moodGames = games[mood];
  const randomIndex = Math.floor(Math.random() * moodGames.length);
  const game = moodGames[randomIndex];

  const gameHTML = `
    <div class="game-list">
      <div class="game-card">
        <h3>${game.name}</h3>
        <p>${game.desc}</p>
        <a href="${game.link}" target="_blank">
          <button>Play</button>
        </a>
      </div>
    </div>
  `;

  document.getElementById('mood-output').innerHTML += gameHTML;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


// Auto-load mood if saved
window.onload = () => {
  localStorage.removeItem('userMood'); // always start fresh
  document.body.style.backgroundColor = "#121212"; // default
  document.getElementById('mood-output').innerHTML = ""; // hide output
};
