# GeoExplorer (MERN)

Semester project layout: **client** (React), **server** (Express scaffold), **docs**.

## Directory map

```
Project/
├── geoexplorer-ui/          ← CLIENT (React + Vite + Tailwind)
│   ├── src/
│   │   ├── app/             Redux store setup
│   │   ├── assets/          images, icons, fonts
│   │   ├── components/      common, layout, game, leaderboard, user, admin, shared
│   │   ├── features/        auth, game, leaderboard, user (slice + service per feature)
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── user/        User panel pages (Haroon)
│   │   │   └── admin/       Admin panel pages (Khizar — templates)
│   │   ├── services/        axiosInstance, interceptors
│   │   ├── styles/          global CSS + Tailwind
│   │   ├── utils/           constants (ROUTES), helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── FRONTEND_STRUCTURE.md
│   ├── WORK_DISTRIBUTION.md
│   └── TEAM_SPLIT_TEMPLATE.md
│
├── GeoExplorer/             ← This folder
│   ├── README.md            ← You are here
│   ├── server/              Express API scaffold (`npm install` then `npm run dev`)
│   └── docs/                Proposal PDFs, diagrams, notes
│
└── Project-Proposal.pdf     (if kept at Project root)
```

## Roles

| Path | Owner (proposal) | Notes |
|------|------------------|--------|
| `geoexplorer-ui/src/pages/user/` | Haroon | Auth, game, landing, leaderboard, profile, history |
| `geoexplorer-ui/src/features/{auth,game,leaderboard,user}/` | Haroon | Redux + API calls for those modules |
| `geoexplorer-ui/src/services/` (axios) | Haroon | Central client + JWT interceptor |
| `geoexplorer-ui/src/pages/admin/` | Khizar | Admin screens (template phase) |
| `GeoExplorer/server/` | Khizar (+ shared integration) | Expand into `routes/`, `controllers/`, `models/`, `middleware/` |

## Run client

```bash
cd ../geoexplorer-ui
npm install
npm run dev
```

## Run server (scaffold)

```bash
cd server
npm install
npm run dev
```

Health check: `GET http://localhost:5000/api/health`

## More detail

Client tree and naming: **[../geoexplorer-ui/FRONTEND_STRUCTURE.md](../geoexplorer-ui/FRONTEND_STRUCTURE.md)**  
Work split: **[../geoexplorer-ui/WORK_DISTRIBUTION.md](../geoexplorer-ui/WORK_DISTRIBUTION.md)**
