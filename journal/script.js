const textarea = document.getElementById("entry");
const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");
const today = new Date().toISOString().split("T")[0];
const key = "journal_" + today;

// Load entry if exists
const existing = localStorage.getItem(key);
if (existing) {
  textarea.value = existing;
  status.textContent = "🗂️ Loaded saved entry";
}

// Save on click
saveBtn.addEventListener("click", () => {
  const value = textarea.value.trim();
  if (value.length === 0) {
    status.textContent = "⚠️ Cannot save empty entry.";
    return;
  }

  localStorage.setItem(key, value);
  status.textContent = "✅ Entry saved for " + today;
});
