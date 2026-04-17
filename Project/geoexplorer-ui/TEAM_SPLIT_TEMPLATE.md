# GeoExplorer Team Split (From Proposal)

## Members

- Haroon Aziz: `i22-2697`
- Khizar Shahid: `i22-2595`

## Frontend folder map (where to implement)

| Area | Person | Code paths |
|------|--------|------------|
| User panel pages | Haroon | `src/pages/user/` — `LandingPage`, `LoginPage`, `SignupPage`, `GamePage`, `GuessSubmissionPage`, `ResultPage`, `LeaderboardPage`, `ProfilePage`, `GameHistoryPage`; entry re-exports `Login.tsx`, `Signup.tsx` |
| User features (Redux + API) | Haroon | `src/features/auth/`, `features/game/`, `features/leaderboard/`, `features/user/` |
| HTTP client | Haroon | `src/services/axiosInstance.ts`, `interceptors.ts` |
| Admin panel pages | Khizar | `src/pages/admin/*Page.tsx` (templates until Khizar implements) |
| Admin UI building blocks | Khizar | `src/components/admin/` |
| Shared layout | Shared | `src/components/layout/` (Navbar, Footer) |
| Shared templates | Shared | `src/components/shared/` (e.g. `ScreenTemplate`) |

**Monorepo:** client = `geoexplorer-ui/`; server scaffold = `GeoExplorer/server/`. See [GeoExplorer/README.md](../GeoExplorer/README.md).

## User Panel Screens (Haroon Aziz)

- `Landing Page` → `src/pages/user/LandingPage.tsx`
- `Login Screen` → `src/pages/user/LoginPage.tsx` (+ `Login.tsx`)
- `Signup Screen` → `src/pages/user/SignupPage.tsx` (+ `Signup.tsx`)
- `Game Screen` → `src/pages/user/GamePage.tsx`
- `Guess Submission Screen` → `src/pages/user/GuessSubmissionPage.tsx`
- `Result Screen` → `src/pages/user/ResultPage.tsx`
- `Leaderboard Screen` → `src/pages/user/LeaderboardPage.tsx`
- `User Profile Screen` → `src/pages/user/ProfilePage.tsx`
- `Game History Screen` → `src/pages/user/GameHistoryPage.tsx`

## Admin Panel Screens (Khizar Shahid)

- `Admin Login Screen` → `src/pages/admin/AdminLoginPage.tsx`
- `Admin Dashboard Screen` → `src/pages/admin/AdminDashboardPage.tsx`
- `User Management Screen` → `src/pages/admin/UserManagementPage.tsx`
- `Game Data Management Screen` → `src/pages/admin/GameDataManagementPage.tsx`
- `Leaderboard Control Screen` → `src/pages/admin/LeaderboardControlPage.tsx`
- `Analytics & Reports Screen` → `src/pages/admin/AnalyticsReportsPage.tsx`

## Notes

- **Haroon:** user pages are largely built as UI with mock/local data; backend + Redux wiring still to do.
- **Khizar:** admin pages are **template placeholders** until implementation; do not mix ownership without agreement.
- Route paths are centralized in `src/utils/constants.ts` (`ROUTES`).
- Use separate branches per owner for implementation to reduce merge conflicts.

## 18. Work Distribution (Panel-wise Division)

The system is divided into two main panels:

- User Panel
- Admin Panel

The project consists of 10 modules in total. Both members contributed as full-stack developers across both frontend and backend. Each member is assigned an equal number of modules with clear responsibilities.

### Haroon Aziz (i22-2697)

#### User Panel Responsibilities

1. **Authentication Module (Full Stack)**
   - Frontend:
     - Login page UI
     - Signup page UI
     - Form validation and error handling
   - Backend:
     - JWT authentication system
     - bcrypt password encryption
     - `/api/auth` routes
     - `protect` middleware for secured routes

2. **Game Module (Core Module - Full Stack)**
   - Frontend:
     - Game interface design
     - Image display screen (Unsplash images)
     - Country selection/guessing system
     - Timer and submission UI
   - Backend:
     - Game session creation and handling
     - Score calculation logic
     - Result evaluation system
     - `/api/game` routes
     - Integration with Unsplash API and REST Countries API

3. **Game History Module (Full Stack)**
   - Frontend:
     - Game history UI
     - Filters (date, score, difficulty)
     - Display of past game sessions
   - Backend:
     - Store game session data in MongoDB
     - Retrieve user game history
     - Filter history based on conditions
     - History-related APIs

4. **Leaderboard Module (Full Stack)**
   - Frontend:
     - Leaderboard UI
     - Top players display
     - Search and filter functionality
   - Backend:
     - Ranking system based on scores
     - Score aggregation logic
     - `/api/leaderboard` routes
     - Real-time leaderboard updates logic

5. **Part of User Profile Module (Full Stack)**
   - Frontend:
     - User profile UI
     - Display total score and game stats
   - Backend:
     - Fetch user details
     - Update user statistics
     - Manage profile-related data

#### Additional Responsibilities (Haroon)

- Axios centralized instance setup
- JWT interceptor implementation
- Redux state management (`auth` + `game`)
- API service structure for modules
- GitHub repository setup and version control
- Frontend-backend integration testing

### Khizar Shahid (i22-2595)

#### Admin Panel Responsibilities

1. **Admin Authentication Module (Full Stack)**
   - Frontend:
     - Admin login UI
     - Secure login form
   - Backend:
     - Admin authentication system
     - Role-based access control
     - `/api/auth/admin` handling
     - `adminOnly` middleware

2. **User Management Module (Full Stack)**
   - Frontend:
     - User management dashboard
     - View users interface
     - Search users UI
   - Backend:
     - User CRUD operations
     - `/api/users` routes
     - Block/unblock users
     - Delete user accounts
     - User statistics tracking

3. **Game Data Management Module (Full Stack)**
   - Frontend:
     - Game data control interface
     - Admin controls for game settings
   - Backend:
     - Manage game session data
     - Adjust difficulty levels
     - Monitor game activity
     - Game management APIs

4. **Leaderboard Management Module (Full Stack)**
   - Frontend:
     - Leaderboard control UI
     - Search/filter leaderboard
   - Backend:
     - Ranking validation
     - Score verification system
     - `/api/leaderboard` admin controls
     - Reset/update leaderboard functionality

5. **Analytics & Reporting Module (Full Stack)**
   - Frontend:
     - Admin analytics dashboard
     - Charts and statistics UI
   - Backend:
     - System analytics generation
     - Most guessed countries data
     - User activity tracking
     - Performance reports

#### Additional Responsibilities (Khizar)

- MongoDB schema design (Users, GameSessions, Leaderboard)
- Backend architecture setup (Express structure)
- Input validation middleware
- Error handling system implementation
- Rate limiter middleware
- API response standardization
- Deployment setup and configuration
