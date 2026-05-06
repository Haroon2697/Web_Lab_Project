# GeoExplorer — API Integration Report (Updated)

## 7. API Integration Strategy

### 7.1 Centralized Axios Instance
The frontend uses a single Axios setup for all backend requests to ensure consistency:

- Common base URL (`VITE_API_URL`, default `http://localhost:5000/api`)
- Common JSON headers
- One place to configure timeouts / error handling behavior

### 7.2 JWT Interceptor for Authentication
Protected backend routes require a JWT:

- JWT is stored on the client (local storage)
- Axios request interceptor attaches it as an `Authorization: Bearer <token>` header automatically
- Response interceptor handles `401` and redirects to the correct login route (user vs admin)

### 7.3 Service-Based API Structure (Frontend)
API calls are organized by feature/module for maintainability:

- `authService` (authentication APIs)
- `gameService` (game APIs)
- `userService` (profile APIs)
- `leaderboardService` (ranking APIs)

This improves separation of concerns, reuse, and testability.

### 7.4 Backend Handles External APIs (Security + Key Protection)
All third‑party API calls are performed by the backend:

- The frontend **does not** call Unsplash / Mapillary / REST Countries / KartaView directly
- API keys/tokens stay in `server/.env`
- The backend returns only the processed fields needed by the UI

### 7.5 External Image Providers: Fallback + Performance Strategy
To avoid slow gameplay when a provider is slow or has no coverage, the backend uses:

- **Parallel provider attempts**: Mapillary + KartaView(OpenStreetCam) + Unsplash
- **Strict timeouts** per provider
- **Overall time budget** for selecting an image (so `/api/game/start` returns quickly)
- **Deterministic final fallback** (`picsum.photos`) so the game always has an image

Provider order is “best effort”, not “block on first provider”.

## 8. Backend Design

### 8.1 API Architecture (Route Structure)
Backend is modular: each major feature has its own route group.

- **`/api/auth`**: user authentication
- **`/api/users`**: user profile operations
- **`/api/game`**: game session + scoring + history
- **`/api/leaderboard`**: leaderboard + rank
- **`/api/admin`**: admin login + protected admin operations

### 8.2 Authentication Strategy (Actual Implementation)

- **JWT** for authentication/session handling
- JWT is attached via the Axios interceptor as `Authorization: Bearer <token>`
- **bcrypt** for password hashing before storing in MongoDB

### 8.3 Middleware System

- **`protect`**: blocks unauthenticated requests to protected routes
- **`adminOnly`**: blocks non‑admin requests to admin routes
- **`rateLimiter`**: prevents abuse/excessive requests
- **`errorHandler`**: centralized API error responses

## 9. API Endpoints (Actual Backend Routes)

### 9.1 Auth (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### 9.2 Users (`/api/users`) *(protected)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update current user profile |

### 9.3 Game (`/api/game`) *(protected)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/game/start` | Start a round (returns image + country meta + timeLimit) |
| POST | `/api/game/submit` | Submit guess, compute distance‑based score, save session |
| GET | `/api/game/history` | Fetch user game history |

### 9.4 Leaderboard (`/api/leaderboard`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leaderboard` | Fetch leaderboard |
| GET | `/api/leaderboard/me` *(protected)* | Get current user rank |

### 9.5 Admin (`/api/admin`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/users` *(admin)* | List users |
| PUT | `/api/admin/users/:id/block` *(admin)* | Block/unblock a user |
| DELETE | `/api/admin/users/:id` *(admin)* | Delete user |
| GET | `/api/admin/games` *(admin)* | Game statistics |
| DELETE | `/api/admin/games/:id` *(admin)* | Delete a game session |
| GET | `/api/admin/analytics` *(admin)* | Analytics |
| POST | `/api/admin/leaderboard/reset` *(admin)* | Reset leaderboard |

## 10. Database Design (Core Collections)

### 10.1 Users

- `name`: String
- `email`: String
- `password`: String (hashed)
- `role`: String (`user` / `admin`)
- `totalScore`: Number
- `gamesPlayed`: Number
- `currentStreak`: Number *(feature)*
- `achievements`: Array *(feature)*

### 10.2 GameSessions

- `user`: ObjectId
- `imageUrl`: String
- `imageCredit`: String
- `correctCountry`: String
- `userGuess`: String
- `score`: Number
- `difficulty`: String
- `timeLimit`: Number
- `timeLeft`: Number
- `guessLatlng`: { lat, lng } *(optional)*
- `correctLatlng`: { lat, lng } *(optional)*
- `distance`: Number *(km, optional)*

## 11. External APIs (Updated)

### 11.1 Unsplash API (Images)
- Used as one of the image sources (backend → frontend)
- Requires API key in backend env: `UNSPLASH_ACCESS_KEY`

### 11.2 REST Countries API (Country Meta + Coordinates)
- Public API (no key required)
- Used to fetch country meta (capital/region/population/flag/coordinates) used in gameplay + result display

### 11.3 Mapillary Graph API (Street-level imagery)
- Used to fetch street‑view style photos near the target location
- Requires token in backend env: `MAPILLARY_ACCESS_TOKEN`
- Backend queries `https://graph.mapillary.com/images` with bbox/fields and returns a usable image URL

### 11.4 KartaView / OpenStreetCam API (Street-level imagery)
- Used as a free street‑photo fallback when coverage exists
- Public endpoint used for nearby photos (no key required for public imagery access)

## 12. System Architecture Summary

1. **Frontend (React + Redux)**
   - Renders UI (game, leaderboard, profile, admin panel)
   - Uses centralized Axios + JWT interceptor
2. **Backend (Node + Express)**
   - Authentication, gameplay logic, distance‑based scoring
   - Calls external APIs (Unsplash / Mapillary / REST Countries / KartaView)
3. **Database (MongoDB)**
   - Stores users + game sessions + aggregated scores/ranks

