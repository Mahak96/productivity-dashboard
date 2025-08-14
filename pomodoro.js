const WORK_TIME = 25 * 60; 
const BREAK_TIME = 5 * 60;

let timerInterval;
let timeLeft = WORK_TIME;
let isWorkSession = true;
let isRunning = false;

const timerDisplay = document.getElementById("Timer");
const startPauseBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");

// Update timer display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Save state
function saveState() {
  localStorage.setItem("pomodoroState", JSON.stringify({
    timeLeft,
    isWorkSession,
    isRunning,
    lastUpdate: Date.now()
  }));
}

// Load state
function loadState() {
  const saved = localStorage.getItem("pomodoroState");
  if (saved) {
    const state = JSON.parse(saved);
    const elapsed = Math.floor((Date.now() - state.lastUpdate) / 1000);
    timeLeft = Math.max(state.timeLeft - elapsed, 0);
    isWorkSession = state.isWorkSession;
    isRunning = state.isRunning;

    if (isRunning) startTimer(); 
    updateDisplay();
  }
}

// Start timer
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startPauseBtn.textContent = "⏸️ ";

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    saveState();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;

      notifyUser(
        isWorkSession
          ? "🎉 Hurrah! Work complete. Time for a break!"
          : "✅ Break over! Back to work!"
      );

      isWorkSession = !isWorkSession;
      timeLeft = isWorkSession ? WORK_TIME : BREAK_TIME;
      saveState();
      startTimer(); 
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  startPauseBtn.textContent = "▶️ ";
  saveState();
}

// Toggle play/pause
function toggleTimer() {
  if (isRunning) pauseTimer();
  else startTimer();
}

// Reset timer
function resetTimer() {
  pauseTimer();
  isWorkSession = true;
  timeLeft = WORK_TIME;
  updateDisplay();
  saveState();
}

// Notification
function notifyUser(msg) {
  if (Notification.permission === "granted") {
    new Notification(msg);
  } else {
    alert(msg);
  }
}

// Request permission
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Page visibility listener
document.addEventListener("visibilitychange", () => {
  if (document.hidden && isRunning) {
    console.log("⏳ Timer still running in background...");
  }
});

// Events
startPauseBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);

// On load
window.onload = () => {
  loadState();
  updateDisplay();
};
