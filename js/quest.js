import quests from "../data/questData.js";

const user = getUser();
const today = new Date().toDateString();

quests.forEach(q => {
  user.quests[q.id] = user.quests[q.id] || {
    completedDays: [],
    lastDay: null
  };

  if (user.quests[q.id].lastDay !== today) {
    user.quests[q.id].completedDays.push(today);
    user.quests[q.id].lastDay = today;
    addXP(q.xpPerDay, "quest");
  }
});

saveUser(user);