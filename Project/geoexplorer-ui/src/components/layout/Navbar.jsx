import { Link, NavLink } from 'react-router-dom'
import { NAV_LINK_GROUPS, ROUTES } from '../../utils/constants'

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-geo-p50/10 text-geo-p80'
      : 'text-geo-p20 hover:bg-slate-100 hover:text-geo-p10'
  }`

export function Navbar() {
  const mainLinks = NAV_LINK_GROUPS.find((group) => group.title === 'User')?.links ?? []
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-8">
        <Link
          to={ROUTES.home}
          className="text-xl font-extrabold tracking-tight text-geo-p10"
        >
          GeoExplorer
        </Link>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {mainLinks.slice(0, 5).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === ROUTES.home} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <NavLink to={ROUTES.login} className="btn-secondary">
          Login
        </NavLink>
        <NavLink to={ROUTES.game} className="btn-primary">
          Start Game
        </NavLink>
      </div>
    </div>
  )
}
