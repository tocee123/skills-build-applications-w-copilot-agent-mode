const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

export { apiBase };

export const endpoints = {
  activities: `${apiBase}/api/activities/`,
  leaderboard: `${apiBase}/api/leaderboard/`,
  teams: `${apiBase}/api/teams/`,
  users: `${apiBase}/api/users/`,
  workouts: `${apiBase}/api/workouts/`,
};
