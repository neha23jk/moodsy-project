const instruction = document.getElementById("instruction");

const phases = ["Breathe In", "Hold", "Breathe Out", "Hold"];
let index = 0;

instruction.textContent = phases[0];

setInterval(() => {
  index = (index + 1) % phases.length;
  instruction.textContent = phases[index];
}, 2000); // matches the 8s animation cycle
