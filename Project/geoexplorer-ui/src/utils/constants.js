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
}

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

/** Footer / docs — project repo (update if forked). */
export const PROJECT_REPO_URL = 'https://github.com/Haroon2697/Web_Lab_Project'

/** Navbar + footer — all app routes grouped by panel (single source for consistency). */
export const NAV_LINK_GROUPS = [
  {
    title: 'User',
    links: [
      { to: ROUTES.home, label: 'Home' },
      { to: ROUTES.login, label: 'Login' },
      { to: ROUTES.signup, label: 'Signup' },
      { to: ROUTES.game, label: 'Game' },
      { to: ROUTES.guessSubmit, label: 'Guess' },
      { to: ROUTES.result, label: 'Result' },
      { to: ROUTES.leaderboard, label: 'Leaderboard' },
      { to: ROUTES.profile, label: 'Profile' },
      { to: ROUTES.history, label: 'History' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { to: ROUTES.admin.login, label: 'Admin login' },
      { to: ROUTES.admin.dashboard, label: 'Dashboard' },
      { to: ROUTES.admin.users, label: 'Users' },
      { to: ROUTES.admin.gameData, label: 'Game data' },
      { to: ROUTES.admin.leaderboard, label: 'Leaderboard' },
      { to: ROUTES.admin.reports, label: 'Analytics' },
    ],
  },
]
