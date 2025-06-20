const canvas = document.getElementById("gardenCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let currentTool = "rake"; // rake | stone | flower | leaf

// Draw sand line
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing || currentTool !== "rake") return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = "#d7ccc8";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
});

// Place object on click
canvas.addEventListener("click", (e) => {
  if (currentTool === "rake") return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const emoji = {
    stone: "🪨",
    flower: "🌸",
    leaf: "🍃"
  }[currentTool];

  ctx.font = "24px serif";
  ctx.fillText(emoji, x - 12, y + 12);
});

// Tool selection
document.addEventListener("keydown", (e) => {
  if (e.key === "1") currentTool = "stone";
  if (e.key === "2") currentTool = "flower";
  if (e.key === "3") currentTool = "leaf";
  if (e.key === "r" || e.key === "R") {
    currentTool = "rake";
    ctx.beginPath(); // reset rake stroke
  }
});
