const plant = document.getElementById("plant");
const waterBtn = document.getElementById("waterBtn");

const growthStages = ["🌱", "🌿", "🍃", "🍀", "🎋", "🌾"];
let stage = 0;

waterBtn.addEventListener("click", () => {
  if (stage < growthStages.length) {
    const leaf = document.createElement("div");
    leaf.textContent = growthStages[stage];
    plant.appendChild(leaf);
    stage++;
  } else {
    waterBtn.disabled = true;
    waterBtn.textContent = "Your plant is happy! 🌼";
  }
});
