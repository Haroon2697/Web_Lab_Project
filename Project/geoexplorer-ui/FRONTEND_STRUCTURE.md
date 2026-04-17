# GeoExplorer Client — Production-style structure

React + Vite + Tailwind. Modular layout: **`app`**, **`features`**, **`pages`**, **`services`**, **`hooks`**, **`utils`**, **`styles`**.

**Related docs:** [README.md](./README.md) · [WORK_DISTRIBUTION.md](./WORK_DISTRIBUTION.md) · [TEAM_SPLIT_TEMPLATE.md](./TEAM_SPLIT_TEMPLATE.md) · [GeoExplorer monorepo](../GeoExplorer/README.md)

---

## Module → folder (viva / marking)

| Proposal module | Person | Frontend location |
|-----------------|--------|-------------------|
| Authentication | Haroon | `pages/user/LoginPage.tsx`, `SignupPage.tsx`; `features/auth/` |
| Game (core) | Haroon | `pages/user/GamePage.tsx`, `GuessSubmissionPage.tsx`, `ResultPage.tsx`; `features/game/`; `components/game/` |
| Game history | Haroon | `pages/user/GameHistoryPage.tsx` |
| Leaderboard | Haroon | `pages/user/LeaderboardPage.tsx`; `features/leaderboard/`; `components/leaderboard/` |
| User profile (part) | Haroon | `pages/user/ProfilePage.tsx`; `features/user/`; `components/user/` |
| Admin (all five) | Khizar | `pages/admin/*Page.tsx`; `components/admin/` |
| Axios + interceptors | Haroon | `services/` |
| Redux store | Haroon (auth + game slices); extend for leaderboard/user | `app/store.ts` + `features/*/` |

---

## `src/` tree (summary)

```
src/
├── app/
│   └── store.ts
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
│   ├── auth/            authSlice.ts, authService.ts
│   ├── game/            gameSlice.ts, gameService.ts
│   ├── leaderboard/     leaderboardSlice.ts, leaderboardService.ts
│   └── user/            userSlice.ts, userService.ts
├── hooks/               useAuth, useGame, useFetch
├── pages/
│   ├── user/            all user-panel *Page.tsx (+ Login.tsx, Signup.tsx)
│   └── admin/           all admin *Page.tsx
├── services/            axiosInstance.ts, interceptors.ts
├── styles/              index.css (Tailwind + globals)
├── utils/               constants.ts (ROUTES, API_BASE_URL), helpers.ts
├── App.tsx
├── main.tsx
├── routes.tsx
└── vite-env.d.ts
```

---

## Naming conventions

| Item | Convention | Example |
|------|------------|---------|
| Page file | `SomethingPage.tsx` | `GamePage.tsx` |
| Feature slice | `featureSlice.ts` | `authSlice.ts` |
| Feature API | `featureService.ts` | `authService.ts` |
| Route paths | `ROUTES` in `utils/constants.ts` | `ROUTES.game` → `/game` |
| Folders | lowercase | `features/auth/` |

---

## Environment

- Copy **`.env.example`** → **`.env`**
- Set **`VITE_API_URL`** to your Express API base (e.g. `http://localhost:5000/api`)

---

## Backend (separate folder)

Express scaffold: **`../GeoExplorer/server/`** — expand into `routes/`, `controllers/`, `models/`, `middleware/` per proposal.
