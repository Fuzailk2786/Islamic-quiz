const user = getUser();

document.getElementById("leaderboard").innerHTML = `
  <p>🏆 Level: ${user.level}</p>
  <p>⭐ XP: ${user.xp}</p>
  <p>🔥 Streak: ${user.streak}</p>
`;