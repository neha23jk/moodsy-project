const canvas = document.getElementById("mandala");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX, lastY;
let symmetry = 6;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = getCanvasPos(e);
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.beginPath(); // reset stroke path
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const [x, y] = getCanvasPos(e);
  drawMandala(x, y, lastX, lastY);
  [lastX, lastY] = [x, y];
});

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  return [e.clientX - rect.left - 300, e.clientY - rect.top - 300];
}

function drawMandala(x, y, lx, ly) {
  for (let i = 0; i < symmetry; i++) {
    let angle = (Math.PI * 2 * i) / symmetry;
    let rx = Math.cos(angle) * x - Math.sin(angle) * y;
    let ry = Math.sin(angle) * x + Math.cos(angle) * y;

    let rlx = Math.cos(angle) * lx - Math.sin(angle) * ly;
    let rly = Math.sin(angle) * lx + Math.cos(angle) * ly;

    ctx.save();
    ctx.translate(300, 300);
    ctx.beginPath();
    ctx.moveTo(rlx, rly);
    ctx.lineTo(rx, ry);
    ctx.strokeStyle = `hsl(${angle * 180 / Math.PI}, 100%, 50%)`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

// Clear + change symmetry
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === "c") {
    ctx.clearRect(0, 0, 600, 600);
  } else if (key === "q") {
    symmetry = 6;
  } else if (key === "w") {
    symmetry = 8;
  } else if (key === "e") {
    symmetry = 12;
  }
});

