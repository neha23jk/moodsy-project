const moodColors = {
  Happy: "#fdd835",
  Sad: "#64b5f6",
  Angry: "#e57373",
  Anxious: "#ba68c8",
  Calm: "#81c784"
};

function logMood() {
  const mood = document.getElementById("moodSelect").value;
  if (!mood) return alert("Please select a mood!");

  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem("mood_" + today, mood);
  alert("Mood saved for today!");
  location.reload(); // Refresh chart
}

function getLast7Days() {
  const days = [];
  const moods = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push(dateStr);

    const mood = localStorage.getItem("mood_" + dateStr) || "None";
    moods.push(mood);
  }

  return { days, moods };
}

function drawChart() {
  const { days, moods } = getLast7Days();

  const moodLabels = moods.map(m => m === "None" ? "No Entry" : m);
  const moodColorsUsed = moods.map(m => moodColors[m] || "#888");

  new Chart(document.getElementById("moodChart"), {
    type: "bar",
    data: {
      labels: days,
      datasets: [{
        label: "Mood This Week",
        data: moods.map((m, i) => m === "None" ? 0 : 1),
        backgroundColor: moodColorsUsed
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return "Mood: " + moodLabels[context.dataIndex];
            }
          }
        }
      },
      scales: {
        y: {
          display: false
        }
      }
    }
  });
}

drawChart();
