# GeoExplorer Client — Production-style structure

React + Vite + Tailwind. Modular layout: **`app`**, **`features`**, **`pages`**, **`services`**, **`hooks`**, **`utils`**, **`styles`**.

**Related docs:** [README.md](./README.md) · [WORK_DISTRIBUTION.md](./WORK_DISTRIBUTION.md) · [TEAM_SPLIT_TEMPLATE.md](./TEAM_SPLIT_TEMPLATE.md) · [GeoExplorer monorepo](../GeoExplorer/README.md)

---

## Module → folder (viva / marking)

| Proposal module | Person | Frontend location |
|-----------------|--------|-------------------|
| Authentication | Haroon | `pages/user/LoginPage.jsx`, `SignupPage.jsx`; `features/auth/` |
| Game (core) | Haroon | `pages/user/GamePage.jsx`, `GuessSubmissionPage.jsx`, `ResultPage.jsx`; `features/game/`; `components/game/` |
| Game history | Haroon | `pages/user/GameHistoryPage.jsx` |
| Leaderboard | Haroon | `pages/user/LeaderboardPage.jsx`; `features/leaderboard/`; `components/leaderboard/` |
| User profile (part) | Haroon | `pages/user/ProfilePage.jsx`; `features/user/`; `components/user/` |
| Admin (all five) | Khizar | `pages/admin/*Page.jsx`; `components/admin/` |
| Axios + interceptors | Haroon | `services/` |
| Redux store | Haroon (auth + game slices); extend for leaderboard/user | `app/store.js` + `features/*/` |

---

## `src/` tree (summary)

```
src/
├── app/
│   └── store.js
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── common/          Button, Loader, …
│   ├── layout/          Navbar, Footer
│   ├── game/
│   ├── leaderboard/
│   ├── user/
│   ├── admin/
│   └── shared/          ScreenTemplate, SectionCard, TemplateBlock
├── features/
│   ├── auth/            authSlice.js, authService.js
│   ├── game/            gameSlice.js, gameService.js
│   ├── leaderboard/     leaderboardSlice.js, leaderboardService.js
│   └── user/            userSlice.js, userService.js
├── hooks/               useAuth, useGame, useFetch
├── pages/
│   ├── user/            all user-panel *Page.jsx (+ Login.jsx, Signup.jsx)
│   └── admin/           all admin *Page.jsx
├── services/            axiosInstance.js, interceptors.js
├── styles/              index.css (Tailwind + globals)
├── utils/               constants.js (ROUTES, API_BASE_URL), helpers.js
├── App.jsx
├── main.jsx
└── routes.jsx
```

Project root also has **`jsconfig.json`** (editor / `import.meta.env` hints) and **`vite.config.js`**.

---

## Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| Page file | `SomethingPage.jsx` | `GamePage.jsx` |
| Feature slice | `featureSlice.js` | `authSlice.js` |
| Feature API | `featureService.js` | `authService.js` |
| Route paths | `ROUTES` in `utils/constants.js` | `ROUTES.game` → `/game` |
| Folders | lowercase | `features/auth/` |

---

## Environment

- Copy **`.env.example`** → **`.env`**
- Set **`VITE_API_URL`** to your Express API base (e.g. `http://localhost:5000/api`)

---

## Backend (separate folder)

Express scaffold: **`../GeoExplorer/server/`** — expand into `routes/`, `controllers/`, `models/`, `middleware/` per proposal.
