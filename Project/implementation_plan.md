# GeoExplorer — Haroon's Implementation (Full Stack)

Implements all placeholder code assigned to Haroon across both the `geoexplorer-ui` frontend and the `GeoExplorer/server` backend. Every file currently containing a `*Placeholder` export will be replaced with production-ready code.

## What will be built

### Frontend (`geoexplorer-ui/src/`)

#### Redux Layer

| File | Status | Action |
|---|---|---|
| `app/store.js` | placeholder | Wire `configureStore` with all 4 Haroon slices |
| `features/auth/authSlice.js` | placeholder | `login`, `register`, `logout` async thunks + slice |
| `features/auth/authService.js` | placeholder | `POST /api/auth/login`, `POST /api/auth/register` |
| `features/game/gameSlice.js` | placeholder | `startGame`, `submitGuess`, `fetchHistory` thunks + slice |
| `features/game/gameService.js` | placeholder | `/api/game` CRUD calls |
| `features/leaderboard/leaderboardSlice.js` | placeholder | `fetchLeaderboard` thunk + slice |
| `features/leaderboard/leaderboardService.js` | placeholder | `GET /api/leaderboard` |
| `features/user/userSlice.js` | placeholder | `fetchProfile`, `updateProfile` thunks + slice |
| `features/user/userService.js` | placeholder | `GET/PUT /api/users/me` |

#### App wiring
- `main.jsx` — wrap app with Redux `<Provider store={store}>`
- `LoginPage.jsx` — dispatch `loginUser` thunk, read Redux loading/error
- `SignupPage.jsx` — dispatch `registerUser` thunk
- `GamePage.jsx` — dispatch `startGame` / `submitGuess` thunks
- `LeaderboardPage.jsx` — dispatch `fetchLeaderboard` on mount
- `ProfilePage.jsx` — dispatch `fetchProfile` on mount
- `GameHistoryPage.jsx` — dispatch `fetchHistory` on mount

#### Axios interceptor enhancement
- `services/interceptors.js` — add **response** interceptor: on 401 → clear token + redirect `/login`

---

### Backend (`GeoExplorer/server/`)

Full Express API scaffold implementing all Haroon-owned routes. Khizar's schema design is assumed so models are created here as thin Mongoose models.

#### NEW files

```
server/
  app.js                          ← Express app setup (cors, json, routes)
  config/
    db.js                         ← Mongoose connect
    env.js                        ← env var validation
  middleware/
    protect.js                    ← JWT verify → req.user
    errorHandler.js               ← global error handler
  models/
    User.js                       ← name, email, passwordHash, totalScore, gamesPlayed
    GameSession.js                ← userId, imageUrl, options, correctCountry, userGuess,
                                     score, timeLeft, difficulty, completedAt
    Leaderboard.js                ← userId (ref), totalScore, rank (virtual / computed)
  routes/
    auth.routes.js                ← POST /register, POST /login
    game.routes.js                ← POST /start, POST /submit, GET /history
    leaderboard.routes.js         ← GET /, GET /me
  controllers/
    auth.controller.js            ← register, login
    game.controller.js            ← startGame, submitGuess, getHistory
    leaderboard.controller.js     ← getLeaderboard, getMyRank
  utils/
    generateToken.js              ← jwt.sign helper
    scoreCalc.js                  ← points based on timeLeft + difficulty
```

> `server.js` updated to `import app from './app.js'`

#### Endpoints implemented (Haroon)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Hash pw, create User, return JWT |
| POST | `/api/auth/login` | ❌ | Verify pw, return JWT |
| POST | `/api/game/start` | ✅ | Fetch Unsplash image + REST Countries options, return session |
| POST | `/api/game/submit` | ✅ | Evaluate guess, calc score, save GameSession |
| GET | `/api/game/history` | ✅ | Return paginated past sessions for user |
| GET | `/api/leaderboard` | ❌ | Top-N users by totalScore |
| GET | `/api/leaderboard/me` | ✅ | Current user's rank + score |

---

## Install required packages

**Frontend:**
```
npm install @reduxjs/toolkit react-redux
```

**Backend:**
```
npm install mongoose bcryptjs jsonwebtoken cors dotenv axios
```

---

## Verification Plan

1. Run `npm run dev` in `geoexplorer-ui` — no console errors, Redux DevTools shows `auth`, `game`, `leaderboard`, `user` slices
2. Sign up → JWT stored in `localStorage`, navigates to `/game`
3. Login → same flow
4. Start game → real Unsplash image + 4 country options appear
5. Submit guess → navigates to `/result` with real score
6. Leaderboard page loads top players from DB
7. Profile page shows real stats
8. History page lists past sessions
