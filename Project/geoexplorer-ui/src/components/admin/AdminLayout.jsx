import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

const navItems = [
  { to: ROUTES.admin.dashboard, label: 'Dashboard' },
  { to: ROUTES.admin.users, label: 'Users' },
  { to: ROUTES.admin.gameData, label: 'Game Data' },
  { to: ROUTES.admin.leaderboard, label: 'Leaderboard' },
  { to: ROUTES.admin.reports, label: 'Analytics' },
]

const linkClass = ({ isActive }) =>
  `block rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-white/15 text-white'
      : 'text-slate-300 hover:bg-white/10 hover:text-white'
  }`

export function AdminLayout({ title, children }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl bg-slate-800 p-5 text-white">
        <h2 className="mb-5 text-lg font-bold">GeoExplorer Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-geo-p10">{title}</h1>
        </header>
        {children}
      </section>
    </div>
  )
}
