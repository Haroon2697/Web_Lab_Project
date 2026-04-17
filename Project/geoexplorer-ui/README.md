# GeoExplorer — Client (React + Vite + TypeScript)

Frontend for **GeoExplorer**: interactive geography guessing game (MERN proposal).

## Repo layout (this folder = `client`)

| Doc | Purpose |
|-----|---------|
| [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md) | Full `src/` folder map, naming rules |
| [WORK_DISTRIBUTION.md](./WORK_DISTRIBUTION.md) | Section 18 — Haroon vs Khizar modules |
| [TEAM_SPLIT_TEMPLATE.md](./TEAM_SPLIT_TEMPLATE.md) | Same distribution + screen list |

**Monorepo root:** [`../GeoExplorer/README.md`](../GeoExplorer/README.md) — `server/` (Express scaffold) and `docs/`.

## Quick start

```bash
npm install
npm run dev
```

Copy [`.env.example`](./.env.example) to `.env` and set `VITE_API_URL` when the API is running (default: `http://localhost:5000/api`).

## Stack

- React 19, React Router, TypeScript, Vite  
- Tailwind CSS v4 (`src/styles/index.css`)  
- Axios (`src/services/axiosInstance.ts` + `interceptors.ts`)  
- Feature folders under `src/features/` (Redux slices + services — stubs until wired)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
