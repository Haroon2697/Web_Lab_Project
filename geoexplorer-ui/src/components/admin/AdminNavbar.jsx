import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { NAV_LINK_GROUPS, ROUTES } from '../../utils/constants'

const linkClass = ({ isActive }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-geo-p50/10 text-geo-p80'
      : 'text-geo-p20 hover:bg-slate-100 hover:text-geo-p10'
  }`

export function AdminNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const links = NAV_LINK_GROUPS.find((g) => g.title === 'Admin')?.links ?? []
  const mainLinks = links.filter((l) => l.to !== ROUTES.admin.login)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate(ROUTES.home)
  }

  // Hide navbar on admin login page.
  if (location.pathname === ROUTES.admin.login) return null

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-8">
        <Link to={ROUTES.admin.dashboard} className="text-xl font-extrabold tracking-tight text-geo-p10">
          GeoExplorer <span className="text-geo-p20 font-bold">Admin</span>
        </Link>
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Admin navigation">
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === ROUTES.admin.dashboard} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={handleLogout} className="btn-secondary">
          Logout
        </button>
      </div>
    </div>
  )
}

