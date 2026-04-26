// ===============================
// ISLAMIC QUESTZ — MASTER ENGINE
// ===============================

// ---------- Date ----------
function today() {
  return new Date().toISOString().split("T")[0];
}

// ---------- INIT ----------
function init() {
  if (!localStorage.getItem("xp")) localStorage.setItem("xp", "0");
  if (!localStorage.getItem("coins")) localStorage.setItem("coins", "0");
  if (!localStorage.getItem("streak")) localStorage.setItem("streak", "0");
}
init();

// ---------- GETTERS ----------
function getXP() {
  return Number(localStorage.getItem("xp")) || 0;
}

function getCoins() {
  return Number(localStorage.getItem("coins")) || 0;
}

function getStreak() {
  return Number(localStorage.getItem("streak")) || 0;
}

// ---------- SETTERS ----------
function setXP(val) {
  localStorage.setItem("xp", val);
  updateUI();
}

function setCoins(val) {
  localStorage.setItem("coins", val);
  updateUI();
}

function setStreak(val) {
  localStorage.setItem("streak", val);
  updateUI();
}

// ---------- ADD FUNCTIONS ----------
function addXP(val) {
  setXP(getXP() + val);
}

function addCoins(val) {
  setCoins(getCoins() + val);
}

// ---------- STREAK ----------
function updateStreak() {
  const last = localStorage.getItem("lastDate");
  const t = today();

  if (last !== t) {
    setStreak(getStreak() + 1);
    localStorage.setItem("lastDate", t);
  }
}

// ---------- QUIZ ----------
function submitQuiz(correct) {
  const todayKey = today();
  const lastQuiz = localStorage.getItem("lastQuiz");

  if (lastQuiz === todayKey) {
    alert("Already completed today!");
    return;
  }

  localStorage.setItem("lastQuiz", todayKey);

  if (correct) {
    addXP(20);
    addCoins(10);
    alert("Correct! +20 XP +10 Coins");
  } else {
    alert("Wrong answer!");
  }

  updateUI();
}

// ---------- DAILY CHEST ----------
function claimDailyChest() {
  const t = today();
  const last = localStorage.getItem("lastChest");

  if (last === t) {
    alert("Already claimed today!");
    return;
  }

  const reward = Math.floor(Math.random() * 40) + 10;
  addCoins(reward);
  localStorage.setItem("lastChest", t);

  alert("You earned " + reward + " coins!");
}

// ---------- MAIN UI SYNC (IMPORTANT) ----------
function updateUI() {
  const xpEl = document.getElementById("xpCount");
  const coinEl = document.getElementById("coinCount");
  const streakEl = document.getElementById("streakCount");

  if (xpEl) xpEl.innerText = getXP();
  if (coinEl) coinEl.innerText = getCoins();
  if (streakEl) streakEl.innerText = getStreak();
}

// ---------- AUTO RUN ----------
window.addEventListener("load", () => {
  updateStreak();
  updateUI();
});

// ===============================
// SIDEBAR CONTROL
// ===============================

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

// Close on ESC key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeMenu();
  }
});
