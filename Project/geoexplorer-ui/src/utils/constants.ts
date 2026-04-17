/** App-wide constants and route paths (single source of truth). */
export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  game: '/game',
  guessSubmit: '/guess-submit',
  result: '/result',
  leaderboard: '/leaderboard',
  profile: '/profile',
  history: '/history',
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    gameData: '/admin/game-data',
    leaderboard: '/admin/leaderboard',
    reports: '/admin/reports',
  },
} as const

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'
