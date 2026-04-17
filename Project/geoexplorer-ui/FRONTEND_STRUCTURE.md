# GeoExplorer Frontend Structure (Template)

This project is currently a frontend-only proposal scaffold.

## Core Structure

- `src/components/common` - Navbar, Footer, Button, Loader
- `src/components/game` - GameImage, CountrySelector, Timer, GameResult
- `src/components/leaderboard` - LeaderboardTable
- `src/components/profile` - ProfileCard, GameHistoryList
- `src/components/admin` - AdminSidebar, UserTable, AnalyticsChart, LeaderboardControl
- `src/pages` - user-facing screens
- `src/pages/admin` - admin route aliases
- `src/redux` - store/slice templates
- `src/services` - API service templates
- `src/utils` - helper utilities
- `src/routes.tsx` - central route map
- `src/App.tsx` - layout shell

## Notes

- Template only, no real backend integration.
- Haroon pages and user flow can be implemented independently.
- Admin implementation files remain separate under `src/pages`.
