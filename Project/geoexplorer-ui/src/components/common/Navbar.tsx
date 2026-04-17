import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Signup' },
  { to: '/game', label: 'Game' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/profile', label: 'Profile' },
]

export function Navbar() {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-lg border px-3 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-geo-p50 bg-geo-p50/20 text-white'
                : 'border-geo-p20/40 bg-geo-card text-geo-p10 hover:border-geo-aqua hover:text-geo-aqua'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
