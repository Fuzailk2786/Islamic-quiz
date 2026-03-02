<script>
function loadScriptOnce(src, globalCheck) {
  return new Promise((resolve, reject) => {
    if (globalCheck && globalCheck()) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

async function openLearningQuiz() {
  try {
    await loadScriptOnce('questions.learning.js', () => !!window.LEARNING_QUESTIONS);
    renderLearningGrid();
    document.getElementById('screen-content').classList.remove('hidden');
  } catch (e) {
    showPopup("Error", "Could not load Learning questions. Please retry.", "⚠️");
  }
}
</script>
