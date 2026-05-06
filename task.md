# Haroon's Implementation — Task List

## Packages
- [/] Install frontend: @reduxjs/toolkit react-redux
- [/] Install backend: mongoose bcryptjs jsonwebtoken cors dotenv axios

## Backend (`GeoExplorer/server/`)
- [ ] `app.js` — Express app, cors, json, route mounting
- [ ] `config/db.js` — Mongoose connect helper
- [ ] `config/env.js` — env var validation
- [ ] `middleware/protect.js` — JWT verify → req.user
- [ ] `middleware/errorHandler.js` — global error handler
- [ ] `models/User.js`
- [ ] `models/GameSession.js`
- [ ] `models/Leaderboard.js`
- [ ] `utils/generateToken.js`
- [ ] `utils/scoreCalc.js`
- [ ] `controllers/auth.controller.js`
- [ ] `controllers/game.controller.js`
- [ ] `controllers/leaderboard.controller.js`
- [ ] `routes/auth.routes.js`
- [ ] `routes/game.routes.js`
- [ ] `routes/leaderboard.routes.js`
- [ ] Update `server.js`
- [ ] Update `package.json` (backend)
- [ ] Create `.env` template

## Frontend (`geoexplorer-ui/src/`)
- [ ] `app/store.js` — configureStore with all slices
- [ ] `features/auth/authService.js`
- [ ] `features/auth/authSlice.js`
- [ ] `features/game/gameService.js`
- [ ] `features/game/gameSlice.js`
- [ ] `features/leaderboard/leaderboardService.js`
- [ ] `features/leaderboard/leaderboardSlice.js`
- [ ] `features/user/userService.js`
- [ ] `features/user/userSlice.js`
- [ ] `services/interceptors.js` — add 401 response interceptor
- [ ] `main.jsx` — wrap with Redux Provider
- [ ] `pages/user/LoginPage.jsx` — dispatch loginUser thunk
- [ ] `pages/user/SignupPage.jsx` — dispatch registerUser thunk
- [ ] `pages/user/GamePage.jsx` — dispatch startGame / submitGuess
- [ ] `pages/user/LeaderboardPage.jsx` — dispatch fetchLeaderboard
- [ ] `pages/user/ProfilePage.jsx` — dispatch fetchProfile
- [ ] `pages/user/GameHistoryPage.jsx` — dispatch fetchHistory
